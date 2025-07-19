import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface StatCard {
  title: string;
  value: number;
  isCurrency?: boolean;
  change?: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}

export const dashboardStats: StatCard[] = [
  {
    title: 'Revenus',
    value: 24500,
    isCurrency: true,
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Commandes',
    value: 345,
    change: '+8%',
    trend: 'up',
    icon: ShoppingBag,
  },
  {
    title: 'Produits',
    value: 128,
    change: '+3%',
    trend: 'up',
    icon: Package,
  },
  {
    title: 'Clients',
    value: 1205,
    change: '+18%',
    trend: 'up',
    icon: Users,
  },
];
