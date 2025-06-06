import { CardList } from '@/components/ui/CardList';
import { Cart } from '@/components/ui/Cart';
import { productsApi } from './api/products';
import styles from './page.module.css';

const products = await productsApi.getProducts();
console.log(products);
export default function Home() {
  return (
    <div className={styles.page}>
      <Cart></Cart>
      <CardList items={products.items}></CardList>
    </div>
  );
}
