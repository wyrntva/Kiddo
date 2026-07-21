import { Card, Table } from 'flowbite-react';

const ReportRevenue = () => {
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
                        <p className="text-2xl font-bold text-green-600 mt-1">0đ</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Khóa học đã bán</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">0</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Người dùng trả phí</p>
                        <p className="text-2xl font-bold text-purple-600 mt-1">0</p>
                    </div>
                </Card>
            </div>

            {/* Revenue Table */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Lịch sử doanh thu</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Ngày</Table.HeadCell>
                            <Table.HeadCell>Người dùng</Table.HeadCell>
                            <Table.HeadCell>Khóa học</Table.HeadCell>
                            <Table.HeadCell>Số tiền</Table.HeadCell>
                            <Table.HeadCell>Trạng thái</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row>
                                <Table.Cell colSpan={5} className="text-center py-8 text-gray-500">
                                    Chưa có dữ liệu doanh thu
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default ReportRevenue;
