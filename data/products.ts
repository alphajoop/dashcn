import {
  LucideIcon,
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Speaker,
  Camera,
  Tv,
  Gamepad,
  Keyboard,
} from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: 'En stock' | 'Rupture de stock' | 'Sur commande';
  images: string[];
  specifications?: { name: string; value: string }[];
  sales?: {
    total: number;
    lastMonth: number;
  };
  featured?: boolean;
  discount?: number;
  rating?: number;
  dateAdded: string;
}

export const productCategories = [
  'Smartphones',
  'Ordinateurs',
  'Audio',
  'Accessoires',
  'TV & Vidéo',
  'Gaming',
  'Photo',
];

export const products: Product[] = [
  {
    id: 'PRD001',
    name: 'Smartphone Tecno Camon 20',
    description:
      'Un smartphone puissant avec un excellent rapport qualité-prix, idéal pour la photographie et les jeux mobiles.',
    category: 'Smartphones',
    price: 149500,
    stock: 45,
    sku: 'TCN-CM20-BLK',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+1'],
    specifications: [
      { name: 'Marque', value: 'Tecno' },
      { name: 'Modèle', value: 'Camon 20' },
      { name: 'Couleur', value: 'Noir' },
      { name: 'Stockage', value: '128 Go' },
      { name: 'RAM', value: '8 Go' },
      { name: 'Écran', value: '6.67 pouces' },
    ],
    sales: {
      total: 320,
      lastMonth: 42,
    },
    featured: true,
    rating: 4.7,
    dateAdded: '2025-03-15',
  },
  {
    id: 'PRD002',
    name: 'Casque audio sans fil Dashcn Pro',
    description:
      "Casque audio sans fil avec réduction de bruit active, idéal pour les appels et l'écoute de musique en déplacement.",
    category: 'Audio',
    price: 89500,
    stock: 28,
    sku: 'NJY-HP-BLK',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+2'],
    specifications: [
      { name: 'Marque', value: 'Dashcn' },
      { name: 'Modèle', value: 'Pro' },
      { name: 'Couleur', value: 'Noir' },
      { name: 'Autonomie', value: '30 heures' },
      { name: 'Connectivité', value: 'Bluetooth 5.2' },
      { name: 'Réduction de bruit', value: 'Active' },
    ],
    sales: {
      total: 185,
      lastMonth: 23,
    },
    rating: 4.5,
    dateAdded: '2025-02-20',
  },
  {
    id: 'PRD003',
    name: 'Ordinateur portable Dakar Tech Pro',
    description:
      'Ordinateur portable performant pour les professionnels et les créateurs de contenu, avec un écran haute résolution.',
    category: 'Ordinateurs',
    price: 799000,
    stock: 12,
    sku: 'DKR-LP-PRO',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+3'],
    specifications: [
      { name: 'Marque', value: 'Dakar Tech' },
      { name: 'Modèle', value: 'Pro' },
      { name: 'Processeur', value: 'Intel Core i7' },
      { name: 'RAM', value: '16 Go' },
      { name: 'Stockage', value: '512 Go SSD' },
      { name: 'Écran', value: '15.6 pouces' },
      { name: "Système d'exploitation", value: 'Windows 11' },
    ],
    sales: {
      total: 78,
      lastMonth: 8,
    },
    featured: true,
    rating: 4.8,
    dateAdded: '2025-01-10',
  },
  {
    id: 'PRD004',
    name: 'Montre connectée Gorée Smart',
    description:
      "Montre connectée avec suivi d'activité, mesure de la fréquence cardiaque et notifications smartphone.",
    category: 'Accessoires',
    price: 65000,
    stock: 0,
    sku: 'GRE-SW-BLK',
    status: 'Rupture de stock',
    images: ['https://placehold.co/400x300.png?text=Produit+4'],
    specifications: [
      { name: 'Marque', value: 'Gorée' },
      { name: 'Modèle', value: 'Smart' },
      { name: 'Couleur', value: 'Noir' },
      { name: 'Autonomie', value: '7 jours' },
      { name: 'Étanchéité', value: 'IP68' },
      { name: 'Compatibilité', value: 'Android/iOS' },
    ],
    sales: {
      total: 210,
      lastMonth: 0,
    },
    discount: 15,
    rating: 4.2,
    dateAdded: '2025-02-05',
  },
  {
    id: 'PRD005',
    name: 'Enceinte Bluetooth Saloum Sound',
    description:
      'Enceinte Bluetooth portable avec son stéréo puissant et autonomie de 12 heures.',
    category: 'Audio',
    price: 45000,
    stock: 32,
    sku: 'SLM-SPK-BLU',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+5'],
    specifications: [
      { name: 'Marque', value: 'Saloum' },
      { name: 'Modèle', value: 'Sound' },
      { name: 'Couleur', value: 'Bleu' },
      { name: 'Puissance', value: '30W' },
      { name: 'Autonomie', value: '12 heures' },
      { name: 'Étanchéité', value: 'IPX7' },
    ],
    sales: {
      total: 156,
      lastMonth: 18,
    },
    rating: 4.4,
    dateAdded: '2025-03-01',
  },
  {
    id: 'PRD006',
    name: 'Appareil photo Casamance Pro',
    description:
      'Appareil photo numérique avec capteur haute résolution et enregistrement vidéo 4K.',
    category: 'Photo',
    price: 350000,
    stock: 8,
    sku: 'CSM-CAM-PRO',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+6'],
    specifications: [
      { name: 'Marque', value: 'Casamance' },
      { name: 'Modèle', value: 'Pro' },
      { name: 'Résolution', value: '24 MP' },
      { name: 'Vidéo', value: '4K 60fps' },
      { name: 'Zoom optique', value: '10x' },
      { name: 'Stabilisation', value: 'Optique' },
    ],
    sales: {
      total: 42,
      lastMonth: 5,
    },
    featured: true,
    rating: 4.9,
    dateAdded: '2025-01-25',
  },
  {
    id: 'PRD007',
    name: 'Smart TV Teranga Vision 55"',
    description:
      "Téléviseur intelligent 4K avec système d'exploitation Android TV et son Dolby Atmos.",
    category: 'TV & Vidéo',
    price: 450000,
    stock: 5,
    sku: 'TRG-TV-55',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+7'],
    specifications: [
      { name: 'Marque', value: 'Teranga' },
      { name: 'Modèle', value: 'Vision' },
      { name: 'Taille', value: '55 pouces' },
      { name: 'Résolution', value: '4K UHD' },
      { name: 'Smart TV', value: 'Android TV' },
      { name: 'Son', value: 'Dolby Atmos' },
    ],
    sales: {
      total: 35,
      lastMonth: 7,
    },
    discount: 10,
    rating: 4.6,
    dateAdded: '2025-02-15',
  },
  {
    id: 'PRD008',
    name: 'Console de jeu Baobab Gaming',
    description:
      'Console de jeu nouvelle génération avec manette sans fil et disque dur de 1 To.',
    category: 'Gaming',
    price: 399000,
    stock: 3,
    sku: 'BOB-GC-1TB',
    status: 'Sur commande',
    images: ['https://placehold.co/400x300.png?text=Produit+8'],
    specifications: [
      { name: 'Marque', value: 'Baobab' },
      { name: 'Modèle', value: 'Gaming' },
      { name: 'Stockage', value: '1 To' },
      { name: 'Résolution', value: '4K' },
      { name: 'Manettes incluses', value: '1' },
      { name: 'Connectivité', value: 'Wi-Fi 6, Bluetooth 5.1' },
    ],
    sales: {
      total: 28,
      lastMonth: 3,
    },
    featured: true,
    rating: 4.7,
    dateAdded: '2025-03-10',
  },
  {
    id: 'PRD009',
    name: 'Clavier mécanique Touba Type',
    description:
      'Clavier mécanique rétroéclairé avec switches bleus et disposition AZERTY.',
    category: 'Accessoires',
    price: 55000,
    stock: 15,
    sku: 'TBA-KB-AZ',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+9'],
    specifications: [
      { name: 'Marque', value: 'Touba' },
      { name: 'Modèle', value: 'Type' },
      { name: 'Type', value: 'Mécanique' },
      { name: 'Switches', value: 'Bleus' },
      { name: 'Disposition', value: 'AZERTY' },
      { name: 'Rétroéclairage', value: 'RGB' },
    ],
    sales: {
      total: 62,
      lastMonth: 9,
    },
    rating: 4.3,
    dateAdded: '2025-01-30',
  },
  {
    id: 'PRD010',
    name: 'Écouteurs sans fil Niokolo Buds',
    description:
      "Écouteurs sans fil avec réduction de bruit et résistance à l'eau, parfaits pour le sport.",
    category: 'Audio',
    price: 35000,
    stock: 25,
    sku: 'NKL-BUD-WHT',
    status: 'En stock',
    images: ['https://placehold.co/400x300.png?text=Produit+10'],
    specifications: [
      { name: 'Marque', value: 'Niokolo' },
      { name: 'Modèle', value: 'Buds' },
      { name: 'Couleur', value: 'Blanc' },
      { name: 'Autonomie', value: '6 heures (24h avec boîtier)' },
      { name: 'Étanchéité', value: 'IPX5' },
      { name: 'Réduction de bruit', value: 'Passive' },
    ],
    sales: {
      total: 198,
      lastMonth: 32,
    },
    discount: 20,
    rating: 4.5,
    dateAdded: '2025-03-05',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsOnSale = (): Product[] => {
  return products.filter((product) => product.discount && product.discount > 0);
};

export const getProductIcon = (category: string): LucideIcon => {
  switch (category) {
    case 'Smartphones':
      return Smartphone;
    case 'Audio':
      return Headphones;
    case 'Ordinateurs':
      return Laptop;
    case 'Accessoires':
      return Watch;
    case 'TV & Vidéo':
      return Tv;
    case 'Gaming':
      return Gamepad;
    case 'Photo':
      return Camera;
    default:
      return Smartphone;
  }
};
