import { ProductEntity } from './ProductCard';

export type CartItem = Omit<ProductEntity, 'image_url' | 'description'> & {
  quantity: number;
};
