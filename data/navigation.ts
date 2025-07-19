import {
  BarChart2,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart4,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const menuItems: MenuItem[] = [
  {
    title: 'Tableau de bord',
    url: '/',
    icon: BarChart2,
  },
  {
    title: 'Produits',
    url: '/products',
    icon: Package,
  },
  {
    title: 'Commandes',
    url: '/orders',
    icon: ShoppingBag,
  },
  {
    title: 'Clients',
    url: '/customers',
    icon: Users,
  },
  {
    title: 'Paramètres',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Statistiques',
    url: '/statistics',
    icon: BarChart4,
  },
  {
    title: 'Utilisateurs',
    url: '/users',
    icon: Users,
  },
];

export const routeNameMapping: Record<string, string> = {
  '': 'Tableau de bord',
  dashboard: 'Tableau de bord',
  products: 'Produits',
  orders: 'Commandes',
  customers: 'Clients',
  settings: 'Paramètres',
  statistics: 'Statistiques',
  users: 'Utilisateurs',
};
