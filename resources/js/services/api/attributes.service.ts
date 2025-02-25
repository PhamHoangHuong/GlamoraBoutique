import api from './index';
import type { 
    Attribute, 
    AttributeValue,
    CreateAttributeDTO,
    UpdateAttributeDTO,
    CreateAttributeValueDTO,
    UpdateAttributeValueDTO,
    AttributesResponse,
    AttributeValuesResponse
} from '@/types/attributes';

export const attributesService = {
    // Attributes
    getAllAttributes: (page: number = 1, perPage: number = 20) => 
        api.get<AttributesResponse>(`/v1/attributes?page=${page}&per_page=${perPage}`),

    getAttribute: (id: number) =>
        api.get<Attribute>(`/v1/attributes/${id}`),

    createAttribute: (data: CreateAttributeDTO) =>
        api.post<Attribute>('/v1/attributes', data),

    updateAttribute: (id: number, data: UpdateAttributeDTO) =>
        api.put<Attribute>(`/v1/attributes/${id}`, data),

    deleteAttribute: (id: number) =>
        api.delete(`/v1/attributes/${id}`),

    // Attribute Values
    getAllAttributeValues: (page: number = 1, perPage: number = 20) => 
        api.get<AttributeValuesResponse>(`/v1/attribute-values?page=${page}&per_page=${perPage}`),

    getAttributeValue: (id: number) =>
        api.get<{data: AttributeValue}>(`/v1/attribute-values/${id}`),

    createAttributeValue: (data: CreateAttributeValueDTO) =>
        api.post<{data: AttributeValue}>('/v1/attribute-values', data),

    updateAttributeValue: (id: number, data: UpdateAttributeValueDTO) =>
        api.put<{data: AttributeValue}>(`/v1/attribute-values/${id}`, data),

    deleteAttributeValue: (id: number) =>
        api.delete(`/v1/attribute-values/${id}`)
}; 