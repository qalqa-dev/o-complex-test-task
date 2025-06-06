import { ProductCard } from '@/components/ui/ProductCard';
import { ProductEntity } from '@/types/components/ProductCard';
import styles from './CardList.module.css';

export const CardList = ({ items }: { items: Array<ProductEntity> }) => {
  const isEmpty = !items || items.length === 0;

  return (
    <>
      {!isEmpty ? (
        <ul className={styles.list}>
          {items.map((item: ProductEntity) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Ничего не найдено</p>
      )}
    </>
  );
};
