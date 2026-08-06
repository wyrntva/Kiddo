import axiosClient from './axiosClient';
import type { AxiosResponse } from 'axios';

export interface Zone {
    id: string;
    name: string;
    desc: string;
    color: string;
    img: string;
    key: string;
    lockStatus?: 'UNLOCKED' | 'PAID' | 'DEV';
    lessons?: any[];
}

export const zoneAPI = {
    getZones: (): Promise<AxiosResponse<{ data: Zone[] }>> => {
        return axiosClient.get('/api/zones');
    },
    createZone: (data: Partial<Zone>): Promise<AxiosResponse<Zone>> => {
        return axiosClient.post('/api/zones', data);
    },
    updateZone: (id: string, data: Partial<Zone>): Promise<AxiosResponse<Zone>> => {
        return axiosClient.patch(`/api/zones/${id}`, data);
    },
    deleteZone: (id: string): Promise<AxiosResponse<void>> => {
        return axiosClient.delete(`/api/zones/${id}`);
    },
    uploadImage: (file: File): Promise<AxiosResponse<{ url: string }>> => {
        const formData = new FormData();
        formData.append('file', file);
        return axiosClient.post('/api/zones/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
