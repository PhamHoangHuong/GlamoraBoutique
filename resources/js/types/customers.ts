export interface Customer {
    id: number;
    fullname: string | null;
    email: string;
    phone: string;
    address: string | null;
    status: number;
}

export interface CreateCustomerDTO {
    fullname?: string;
    email: string;
    phone: string;
    address?: string;
    password: string;
    password_confirmation: string;
    group_id: number;
}

export interface UpdateCustomerDTO {
    fullname?: string;
    email?: string;
    phone?: string;
    address?: string;
    password?: string;
    password_confirmation?: string;
    group_id?: number;
    status?: number;
} 