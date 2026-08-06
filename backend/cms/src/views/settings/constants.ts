/**
 * Constants and configuration data for Settings page.
 * Extracted to reduce noise in the main Settings component.
 */

// ============================================
// TYPES
// ============================================

export interface SettingItem {
    icon: string;
    title: string;
    description: string;
    url?: string;
    action?: string;
    disabled?: boolean;
}

export interface SettingSection {
    title: string;
    items: SettingItem[];
}

export interface StoreInfo {
    name: string;
    phone: string;
    currency: string;
    address: string;
    useNewAddress: boolean;
    province: string;
    district: string;
    ward: string;
    businessType: string;
}

export interface SocialMediaInfo {
    tiktok: string;
    facebook: string;
    youtube: string;
    instagram: string;
    phone: string;
    gmail: string;
    address: string;
}

export interface FooterSettings {
    description: string;
    copyright: string;
    facebookUrl: string;
    tiktokUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
    email: string;
    phone: string;
}

export interface PaymentAccountInfo {
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
    bankCode: string;
}

// ============================================
// LOCATION DATA
// ============================================

export const PROVINCES = [
    'Thành phố Hà Nội',
    'Thành phố Hồ Chí Minh',
    'Thành phố Đà Nẵng',
    'Thành phố Hải Phòng',
    'Thành phố Cần Thơ',
];

export const DISTRICTS: Record<string, string[]> = {
    'Thành phố Hà Nội': ['Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Tây Hồ', 'Quận Long Biên', 'Quận Cầu Giấy', 'Quận Đống Đa', 'Quận Hai Bà Trưng', 'Quận Hoàng Mai', 'Quận Thanh Xuân'],
    'Thành phố Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10'],
    'Thành phố Đà Nẵng': ['Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn', 'Quận Liên Chiểu'],
    'Thành phố Hải Phòng': ['Quận Hồng Bàng', 'Quận Ngô Quyền', 'Quận Lê Chân', 'Quận Hải An', 'Quận Kiến An'],
    'Thành phố Cần Thơ': ['Quận Ninh Kiều', 'Quận Bình Thủy', 'Quận Cái Răng', 'Quận Ô Môn', 'Quận Thốt Nốt'],
};

export const WARDS: Record<string, string[]> = {
    'Quận Tây Hồ': ['Phường Bưởi', 'Phường Thụy Khuê', 'Phường Yên Phụ', 'Phường Tứ Liên', 'Phường Nhật Tân', 'Phường Quảng An', 'Phường Xuân La', 'Phường Phú Thượng'],
    'Quận Ba Đình': ['Phường Cống Vị', 'Phường Điện Biên', 'Phường Đội Cấn', 'Phường Giảng Võ', 'Phường Kim Mã', 'Phường Liễu Giai'],
    'Quận Hoàn Kiếm': ['Phường Hàng Bạc', 'Phường Hàng Bài', 'Phường Hàng Bông', 'Phường Hàng Buồm', 'Phường Hàng Đào'],
};

export const BUSINESS_TYPES = ['Nhà hàng', 'Quán cà phê', 'Quán bi-a', 'Khác'];

export const CURRENCIES = [
    { value: 'VND', label: 'Việt Nam đồng (VND)' },
    { value: 'USD', label: 'US Dollar (USD)' },
];

// ============================================
// SETTING SECTIONS CONFIG
// ============================================

export const SETTING_SECTIONS: SettingSection[] = [
    {
        title: 'Thiết lập thông tin',
        items: [
            {
                icon: 'solar:user-circle-outline',
                title: 'Thiết lập thông tin mạng xã hội',
                description: 'Xem và điều chỉnh thông tin mạng xã hội của bạn',
                action: 'social-media',
            },
            {
                icon: 'solar:gallery-outline',
                title: 'Thiết lập Banner trang chủ',
                description: 'Xem và điều chỉnh banner trang chủ của bạn',
                action: 'banner-home',
            },
            {
                icon: 'solar:gallery-bold-duotone',
                title: 'Thiết lập banner trang tin tức',
                description: 'Xem và điều chỉnh banner trang tin tức của bạn',
                action: 'banner-news',
            },
            {
                icon: 'solar:window-frame-outline',
                title: 'Thiết lập chân trang',
                description: 'Xem và điều chỉnh thông tin chân trang (footer) của website',
                action: 'footer-settings',
            },
            {
                icon: 'solar:card-transfer-outline',
                title: 'Thiết lập tài khoản thanh toán',
                description: 'Xem và điều chỉnh thông tin tài khoản thanh toán ngân hàng',
                action: 'payment-account',
            },
        ],
    },
    {
        title: 'Thiết lập chức năng',
        items: [
            {
                icon: 'solar:user-circle-outline',
                title: 'Thiết lập tài khoản quản trị',
                description: 'Đổi mật khẩu và quản lý tài khoản quản trị của bạn',
                url: '/staff',
            },
        ],
    },
];

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULT_STORE_INFO: StoreInfo = {
    name: 'AZ POOLARENA',
    phone: '0842486222',
    currency: 'VND',
    address: 'Tháp Đông- CC Học Viện Quốc Phòng',
    useNewAddress: false,
    province: 'Thành phố Hà Nội',
    district: 'Quận Tây Hồ',
    ward: 'Phường Xuân La',
    businessType: 'Khác',
};

export const DEFAULT_SOCIAL_MEDIA: SocialMediaInfo = {
    tiktok: '',
    facebook: '',
    youtube: '',
    instagram: '',
    phone: '',
    gmail: '',
    address: '',
};

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
    description: 'Ottopia đồng hành cùng bé phát triển kỹ năng sống qua những trải nghiệm vui vẻ và ý nghĩa mỗi ngày.',
    copyright: '© 2026 OTTOPIA Learning. All rights reserved.',
    facebookUrl: '',
    tiktokUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    email: '',
    phone: '',
};

export const DEFAULT_PAYMENT_ACCOUNT: PaymentAccountInfo = {
    bankName: 'MB Bank (Ngân hàng Quân đội)',
    bankAccountNumber: '0842486222',
    bankAccountName: 'KIDDO LEARNING',
    bankCode: 'MB',
};
