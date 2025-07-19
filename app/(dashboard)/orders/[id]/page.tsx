'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Download, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { formatFCFA } from '@/lib/utils';
import { getOrderById, OrderStatus } from '@/data/orders';

export default function OrderPage() {
  const params = useParams();
  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : '';

  const [loading, setLoading] = useState(true);
  const [order, setOrder] =
    useState<ReturnType<typeof getOrderById>>(undefined);

  useEffect(() => {
    // Simuler un chargement des données
    const timer = setTimeout(() => {
      setOrder(getOrderById(id));
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusVariant = (
    status: OrderStatus,
  ): {
    variant: 'default' | 'destructive' | 'secondary' | 'outline';
    className: string;
  } => {
    switch (status) {
      case 'Livrée':
        return {
          variant: 'default',
          className:
            'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
        };
      case 'En cours':
        return {
          variant: 'default',
          className:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400',
        };
      case 'En préparation':
        return { variant: 'default', className: '' };
      case 'Annulée':
        return { variant: 'destructive', className: '' };
      case 'En attente':
        return {
          variant: 'secondary',
          className:
            'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400',
        };
      default:
        return { variant: 'secondary', className: '' };
    }
  };

  if (!loading && !order) {
    return (
      <section className="container">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Détails de la commande</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Commande introuvable</CardTitle>
            <CardDescription>
              La commande avec l&apos;ID {id} n&apos;existe pas.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Détails de la commande</h1>
        <div className="ml-auto">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Facture
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  {loading ? (
                    <>
                      <Skeleton className="mb-2 h-6 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </>
                  ) : (
                    <>
                      <CardTitle>Commande #{order?.id}</CardTitle>
                      <CardDescription>Passée le {order?.date}</CardDescription>
                    </>
                  )}
                </div>
                {loading ? (
                  <Skeleton className="h-6 w-24" />
                ) : order?.status ? (
                  <Badge
                    variant={getStatusVariant(order.status).variant}
                    className={getStatusVariant(order.status).className}
                  >
                    {order.status}
                  </Badge>
                ) : null}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Articles commandés
                  </h3>
                  <div className="overflow-hidden rounded-lg border">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-2 text-left">Produit</th>
                          <th className="px-4 py-2 text-center">Quantité</th>
                          <th className="px-4 py-2 text-right">Prix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <tr key={`skeleton-${index}`}>
                                  <td className="px-4 py-3">
                                    <Skeleton className="h-5 w-40" />
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <Skeleton className="mx-auto h-5 w-8" />
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    <Skeleton className="ml-auto h-5 w-20" />
                                  </td>
                                </tr>
                              ))
                          : order?.items
                            ? order.items.map((item) => (
                                <tr key={item.id}>
                                  <td className="px-4 py-3">
                                    <div className="font-medium">
                                      {item.name}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    {item.quantity}
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium">
                                    {formatFCFA(item.price)}
                                  </td>
                                </tr>
                              ))
                            : null}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Résumé de la commande
                  </h3>
                  <div className="bg-muted/20 rounded-lg p-4">
                    {loading ? (
                      <>
                        <div className="flex justify-between py-1">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                        <div className="flex justify-between py-1">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                        <div className="flex justify-between py-1">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between py-1">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-24" />
                        </div>
                      </>
                    ) : order ? (
                      <>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">
                            Sous-total
                          </span>
                          <span>{formatFCFA(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">
                            Frais de livraison
                          </span>
                          <span>{formatFCFA(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">
                            TVA (18%)
                          </span>
                          <span>{formatFCFA(order.tax)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between py-1 font-bold">
                          <span>Total</span>
                          <span>{formatFCFA(order.total)}</span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations client</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                ) : order?.customer ? (
                  <div className="space-y-1">
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer.email}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer.phone}
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adresse de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ) : order?.customer ? (
                  <div className="space-y-1">
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer.address.street}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer.address.postalCode},{' '}
                      {order.customer.address.city}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer.address.country}
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paiement et livraison</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <div>
                      <Skeleton className="mb-1 h-4 w-32" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                    <div>
                      <Skeleton className="mb-1 h-4 w-32" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                ) : order ? (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-muted-foreground text-sm font-medium">
                        Méthode de paiement
                      </h4>
                      <p>{order.paymentMethod}</p>
                    </div>
                    <div>
                      <h4 className="text-muted-foreground text-sm font-medium">
                        Méthode de livraison
                      </h4>
                      <p>{order.shippingMethod}</p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <h4 className="text-muted-foreground text-sm font-medium">
                          Numéro de suivi
                        </h4>
                        <p>{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
