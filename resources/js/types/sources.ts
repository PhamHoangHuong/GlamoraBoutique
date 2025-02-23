export interface Source {
    id: number;
    name: string;
    address: string;
    province_id: string;
    district_id: string;
    ward_id: string;
    active: boolean;
    province: string | null;
    district: string | null;
    ward: string | null;
}

export interface CreateSourceDTO {
    name: string;
    address: string;
    province_id: string;
    district_id: string;
    ward_id: string;
    active?: boolean;
}

export interface UpdateSourceDTO {
    name?: string;
    address?: string;
    province_id?: string;
    district_id?: string;
    ward_id?: string;
    active?: boolean;
} 