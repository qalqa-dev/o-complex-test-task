'use client';
import { RootState } from '@/lib/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Cart.module.css';

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [rawPhone, setRawPhone] = useState('');

  const formatPhone = (value: string) => {
    const x = value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';
    if (x.length > 0) formatted += `(${x.slice(0, 3)}`;
    if (x.length > 3) formatted += `) `;
    if (x.length >= 4) formatted += x.slice(3, 6);
    if (x.length > 6) formatted += `-${x.slice(6, 8)}`;
    if (x.length > 8) formatted += `-${x.slice(8, 10)}`;
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    setRawPhone(digits);
  };

  return (
    <div className={styles.cart}>
      <h2>Добавленные товары</h2>
      {cartItems.length !== 0 ? (
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
      <form action="" className={styles.orderForm}>
        <div className={styles.phoneWrapper}>
          <span className={styles.prefix}>+7</span>
          <input
            type="tel"
            inputMode="numeric"
            value={formatPhone(rawPhone)}
            onChange={handleChange}
            className={styles.phoneInput}
            placeholder="(___) ___-__-__"
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && rawPhone.length === 0) {
                setRawPhone('');
              }
            }}
          />
        </div>
        <button
          disabled={!cartItems.length}
          type="submit"
          className={styles.button}
        >
          Заказать
        </button>
      </form>
    </div>
  );
};
