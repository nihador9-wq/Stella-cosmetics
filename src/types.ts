export type ProductCategory =
  | 'Coffrets'
  | 'Skin Care'
  | 'Maquillage'
  | 'Parfums & Brumes'
  | 'Location Box';

export type ProductBadge = 'En stock' | 'Nouveau' | 'Location';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceDzd: number;
  badge: ProductBadge;
  imageUrl: string;
  imagePosition?: string;
  imageObjectPosition?: string;
  imageScale?: number;
  description: string;
  volume?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMode = 'domicile' | 'stop_desk' | 'retrait';

export type OrderStatus =
  | 'En attente'
  | 'Confirmée'
  | 'En livraison'
  | 'Livrée'
  | 'Annulée';

export interface OrderItemSummary {
  productId: string;
  name: string;
  priceDzd: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  wilayaCode: string;
  wilayaName: string;
  communeAddress: string;
  deliveryMode: DeliveryMode;
  shippingFeeDzd: number;
  subtotalDzd: number;
  totalDzd: number;
  paymentMethod: 'Paiement à la livraison';
  status: OrderStatus;
  items: OrderItemSummary[];
}
