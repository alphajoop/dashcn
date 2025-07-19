import CardStat from '@/components/card-stat';
import { dashboardStats } from '@/data/dashboard';
import { getRecentOrders } from '@/data/orders';
import { products } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AvatarFallback, Avatar } from '@/components/ui/avatar';
import { ArrowUpRight, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold">Tableau de bord</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <CardStat key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Commandes récentes</h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Aujourd&apos;hui</span>
            </Badge>
          </div>

          <div className="space-y-4">
            {getRecentOrders(5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback>
                      {order.customer.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{order.customer.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {order.id} · {order.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-medium">
                    {formatCurrency(order.total)}
                  </p>
                  <Badge
                    variant={
                      order.status === 'Livrée'
                        ? 'outline'
                        : order.status === 'En cours'
                          ? 'default'
                          : order.status === 'En préparation'
                            ? 'secondary'
                            : order.status === 'Annulée'
                              ? 'destructive'
                              : 'outline'
                    }
                    className={`text-xs ${
                      order.status === 'Livrée'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : order.status === 'En préparation'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : ''
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/orders"
              className="text-primary flex items-center justify-center gap-1 text-sm hover:underline"
            >
              Voir toutes les commandes
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Produits populaires</h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              <span>Par ventes</span>
            </Badge>
          </div>

          <div className="space-y-4">
            {[...products]
              .sort((a, b) => (b.sales?.total || 0) - (a.sales?.total || 0))
              .slice(0, 5)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-10 w-10 items-center justify-center overflow-hidden rounded-md">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        height={40}
                        width={40}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {product.category} · {product.sales?.total || 0} ventes
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium">
                      {formatCurrency(product.price)}
                    </p>
                    <Badge
                      variant={
                        product.stock > 20
                          ? 'outline'
                          : product.stock > 0
                            ? 'secondary'
                            : 'destructive'
                      }
                      className={`text-xs ${
                        product.stock > 20
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : product.stock > 0
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : ''
                      }`}
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/products"
              className="text-primary flex items-center justify-center gap-1 text-sm hover:underline"
            >
              Voir tous les produits
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
