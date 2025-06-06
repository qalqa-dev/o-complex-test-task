import { CardProps } from '@/types/components/Card';
import { Card } from '@components/ui/Card';
import styles from './CardList.module.css';

export const CardList = ({ items }: { items: Array<CardProps> }) => {
  const isEmpty = !items || items.length === 0;

  return (
    <>
      {!isEmpty ? (
        <ul className={styles.list}>
          {items.map((item: CardProps) => (
            <Card key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Ничего не найдено</p>
      )}
    </>
  );
};
