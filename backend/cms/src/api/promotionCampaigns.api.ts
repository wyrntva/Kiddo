import axiosClient from './axiosClient';
import type { AxiosResponse } from 'axios';

export interface PromotionCampaign {
    id: string;
    name: string;
    discountPercent: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    targetPlanKeys: string;
    createdAt: string;
    updatedAt: string;
}

export const promotionCampaignsAPI = {
    getAll: (): Promise<AxiosResponse<PromotionCampaign[]>> => {
        return axiosClient.get('/api/promotion-campaigns');
    },

    create: (data: {
        name: string;
        discountPercent: number;
        startDate: string;
        endDate: string;
        targetPlanKeys: string;
    }): Promise<AxiosResponse<PromotionCampaign>> => {
        return axiosClient.post('/api/promotion-campaigns', data);
    },

    toggle: (id: string): Promise<AxiosResponse<PromotionCampaign>> => {
        return axiosClient.put(`/api/promotion-campaigns/${id}/toggle`);
    },

    delete: (id: string): Promise<AxiosResponse<void>> => {
        return axiosClient.delete(`/api/promotion-campaigns/${id}`);
    }
};
