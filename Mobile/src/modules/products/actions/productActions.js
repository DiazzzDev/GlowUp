// Acciones para consultar catálogo de productos y detalles
import { request } from '../../../utils/api';

export const fetchProductsAction = async () => {
  return request('/products');
};

export const fetchProductByIdAction = async (productId) => {
  return request(`/products/${productId}`);
};
