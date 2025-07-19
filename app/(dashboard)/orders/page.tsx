'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatFCFA } from '@/lib/utils';
import { orders as ordersData, OrderStatus } from '@/data/orders';

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<typeof ordersData>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(ordersData);
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Fonction pour obtenir la couleur du badge en fonction du statut
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

  return (
    <section className="container">
      <h1 className="mb-6 text-3xl font-bold">Commandes</h1>

      <div className="bg-card text-card-foreground mb-6 rounded-lg shadow">
        <div className="p-6">
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Rechercher une commande..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Articles</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? // Afficher des skeletons pendant le chargement
                    Array(10)
                      .fill(0)
                      .map((_, index) => (
                        <TableRow key={`skeleton-${index}`}>
                          <TableCell>
                            <Skeleton className="h-5 w-16" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-40" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="ml-auto h-5 w-10" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="ml-auto h-5 w-24" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                        </TableRow>
                      ))
                  : orders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/orders/${order.id}`)
                        }
                      >
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer.name}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="text-right">
                          {order.items.length}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatFCFA(order.total)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={getStatusVariant(order.status).variant}
                            className={getStatusVariant(order.status).className}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
