import api from './index';

export interface Region {
    id: number;
    name: string;
    name_en: string;
    code_name: string;
    code_name_en: string;
}

export interface Province {
    code: string;
    name: string;
    full_name: string;
    code_name: string;
}

export interface District {
    code: string;
    name: string;
    full_name: string;
    code_name: string;
    province_code: string;
}

export interface Ward {
    code: string;
    name: string;
    full_name: string;
    code_name: string;
    district_code: string;
}

export const locationService = {
    getRegions: () => 
        api.get<{data: Region[]}>('/v1/regions'),

    getProvinces: (regionId?: number) => 
        api.get<{data: Province[]}>(`/v1/provinces${regionId ? `/${regionId}` : ''}`),

    getDistricts: (provinceCode: string) => 
        api.get<{data: District[]}>(`/v1/districts/${provinceCode}`),

    getWards: (districtCode: string) => 
        api.get<{data: Ward[]}>(`/v1/wards/${districtCode}`)
}; 