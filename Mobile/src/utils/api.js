// For Android emulator use http://10.0.2.2:4000; a physical device needs your computer LAN IP.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

export const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {throw new Error(payload.message || 'No fue posible completar la solicitud.');}
  return payload;
};
