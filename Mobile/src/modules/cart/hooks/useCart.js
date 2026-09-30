import { useApp } from '../../../context/AppContext';

export const useCart = () => {
  const { cart: items, updateQuantity } = useApp();
  const increment = (id) => updateQuantity(id, 1);
  const decrement = (id) => updateQuantity(id, -1);

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
