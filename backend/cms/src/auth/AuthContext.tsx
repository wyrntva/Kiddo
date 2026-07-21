/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../api/auth.api';


interface User {
    id: string | number;
    username: string;
    full_name: string;
    is_admin: boolean;
    role_id: number;
    avatar_url?: string | null;
    role: {
        id: number;
        name: string;
        permissions: string[];
    };
    email?: string;
    phone?: string | null;
    parentName?: string | null;
    level?: number;
    stars?: number;
    badges?: number;
    lessonsCompleted?: number;
    weeklyProgress?: number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const mapUser = (backendUser: any): User | null => {
    if (!backendUser) return null;
    const isSystemAdmin = backendUser.role === 'ADMIN';
    const mappedRoleId = isSystemAdmin ? 1 : (backendUser.role === 'PARENT' ? 2 : 3);
    return {
        id: backendUser.id,
        email: backendUser.email,
        phone: backendUser.phone,
        parentName: backendUser.parentName,
        level: backendUser.level,
        stars: backendUser.stars,
        badges: backendUser.badges,
        lessonsCompleted: backendUser.lessonsCompleted,
        weeklyProgress: backendUser.weeklyProgress,
        username: backendUser.email || '',
        full_name: backendUser.name || '',
        is_admin: isSystemAdmin,
        role_id: mappedRoleId,
        avatar_url: backendUser.avatar || null,
        role: {
            id: mappedRoleId,
            name: isSystemAdmin ? 'Quản trị' : (backendUser.role === 'PARENT' ? 'Phụ huynh' : 'Học sinh'),
            permissions: isSystemAdmin ? ['*'] : [],
        }
    };
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await authAPI.getCurrentUser();
                    if (isMounted) {
                        const backendUser = (response.data as any).user || response.data;
                        setUser(mapUser(backendUser));
                    }
                } catch {
                    // Axios interceptor already handles 401 cleanup (clears storage + redirects).
                    // Calling logout() here would fire POST /api/auth/logout without a token → extra 401.
                    if (isMounted) {
                        setUser(null);
                    }
                }
            }
            if (isMounted) {
                setLoading(false);
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await authAPI.login(credentials);
            const { accessToken, user: loggedInUser } = response.data as any;

            localStorage.setItem('access_token', accessToken);

            setUser(mapUser(loggedInUser));

            return { success: true };
        } catch (error) {
            const errorMessage = (error as { response?: { data?: { message?: string, detail?: string } } })?.response?.data?.message 
                || (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail 
                || 'Tài khoản không tồn tại hoặc sai mật khẩu!';
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch { /* ignore */ } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            setUser(null);
            // Force redirect to login page
            window.location.href = '/auth/login';
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
