import axiosClient from './axiosClient';
import type { AxiosResponse } from 'axios';

export interface SubscriptionPlan {
    id: string;
    key: string;
    name: string;
    price: number;
    period: string;
    features: string[];
    isPopular: boolean;
    durationMonths: number;
    createdAt: string;
    updatedAt: string;
}

export const subscriptionPlansAPI = {
    getAll: (): Promise<AxiosResponse<SubscriptionPlan[]>> => {
        return axiosClient.get('/api/subscription-plans');
    },

    update: (id: string, data: { name: string; price: number; features: string[]; durationMonths: number }): Promise<AxiosResponse<SubscriptionPlan>> => {
        return axiosClient.put(`/api/subscription-plans/${id}`, data);
    },
};
