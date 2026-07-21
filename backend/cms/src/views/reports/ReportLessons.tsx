import React, { useEffect, useState } from 'react';
import { Card, Table } from 'flowbite-react';
import toast from 'react-hot-toast';
import { lessonAPI, Lesson } from '../../api/lesson.api';

const ReportLessons = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            try {
                const res = await lessonAPI.getLessons();
                setLessons(res.data?.data || []);
            } catch {
                toast.error('Không thể tải dữ liệu bài học');
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, []);

    const totalStars = lessons.reduce((sum, l) => sum + l.stars, 0);
    const totalSteps = lessons.reduce((sum, l) => sum + l.stepsCount, 0);

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div>
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    BÁO CÁO BÀI HỌC
                </h1>
            </div>

            {/* Lessons Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng bài học</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">{lessons.length}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng số bước học</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">{totalSteps}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng sao thưởng</p>
                        <p className="text-2xl font-bold text-yellow-500 mt-1">{totalStars} sao</p>
                    </div>
                </Card>
            </div>

            {/* Lessons Table */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Danh sách bài học</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Ảnh</Table.HeadCell>
                            <Table.HeadCell>Tên bài học</Table.HeadCell>
                            <Table.HeadCell>Vùng đất</Table.HeadCell>
                            <Table.HeadCell>Số bước</Table.HeadCell>
                            <Table.HeadCell>Thời lượng</Table.HeadCell>
                            <Table.HeadCell>Sao thưởng</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={6} className="text-center py-8">
                                        Đang tải dữ liệu...
                                    </Table.Cell>
                                </Table.Row>
                            ) : lessons.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                                        Chưa có dữ liệu bài học
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                lessons.map((item) => (
                                    <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            <div className="w-16 h-12 flex items-center justify-center bg-gray-50 rounded-lg p-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                                                {item.img ? (
                                                    <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain" />
                                                ) : (
                                                    <span className="text-gray-400 text-xs">Chưa có</span>
                                                )}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-semibold text-gray-900 dark:text-white">{item.title}</Table.Cell>
                                        <Table.Cell>
                                            <span className="font-medium px-2.5 py-0.5 rounded text-white" style={{ backgroundColor: item.zone?.color }}>
                                                {item.zone?.name || 'Chưa phân loại'}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>{item.stepsCount} bước</Table.Cell>
                                        <Table.Cell>{item.duration}</Table.Cell>
                                        <Table.Cell className="text-yellow-500 font-bold">{item.stars} sao</Table.Cell>
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

export default ReportLessons;
