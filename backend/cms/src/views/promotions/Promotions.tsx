import { useState, useEffect } from 'react';
import { Card, Label, TextInput, Select, Table, Badge, Checkbox } from 'flowbite-react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { subscriptionPlansAPI, type SubscriptionPlan } from '../../api/subscriptionPlans.api';
import { promotionCampaignsAPI, type PromotionCampaign } from '../../api/promotionCampaigns.api';

const BASE_PLANS: Record<string, { name: string; price: number }> = {
    month_1: { name: 'Gói 1 tháng', price: 139000 },
    month_3: { name: 'Gói 6 tháng', price: 499000 },
    month_12: { name: 'Gói 12 tháng', price: 799000 }
};

interface PromoCode {
    code: string;
    discountPercent: number;
    description: string;
    status: 'active' | 'expired';
    usedCount: number;
    expiryDate: string;
}

const Promotions = () => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [campaigns, setCampaigns] = useState<PromotionCampaign[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Create Campaign Form State
    const [campaignName, setCampaignName] = useState('');
    const [discountPercent, setDiscountPercent] = useState('20');
    const [startDate, setStartDate] = useState('2026-08-08T00:00');
    const [endDate, setEndDate] = useState('2026-08-15T23:59');
    const [selectedPlans, setSelectedPlans] = useState<Record<string, boolean>>({
        month_1: true,
        month_3: true,
        month_12: true
    });

    // Mock Promo Codes for premium UI completeness
    const [promoCodes] = useState<PromoCode[]>([
        { code: 'OTTOPIA20', discountPercent: 20, description: 'Giảm 20% cho tất cả gói cước ngày khai giảng', status: 'active', usedCount: 45, expiryDate: '31/08/2026' },
        { code: 'HE2026', discountPercent: 15, description: 'Khuyến mãi chào hè học tập vui vẻ', status: 'active', usedCount: 112, expiryDate: '15/09/2026' },
        { code: 'TOROFRIEND', discountPercent: 10, description: 'Mã bạn bè đồng hành cùng Toro', status: 'active', usedCount: 28, expiryDate: '31/12/2026' },
        { code: 'WAVYOFFER', discountPercent: 30, description: 'Ưu đãi đặc biệt giảm giá 30%', status: 'expired', usedCount: 89, expiryDate: '01/08/2026' }
    ]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [plansRes, campaignsRes] = await Promise.all([
                subscriptionPlansAPI.getAll(),
                promotionCampaignsAPI.getAll()
            ]);
            setPlans(plansRes.data);
            setCampaigns(campaignsRes.data);
        } catch (_err) {
            toast.error('Không thể kết nối với máy chủ API');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCampaign = async () => {
        if (!campaignName.trim()) {
            toast.error('Vui lòng nhập tên chiến dịch');
            return;
        }

        if (!startDate || !endDate) {
            toast.error('Vui lòng cung cấp ngày/giờ bắt đầu và kết thúc');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            toast.error('Thời gian bắt đầu không được lớn hơn thời gian kết thúc');
            return;
        }

        // Check if at least one plan is selected
        const targetKeys = Object.entries(selectedPlans)
            .filter(([_, isSelected]) => isSelected)
            .map(([key]) => key);

        if (targetKeys.length === 0) {
            toast.error('Vui lòng chọn ít nhất một gói học phí để áp dụng');
            return;
        }

        const percent = parseInt(discountPercent, 10);

        try {
            setLoading(true);
            await promotionCampaignsAPI.create({
                name: campaignName.trim(),
                discountPercent: percent,
                startDate,
                endDate,
                targetPlanKeys: targetKeys.join(',')
            });
            toast.success('Tạo chiến dịch khuyến mãi thành công!');
            setCampaignName('');
            await loadData();
        } catch (_err) {
            toast.error('Không thể tạo chiến dịch');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleCampaign = async (id: string) => {
        try {
            setLoading(true);
            const res = await promotionCampaignsAPI.toggle(id);
            const isNowActive = res.data.isActive;
            if (isNowActive) {
                toast.success(`Đã kích hoạt chiến dịch "${res.data.name}"`);
            } else {
                toast.success(`Đã tạm dừng chiến dịch "${res.data.name}"`);
            }
            await loadData();
        } catch (_err) {
            toast.error('Không thể thay đổi trạng thái chiến dịch');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCampaign = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa chiến dịch này không?')) return;
        try {
            setLoading(true);
            await promotionCampaignsAPI.delete(id);
            toast.success('Đã xóa chiến dịch thành công');
            await loadData();
        } catch (_err) {
            toast.error('Không thể xóa chiến dịch');
        } finally {
            setLoading(false);
        }
    };

    const convertInputToDisplayDateTime = (dateTimeStr: string) => {
        if (!dateTimeStr) return '';
        const parts = dateTimeStr.split('T');
        if (parts.length !== 2) return dateTimeStr;
        const dateParts = parts[0].split('-');
        if (dateParts.length !== 3) return dateTimeStr;
        const time = parts[1]; // HH:mm
        return `${time} ${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
            .format(amount)
            .replace(/\s?₫/g, 'đ');
    };

    const formatPlanKeys = (keysStr: string) => {
        return keysStr.split(',').map(key => {
            const base = BASE_PLANS[key];
            return base ? base.name : key;
        }).join(', ');
    };

    // Find the currently active campaign on the server
    const activeCampaign = campaigns.find(c => c.isActive);

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    <Icon icon="solar:ticket-sale-bold-duotone" className="w-5 h-5 text-blue-600" />
                    QUẢN LÝ CHƯƠNG TRÌNH KHUYẾN MÃI (CTKM)
                </h1>
            </div>

            {/* Form and Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Setup */}
                <Card className="border border-gray-100 shadow-sm lg:col-span-1">
                    <h3 className="font-bold text-gray-800 text-[14px] flex items-center gap-2 mb-4">
                        <Icon icon="solar:settings-bold" className="w-4 h-4 text-blue-600" />
                        TẠO CHIẾN DỊCH MỚI
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="campaign-name" value="Tên chiến dịch khuyến mãi" />
                            </div>
                            <TextInput
                                id="campaign-name"
                                placeholder="Ví dụ: Khai Giảng, Trung Thu, 8/8"
                                required
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="discount-percent" value="Mức giảm giá (%)" />
                            </div>
                            <Select
                                id="discount-percent"
                                value={discountPercent}
                                onChange={(e) => setDiscountPercent(e.target.value)}
                            >
                                <option value="5">Giảm 5%</option>
                                <option value="10">Giảm 10%</option>
                                <option value="15">Giảm 15%</option>
                                <option value="20">Giảm 20%</option>
                                <option value="25">Giảm 25%</option>
                                <option value="30">Giảm 30%</option>
                                <option value="50">Giảm 50%</option>
                            </Select>
                        </div>
                        
                        {/* Target Plans Checkboxes */}
                        <div>
                            <div className="mb-2 block">
                                <Label value="Áp dụng cho gói học" />
                            </div>
                            <div className="p-3 bg-gray-50/50 border border-gray-100 rounded-xl space-y-2.5">
                                {Object.entries(BASE_PLANS).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`plan-${key}`}
                                            checked={selectedPlans[key]}
                                            onChange={(e) => setSelectedPlans({
                                                ...selectedPlans,
                                                [key]: e.target.checked
                                            })}
                                        />
                                        <Label htmlFor={`plan-${key}`} className="font-semibold text-gray-700 text-xs">
                                            {value.name} ({formatCurrency(value.price)})
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="start-date" value="Thời gian bắt đầu" />
                                </div>
                                <TextInput
                                    id="start-date"
                                    type="datetime-local"
                                    required
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="end-date" value="Thời gian kết thúc" />
                                </div>
                                <TextInput
                                    id="end-date"
                                    type="datetime-local"
                                    required
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="pt-2">
                            <button
                                onClick={handleCreateCampaign}
                                disabled={loading}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                            >
                                <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
                                Tạo chiến dịch
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Preview Plans */}
                <Card className="border border-gray-100 shadow-sm lg:col-span-2">
                    <h3 className="font-bold text-gray-800 text-[14px] flex items-center gap-2 mb-4">
                        <Icon icon="solar:eye-bold" className="w-4 h-4 text-blue-600" />
                        BẢNG XEM TRƯỚC GIÁ KHI ÁP DỤNG CHIẾN DỊCH
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(BASE_PLANS).map(([key, basePlan]) => {
                            const percent = parseInt(discountPercent, 10);
                            const isTargeted = selectedPlans[key];
                            const previewPrice = isTargeted ? Math.round((basePlan.price * (100 - percent)) / 100) : basePlan.price;
                            const amountSaved = basePlan.price - previewPrice;
                            const startDisp = convertInputToDisplayDateTime(startDate) || 'HH:mm DD/MM/YYYY';
                            const endDisp = convertInputToDisplayDateTime(endDate) || 'HH:mm DD/MM/YYYY';

                            return (
                                <div key={key} className={`p-4 rounded-xl border ${isTargeted ? 'border-blue-100 bg-blue-50/10' : 'border-gray-100 bg-gray-50/30'} flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-800 text-[14px]">{basePlan.name}</h4>
                                            {isTargeted ? (
                                                <Badge color="info">Áp dụng giảm {percent}%</Badge>
                                            ) : (
                                                <Badge color="gray">Giá gốc</Badge>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                                            Tên hiển thị mới: <span className="font-mono text-blue-600 block font-bold mt-1">
                                                {isTargeted 
                                                    ? `${basePlan.name} (GIẢM ${percent}% ${campaignName || 'Chiến dịch'} từ ${startDisp} đến ${endDisp})`
                                                    : basePlan.name
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6 self-stretch md:self-auto justify-between border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                                        <div className="text-right">
                                            {isTargeted && (
                                                <p className="text-xs text-gray-400 line-through">{formatCurrency(basePlan.price)}</p>
                                            )}
                                            <p className={`text-lg font-bold ${isTargeted ? 'text-emerald-600' : 'text-gray-700'}`}>{formatCurrency(previewPrice)}</p>
                                        </div>
                                        {isTargeted && (
                                            <div className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                                                <Icon icon="solar:tag-bold" className="w-3.5 h-3.5" />
                                                Tiết kiệm {formatCurrency(amountSaved)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Campaigns list Table */}
            <Card className="border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 text-[14px] flex items-center gap-2 mb-4">
                    <Icon icon="solar:playlist-bold-duotone" className="w-4 h-4 text-blue-600" />
                    DANH SÁCH CHIẾN DỊCH KHUYẾN MÃI (LỊCH SỬ)
                </h3>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head className="bg-gray-50">
                            <Table.HeadCell>Tên chiến dịch</Table.HeadCell>
                            <Table.HeadCell>Mức giảm</Table.HeadCell>
                            <Table.HeadCell>Gói học áp dụng</Table.HeadCell>
                            <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
                            <Table.HeadCell>Thời gian kết thúc</Table.HeadCell>
                            <Table.HeadCell>Trạng thái</Table.HeadCell>
                            <Table.HeadCell className="text-center">Thao tác</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {campaigns.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={7} className="text-center py-6 text-gray-400 font-medium">
                                        Chưa có chiến dịch khuyến mãi nào được tạo
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                campaigns.map((c) => {
                                    const isExpired = new Date() > new Date(c.endDate);
                                    
                                    return (
                                        <Table.Row key={c.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="font-bold text-gray-800">{c.name}</Table.Cell>
                                            <Table.Cell className="font-bold text-emerald-600">-{c.discountPercent}%</Table.Cell>
                                            <Table.Cell className="text-gray-500 text-xs font-semibold">{formatPlanKeys(c.targetPlanKeys)}</Table.Cell>
                                            <Table.Cell className="text-gray-500 text-xs">{convertInputToDisplayDateTime(c.startDate)}</Table.Cell>
                                            <Table.Cell className="text-gray-500 text-xs">{convertInputToDisplayDateTime(c.endDate)}</Table.Cell>
                                            <Table.Cell>
                                                {c.isActive ? (
                                                    <Badge color="success">Đang chạy</Badge>
                                                ) : isExpired ? (
                                                    <Badge color="gray">Đã kết thúc</Badge>
                                                ) : (
                                                    <Badge color="warning">Tạm dừng</Badge>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <button
                                                        onClick={() => handleToggleCampaign(c.id)}
                                                        disabled={loading}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                                            c.isActive
                                                                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                                        }`}
                                                    >
                                                        {c.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCampaign(c.id)}
                                                        disabled={loading}
                                                        className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Xóa chiến dịch"
                                                    >
                                                        <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </Card>

            {/* Mock Promo Codes Section */}
            <Card className="border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-[14px] flex items-center gap-2">
                        <Icon icon="solar:tag-price-bold" className="w-4 h-4 text-blue-600" />
                        DANH SÁCH MÃ GIẢM GIÁ (COUPONS)
                    </h3>
                    <button
                        onClick={() => toast.success('Tính năng thêm coupon đang được chuẩn bị!')}
                        className="px-3.5 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                        <Icon icon="solar:add-circle-bold" className="w-3.5 h-3.5" />
                        Tạo Coupon
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head className="bg-gray-50">
                            <Table.HeadCell>Mã Code</Table.HeadCell>
                            <Table.HeadCell>Mức giảm</Table.HeadCell>
                            <Table.HeadCell>Mô tả chi tiết</Table.HeadCell>
                            <Table.HeadCell>Lượt sử dụng</Table.HeadCell>
                            <Table.HeadCell>Hạn dùng</Table.HeadCell>
                            <Table.HeadCell>Trạng thái</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {promoCodes.map((promo) => (
                                <Table.Row key={promo.code} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="font-mono font-bold text-blue-600">{promo.code}</Table.Cell>
                                    <Table.Cell className="font-bold text-emerald-600">-{promo.discountPercent}%</Table.Cell>
                                    <Table.Cell className="text-gray-500 text-xs">{promo.description}</Table.Cell>
                                    <Table.Cell className="font-semibold text-gray-700">{promo.usedCount} lượt</Table.Cell>
                                    <Table.Cell className="text-gray-500 text-xs">{promo.expiryDate}</Table.Cell>
                                    <Table.Cell>
                                        {promo.status === 'active' ? (
                                            <Badge color="success">Đang dùng</Badge>
                                        ) : (
                                            <Badge color="failure">Hết hạn</Badge>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default Promotions;
