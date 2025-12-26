export interface SneakerItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite?: boolean;
  isAdded?: boolean;
}

export interface FavoriteItem {
  id: number;
  itemId: number;
  parentId: number;
  title: string;
  imageUrl: string;
  price: number;
}

export interface BasketItem {
  id: number;
  itemId: number;
  parentId: number;
  title: string;
  imageUrl: string;
  price: number;
}

export interface OrderData {
  recipient: string;
  city: string;
  phone: string;
  items: BasketItem[];
  totalPrice: number;
  taxPrice: number;
  createdAt?: string;
}

export type SortBy = 'title' | 'name' | 'price' | '-price';

export interface Filters {
  sortBy: SortBy;
  searchQuery: string;
}

export type PageType = 'home' | 'favorites' | 'orders';
