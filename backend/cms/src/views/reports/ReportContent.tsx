import React, { useEffect, useState } from 'react';
import { Card, Table } from 'flowbite-react';
import toast from 'react-hot-toast';
import { zoneAPI, Zone } from '../../api/zone.api';

const ReportContent = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchZones = async () => {
            setLoading(true);
            try {
                const res = await zoneAPI.getZones();
                setZones(res.data?.data || []);
            } catch {
                toast.error('Không thể tải dữ liệu vùng đất');
            } finally {
                setLoading(false);
            }
        };
        fetchZones();
    }, []);

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div>
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    BÁO CÁO NỘI DUNG
                </h1>
            </div>

            {/* Content Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng vùng đất</p>
                        <p className="text-2xl font-bold text-orange-600 mt-1">{zones.length}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Vùng đất có bài học</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">{zones.length}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng bài học</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">-</p>
                    </div>
                </Card>
            </div>

            {/* Zones Table */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Thống kê theo vùng đất</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Ảnh</Table.HeadCell>
                            <Table.HeadCell>Tên vùng đất</Table.HeadCell>
                            <Table.HeadCell>Mô tả</Table.HeadCell>
                            <Table.HeadCell>Màu sắc</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={4} className="text-center py-8">
                                        Đang tải dữ liệu...
                                    </Table.Cell>
                                </Table.Row>
                            ) : zones.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={4} className="text-center py-8 text-gray-500">
                                        Chưa có dữ liệu nội dung
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                zones.map((zone) => (
                                    <Table.Row key={zone.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            <div className="w-16 h-12 flex items-center justify-center bg-gray-50 rounded-lg p-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                                                {zone.img ? (
                                                    <img src={zone.img} alt={zone.name} className="max-w-full max-h-full object-contain" />
                                                ) : (
                                                    <span className="text-gray-400 text-xs">Chưa có</span>
                                                )}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-semibold text-gray-900 dark:text-white">{zone.name}</Table.Cell>
                                        <Table.Cell className="text-gray-600 dark:text-gray-400 max-w-xs truncate">{zone.desc}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: zone.color }}></div>
                                                <span className="text-sm text-gray-500">{zone.color}</span>
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

export default ReportContent;
