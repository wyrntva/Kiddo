import axiosClient from './axiosClient';
import type { AxiosResponse } from 'axios';
import { Zone } from './zone.api';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    emoji: string;
    img: string;
    level: string;
    duration: string;
    stars: number;
    stepsCount: number;
    zoneId: string;
    zone?: Zone;
    welcomeText?: string;
    preVideoText?: string;
    postVideoText?: string;
    welcomeAudio?: string;
    preVideoAudio?: string;
    postVideoAudio?: string;
    videoUrl?: string;
    postQuestionText?: string;
    postQuestionAudio?: string;
}

export interface QuizQuestion {
    id: string;
    prompt: string;
    voiceUrl?: string;
    correctOptionId: number;
    options: {
        id: number;
        label: string;
        sprite: string;
        style: Record<string, any>;
    }[];
    lessonId: string;
    createdAt?: string;
    updatedAt?: string;
}

export const lessonAPI = {
    getLessons: (): Promise<AxiosResponse<{ data: Lesson[] }>> => {
        return axiosClient.get('/api/lessons');
    },
    getLesson: (id: string): Promise<AxiosResponse<Lesson>> => {
        return axiosClient.get(`/api/lessons/${id}`);
    },
    createLesson: (data: Partial<Lesson>): Promise<AxiosResponse<Lesson>> => {
        return axiosClient.post('/api/lessons', data);
    },
    updateLesson: (id: string, data: Partial<Lesson>): Promise<AxiosResponse<Lesson>> => {
        return axiosClient.patch(`/api/lessons/${id}`, data);
    },
    deleteLesson: (id: string): Promise<AxiosResponse<void>> => {
        return axiosClient.delete(`/api/lessons/${id}`);
    },
    uploadImage: (file: File): Promise<AxiosResponse<{ url: string }>> => {
        const formData = new FormData();
        formData.append('file', file);
        return axiosClient.post('/api/lessons/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    uploadVoice: (file: File): Promise<AxiosResponse<{ url: string }>> => {
        const formData = new FormData();
        formData.append('file', file);
        return axiosClient.post('/api/lessons/upload-audio', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    uploadVideo: (file: File): Promise<AxiosResponse<{ url: string }>> => {
        const formData = new FormData();
        formData.append('file', file);
        return axiosClient.post('/api/lessons/upload-video', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    getQuestions: (lessonId: string): Promise<AxiosResponse<{ data: QuizQuestion[] }>> => {
        return axiosClient.get(`/api/lessons/${lessonId}/questions`);
    },
    createQuestion: (lessonId: string, data: Partial<QuizQuestion>): Promise<AxiosResponse<QuizQuestion>> => {
        return axiosClient.post(`/api/lessons/${lessonId}/questions`, data);
    },
    updateQuestion: (lessonId: string, questionId: string, data: Partial<QuizQuestion>): Promise<AxiosResponse<QuizQuestion>> => {
        return axiosClient.patch(`/api/lessons/${lessonId}/questions/${questionId}`, data);
    },
    deleteQuestion: (lessonId: string, questionId: string): Promise<AxiosResponse<void>> => {
        return axiosClient.delete(`/api/lessons/${lessonId}/questions/${questionId}`);
    },
};
