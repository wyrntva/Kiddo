import { useEffect, useState } from 'react';
import { Card, Table } from 'flowbite-react';
import toast from 'react-hot-toast';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import type { PoolArenaUser } from '../../types/api';
import { defaultAvatar } from '../../constants/shared';

const TransactionHistory = () => {
    const [pendingUsers, setPendingUsers] = useState<PoolArenaUser[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            // Fetch users that have is_pending_paid: true
            const response = await poolArenaUserAPI.getUsers({ limit: 10000, is_pending_paid: true });
            setPendingUsers(response.data?.data || []);
        } catch (_error) {
            toast.error('Không thể tải danh sách yêu cầu kích hoạt');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (user: PoolArenaUser) => {
        try {
            // Approve activation: set is_paid to true
            await poolArenaUserAPI.updateUser(user.id, { is_paid: true });
            toast.success(`Đã duyệt kích hoạt tài khoản cho bé ${user.full_name}`);
            fetchPendingUsers();
        } catch (_error) {
            toast.error('Duyệt kích hoạt thất bại');
        }
    };

    const handleReject = async (user: PoolArenaUser) => {
        if (!window.confirm(`Bạn có chắc chắn muốn từ chối yêu cầu của bé ${user.full_name}?`)) {
            return;
        }
        try {
            // Reject request: set is_pending_paid to false
            await poolArenaUserAPI.updateUser(user.id, { is_pending_paid: false });
            toast.success(`Đã từ chối/hủy yêu cầu kích hoạt của bé ${user.full_name}`);
            fetchPendingUsers();
        } catch (_error) {
            toast.error('Từ chối yêu cầu thất bại');
        }
    };

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white">
                    DUYỆT YÊU CẦU KÍCH HOẠT (LỊCH SỬ GIAO DỊCH)
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
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Trạng Thái</Table.HeadCell>
                            <Table.HeadCell className="text-center">Hành động</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={7} className="text-center py-8">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ) : pendingUsers.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={7} className="text-center py-16 text-gray-500">
                                        <p className="text-base font-medium">Không có yêu cầu nào đang chờ duyệt</p>
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                pendingUsers.map((user) => (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                                <img 
                                                    src={user.avatar_url 
                                                        ? (user.avatar_url.startsWith('http') || user.avatar_url.startsWith('data:') 
                                                            ? user.avatar_url 
                                                            : `${import.meta.env.VITE_API_URL || ''}${user.avatar_url.startsWith('/') ? '' : '/'}${user.avatar_url}`) 
                                                        : defaultAvatar
                                                    } 
                                                    alt={user.full_name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.currentTarget.src = defaultAvatar; }} 
                                                />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-semibold text-gray-950">{user.full_name}</Table.Cell>
                                        <Table.Cell>{user.parent_name || '-'}</Table.Cell>
                                        <Table.Cell className="font-mono">{user.phone_number || '-'}</Table.Cell>
                                        <Table.Cell>{user.email || '-'}</Table.Cell>
                                        <Table.Cell>
                                            <span className="text-[#fea01f] font-semibold bg-[#fff8e8] border border-[#ffe09e] px-2.5 py-0.5 rounded-full text-[13px] animate-pulse">
                                                Chờ xác nhận
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-4 justify-center">
                                                <button 
                                                    onClick={() => handleApprove(user)} 
                                                    className="text-[#339e4a] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-[14px]"
                                                >
                                                    Duyệt kích hoạt
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(user)} 
                                                    className="text-[#ED052A] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-[14px]"
                                                >
                                                    Từ chối
                                                </button>
                                            </div>
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
