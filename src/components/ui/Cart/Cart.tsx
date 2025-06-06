'use client';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import styles from './Cart.module.css';

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={styles.cart}>
      <h2>Добавленные товары</h2>
      {cartItems ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <span>{item.title}</span>
              <span>x{item.quantity}</span>
              <span>{item.price}₽</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
};
