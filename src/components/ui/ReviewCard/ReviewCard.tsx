'use client';
import { ReviewEntity } from '@/types/ReviewCard';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import styles from './ReviewCard.module.css';

export const ReviewCard = ({ id, text }: ReviewEntity) => {
  const [cleanHTML, setCleanHTML] = useState('');

  useEffect(() => {
    setCleanHTML(DOMPurify.sanitize(text || ''));
  }, [text]);

  return (
    <div className={styles.card}>
      <h3>Отзыв {id}</h3>
      {cleanHTML ? parse(cleanHTML) : null}
    </div>
  );
};
