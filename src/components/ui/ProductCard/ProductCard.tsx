import { ProductEntity } from '@/types/components/ProductCard';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export const ProductCard = ({
  title,
  description,
  image_url,
  price,
}: ProductEntity) => {
  return (
    <li className={styles.card}>
      {image_url && (
        <Image
          width={281}
          height={366}
          src={image_url} // спорный момент т.к ссылка не проверяется и может залететь xss, надо написать прокси
          alt={`${title} image`}
        ></Image>
      )}
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Цена: {price}₽</p>
      <button className={styles.button}>Купить</button>
    </li>
  );
};
