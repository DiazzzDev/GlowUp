import { useState } from 'react';
import { createOrderAction } from '../actions/checkoutActions';

export const useCheckout = (navigation) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'cash'
  const [address, setAddress] = useState('Colonia Escalón, San Salvador, El Salvador');

  const processPayment = async (total) => {
    setLoading(true);
    try {
      // Simula el procesamiento del pago con fecha y hora actual
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('OrderSuccess', {
          orderId: Math.floor(1000 + Math.random() * 9000).toString(),
          total: total || 49.99,
          date: '02/02/2026',
          time: '10:15 AM',
        });
      }, 700);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return {
    loading,
    paymentMethod,
    setPaymentMethod,
    address,
    setAddress,
    processPayment,
  };
};

export default useCheckout;
