import { useEffect, useState } from 'react';
import { Card, Table } from 'flowbite-react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import type { PoolArenaTransaction } from '../../api/poolArenaUser.api';

const ReportRevenue = () => {
    const [transactions, setTransactions] = useState<PoolArenaTransaction[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRevenueData = async () => {
            setLoading(true);
            try {
                const response = await poolArenaUserAPI.getTransactions();
                // Filter only approved transactions for revenue reports
                const approvedTxs = (response.data || []).filter(tx => tx.status === 'approved');
                setTransactions(approvedTxs);
            } catch (_error) {
                toast.error('Không thể tải dữ liệu báo cáo doanh thu');
            } finally {
                setLoading(false);
            }
        };
        fetchRevenueData();
    }, []);

    // Doanh thu tháng này
    const currentMonth = dayjs().format('YYYY-MM');
    const monthlyRevenue = transactions
        .filter(tx => dayjs(tx.created_at).format('YYYY-MM') === currentMonth)
        .reduce((sum, tx) => sum + (tx.price || 0), 0);

    // Khóa học đã bán (số lượng gói đã active)
    const coursesSold = transactions.length;

    // Số người dùng trả phí duy nhất
    const paidUsers = new Set(transactions.map(tx => tx.user.id)).size;

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };

    const formatDate = (dateStr: string) => {
        return dayjs(dateStr).format('DD/MM/YYYY HH:mm');
    };

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div>
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    BÁO CÁO DOANH THU
                </h1>
            </div>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Doanh thu tháng này</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">{formatPrice(monthlyRevenue)}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Khóa học đã bán</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">{coursesSold}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Người dùng trả phí</p>
                        <p className="text-2xl font-bold text-purple-600 mt-1">{paidUsers}</p>
                    </div>
                </Card>
            </div>

            {/* Revenue Table */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Lịch sử doanh thu</h3>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head className="bg-[#f8fafd] text-[#0A7AD8] border-b border-gray-100">
                            <Table.HeadCell>Ngày</Table.HeadCell>
                            <Table.HeadCell>Người dùng</Table.HeadCell>
                            <Table.HeadCell>Khóa học / Gói học</Table.HeadCell>
                            <Table.HeadCell>Số tiền</Table.HeadCell>
                            <Table.HeadCell>Trạng thái</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5} className="text-center py-8">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ) : transactions.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5} className="text-center py-8 text-gray-500">
                                        Chưa có dữ liệu doanh thu
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                transactions.map((tx) => (
                                    <Table.Row key={tx.id}>
                                        <Table.Cell className="text-gray-500">{formatDate(tx.created_at)}</Table.Cell>
                                        <Table.Cell className="font-medium text-gray-900">{tx.user?.full_name || '-'}</Table.Cell>
                                        <Table.Cell className="text-blue-600 font-medium">{tx.plan_name || '-'}</Table.Cell>
                                        <Table.Cell className="font-semibold text-red-600">{formatPrice(tx.price || 0)}</Table.Cell>
                                        <Table.Cell>
                                            <span className="text-[#339e4a] font-semibold bg-[#eafaf1] border border-[#a3e4d7] px-2.5 py-0.5 rounded-full text-[12px]">
                                                Thành công
                                            </span>
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

export default ReportRevenue;
