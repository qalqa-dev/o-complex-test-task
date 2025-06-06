'use client';
import { orderApi } from '@/app/api/order';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Cart.module.css';

export const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [rawPhone, setRawPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [itemsError, setItemsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const savedPhone = localStorage.getItem('phoneNumber');
    if (savedPhone) {
      setRawPhone(savedPhone);
    }
  }, []);

  useEffect(() => {
    if (rawPhone) {
      localStorage.setItem('phoneNumber', rawPhone);
    }
  }, [rawPhone]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

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
    const inputValue = e.target.value;
    const digits = inputValue.replace(/\D/g, '');

    if (digits.length <= 10) {
      setRawPhone(digits);
      if (phoneError) setPhoneError(false);
      if (isSuccess) setIsSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (cartItems.length === 0) {
      setItemsError(true);
      isValid = false;
    } else {
      setItemsError(false);
    }

    if (rawPhone.length !== 10) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      await orderApi.postOrder({
        phone: `7${rawPhone}`,
        cart: cartItems.map(({ id, quantity }) => ({ id, quantity })),
      });
      setIsSuccess(true);
      setRawPhone('');
      localStorage.removeItem('phoneNumber');
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      setPhoneError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.cart}>
      <h2>Добавленные товары</h2>
      {!isClient ? (
        <p>Загрузка...</p>
      ) : cartItems && cartItems.length !== 0 ? (
        <ul className={itemsError ? styles.itemsError : ''}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <span>{item.title}</span>
              <span>x{item.quantity}</span>
              <span>{item.price}₽</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={itemsError ? styles.errorText : ''}>Корзина пуста</p>
      )}
      <form onSubmit={handleSubmit} className={styles.orderForm}>
        <div
          className={`${styles.phoneWrapper} ${phoneError ? styles.error : ''}`}
        >
          <span className={styles.prefix}>+7</span>
          <input
            type="tel"
            inputMode="numeric"
            value={formatPhone(rawPhone)}
            onChange={handleChange}
            className={`${styles.phoneInput} ${
              phoneError ? styles.errorInput : ''
            }`}
            placeholder="(___) ___-__-__"
            maxLength={16}
          />
        </div>
        {isClient && (
          <button
            disabled={!cartItems.length || isLoading}
            type="submit"
            className={styles.button}
          >
            {isLoading ? 'Отправка...' : 'Заказать'}
          </button>
        )}
      </form>
      {phoneError && (
        <span className={styles.errorMessage}>
          Введите корректный номер телефона (10 цифр)
        </span>
      )}

      {isSuccess && (
        <div className={styles.successPopup}>
          <div className={styles.successContent}>
            <svg className={styles.successIcon} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
              />
            </svg>
            <p>Заказ успешно оформлен!</p>
          </div>
        </div>
      )}
    </div>
  );
};
