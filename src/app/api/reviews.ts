import { ReviewEntity } from '@/types/ReviewCard';
import { apiClient } from './client';

export const reviewsApi = {
  getReviews: async () => {
    return apiClient.get<Array<ReviewEntity>>(`reviews`);
  },
};
