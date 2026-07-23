import { useState, useEffect } from 'react';
import { Card, Label, TextInput } from 'flowbite-react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { subscriptionPlansAPI, type SubscriptionPlan } from '../../api/subscriptionPlans.api';
import BaseDialog from '../../components/shared/BaseDialog';

const Courses = () => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
    const [editPrice, setEditPrice] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            setLoading(true);
            const res = await subscriptionPlansAPI.getAll();
            setPlans(res.data);
        } catch (_err) {
            toast.error('Không thể tải danh sách gói cước');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (plan: SubscriptionPlan) => {
        setSelectedPlan(plan);
        setEditPrice(plan.price.toString());
        setModalOpen(true);
    };

    const handleSavePrice = async () => {
        if (!selectedPlan) return;
        const parsedPrice = parseInt(editPrice, 10);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            toast.error('Vui lòng nhập giá trị tiền hợp lệ (>= 0)');
            return;
        }

        try {
            setLoading(true);
            await subscriptionPlansAPI.updatePrice(selectedPlan.id, parsedPrice);
            toast.success(`Đã cập nhật giá gói ${selectedPlan.name}`);
            setModalOpen(false);
            setSelectedPlan(null);
            await loadPlans();
        } catch (_err) {
            toast.error('Lưu giá cước thất bại');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
            .format(amount)
            .replace(/\s?₫/g, 'đ');
    };

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    <Icon icon="solar:card-2-outline" className="w-5 h-5 text-blue-600" />
                    QUẢN LÝ GÓI HỌC PHÍ
                </h1>
            </div>

            {/* Grid of Pricing Packages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                    const bgClass = plan.key === 'month_1' ? 'bg-blue-50/50 border-blue-200' : plan.key === 'month_3' ? 'bg-amber-50/50 border-amber-200' : 'bg-emerald-50/50 border-emerald-200';
                    const iconColor = plan.key === 'month_1' ? 'text-blue-600' : plan.key === 'month_3' ? 'text-amber-500' : 'text-emerald-600';
                    const btnClass = plan.key === 'month_1' ? 'bg-blue-600 hover:bg-blue-700' : plan.key === 'month_3' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700';

                    return (
                        <Card key={plan.id} className={`border ${bgClass} relative flex flex-col justify-between overflow-hidden shadow-sm`}>
                            {/* Popular badge */}
                            {plan.isPopular && (
                                <div className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Icon icon="solar:fire-bold" className="w-3.5 h-3.5" />
                                    BÁN CHẠY
                                </div>
                            )}

                            <div className="flex flex-col gap-4 flex-grow">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-white shadow-sm border border-gray-100 ${iconColor}`}>
                                        <Icon icon="solar:calendar-outline" className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-[16px]">{plan.name}</h3>
                                        <p className="text-[12px] text-gray-500">Mã gói: <span className="font-mono">{plan.key}</span></p>
                                    </div>
                                </div>

                                <div className="my-2 border-y border-dashed border-gray-200 py-3 text-center">
                                    <span className="text-[28px] font-bold text-gray-800 leading-none">
                                        {formatCurrency(plan.price)}
                                    </span>
                                    <span className="text-[13px] text-gray-500 ml-1">{plan.period}</span>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quyền lợi gói:</h4>
                                    <ul className="space-y-2">
                                        {((plan.features as string[]) || []).map((feat, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <Icon icon="solar:check-circle-bold" className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor}`} />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={() => handleEditClick(plan)}
                                className={`w-full py-2.5 mt-4 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm ${btnClass}`}
                            >
                                <Icon icon="solar:pen-bold" className="w-4 h-4" />
                                Tùy chỉnh giá gói
                            </button>
                        </Card>
                    );
                })}
            </div>

            {/* Edit Price Modal */}
            {selectedPlan && (
                <BaseDialog
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedPlan(null);
                    }}
                    title={`Cấu hình giá: ${selectedPlan.name}`}
                    size="md"
                    onConfirm={handleSavePrice}
                    confirmText="Lưu giá cước"
                    bodyClassName="space-y-4"
                >
                    <div>
                        <Label htmlFor="plan_price" className="text-gray-700 dark:text-gray-300 block mb-1">
                            Giá tiền khóa học (VND) <span className="text-red-500">(*)</span>
                        </Label>
                        <TextInput
                            id="plan_price"
                            type="number"
                            placeholder="Nhập giá mới..."
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            min={0}
                            required
                        />
                        <span className="text-xs text-gray-400 mt-1 block">
                            Nhập mệnh giá VNĐ (Ví dụ: 99000). Giá trị này sẽ được dùng để tạo mã VietQR động khi bé đăng ký học.
                        </span>
                    </div>
                </BaseDialog>
            )}
        </div>
    );
};

export default Courses;
