'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash2, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { formatFCFA } from '@/lib/utils';
import { getProductById, Product } from '@/data/products';

export default function ProductPage() {
  const params = useParams();
  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : '';

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    // Simuler un chargement des données
    const timer = setTimeout(() => {
      setProduct(getProductById(id));
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  if (!loading && !product) {
    return (
      <section className="container">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Détails du produit</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Produit introuvable</CardTitle>
            <CardDescription>
              Le produit avec l&apos;ID {id} n&apos;existe pas.
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
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Détails du produit</h1>
      </div>

      <div className="mb-6 flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                {loading ? (
                  <>
                    <Skeleton className="mb-2 h-6 w-48" />
                    <Skeleton className="h-4 w-40" />
                  </>
                ) : (
                  <>
                    <CardTitle>{product?.name}</CardTitle>
                    <CardDescription>
                      ID: {product?.id} | SKU: {product?.sku}
                    </CardDescription>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="specs">Spécifications</TabsTrigger>
                  <TabsTrigger value="sales">Ventes</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                      ) : product?.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          className="h-auto w-full rounded-lg border"
                          height={300}
                          width={400}
                        />
                      ) : (
                        <div className="bg-muted/20 flex h-[300px] w-full items-center justify-center rounded-lg border">
                          <Package className="text-muted h-16 w-16" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Description
                      </h3>
                      {loading ? (
                        <>
                          <Skeleton className="mb-1 h-4 w-full" />
                          <Skeleton className="mb-1 h-4 w-full" />
                          <Skeleton className="mb-4 h-4 w-3/4" />
                        </>
                      ) : (
                        <p className="text-muted-foreground mb-4">
                          {product?.description}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-muted-foreground text-sm font-medium">
                            Catégorie
                          </h4>
                          {loading ? (
                            <Skeleton className="h-5 w-24" />
                          ) : (
                            <p>{product?.category}</p>
                          )}
                        </div>
                        <div>
                          <h4 className="text-muted-foreground text-sm font-medium">
                            Prix
                          </h4>
                          {loading ? (
                            <Skeleton className="h-5 w-24" />
                          ) : (
                            <p className="font-bold">
                              {product && formatFCFA(product.price)}
                              {product?.discount && (
                                <span className="text-muted-foreground ml-2 text-sm line-through">
                                  {formatFCFA(
                                    product.price *
                                      (1 + product.discount / 100),
                                  )}
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                        <div>
                          <h4 className="text-muted-foreground text-sm font-medium">
                            Stock
                          </h4>
                          {loading ? (
                            <Skeleton className="h-5 w-20" />
                          ) : (
                            <p>{product?.stock} unités</p>
                          )}
                        </div>
                        <div>
                          <h4 className="text-muted-foreground text-sm font-medium">
                            Statut
                          </h4>
                          {loading ? (
                            <Skeleton className="h-5 w-24" />
                          ) : product ? (
                            <Badge
                              variant={
                                product.stock > 0 ? 'default' : 'destructive'
                              }
                              className={
                                product.stock > 0
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                  : ''
                              }
                            >
                              {product.status}
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specs">
                  <div className="rounded-lg border">
                    <table className="w-full">
                      <tbody>
                        {loading ? (
                          Array(6)
                            .fill(0)
                            .map((_, index) => (
                              <tr
                                key={`skeleton-${index}`}
                                className={index % 2 === 0 ? 'bg-muted/50' : ''}
                              >
                                <td className="px-4 py-2">
                                  <Skeleton className="h-5 w-24" />
                                </td>
                                <td className="px-4 py-2">
                                  <Skeleton className="h-5 w-32" />
                                </td>
                              </tr>
                            ))
                        ) : product?.specifications ? (
                          product.specifications.map((spec, index) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? 'bg-muted/50' : ''}
                            >
                              <td className="px-4 py-2 font-medium">
                                {spec.name}
                              </td>
                              <td className="px-4 py-2">{spec.value}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="px-4 py-2 text-center" colSpan={2}>
                              Aucune spécification disponible
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="sales">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Ventes totales</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <Skeleton className="h-10 w-32" />
                        ) : product?.sales ? (
                          <div className="text-3xl font-bold">
                            {product.sales.total} unités
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            Aucune donnée
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Ventes du mois</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <Skeleton className="h-10 w-24" />
                        ) : product?.sales ? (
                          <div className="text-3xl font-bold">
                            {product.sales.lastMonth} unités
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            Aucune donnée
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {loading ? (
                <>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </>
              ) : (
                <>
                  <Button className="w-full">Modifier le prix</Button>
                  <Button className="w-full" variant="outline">
                    Mettre à jour le stock
                  </Button>
                  <Button className="w-full" variant="secondary">
                    Dupliquer le produit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {!loading && product?.rating && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Évaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div className="text-muted-foreground">/ 5</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
