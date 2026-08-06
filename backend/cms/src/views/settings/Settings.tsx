/**
 * Settings Page — main settings hub with links and modals for store configuration.
 *
 * Extracted components:
 * - StoreInfoModal → modals/StoreInfoModal.tsx
 * - SocialMediaModal → modals/SocialMediaModal.tsx
 * - BannerSettingsModal → modals/BannerSettingsModal.tsx
 * - Constants & types → constants.ts
 * - Banner image utils → ../../utils/bannerUtils.ts
 */
import { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import { storeSettingsAPI, type StoreSettings } from '../../api/storeSettings.api';
import {
    type SettingItem,
    type StoreInfo,
    type SocialMediaInfo,
    type FooterSettings,
    type PaymentAccountInfo,
    SETTING_SECTIONS,
    DEFAULT_STORE_INFO,
    DEFAULT_SOCIAL_MEDIA,
    DEFAULT_FOOTER_SETTINGS,
    DEFAULT_PAYMENT_ACCOUNT,
} from './constants';
import StoreInfoModal from './modals/StoreInfoModal';
import SocialMediaModal from './modals/SocialMediaModal';
import BannerSettingsModal from './modals/BannerSettingsModal';
import FooterSettingsModal from './modals/FooterSettingsModal';
import PaymentAccountModal from './modals/PaymentAccountModal';

// ============================================
// MAIN COMPONENT
// ============================================

const Settings = () => {
    const [storeInfoModalOpen, setStoreInfoModalOpen] = useState(false);
    const [socialMediaModalOpen, setSocialMediaModalOpen] = useState(false);
    const [bannerModalOpen, setBannerModalOpen] = useState(false);
    const [footerModalOpen, setFooterModalOpen] = useState(false);
    const [paymentAccountModalOpen, setPaymentAccountModalOpen] = useState(false);
    const [selectedBannerType, setSelectedBannerType] = useState<'home' | 'news'>('home');
    const [_loading, setLoading] = useState(false);
    const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null);
    const [storeInfo, setStoreInfo] = useState<StoreInfo>(DEFAULT_STORE_INFO);
    const [socialMediaInfo, setSocialMediaInfo] = useState<SocialMediaInfo>(DEFAULT_SOCIAL_MEDIA);
    const [footerSettings, setFooterSettings] = useState<FooterSettings>(DEFAULT_FOOTER_SETTINGS);
    const [paymentAccountInfo, setPaymentAccountInfo] = useState<PaymentAccountInfo>(DEFAULT_PAYMENT_ACCOUNT);

    useEffect(() => {
        loadStoreSettings();
    }, []);

    // --- Data Loading ---

    const loadStoreSettings = async () => {
        try {
            setLoading(true);
            const response = await storeSettingsAPI.get();
            const settings = response.data;
            setStoreSettings(settings);

            setStoreInfo({
                name: settings.name,
                phone: settings.phone || '',
                currency: settings.currency,
                address: settings.address || '',
                useNewAddress: false,
                province: settings.province || 'Thành phố Hà Nội',
                district: settings.district || 'Quận Tây Hồ',
                ward: settings.ward || 'Phường Xuân La',
                businessType: settings.business_type || 'Khác',
            });

            setSocialMediaInfo({
                tiktok: settings.tiktok_url || '',
                facebook: settings.facebook_url || '',
                youtube: settings.youtube_url || '',
                instagram: settings.instagram_url || '',
                phone: settings.phone_number || '',
                gmail: settings.gmail || '',
                address: settings.social_address || '',
            });

            setFooterSettings({
                description: settings.footer_description || DEFAULT_FOOTER_SETTINGS.description,
                copyright: settings.footer_copyright || DEFAULT_FOOTER_SETTINGS.copyright,
                facebookUrl: settings.facebook_url || '',
                tiktokUrl: settings.tiktok_url || '',
                instagramUrl: settings.instagram_url || '',
                youtubeUrl: settings.youtube_url || '',
                email: settings.gmail || '',
                phone: settings.phone_number || '',
            });

            setPaymentAccountInfo({
                bankName: settings.bank_name || DEFAULT_PAYMENT_ACCOUNT.bankName,
                bankAccountNumber: settings.bank_account_number || DEFAULT_PAYMENT_ACCOUNT.bankAccountNumber,
                bankAccountName: settings.bank_account_name || DEFAULT_PAYMENT_ACCOUNT.bankAccountName,
                bankCode: settings.bank_code || DEFAULT_PAYMENT_ACCOUNT.bankCode,
            });
        } catch (_error) {
            toast.error('Không thể tải thông tin cửa hàng');
        } finally {
            setLoading(false);
        }
    };

    // --- Save Handlers ---

    const handleSaveStoreInfo = async () => {
        try {
            setLoading(true);
            await storeSettingsAPI.update({
                name: storeInfo.name,
                phone: storeInfo.phone || null,
                currency: storeInfo.currency,
                address: storeInfo.address || null,
                province: storeInfo.province || null,
                district: storeInfo.district || null,
                ward: storeInfo.ward || null,
                business_type: storeInfo.businessType || null,
            });
            toast.success('Đã lưu thông tin cửa hàng');
            setStoreInfoModalOpen(false);
            await loadStoreSettings();
        } catch (_error) {
            toast.error('Không thể lưu thông tin cửa hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSocialMediaInfo = async () => {
        try {
            setLoading(true);
            await storeSettingsAPI.update({
                tiktok_url: socialMediaInfo.tiktok || null,
                facebook_url: socialMediaInfo.facebook || null,
                youtube_url: socialMediaInfo.youtube || null,
                instagram_url: socialMediaInfo.instagram || null,
                phone_number: socialMediaInfo.phone || null,
                gmail: socialMediaInfo.gmail || null,
                social_address: socialMediaInfo.address || null,
            });
            toast.success('Đã lưu thông tin mạng xã hội');
            setSocialMediaModalOpen(false);
            await loadStoreSettings();
        } catch (_error) {
            toast.error('Không thể lưu thông tin mạng xã hội');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveFooterSettings = async () => {
        try {
            setLoading(true);
            await storeSettingsAPI.update({
                footer_description: footerSettings.description,
                footer_copyright: footerSettings.copyright,
                facebook_url: footerSettings.facebookUrl || null,
                tiktok_url: footerSettings.tiktokUrl || null,
                instagram_url: footerSettings.instagramUrl || null,
                youtube_url: footerSettings.youtubeUrl || null,
                gmail: footerSettings.email || null,
                phone_number: footerSettings.phone || null,
            });
            toast.success('Đã lưu thiết lập chân trang');
            setFooterModalOpen(false);
            await loadStoreSettings();
        } catch (_error) {
            toast.error('Không thể lưu thiết lập chân trang');
        } finally {
            setLoading(false);
        }
    };

    const handleSavePaymentAccountInfo = async () => {
        try {
            setLoading(true);
            await storeSettingsAPI.update({
                bank_name: paymentAccountInfo.bankName || null,
                bank_account_number: paymentAccountInfo.bankAccountNumber || null,
                bank_account_name: paymentAccountInfo.bankAccountName || null,
                bank_code: paymentAccountInfo.bankCode || null,
            });
            toast.success('Đã lưu thông tin tài khoản thanh toán');
            setPaymentAccountModalOpen(false);
            await loadStoreSettings();
        } catch (_error) {
            toast.error('Không thể lưu thông tin tài khoản thanh toán');
        } finally {
            setLoading(false);
        }
    };

    // --- Action Routing ---

    const handleItemClick = (item: SettingItem) => {
        if (item.action === 'store-info') setStoreInfoModalOpen(true);
        else if (item.action === 'social-media') setSocialMediaModalOpen(true);
        else if (item.action === 'footer-settings') setFooterModalOpen(true);
        else if (item.action === 'payment-account') setPaymentAccountModalOpen(true);
        else if (item.action === 'banner-home') {
            setSelectedBannerType('home');
            setBannerModalOpen(true);
        } else if (item.action === 'banner-news') {
            setSelectedBannerType('news');
            setBannerModalOpen(true);
        }
    };

    // --- Render ---

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    THIẾT LẬP CỬA HÀNG
                </h1>
            </div>

            {/* Setting Sections */}
            {SETTING_SECTIONS.map((section, sectionIndex) => (
                <Card key={sectionIndex}>
                    <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">
                        {section.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.items.map((item, itemIndex) => (
                            <SettingItemCard key={itemIndex} item={item} onClick={handleItemClick} />
                        ))}
                    </div>
                </Card>
            ))}

            {/* Modals */}
            <StoreInfoModal
                open={storeInfoModalOpen}
                onClose={() => setStoreInfoModalOpen(false)}
                storeInfo={storeInfo}
                onChange={setStoreInfo}
                onSave={handleSaveStoreInfo}
            />

            <SocialMediaModal
                open={socialMediaModalOpen}
                onClose={() => setSocialMediaModalOpen(false)}
                socialMediaInfo={socialMediaInfo}
                onChange={setSocialMediaInfo}
                onSave={handleSaveSocialMediaInfo}
            />

            <BannerSettingsModal
                open={bannerModalOpen}
                onClose={() => setBannerModalOpen(false)}
                storeSettings={storeSettings}
                onSettingsChange={setStoreSettings}
                onReload={loadStoreSettings}
                type={selectedBannerType}
            />

            <FooterSettingsModal
                open={footerModalOpen}
                onClose={() => setFooterModalOpen(false)}
                footerSettings={footerSettings}
                onChange={setFooterSettings}
                onSave={handleSaveFooterSettings}
            />

            <PaymentAccountModal
                open={paymentAccountModalOpen}
                onClose={() => setPaymentAccountModalOpen(false)}
                paymentAccountInfo={paymentAccountInfo}
                onChange={setPaymentAccountInfo}
                onSave={handleSavePaymentAccountInfo}
            />
        </div>
    );
};

export default Settings;

// ============================================
// SUB-COMPONENT: Setting Item Card
// ============================================

function SettingItemCard({ item, onClick }: { item: SettingItem; onClick: (item: SettingItem) => void }) {
    const iconBgClass = item.disabled ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-50 dark:bg-blue-900/30';
    const iconColorClass = item.disabled ? 'text-gray-500 dark:text-gray-400' : 'text-blue-600 dark:text-blue-400';
    const titleColorClass = item.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-blue-600 dark:text-blue-400';
    const descColorClass = item.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400';

    const content = (
        <>
            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg ${iconBgClass}`}>
                <Icon icon={item.icon} className={`w-5 h-5 ${iconColorClass}`} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium ${titleColorClass}`}>{item.title}</h4>
                <p className={`text-xs ${descColorClass} mt-0.5 line-clamp-2`}>{item.description}</p>
            </div>
        </>
    );

    if (item.disabled) {
        return <div className="flex items-start gap-3 p-3 rounded-lg cursor-not-allowed opacity-50">{content}</div>;
    }

    if (item.action) {
        return (
            <div onClick={() => onClick(item)} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                {content}
            </div>
        );
    }

    return (
        <Link to={item.url || '#'} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            {content}
        </Link>
    );
}
