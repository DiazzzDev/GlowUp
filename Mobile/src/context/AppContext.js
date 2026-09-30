import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { canAddQuantity } from '../utils/validation';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    if (Number(product.stock) <= 0) return { ok: false, message: 'Este producto no tiene existencias.' };
    let result = { ok: true };
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        if (!canAddQuantity(existing)) { result = { ok: false, message: 'No puedes superar el inventario disponible.' }; return current; }
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
    return result;
  }, []);
  const updateQuantity = useCallback((id, delta) => {
    let result = { ok: true };
    setCart((current) => current.flatMap((item) => {
      if (item.id !== id) return [item];
      const quantity = item.quantity + delta;
      if (quantity <= 0) return [];
      if (quantity > Number(item.stock)) { result = { ok: false, message: 'No puedes superar el inventario disponible.' }; return [item]; }
      return [{ ...item, quantity }];
    }));
    return result;
  }, []);
  const value = useMemo(() => ({ customer, setCustomer, cart, addToCart, updateQuantity, clearCart: () => setCart([]) }), [customer, cart, addToCart, updateQuantity]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp debe usarse dentro de AppProvider');
  return context;
};
