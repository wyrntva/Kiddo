import { useEffect, useState } from 'react';
import { Card, Table } from 'flowbite-react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import type { PoolArenaTransaction } from '../../api/poolArenaUser.api';
import { defaultAvatar } from '../../constants/shared';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<PoolArenaTransaction[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await poolArenaUserAPI.getTransactions();
            setTransactions(response.data || []);
        } catch (_error) {
            toast.error('Không thể tải danh sách lịch sử giao dịch');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleApprove = async (tx: PoolArenaTransaction) => {
        try {
            await poolArenaUserAPI.approveTransaction(tx.id);
            toast.success(`Đã duyệt kích hoạt tài khoản cho bé ${tx.user.full_name}`);
            fetchTransactions();
        } catch (_error) {
            toast.error('Duyệt kích hoạt thất bại');
        }
    };

    const handleReject = async (tx: PoolArenaTransaction) => {
        if (!window.confirm(`Bạn có chắc chắn muốn từ chối yêu cầu của bé ${tx.user.full_name}?`)) {
            return;
        }
        try {
            await poolArenaUserAPI.rejectTransaction(tx.id);
            toast.success(`Đã từ chối/hủy yêu cầu kích hoạt của bé ${tx.user.full_name}`);
            fetchTransactions();
        } catch (_error) {
            toast.error('Từ chối yêu cầu thất bại');
        }
    };

    const formatDate = (dateStr: string) => {
        return dayjs(dateStr).format('DD/MM/YYYY HH:mm');
    };

    const formatPrice = (price: number | null) => {
        if (price === null || price === undefined) return '0đ';
        return price.toLocaleString('vi-VN') + 'đ';
    };

    const cleanPlanName = (name: string | null) => {
        if (!name) return '-';
        return name.replace(/\s*\(giả?m\s+.*$/i, '').trim();
    };

    const parseDiscountInfo = (planName: string | null, price: number | null) => {
        if (!planName || !price) return null;
        const match = planName.match(/giả?m\s+(\d+)%/i);
        if (match) {
            const percent = parseInt(match[1], 10);
            if (percent > 0 && percent < 100) {
                const originalPrice = Math.round(price / (1 - percent / 100));
                const savedAmount = originalPrice - price;
                return {
                    percent,
                    originalPrice,
                    savedAmount
                };
            }
        }
        return null;
    };

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white">
                    LỊCH SỬ GIAO DỊCH VÀ DUYỆT YÊU CẦU KÍCH HOẠT
                </h1>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head className="bg-[#f8fafd] text-[#0A7AD8] border-b border-gray-100">
                            <Table.HeadCell className="w-[80px]">Ảnh</Table.HeadCell>
                            <Table.HeadCell>Tên Bé</Table.HeadCell>
                            <Table.HeadCell>Họ Tên Phụ Huynh</Table.HeadCell>
                            <Table.HeadCell>Số Điện Thoại</Table.HeadCell>
                            <Table.HeadCell>Gói Đăng Ký</Table.HeadCell>
                            <Table.HeadCell>Số Tiền</Table.HeadCell>
                            <Table.HeadCell>Ngày Yêu Cầu</Table.HeadCell>
                            <Table.HeadCell>Trạng Thái</Table.HeadCell>
                            <Table.HeadCell className="text-center">Hành động</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={9} className="text-center py-8">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ) : transactions.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={9} className="text-center py-16 text-gray-500">
                                        <p className="text-base font-medium">Không có lịch sử giao dịch nào</p>
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                transactions.map((tx) => (
                                    <Table.Row key={tx.id}>
                                        <Table.Cell>
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                                <img 
                                                    src={tx.user.avatar_url 
                                                        ? (tx.user.avatar_url.startsWith('http') || tx.user.avatar_url.startsWith('data:') 
                                                            ? tx.user.avatar_url 
                                                            : `${import.meta.env.VITE_API_URL || ''}${tx.user.avatar_url.startsWith('/') ? '' : '/'}${tx.user.avatar_url}`) 
                                                        : defaultAvatar
                                                    } 
                                                    alt={tx.user.full_name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.currentTarget.src = defaultAvatar; }} 
                                                />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-semibold text-gray-950">{tx.user.full_name}</Table.Cell>
                                        <Table.Cell>{tx.user.parent_name || '-'}</Table.Cell>
                                        <Table.Cell className="font-mono">{tx.user.phone_number || '-'}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-[#0A7AD8]">{cleanPlanName(tx.plan_name)}</span>
                                                {(() => {
                                                    const discountInfo = parseDiscountInfo(tx.plan_name, tx.price);
                                                    if (discountInfo) {
                                                        return (
                                                            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 whitespace-nowrap">
                                                                Giảm {discountInfo.percent}% (Tiết kiệm {formatPrice(discountInfo.savedAmount)})
                                                            </span>
                                                        );
                                                    }
                                                    return null;
                                                })()}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-semibold text-gray-950">
                                            {(() => {
                                                const discountInfo = parseDiscountInfo(tx.plan_name, tx.price);
                                                if (discountInfo) {
                                                    return (
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-gray-400 line-through font-normal">{formatPrice(discountInfo.originalPrice)}</span>
                                                            <span className="text-red-600">{formatPrice(tx.price)}</span>
                                                        </div>
                                                    );
                                                }
                                                return <span className="text-red-600">{formatPrice(tx.price)}</span>;
                                            })()}
                                        </Table.Cell>
                                        <Table.Cell className="text-gray-500">{formatDate(tx.created_at)}</Table.Cell>
                                        <Table.Cell>
                                            {tx.status === 'pending' && (
                                                <span className="text-[#fea01f] font-semibold bg-[#fff8e8] border border-[#ffe09e] px-2.5 py-0.5 rounded-full text-[13px] animate-pulse">
                                                    Chờ xác nhận
                                                </span>
                                            )}
                                            {tx.status === 'approved' && (
                                                <span className="text-[#339e4a] font-semibold bg-[#eafaf1] border border-[#a3e4d7] px-2.5 py-0.5 rounded-full text-[13px]">
                                                    Đã duyệt
                                                </span>
                                            )}
                                            {tx.status === 'rejected' && (
                                                <span className="text-[#ED052A] font-semibold bg-[#fdf2f2] border border-[#fde8e8] px-2.5 py-0.5 rounded-full text-[13px]">
                                                    Từ chối
                                                </span>
                                            )}
                                            {tx.status === 'cancelled' && (
                                                <span className="text-gray-500 font-semibold bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full text-[13px]">
                                                    Đã hủy
                                                </span>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {tx.status === 'pending' ? (
                                                <div className="flex gap-4 justify-center">
                                                    <button 
                                                        onClick={() => handleApprove(tx)} 
                                                        className="text-[#339e4a] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-[14px]"
                                                    >
                                                        Duyệt kích hoạt
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(tx)} 
                                                        className="text-[#ED052A] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-[14px]"
                                                    >
                                                        Từ chối
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-400 text-[13px] italic">
                                                    Đã xử lý
                                                </div>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default TransactionHistory;
