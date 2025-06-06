'use client';
import { CardList } from '@/components/ui/CardList';
import { ProductCard } from '@/components/ui/ProductCard';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchProducts } from '@/lib/store/productsSlice';
import { ProductEntity } from '@/types/ProductCard';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  initialData: {
    items: ProductEntity[];
    page: number;
    amount: number;
    total: number;
  };
};

export const InfiniteScroll = ({ initialData }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, page, hasMore, isLoading } = useSelector(
    (state: RootState) => state.products,
  );
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({
      type: 'products/initialize',
      payload: {
        items: initialData.items,
        page: initialData.page,
        total: initialData.total,
        amount: initialData.amount,
        hasMore: initialData.items.length < initialData.total,
      },
    });
  }, [dispatch, initialData]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchProducts(page + 1));
        }
      },
      { threshold: 1.0 },
    );

    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => observer.disconnect();
  }, [page, hasMore, isLoading, dispatch]);

  return (
    <>
      <CardList
        items={items}
        renderCard={(product: ProductEntity) => <ProductCard {...product} />}
      />
      <div ref={loadingRef} style={{ height: '20px' }}>
        {isLoading && <p>Загрузка...</p>}
      </div>
      {!hasMore && items.length > 0 && <p>Товары закончились</p>}
    </>
  );
};
