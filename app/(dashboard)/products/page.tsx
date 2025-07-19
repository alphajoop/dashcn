'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { products as productsData } from '@/data/products';

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<typeof productsData>([]);

  useEffect(() => {
    // Simuler un chargement des données
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produits</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un produit
        </Button>
      </div>

      <div className="bg-card text-card-foreground mb-6 rounded-lg shadow">
        <div className="p-6">
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="Rechercher un produit..." className="pl-10" />
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
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
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
                          <TableCell>
                            <Skeleton className="h-5 w-40" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="ml-auto h-5 w-20" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="ml-auto h-5 w-10" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                        </TableRow>
                      ))
                  : // Afficher les données réelles une fois chargées
                    products.map((product) => (
                      <TableRow
                        key={product.id}
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/products/${product.id}`)
                        }
                      >
                        <TableCell className="font-medium">
                          {product.id}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">
                          {formatFCFA(product.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          {product.stock}
                        </TableCell>
                        <TableCell className="text-right">
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
