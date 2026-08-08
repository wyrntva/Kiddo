import axiosClient from './axiosClient.ts';
import type { AxiosResponse } from 'axios';
import type { PoolArenaUser } from '../types/api';

interface PoolArenaUserQueryParams {
    skip?: number;
    limit?: number;
    search?: string;
    rank?: string;
    gender?: string;
    is_pending_paid?: boolean;
}

interface PoolArenaUserListResponse {
    data: PoolArenaUser[];
    total: number;
    meta: { total: number; skip: number; limit: number };
}

interface PoolArenaUserUpdateData {
    full_name?: string;
    gender?: string | null;
    address?: string | null;
    rank?: string | null;
    phone_number?: string;
    email?: string | null;
    avatar_url?: string | null;
    role?: string;
    is_active?: boolean;
    points?: number;
    parent_name?: string | null;
    is_paid?: boolean;
    is_pending_paid?: boolean;
    paid_until?: string | null;
    subscription_plan_id?: string | null;
    pending_plan_id?: string | null;
    tiktok_url?: string | null;
    facebook_url?: string | null;
    instagram_url?: string | null;
}

export interface PoolArenaTransaction {
    id: string;
    plan_id: string | null;
    plan_name: string | null;
    price: number | null;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    created_at: string;
    updated_at: string;
    user: PoolArenaUser;
}

export const poolArenaUserAPI = {
    getUsers: (params?: PoolArenaUserQueryParams): Promise<AxiosResponse<PoolArenaUserListResponse>> => {
        return axiosClient.get('/api/pool-arena/users', { params });
    },

    updateUser: (id: string | number, data: PoolArenaUserUpdateData): Promise<AxiosResponse<PoolArenaUser>> => {
        return axiosClient.patch(`/api/pool-arena/users/${id}`, data);
    },

    deleteUser: (id: number): Promise<AxiosResponse<void>> => {
        return axiosClient.delete(`/api/pool-arena/users/${id}`);
    },

    uploadAvatar: (id: number, file: File): Promise<AxiosResponse<{ avatar_url: string }>> => {
        const formData = new FormData();
        formData.append('file', file);
        return axiosClient.post(`/api/pool-arena/users/${id}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteAvatar: (id: number): Promise<AxiosResponse<void>> => {
        return axiosClient.delete(`/api/pool-arena/users/${id}/avatar`);
    },

    getTransactions: (): Promise<AxiosResponse<PoolArenaTransaction[]>> => {
        return axiosClient.get('/api/pool-arena/transactions');
    },

    approveTransaction: (id: string): Promise<AxiosResponse<{ message: string; transaction: PoolArenaTransaction }>> => {
        return axiosClient.post(`/api/pool-arena/transactions/${id}/approve`);
    },

    rejectTransaction: (id: string): Promise<AxiosResponse<{ message: string; transaction: PoolArenaTransaction }>> => {
        return axiosClient.post(`/api/pool-arena/transactions/${id}/reject`);
    },
};

