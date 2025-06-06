import { ProductEntity } from '@/types/ProductCard';
import Image from 'next/image';
import { ProductButton } from '../ProductButton';
import styles from './ProductCard.module.css';

export const ProductCard = ({
  id,
  title,
  description,
  image_url,
  price,
}: ProductEntity) => {
  return (
    <div className={styles.card}>
      <Image
        width={281}
        height={366}
        src={image_url || ''}
        alt={`${title} image`}
      />
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Цена: {price}₽</p>
      <ProductButton {...{ id, title, price }} />
    </div>
  );
};
