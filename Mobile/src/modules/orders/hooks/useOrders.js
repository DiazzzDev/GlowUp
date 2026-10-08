import { useEffect, useState } from 'react';
import { fetchOrdersAction } from '../actions/orderActions';
import { useApp } from '../../../context/AppContext';

export const useOrders = () => {
  const { customer } = useApp();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Todos'); // 'Todos' | 'En camino' | 'Entregados'

  useEffect(() => {
    if (!customer?.id) {return;}
    fetchOrdersAction(customer.id).then((response) => setOrders(response.map((order) => ({
      ...order, id: order._id, date: new Date(order.orderDate).toLocaleDateString(),
      status: order.status === 'Completed' ? 'Entregado' : order.status === 'Pending' ? 'En camino' : 'Cancelado',
      totalItems: order.products.reduce((sum, item) => sum + item.quantity, 0), totalPrice: order.total,
      itemsPreview: order.products.map((item) => item.productId?.image).filter(Boolean), remainingCount: 0,
    })))).catch(() => setOrders([]));
  }, [customer?.id]);
  const filteredOrders = orders.filter((order) => {
    if (filter === 'Todos') {return true;}
    if (filter === 'En camino') {return order.status === 'En camino';}
    if (filter === 'Entregados') {return order.status === 'Entregado';}
    return true;
  });

  return {
    orders: filteredOrders,
    filter,
    setFilter,
  };
};

export default useOrders;
