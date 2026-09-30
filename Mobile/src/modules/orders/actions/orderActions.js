// Acciones para obtener órdenes e historial de compras
import { request } from '../../../utils/api';

export const fetchOrdersAction = async (customerId) => request(`/orders/customer/${customerId}`);
