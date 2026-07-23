/**
 * Footer Settings Modal — configure footer description and copyright text.
 */
import { Label, TextInput, Textarea } from 'flowbite-react';
import BaseDialog from '../../../components/shared/BaseDialog';
import { type FooterSettings } from '../constants';

interface FooterSettingsModalProps {
    open: boolean;
    onClose: () => void;
    footerSettings: FooterSettings;
    onChange: (settings: FooterSettings) => void;
    onSave: () => void;
}

const FooterSettingsModal = ({ open, onClose, footerSettings, onChange, onSave }: FooterSettingsModalProps) => {
    const update = (partial: Partial<FooterSettings>) => {
        onChange({ ...footerSettings, ...partial });
    };

    return (
        <BaseDialog
            open={open}
            onClose={onClose}
            title="Thiết lập chân trang (Footer)"
            size="2xl"
            onConfirm={onSave}
            confirmText="Lưu"
            bodyClassName="space-y-4"
        >
            <div>
                <Label htmlFor="footer_description" className="text-gray-700 dark:text-gray-300 mb-1 block">
                    Mô tả / Slogan chân trang
                </Label>
                <Textarea
                    id="footer_description"
                    placeholder="Nhập mô tả giới thiệu ở chân trang..."
                    rows={4}
                    value={footerSettings.description}
                    onChange={(e) => update({ description: e.target.value })}
                    className="w-full"
                />
            </div>

            <div>
                <Label htmlFor="footer_copyright" className="text-gray-700 dark:text-gray-300 mb-1 block">
                    Bản quyền (Copyright)
                </Label>
                <TextInput
                    id="footer_copyright"
                    type="text"
                    placeholder="© 2026 OTTOPIA Learning. All rights reserved."
                    value={footerSettings.copyright}
                    onChange={(e) => update({ copyright: e.target.value })}
                />
            </div>

            {/* Social Media Links */}
            <div className="border-t pt-4 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-blue-600 mb-3">Liên kết mạng xã hội ở chân trang</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="footer_facebook" className="text-gray-700 dark:text-gray-300">
                            Facebook URL
                        </Label>
                        <TextInput
                            id="footer_facebook"
                            type="url"
                            placeholder="https://facebook.com/..."
                            value={footerSettings.facebookUrl}
                            onChange={(e) => update({ facebookUrl: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="footer_tiktok" className="text-gray-700 dark:text-gray-300">
                            TikTok URL
                        </Label>
                        <TextInput
                            id="footer_tiktok"
                            type="url"
                            placeholder="https://tiktok.com/@..."
                            value={footerSettings.tiktokUrl}
                            onChange={(e) => update({ tiktokUrl: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="footer_instagram" className="text-gray-700 dark:text-gray-300">
                            Instagram URL
                        </Label>
                        <TextInput
                            id="footer_instagram"
                            type="url"
                            placeholder="https://instagram.com/..."
                            value={footerSettings.instagramUrl}
                            onChange={(e) => update({ instagramUrl: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="footer_youtube" className="text-gray-700 dark:text-gray-300">
                            YouTube URL
                        </Label>
                        <TextInput
                            id="footer_youtube"
                            type="url"
                            placeholder="https://youtube.com/..."
                            value={footerSettings.youtubeUrl}
                            onChange={(e) => update({ youtubeUrl: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Connection Contact Info */}
            <div className="border-t pt-4 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-blue-600 mb-3">Thông tin kết nối (Liên hệ)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="footer_email" className="text-gray-700 dark:text-gray-300">
                            Email (Gmail)
                        </Label>
                        <TextInput
                            id="footer_email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={footerSettings.email}
                            onChange={(e) => update({ email: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="footer_phone" className="text-gray-700 dark:text-gray-300">
                            Số điện thoại
                        </Label>
                        <TextInput
                            id="footer_phone"
                            type="tel"
                            placeholder="0842486222"
                            value={footerSettings.phone}
                            onChange={(e) => update({ phone: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </BaseDialog>
    );
};

export default FooterSettingsModal;
