import axiosClient from './axiosClient';

export interface ChatConversationUser {
  id: string;
  name: string;
  parentName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  isPaid: boolean;
  isPendingPaid: boolean;
  childAge?: number;
  gender?: string;
  totalMessages: number;
  lastMessage?: {
    id: string;
    text: string;
    sender: 'USER' | 'BOT' | 'ADMIN';
    createdAt: string;
  };
}

export interface ChatMessageItem {
  id: string;
  userId: string;
  sender: 'USER' | 'BOT' | 'ADMIN';
  text: string;
  createdAt: string;
}

export const chatAPI = {
  getConversations: () => {
    return axiosClient.get<{ conversations: ChatConversationUser[] }>('/api/pool-arena/users/conversations');
  },

  getConversationDetail: (userId: string) => {
    return axiosClient.get<{ user: ChatConversationUser; messages: ChatMessageItem[] }>(`/api/pool-arena/users/conversations/${userId}`);
  },

  replyConversation: (userId: string, text: string) => {
    return axiosClient.post<{ message: ChatMessageItem }>(`/api/pool-arena/users/conversations/${userId}/reply`, { text });
  },
};
