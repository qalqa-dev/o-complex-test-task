import { CardProps } from '@/types/components/Card';
import Image from 'next/image';
import styles from './Card.module.css';

export const Card = ({
  id,
  title,
  description,
  imageUrl,
  price,
}: CardProps) => {
  return (
    <li className={styles.card}>
      <Image
        width={281}
        height={366}
        src={`/${imageUrl}`}
        alt={`${title} image`}
      ></Image>
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Цена: {price}₽</p>
      <button className={styles.button}>Купить</button>
    </li>
  );
};
