import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { NavLink } from 'react-router';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import { zoneAPI } from '../../api/zone.api';
import { lessonAPI } from '../../api/lesson.api';
import { newsAPI } from '../../api/news.api';

const ReportDetail = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [zonesCount, setZonesCount] = useState(0);
    const [lessonsCount, setLessonsCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const usersRes = await poolArenaUserAPI.getUsers({ limit: 1 });
                setUsersCount(usersRes.data?.total || 0);

                const zonesRes = await zoneAPI.getZones();
                setZonesCount(zonesRes.data?.data?.length || 0);

                const lessonsRes = await lessonAPI.getLessons();
                setLessonsCount(lessonsRes.data?.data?.length || 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { label: 'Tổng người dùng', value: loading ? '...' : usersCount },
        { label: 'Vùng đất hoạt động', value: loading ? '...' : zonesCount },
        { label: 'Bài học trong hệ thống', value: loading ? '...' : lessonsCount },
        { label: 'Khóa học đã bán', value: '0' },
    ];

    const shortcuts = [
        { name: 'Báo cáo doanh thu', path: '/reports/revenue' },
        { name: 'Báo cáo nội dung', path: '/reports/content' },
        { name: 'Báo cáo bài học', path: '/reports/lessons' },
    ];

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div>
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    BÁO CÁO CHI TIẾT
                </h1>
            </div>

            {/* Stat Cards - No icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <Card key={i}>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{s.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Quick Links - No icons */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Truy cập nhanh</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {shortcuts.map((item, idx) => (
                        <NavLink
                            key={idx}
                            to={item.path}
                            className="flex items-center justify-between p-4 rounded-[16px] border border-gray-100 hover:bg-orange-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                            <span className="text-gray-400 text-sm">→</span>
                        </NavLink>
                    ))}
                </div>
            </Card>

            {/* Placeholder chart area - No icons */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Biểu đồ tổng quan</h3>
                <div className="flex items-center justify-center py-16 text-gray-400">
                    <div className="text-center">
                        <p className="text-sm">Biểu đồ sẽ hiển thị khi có dữ liệu</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ReportDetail;
