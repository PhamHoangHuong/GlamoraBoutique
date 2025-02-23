import api from './index';
import type { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '@/types/customers';

interface CustomersResponse {
    data: Customer[];
}

export const customersService = {
    getAllCustomers: () => 
        api.get<CustomersResponse>('/v1/customers'),

    getCustomer: (id: number) =>
        api.get<Customer>(`/v1/customers/${id}`),

    createCustomer: (data: CreateCustomerDTO) =>
        api.post<Customer>('/v1/customers', data),

    updateCustomer: (id: number, data: UpdateCustomerDTO) =>
        api.put<Customer>(`/v1/customers/${id}`, data),

    deleteCustomer: (id: number) =>
        api.delete(`/v1/customers/${id}`),
        
    switchStatus: (id: number) =>
        api.put(`/v1/customers/${id}/active`)
}; 