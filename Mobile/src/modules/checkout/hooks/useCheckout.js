import { useState } from 'react';
import { createOrderAction } from '../actions/checkoutActions';
import { useApp } from '../../../context/AppContext';

export const useCheckout = (navigation) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'cash'
  const [address, setAddress] = useState('Colonia Escalón, San Salvador, El Salvador');
  const [error, setError] = useState(null);
  const { customer, clearCart } = useApp();

  const processPayment = async (items, total) => {
    if (!customer?.id || !items?.length) { setError('Inicia sesión y agrega productos antes de pagar.'); return false; }
    if (!address.trim()) { setError('Ingresa la dirección de entrega.'); return false; }
    setLoading(true);
    try {
      const response = await createOrderAction({ customerId: customer.id, products: items.map((item) => ({ productId: item.id, quantity: item.quantity })), status: 'Pending' });
      clearCart();
      navigation.replace('OrderSuccess', { orderId: response.order.orderNumber, total, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() });
      return true;
    } catch (error) {
      setError(error.message); return false;
    } finally { setLoading(false); }
  };

  return {
    loading,
    paymentMethod,
    setPaymentMethod,
    address,
    setAddress,
    processPayment,
    error,
  };
};

export default useCheckout;
