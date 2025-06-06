import { CardList } from '@/components/ui/CardList';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <CardList items={[]}></CardList>
    </div>
  );
}
