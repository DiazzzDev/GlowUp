// Acciones de pago y creación de orden
import { request } from '../../../utils/api';

export const createOrderAction = async (orderPayload) => {
  return request('/orders', { method: 'POST', body: JSON.stringify(orderPayload) });
};
