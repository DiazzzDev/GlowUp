import { useState } from 'react';
import { INITIAL_CART } from '../../../constants/mockData';

export const useCart = () => {
  const [items, setItems] = useState(INITIAL_CART);

  const increment = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return {
    items,
    increment,
    decrement,
    subtotal,
  };
};

export default useCart;
