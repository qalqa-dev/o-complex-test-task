import { InfiniteScroll } from '@/components/functional/InfiniteScroll/InfiniteScroll';
import { CardList } from '@/components/ui/CardList';
import { Cart } from '@/components/ui/Cart';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { ReviewEntity } from '@/types/ReviewCard';
import { productsApi } from './api/products';
import { reviewsApi } from './api/reviews';
import styles from './page.module.css';

const reviews = await reviewsApi.getReviews();
const initialData = await productsApi.getProducts({ page: 1 });

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>тестовое задание</h1>
      <CardList
        items={reviews}
        renderCard={(review: ReviewEntity) => (
          <ReviewCard {...review}></ReviewCard>
        )}
      />
      <Cart></Cart>
      <InfiniteScroll {...{ initialData }} />
    </div>
  );
}
