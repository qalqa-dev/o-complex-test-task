import styles from './CardList.module.css';

type CardListProps<T> = {
  items: Array<T>;
  renderCard: (item: T) => React.ReactNode;
  emptyMessage?: string;
};

export const CardList = <T,>({
  items,
  renderCard,
  emptyMessage = 'Ничего не найдено',
}: CardListProps<T>) => {
  const isEmpty = !items || items.length === 0;

  return (
    <>
      {!isEmpty ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={(item as unknown as { id: number }).id}>
              {renderCard(item)}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{emptyMessage}</p>
      )}
    </>
  );
};
