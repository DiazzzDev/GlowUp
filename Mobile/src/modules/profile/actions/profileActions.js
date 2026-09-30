import { request } from '../../../utils/api';
export const updateProfileAction = (customerId, profile) => request(`/customer/${customerId}`, { method: 'PUT', body: JSON.stringify(profile) });
