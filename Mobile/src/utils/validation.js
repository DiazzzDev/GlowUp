export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = ({ email, password }) => {
  if (!email?.trim() || !password) {return 'Completa correo y contraseña.';}
  if (!EMAIL_PATTERN.test(email.trim())) {return 'Ingresa un correo electrónico válido.';}
  return null;
};

export const validateRegistration = ({ firstName, lastName, phone, email, password, age }) => {
  const loginError = validateLogin({ email, password });
  if (!firstName?.trim() || !lastName?.trim() || !phone?.trim()) {return 'Completa todos los campos obligatorios.';}
  if (loginError) {return loginError;}
  if (password.length < 8) {return 'La contraseña debe tener al menos 8 caracteres.';}
  if (!Number.isInteger(Number(age)) || Number(age) < 13 || Number(age) > 120) {return 'La edad debe estar entre 13 y 120 años.';}
  return null;
};

export const canAddQuantity = (item) => Number(item?.stock) > Number(item?.quantity || 0);
