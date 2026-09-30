import { describe, expect, it } from 'vitest';
import { canAddQuantity, validateLogin, validateRegistration } from './validation';

describe('validaciones críticas de compra y cuenta', () => {
  it('rechaza credenciales vacías o con correo inválido', () => {
    expect(validateLogin({ email: '', password: '' })).toBeTruthy();
    expect(validateLogin({ email: 'invalido', password: '12345678' })).toBeTruthy();
  });
  it('exige edad válida y contraseña segura durante el registro', () => {
    expect(validateRegistration({ firstName: 'Ana', lastName: 'López', phone: '70000000', email: 'ana@example.com', password: '12345678', age: 12 })).toBeTruthy();
    expect(validateRegistration({ firstName: 'Ana', lastName: 'López', phone: '70000000', email: 'ana@example.com', password: '12345678', age: 21 })).toBeNull();
  });
  it('no permite que el carrito supere el stock', () => {
    expect(canAddQuantity({ stock: 2, quantity: 1 })).toBe(true);
    expect(canAddQuantity({ stock: 2, quantity: 2 })).toBe(false);
  });
});
