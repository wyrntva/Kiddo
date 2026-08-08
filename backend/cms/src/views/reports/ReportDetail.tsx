import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { NavLink } from 'react-router';
import dayjs from 'dayjs';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import { zoneAPI } from '../../api/zone.api';
import { lessonAPI } from '../../api/lesson.api';

const ReportDetail = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [zonesCount, setZonesCount] = useState(0);
    const [lessonsCount, setLessonsCount] = useState(0);
    const [coursesSold, setCoursesSold] = useState(0);
    const [chartCategories, setChartCategories] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
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

                const txsRes = await poolArenaUserAPI.getTransactions();
                const approvedTxs = (txsRes.data || []).filter(tx => tx.status === 'approved');
                setCoursesSold(approvedTxs.length);

                // Group transactions by date for the last 7 days
                const last7Days = Array.from({ length: 7 }).map((_, i) => dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD'));
                const dailyRevenueMap = new Map<string, number>();
                
                // Initialize map
                last7Days.forEach(date => dailyRevenueMap.set(date, 0));
                
                // Populate map
                approvedTxs.forEach(tx => {
                    const txDate = dayjs(tx.created_at).format('YYYY-MM-DD');
                    if (dailyRevenueMap.has(txDate)) {
                        dailyRevenueMap.set(txDate, dailyRevenueMap.get(txDate)! + (tx.price || 0));
                    }
                });

                setChartCategories(last7Days.map(date => dayjs(date).format('DD/MM')));
                setChartData(last7Days.map(date => dailyRevenueMap.get(date) || 0));
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
        { label: 'Khóa học đã bán', value: loading ? '...' : coursesSold },
    ];

    const shortcuts = [
        { name: 'Báo cáo doanh thu', path: '/reports/revenue' },
        { name: 'Báo cáo nội dung', path: '/reports/content' },
        { name: 'Báo cáo bài học', path: '/reports/lessons' },
    ];

    const chartOptions: ApexOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 100],
            },
        },
        colors: ['#0A7AD8'],
        xaxis: {
            categories: chartCategories,
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => val.toLocaleString('vi-VN') + 'đ',
                style: {
                    colors: '#6b7280',
                    fontSize: '12px',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: (val) => val.toLocaleString('vi-VN') + ' VND',
            },
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    };

    const chartSeries = [
        {
            name: 'Doanh thu',
            data: chartData,
        },
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

            {/* Chart Area */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Xu hướng doanh thu 7 ngày qua</h3>
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    </div>
                ) : chartData.length === 0 || chartData.reduce((a, b) => a + b, 0) === 0 ? (
                    <div className="flex items-center justify-center py-16 text-gray-400">
                        <div className="text-center">
                            <p className="text-sm">Chưa có dữ liệu doanh thu trong 7 ngày qua</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-[300px] w-full">
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height="100%"
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ReportDetail;
