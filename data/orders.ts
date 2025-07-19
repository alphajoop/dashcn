import { products } from './products';

export type OrderStatus =
  | 'Livrée'
  | 'En cours'
  | 'En préparation'
  | 'Annulée'
  | 'En attente';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
  };
  dateJoined: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Order {
  id: string;
  customerId: string;
  customer: Customer;
  date: string;
  status: OrderStatus;
  paymentMethod: string;
  shippingMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
}

export const customers: Customer[] = [
  {
    id: 'CLT001',
    name: 'Moussa Diop',
    email: 'moussa.diop@example.com',
    phone: '+221 77 123 45 67',
    address: {
      street: '123 Avenue Cheikh Anta Diop',
      city: 'Dakar',
      postalCode: '11500',
      region: 'Dakar',
      country: 'Sénégal',
    },
    dateJoined: '2024-08-15',
    totalOrders: 8,
    totalSpent: 1245000,
  },
  {
    id: 'CLT002',
    name: 'Fatou Ndiaye',
    email: 'fatou.ndiaye@example.com',
    phone: '+221 76 234 56 78',
    address: {
      street: '45 Rue Félix Faure',
      city: 'Dakar',
      postalCode: '12000',
      region: 'Dakar',
      country: 'Sénégal',
    },
    dateJoined: '2024-09-22',
    totalOrders: 5,
    totalSpent: 785000,
  },
  {
    id: 'CLT003',
    name: 'Abdoulaye Sow',
    email: 'abdoulaye.sow@example.com',
    phone: '+221 78 345 67 89',
    address: {
      street: '78 Boulevard de la République',
      city: 'Saint-Louis',
      postalCode: '32000',
      region: 'Saint-Louis',
      country: 'Sénégal',
    },
    dateJoined: '2024-07-10',
    totalOrders: 3,
    totalSpent: 450000,
  },
  {
    id: 'CLT004',
    name: 'Aminata Fall',
    email: 'aminata.fall@example.com',
    phone: '+221 70 456 78 90',
    address: {
      street: '15 Avenue Léopold Sédar Senghor',
      city: 'Thiès',
      postalCode: '21000',
      region: 'Thiès',
      country: 'Sénégal',
    },
    dateJoined: '2024-10-05',
    totalOrders: 2,
    totalSpent: 235000,
  },
  {
    id: 'CLT005',
    name: 'Ibrahima Gueye',
    email: 'ibrahima.gueye@example.com',
    phone: '+221 75 567 89 01',
    address: {
      street: '32 Rue Moussé Diop',
      city: 'Touba',
      postalCode: '40000',
      region: 'Diourbel',
      country: 'Sénégal',
    },
    dateJoined: '2024-11-18',
    totalOrders: 4,
    totalSpent: 620000,
  },
  {
    id: 'CLT006',
    name: 'Mariama Diallo',
    email: 'mariama.diallo@example.com',
    phone: '+221 77 678 90 12',
    address: {
      street: '56 Avenue Blaise Diagne',
      city: 'Ziguinchor',
      postalCode: '27000',
      region: 'Ziguinchor',
      country: 'Sénégal',
    },
    dateJoined: '2024-08-30',
    totalOrders: 6,
    totalSpent: 890000,
  },
  {
    id: 'CLT007',
    name: 'Ousmane Mbaye',
    email: 'ousmane.mbaye@example.com',
    phone: '+221 76 789 01 23',
    address: {
      street: '89 Rue Amadou Assane Ndoye',
      city: 'Kaolack',
      postalCode: '24000',
      region: 'Kaolack',
      country: 'Sénégal',
    },
    dateJoined: '2024-12-03',
    totalOrders: 1,
    totalSpent: 150000,
  },
  {
    id: 'CLT008',
    name: 'Aïda Sarr',
    email: 'aida.sarr@example.com',
    phone: '+221 78 890 12 34',
    address: {
      street: '12 Avenue Lamine Guèye',
      city: 'Rufisque',
      postalCode: '18000',
      region: 'Dakar',
      country: 'Sénégal',
    },
    dateJoined: '2024-09-15',
    totalOrders: 7,
    totalSpent: 980000,
  },
  {
    id: 'CLT009',
    name: 'Mamadou Seck',
    email: 'mamadou.seck@example.com',
    phone: '+221 70 901 23 45',
    address: {
      street: '67 Rue Abdou Karim Bourgi',
      city: 'Mbour',
      postalCode: '23000',
      region: 'Thiès',
      country: 'Sénégal',
    },
    dateJoined: '2024-10-22',
    totalOrders: 3,
    totalSpent: 420000,
  },
  {
    id: 'CLT010',
    name: 'Sokhna Bâ',
    email: 'sokhna.ba@example.com',
    phone: '+221 75 012 34 56',
    address: {
      street: '23 Boulevard Martin Luther King',
      city: 'Dakar',
      postalCode: '11700',
      region: 'Dakar',
      country: 'Sénégal',
    },
    dateJoined: '2024-11-08',
    totalOrders: 5,
    totalSpent: 750000,
  },
];

const createOrderItems = (productIds: string[]): OrderItem[] => {
  return productIds.map((productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) throw new Error(`Product with ID ${productId} not found`);

    const quantity = Math.floor(Math.random() * 3) + 1;
    return {
      id: `ITEM-${Math.random().toString(36).substring(2, 10)}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      total: product.price * quantity,
    };
  });
};

// Commandes fictives
export const orders: Order[] = [
  {
    id: 'CMD001',
    customerId: 'CLT001',
    customer: customers.find((c) => c.id === 'CLT001')!,
    date: '2025-04-20',
    status: 'Livrée',
    paymentMethod: 'Carte bancaire',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD001', 'PRD005', 'PRD010']),
    subtotal: 229500,
    shipping: 5000,
    tax: 42000,
    total: 276500,
    trackingNumber: 'TRK-12345678',
  },
  {
    id: 'CMD002',
    customerId: 'CLT002',
    customer: customers.find((c) => c.id === 'CLT002')!,
    date: '2025-04-19',
    status: 'En cours',
    paymentMethod: 'Orange Money',
    shippingMethod: 'Livraison express',
    items: createOrderItems(['PRD002']),
    subtotal: 89500,
    shipping: 7500,
    tax: 17500,
    total: 114500,
    trackingNumber: 'TRK-23456789',
  },
  {
    id: 'CMD003',
    customerId: 'CLT003',
    customer: customers.find((c) => c.id === 'CLT003')!,
    date: '2025-04-18',
    status: 'En préparation',
    paymentMethod: 'Wave',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD003', 'PRD009']),
    subtotal: 854000,
    shipping: 5000,
    tax: 154000,
    total: 1013000,
  },
  {
    id: 'CMD004',
    customerId: 'CLT004',
    customer: customers.find((c) => c.id === 'CLT004')!,
    date: '2025-04-17',
    status: 'Livrée',
    paymentMethod: 'Paiement à la livraison',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD005']),
    subtotal: 45000,
    shipping: 5000,
    tax: 9000,
    total: 59000,
    trackingNumber: 'TRK-34567890',
  },
  {
    id: 'CMD005',
    customerId: 'CLT005',
    customer: customers.find((c) => c.id === 'CLT005')!,
    date: '2025-04-16',
    status: 'Annulée',
    paymentMethod: 'Carte bancaire',
    shippingMethod: 'Livraison express',
    items: createOrderItems(['PRD007', 'PRD010']),
    subtotal: 485000,
    shipping: 7500,
    tax: 88500,
    total: 581000,
    notes: 'Commande annulée par le client',
  },
  {
    id: 'CMD006',
    customerId: 'CLT006',
    customer: customers.find((c) => c.id === 'CLT006')!,
    date: '2025-04-15',
    status: 'Livrée',
    paymentMethod: 'Wave',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD006', 'PRD009']),
    subtotal: 405000,
    shipping: 5000,
    tax: 73800,
    total: 483800,
    trackingNumber: 'TRK-45678901',
  },
  {
    id: 'CMD007',
    customerId: 'CLT007',
    customer: customers.find((c) => c.id === 'CLT007')!,
    date: '2025-04-14',
    status: 'En cours',
    paymentMethod: 'Orange Money',
    shippingMethod: 'Livraison express',
    items: createOrderItems(['PRD008']),
    subtotal: 399000,
    shipping: 7500,
    tax: 73080,
    total: 479580,
    trackingNumber: 'TRK-56789012',
  },
  {
    id: 'CMD008',
    customerId: 'CLT008',
    customer: customers.find((c) => c.id === 'CLT008')!,
    date: '2025-04-13',
    status: 'Livrée',
    paymentMethod: 'Carte bancaire',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD001', 'PRD002', 'PRD010']),
    subtotal: 274000,
    shipping: 5000,
    tax: 50400,
    total: 329400,
    trackingNumber: 'TRK-67890123',
  },
  {
    id: 'CMD009',
    customerId: 'CLT009',
    customer: customers.find((c) => c.id === 'CLT009')!,
    date: '2025-04-12',
    status: 'En préparation',
    paymentMethod: 'Wave',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD003']),
    subtotal: 799000,
    shipping: 5000,
    tax: 144900,
    total: 948900,
  },
  {
    id: 'CMD010',
    customerId: 'CLT010',
    customer: customers.find((c) => c.id === 'CLT010')!,
    date: '2025-04-11',
    status: 'En attente',
    paymentMethod: 'Paiement à la livraison',
    shippingMethod: 'Livraison express',
    items: createOrderItems(['PRD005', 'PRD009']),
    subtotal: 100000,
    shipping: 7500,
    tax: 19350,
    total: 126850,
  },
  {
    id: 'CMD011',
    customerId: 'CLT001',
    customer: customers.find((c) => c.id === 'CLT001')!,
    date: '2025-04-10',
    status: 'Livrée',
    paymentMethod: 'Carte bancaire',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD007']),
    subtotal: 450000,
    shipping: 5000,
    tax: 81900,
    total: 536900,
    trackingNumber: 'TRK-78901234',
  },
  {
    id: 'CMD012',
    customerId: 'CLT002',
    customer: customers.find((c) => c.id === 'CLT002')!,
    date: '2025-04-09',
    status: 'Livrée',
    paymentMethod: 'Orange Money',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD006']),
    subtotal: 350000,
    shipping: 5000,
    tax: 63900,
    total: 418900,
    trackingNumber: 'TRK-89012345',
  },
  {
    id: 'CMD013',
    customerId: 'CLT003',
    customer: customers.find((c) => c.id === 'CLT003')!,
    date: '2025-04-08',
    status: 'Annulée',
    paymentMethod: 'Wave',
    shippingMethod: 'Livraison express',
    items: createOrderItems(['PRD008', 'PRD010']),
    subtotal: 434000,
    shipping: 7500,
    tax: 79470,
    total: 520970,
    notes: 'Produit plus disponible',
  },
  {
    id: 'CMD014',
    customerId: 'CLT004',
    customer: customers.find((c) => c.id === 'CLT004')!,
    date: '2025-04-07',
    status: 'Livrée',
    paymentMethod: 'Paiement à la livraison',
    shippingMethod: 'Livraison standard',
    items: createOrderItems(['PRD002', 'PRD009']),
    subtotal: 144500,
    shipping: 5000,
    tax: 26910,
    total: 176410,
    trackingNumber: 'TRK-90123456',
  },
  {
    id: 'CMD015',
    customerId: 'CLT005',
    customer: customers.find((c) => c.id === 'CLT005')!,
    date: '2025-04-06',
    status: 'En cours',
    paymentMethod: 'Carte bancaire',
    shippingMethod: 'Livraison express',
    items: createOrderItems(['PRD001', 'PRD005', 'PRD009']),
    subtotal: 249500,
    shipping: 7500,
    tax: 46260,
    total: 303260,
    trackingNumber: 'TRK-01234567',
  },
];

// Fonctions utilitaires pour manipuler les commandes
export const getOrderById = (id: string): Order | undefined => {
  return orders.find((order) => order.id === id);
};

export const getOrdersByCustomerId = (customerId: string): Order[] => {
  return orders.filter((order) => order.customerId === customerId);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return orders.filter((order) => order.status === status);
};

export const getRecentOrders = (limit: number = 5): Order[] => {
  return [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find((customer) => customer.id === id);
};

export const getTopCustomers = (limit: number = 5): Customer[] => {
  return [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, limit);
};
