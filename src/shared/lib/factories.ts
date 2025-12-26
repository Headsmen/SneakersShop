import type { SneakerItem, BasketItem, FavoriteItem } from '@/shared/types';

// Фабрика для создания объектов товаров
export const createSneakerItem = (data: Partial<SneakerItem> & Pick<SneakerItem, 'id' | 'title' | 'price' | 'imageUrl'>): SneakerItem => {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    imageUrl: data.imageUrl,
    isFavorite: data.isFavorite ?? false,
    isAdded: data.isAdded ?? false,
  };
};

// Фабрика для создания товара корзины
export const createBasketItemFromSneaker = (sneaker: SneakerItem): Omit<BasketItem, 'id'> => {
  return {
    itemId: sneaker.id,
    parentId: sneaker.id,
    title: sneaker.title,
    imageUrl: sneaker.imageUrl,
    price: sneaker.price,
  };
};

// Фабрика для создания избранного товара
export const createFavoriteItemFromSneaker = (sneaker: SneakerItem): Omit<FavoriteItem, 'id'> => {
  return {
    itemId: sneaker.id,
    parentId: sneaker.id,
    title: sneaker.title,
    imageUrl: sneaker.imageUrl,
    price: sneaker.price,
  };
};

// Фабрика для преобразования FavoriteItem в SneakerItem
export const createSneakerFromFavorite = (favorite: FavoriteItem, isAdded: boolean = false): SneakerItem => {
  return createSneakerItem({
    id: favorite.itemId,
    title: favorite.title,
    price: favorite.price,
    imageUrl: favorite.imageUrl,
    isFavorite: true,
    isAdded,
  });
};

// Фабрика для создания пустого состояния
export const createEmptyState = <T>(): T[] => {
  return [];
};

// Фабрика для создания начального состояния загрузки
export const createLoadingState = () => {
  return {
    isLoading: false,
    error: null as string | null,
  };
};
