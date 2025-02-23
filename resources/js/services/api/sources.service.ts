import api from './index';
import type { Source, CreateSourceDTO, UpdateSourceDTO } from '@/types/sources';

interface SourcesResponse {
    data: Source[];
}

export const sourcesService = {
    getAllSources: () => 
        api.get<SourcesResponse>('/v1/sources'),

    getSource: (id: number) =>
        api.get<{data: Source}>(`/v1/sources/${id}`),

    createSource: (data: CreateSourceDTO) =>
        api.post<{data: Source}>('/v1/sources', data),

    updateSource: (id: number, data: UpdateSourceDTO) =>
        api.put<{data: Source}>(`/v1/sources/${id}`, data),

    deleteSource: (id: number) =>
        api.delete(`/v1/sources/${id}`)
}; 