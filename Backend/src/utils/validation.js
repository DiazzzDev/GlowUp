export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

export const validateCustomer = ({ firstName, lastName, phone, email, password }) => {
    if (![firstName, lastName, phone, email, password].every((value) => String(value || "").trim())) {
        return "Todos los campos obligatorios deben completarse";
    }
    if (!EMAIL_PATTERN.test(email.trim())) return "El correo electrónico no es válido";
    if (String(password).length < 8) return "La contraseña debe tener al menos 8 caracteres";
    return null;
};

export const validateOrderProducts = (products) => {
    if (!Array.isArray(products) || products.length === 0) return "Debe agregar al menos un producto";
    if (products.some(({ productId, quantity }) => !productId || !isPositiveInteger(quantity))) {
        return "Cada producto debe tener una cantidad entera mayor que cero";
    }
    return null;
};
