import { Button, Label } from 'flowbite-react';
import BaseDialog from '../../../components/shared/BaseDialog';
import { type StoreSettings, storeSettingsAPI } from '../../../api/storeSettings.api';
import toast from 'react-hot-toast';

interface BannerSettingsModalProps {
    open: boolean;
    onClose: () => void;
    storeSettings: StoreSettings | null;
    onSettingsChange: (settings: StoreSettings) => void;
    onReload: () => void;
    type: 'home' | 'news';
}

function resolveBannerUrl(url: string): string {
    if (url.startsWith('/')) {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        return `${apiUrl}${url}`;
    }
    return url;
}

function getBannerUrls(settings: StoreSettings | null, type: 'scoreboard' | 'tournament'): string[] {
    if (!settings) return [];
    const field = `banner_${type}` as keyof StoreSettings;
    const urlValue = settings[field] as string | null;
    if (!urlValue) return [];

    try {
        const urls = JSON.parse(urlValue);
        if (Array.isArray(urls)) return urls.map(resolveBannerUrl);
    } catch {
        return [resolveBannerUrl(urlValue)];
    }
    return [];
}

const BannerSettingsModal = ({
    open,
    onClose,
    storeSettings,
    onSettingsChange,
    onReload,
    type,
}: BannerSettingsModalProps) => {
    const [loading, setLoading] = React.useState(false);
    const [uploadingBanners, setUploadingBanners] = React.useState<Record<string, boolean>>({});

    const handleDeleteBanner = async (bannerType: 'scoreboard' | 'tournament', index: number) => {
        try {
            setLoading(true);
            const response = await storeSettingsAPI.deleteBanner(bannerType, index);
            onSettingsChange(response.data);
            toast.success('Đã xóa banner');
        } catch (error) {
            toast.error('Không thể xóa banner');
        } finally {
            setLoading(false);
        }
    };

    const handleMultipleBannerUpload = async (bannerType: 'scoreboard' | 'tournament', files: FileList) => {
        const fileArray = Array.from(files);
        try {
            setUploadingBanners(prev => ({ ...prev, [bannerType]: true }));
            let latestSettings: StoreSettings | null = null;
            let successCount = 0;
            let failCount = 0;
            for (const file of fileArray) {
                try {
                    const response = await storeSettingsAPI.uploadBanner(bannerType, file);
                    latestSettings = response.data;
                    successCount++;
                } catch {
                    failCount++;
                }
            }
            if (latestSettings) {
                onSettingsChange(latestSettings);
            } else {
                onReload();
            }
            if (successCount > 0 && failCount === 0) {
                toast.success(`Đã tải lên ${successCount} banner thành công`);
            } else if (successCount > 0) {
                toast.error(`Đã tải lên ${successCount} banner, thất bại ${failCount} banner`);
            } else {
                toast.error('Không thể tải banner lên');
            }
        } catch (error) {
            toast.error('Không thể tải banner lên');
        } finally {
            setUploadingBanners(prev => ({ ...prev, [bannerType]: false }));
        }
    };

    const scoreboardUrls = getBannerUrls(storeSettings, 'scoreboard');
    const tournamentUrls = getBannerUrls(storeSettings, 'tournament');

    return (
        <BaseDialog
            open={open}
            onClose={onClose}
            title={type === 'home' ? 'Thiết lập Banner trang chủ' : 'Thiết lập banner trang tin tức'}
            size="2xl"
            showFooter={false}
            bodyClassName="space-y-6"
        >
            {type === 'home' ? (
                <MultiBannerSection
                    label="Banner trang chủ (Kích thước: 1920x1080)"
                    sizeHint="1920x1080"
                    urls={scoreboardUrls}
                    inputId="banner-scoreboard"
                    uploading={!!uploadingBanners.scoreboard}
                    loading={loading}
                    onUpload={(files) => handleMultipleBannerUpload('scoreboard', files)}
                    onDelete={(index) => handleDeleteBanner('scoreboard', index)}
                />
            ) : (
                <MultiBannerSection
                    label="Banner trang tin tức (Kích thước: 1360x280)"
                    sizeHint="1360x280"
                    urls={tournamentUrls}
                    inputId="banner-tournament"
                    uploading={!!uploadingBanners.tournament}
                    loading={loading}
                    onUpload={(files) => handleMultipleBannerUpload('tournament', files)}
                    onDelete={(index) => handleDeleteBanner('tournament', index)}
                />
            )}
        </BaseDialog>
    );
};

export default BannerSettingsModal;

import React from 'react';

function MultiBannerSection({ label, sizeHint, urls, inputId, uploading, loading, onUpload, onDelete }: {
    label: string;
    sizeHint: string;
    urls: string[];
    inputId: string;
    uploading: boolean;
    loading: boolean;
    onUpload: (files: FileList) => void;
    onDelete: (index: number) => void;
}) {
    return (
        <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
                {label}
            </Label>
            {urls.length > 0 && (
                <div className="grid grid-cols-1 gap-3 mb-2">
                    {urls.map((url, index) => (
                        <BannerPreview key={index} url={url} alt={`${label} ${index + 1}`} loading={loading} onDelete={() => onDelete(index)} />
                    ))}
                </div>
            )}
            <div className="flex gap-2">
                <input type="file" accept="image/*" id={inputId} className="hidden" multiple onChange={async (e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) onUpload(files);
                    e.target.value = '';
                }} />
                <UploadButton inputId={inputId} uploading={uploading} label={urls.length > 0 ? 'Thêm banner' : 'Tải banner lên'} />
            </div>
        </div>
    );
}

function BannerPreview({ url, alt, loading, onDelete }: { url: string; alt: string; loading: boolean; onDelete: () => void }) {
    return (
        <div className="mb-2 relative group">
            <img src={url} alt={alt} className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
            <button
                type="button"
                onClick={onDelete}
                disabled={loading}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            >
                Xóa
            </button>
        </div>
    );
}

function UploadButton({ inputId, uploading, label }: { inputId: string; uploading: boolean; label: string }) {
    return (
        <Button
            type="button"
            color="light"
            size="sm"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById(inputId)?.click();
            }}
            onFocus={(e) => e.target.blur()}
            disabled={uploading}
            className="focus:outline-none focus:ring-0"
        >
            {uploading ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2" />
                    Đang tải...
                </>
            ) : (
                label
            )}
        </Button>
    );
}
