/**
 * Customer Edit Modal — edit customer profile, avatar, and social links.
 * Extracted from Customers.tsx for maintainability.
 */
import { FormEvent, useRef, useState, useEffect } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { subscriptionPlansAPI, type SubscriptionPlan } from '../../api/subscriptionPlans.api';
import toast from 'react-hot-toast';
import BaseDialog from '../../components/shared/BaseDialog';
import ImageCropModal from '../../components/ImageCropModal';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import type { PoolArenaUser, TournamentRank } from '../../types/api';
import { defaultAvatar } from '../../constants/shared';
import { formatFullLevel } from '../../utils/formatters';

// ============================================
// TYPES
// ============================================

interface CustomerFormData {
    full_name: string;
    phone_number: string;
    email: string;
    gender: string;
    rank: string;
    address: string;
    is_active: boolean;
    points: number;
    avatar_url: string;
    tiktok_url: string;
    facebook_url: string;
    instagram_url: string;
    parent_name: string;
    is_paid: boolean;
    is_pending_paid: boolean;
    paid_until: string;
    subscription_plan_id: string;
}

const DEFAULT_FORM_DATA: CustomerFormData = {
    full_name: '',
    phone_number: '',
    email: '',
    gender: '',
    rank: '',
    address: '',
    is_active: true,
    points: 0,
    avatar_url: '',
    tiktok_url: '',
    facebook_url: '',
    instagram_url: '',
    parent_name: '',
    is_paid: false,
    is_pending_paid: false,
    paid_until: '',
    subscription_plan_id: '',
};

const SOCIAL_FIELDS: { id: keyof CustomerFormData; label: string; placeholder: string }[] = [
    { id: 'tiktok_url', label: 'TikTok URL', placeholder: 'https://tiktok.com/@username' },
    { id: 'facebook_url', label: 'Facebook URL', placeholder: 'https://facebook.com/username' },
    { id: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/username' },
];

interface CustomerEditModalProps {
    open: boolean;
    onClose: () => void;
    customer: PoolArenaUser | null;
    ranks: TournamentRank[];
    onSaved: () => void;
}

// ============================================
// COMPONENT
// ============================================

const CustomerEditModal = ({ open, onClose, customer, ranks, onSaved }: CustomerEditModalProps) => {
    const [formData, setFormData] = useState<CustomerFormData>(DEFAULT_FORM_DATA);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

    useEffect(() => {
        subscriptionPlansAPI.getAll()
            .then(res => setPlans(res.data))
            .catch(() => toast.error('Không thể tải danh sách gói học'));
    }, []);

    // populate form when customer changes
    const prevCustomerId = useRef<number | null>(null);
    if (customer && customer.id !== prevCustomerId.current) {
        prevCustomerId.current = customer.id;
        // Sync form data with incoming customer prop (runs once per customer)
        setFormData({
            full_name: customer.full_name,
            phone_number: customer.phone_number,
            email: customer.email || '',
            gender: customer.gender || '',
            rank: customer.rank || '',
            address: customer.address || '',
            is_active: customer.is_active,
            points: customer.points ?? 0,
            avatar_url: customer.avatar_url || '',
            tiktok_url: customer.tiktok_url || '',
            facebook_url: customer.facebook_url || '',
            instagram_url: customer.instagram_url || '',
            parent_name: customer.parent_name || '',
            is_paid: customer.is_paid || false,
            is_pending_paid: customer.is_pending_paid || false,
            paid_until: customer.paid_until ? customer.paid_until.split('T')[0] : '',
            subscription_plan_id: customer.subscription_plan_id || customer.pending_plan_id || '',
        });
    }

    const update = <K extends keyof CustomerFormData>(key: K, value: CustomerFormData[K]) =>
        setFormData(prev => ({ ...prev, [key]: value }));

    // --- Avatar ---

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !customer) return;
        if (!file.type.startsWith('image/')) { toast.error('Vui lòng chọn file ảnh'); return; }
        const reader = new FileReader();
        reader.onload = () => { setSelectedImageSrc(reader.result as string); setCropModalOpen(true); };
        reader.readAsDataURL(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCropComplete = async (croppedImage: Blob) => {
        if (!customer) return;
        setUploadingAvatar(true);
        try {
            const file = new File([croppedImage], 'avatar.png', { type: 'image/png' });
            const response = await poolArenaUserAPI.uploadAvatar(customer.id, file);
            update('avatar_url', response.data.avatar_url);
            toast.success('Tải ảnh lên thành công');
        } catch (error) {
            const detail = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
            toast.error(detail || 'Tải ảnh lên thất bại');
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleDeleteAvatar = async () => {
        if (!customer || !window.confirm('Bạn có chắc muốn xóa ảnh đại diện?')) return;
        try {
            await poolArenaUserAPI.deleteAvatar(customer.id);
            update('avatar_url', '');
            toast.success('Đã xóa ảnh đại diện');
        } catch (error) {
            const detail = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
            toast.error(detail || 'Xóa ảnh thất bại');
        }
    };

    // --- Submit ---

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!customer) return;
        if (!formData.full_name || !formData.phone_number) {
            toast.error('Vui lòng điền đầy đủ thông tin'); return;
        }
        try {
            await poolArenaUserAPI.updateUser(customer.id, {
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                email: formData.email || null,
                gender: formData.gender || null,
                rank: formData.rank || null,
                address: formData.address || null,
                is_active: formData.is_active,
                points: formData.points,
                parent_name: formData.parent_name || null,
                is_paid: formData.is_paid,
                is_pending_paid: formData.is_pending_paid,
                paid_until: formData.paid_until ? new Date(formData.paid_until).toISOString() : null,
                subscription_plan_id: formData.subscription_plan_id || null,
                avatar_url: formData.avatar_url || null,
                tiktok_url: formData.tiktok_url || null,
                facebook_url: formData.facebook_url || null,
                instagram_url: formData.instagram_url || null,
            });
            toast.success('Cập nhật khách hàng thành công');
            onSaved();
            onClose();
        } catch (error) {
            const detail = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
            toast.error(detail || 'Cập nhật thất bại');
        }
    };

    return (
        <>
            <BaseDialog
                open={open}
                onClose={onClose}
                title="Chỉnh sửa khách hàng"
                size="lg"
                showFooter={false}
                bodyClassName="space-y-4 max-h-[70vh] overflow-y-auto"
            >
                <form onSubmit={handleSubmit}>
                    {/* Avatar Upload */}
                    <AvatarUploadSection
                        avatarUrl={formData.avatar_url}
                        uploading={uploadingAvatar}
                        fileInputRef={fileInputRef}
                        onFileChange={handleAvatarChange}
                        onDelete={handleDeleteAvatar}
                    />

                    {/* Main form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="full_name" value="Tên bé" />
                            <TextInput id="full_name" value={formData.full_name}
                                onChange={(e) => update('full_name', e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="parent_name" value="Họ và tên phụ huynh" />
                            <TextInput id="parent_name" value={formData.parent_name}
                                onChange={(e) => update('parent_name', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="phone_number" value="Số điện thoại" />
                            <TextInput id="phone_number" value={formData.phone_number}
                                onChange={(e) => update('phone_number', e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Email" />
                            <TextInput id="email" value={formData.email}
                                onChange={(e) => update('email', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="gender" value="Giới tính" />
                            <Select id="gender" value={formData.gender}
                                onChange={(e) => update('gender', e.target.value)}>
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="is_active" value="Trạng thái" />
                            <Select id="is_active" value={formData.is_active.toString()}
                                onChange={(e) => update('is_active', e.target.value === 'true')}>
                                <option value="true">Hoạt động</option>
                                <option value="false">Vô hiệu</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="is_paid" value="Tài khoản" />
                            <Select id="is_paid" value={formData.is_paid.toString()}
                                onChange={(e) => {
                                    const isPaidVal = e.target.value === 'true';
                                    setFormData(prev => {
                                        const next = {
                                            ...prev,
                                            is_paid: isPaidVal,
                                            is_pending_paid: isPaidVal ? false : prev.is_pending_paid
                                        };
                                        if (isPaidVal) {
                                            // Tự động chọn gói đầu tiên nếu chưa chọn gói nào
                                            const firstPlan = plans[0];
                                            const planId = prev.subscription_plan_id || (firstPlan ? firstPlan.id : '');
                                            const plan = plans.find(p => p.id === planId);
                                            const now = new Date();
                                            const months = plan ? plan.durationMonths : 1;
                                            now.setMonth(now.getMonth() + months);
                                            next.subscription_plan_id = planId;
                                            next.paid_until = now.toISOString().split('T')[0];
                                        } else {
                                            next.paid_until = '';
                                            next.subscription_plan_id = '';
                                        }
                                        return next;
                                    });
                                }}>
                                <option value="true">Trả phí</option>
                                <option value="false">Miễn phí</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="is_pending_paid" value="Chờ kích hoạt" />
                            <Select id="is_pending_paid" value={formData.is_pending_paid.toString()}
                                onChange={(e) => {
                                    const isPendingVal = e.target.value === 'true';
                                    setFormData(prev => ({
                                        ...prev,
                                        is_pending_paid: isPendingVal,
                                        is_paid: isPendingVal ? false : prev.is_paid
                                    }));
                                }}>
                                <option value="true">Đang chờ xác nhận</option>
                                <option value="false">Bình thường</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="subscription_plan_id" value="Gói học đăng ký" />
                            <Select 
                                id="subscription_plan_id" 
                                value={formData.subscription_plan_id}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFormData(prev => {
                                        const next = { ...prev, subscription_plan_id: val };
                                        if (val && prev.is_paid) {
                                            const plan = plans.find(p => p.id === val);
                                            if (plan) {
                                                const now = new Date();
                                                now.setMonth(now.getMonth() + plan.durationMonths);
                                                next.paid_until = now.toISOString().split('T')[0];
                                            }
                                        }
                                        return next;
                                    });
                                }}
                            >
                                <option value="">Không đăng ký (Miễn phí)</option>
                                {plans.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.durationMonths} tháng)</option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="paid_until" value="Thời hạn gói học" />
                            <TextInput
                                id="paid_until"
                                type="date"
                                value={formData.paid_until}
                                onChange={(e) => update('paid_until', e.target.value)}
                                disabled={!formData.is_paid}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="address" value="Địa chỉ" />
                            <TextInput id="address" value={formData.address}
                                onChange={(e) => update('address', e.target.value)} />
                        </div>
                    </div>



                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                        <Button type="submit" color="blue">Cập nhật</Button>
                        <Button type="button" color="gray" onClick={onClose}>Hủy</Button>
                    </div>
                </form>
            </BaseDialog>

            <ImageCropModal
                open={cropModalOpen}
                onClose={() => setCropModalOpen(false)}
                imageSrc={selectedImageSrc}
                onCropComplete={handleCropComplete}
                aspect={3 / 4}
            />
        </>
    );
};

export default CustomerEditModal;

// ============================================
// SUB-COMPONENT: Avatar Upload
// ============================================

function AvatarUploadSection({ avatarUrl, uploading, fileInputRef, onFileChange, onDelete }: {
    avatarUrl: string;
    uploading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-[123px] h-[155px] rounded overflow-hidden flex items-center justify-center">
                <img
                    src={avatarUrl || defaultAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = defaultAvatar; }}
                />
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            <div className="flex gap-2">
                <Button type="button" color="light" size="sm"
                    onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2" />
                            Đang tải...
                        </>
                    ) : (
                        <>
                            <Icon icon="solar:camera-outline" className="mr-2" />
                            {avatarUrl ? 'Thay đổi ảnh' : 'Tải ảnh lên'}
                        </>
                    )}
                </Button>
                {avatarUrl && (
                    <Button type="button" color="failure" size="sm" onClick={onDelete} disabled={uploading}>
                        <Icon icon="solar:trash-bin-minimalistic-outline" className="mr-2" />
                        Xóa ảnh
                    </Button>
                )}
            </div>
        </div>
    );
}
