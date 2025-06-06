'use client';
import { RootState } from '@/lib/store';
import {
  addToCart,
  getCartItemCount,
  updateCartItem,
} from '@/lib/store/cartSlice';
import { ProductEntity } from '@/types/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductButton.module.css';

type ProductButtonProps = ProductEntity;

export const ProductButton = ({ id, title, price }: ProductButtonProps) => {
  const dispatch = useDispatch();

  const cartState = useSelector((state: RootState) => state.cart);
  const addedAmount = getCartItemCount(cartState, id);

  const handleAdd = () => {
    dispatch(addToCart({ id, title, price, quantity: addedAmount + 1 }));
  };

  const handleRemove = () => {
    dispatch(updateCartItem({ id, title, price, quantity: addedAmount - 1 }));
  };

  const handleChange = (amount: number) => {
    dispatch(updateCartItem({ id, title, price, quantity: amount }));
  };

  return (
    <>
      {!addedAmount ? (
        <button className={styles.button} onClick={handleAdd}>
          Купить
        </button>
      ) : (
        <div className={styles.counter}>
          <button className={styles.button} onClick={handleRemove}>
            -
          </button>
          <div className={styles.amount}>
            <input
              value={addedAmount}
              type="number"
              min="1"
              onChange={(e) => handleChange(Number(e.target.value))}
            />
          </div>
          <button className={styles.button} onClick={handleAdd}>
            +
          </button>
        </div>
      )}
    </>
  );
};
