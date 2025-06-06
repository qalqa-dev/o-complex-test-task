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
    <li className={styles.card}>
      <Image
        width={281}
        height={366}
        src={image_url || ''} //TODO: переделать
        alt={`${title} image`}
      />
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Цена: {price}₽</p>
      <ProductButton {...{ id, title, price }} />
    </li>
  );
};
