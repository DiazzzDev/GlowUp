import { useState } from 'react';
import { INITIAL_ORDERS } from '../../../constants/mockData';

export const useOrders = () => {
  const [orders] = useState(INITIAL_ORDERS);
  const [filter, setFilter] = useState('Todos'); // 'Todos' | 'En camino' | 'Entregados'

  const filteredOrders = orders.filter((order) => {
    if (filter === 'Todos') return true;
    if (filter === 'En camino') return order.status === 'En camino';
    if (filter === 'Entregados') return order.status === 'Entregado';
    return true;
  });

  return {
    orders: filteredOrders,
    filter,
    setFilter,
  };
};

export default useOrders;
