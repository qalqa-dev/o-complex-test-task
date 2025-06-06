import { CardList } from '@/components/ui/CardList';
import { productsApi } from './api/products';
import styles from './page.module.css';

const products = await productsApi.getProducts();
console.log(products);
export default function Home() {
  return (
    <div className={styles.page}>
      <CardList items={products.items}></CardList>
    </div>
  );
}
