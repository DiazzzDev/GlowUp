import { request } from '../../../utils/api';
export const fetchReviewsAction = (productId) => request(`/reviews/product/${productId}`);
export const saveReviewAction = (review) => request('/reviews', { method: 'POST', body: JSON.stringify(review) });
