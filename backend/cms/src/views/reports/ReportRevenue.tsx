import { useEffect, useState, useMemo } from 'react';
import { Card, Table, Select, Button, TextInput } from 'flowbite-react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import type { PoolArenaTransaction } from '../../api/poolArenaUser.api';

// Extend dayjs with isoWeek plugin for Monday-start weeks
dayjs.extend(isoWeek);

type TimeFilterType = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'custom';

const ReportRevenue = () => {
    const [transactions, setTransactions] = useState<PoolArenaTransaction[]>([]);
    const [loading, setLoading] = useState(false);

    // Filter states
    const [timeFilter, setTimeFilter] = useState<TimeFilterType>('thisWeek');
    const [startDate, setStartDate] = useState<string>(dayjs().subtract(30, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

    // Applied date range for reports
    const [activeRange, setActiveRange] = useState<{ start: dayjs.Dayjs; end: dayjs.Dayjs }>(() => ({
        start: dayjs().startOf('isoWeek'),
        end: dayjs().endOf('isoWeek'),
    }));



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

    // Get date range based on filter string
    const getRangeForFilter = (filter: TimeFilterType, customStart?: string, customEnd?: string) => {
        let start = dayjs();
        let end = dayjs();

        switch (filter) {
            case 'today':
                start = dayjs().startOf('day');
                end = dayjs().endOf('day');
                break;
            case 'yesterday':
                start = dayjs().subtract(1, 'day').startOf('day');
                end = dayjs().subtract(1, 'day').endOf('day');
                break;
            case 'thisWeek':
                start = dayjs().startOf('isoWeek');
                end = dayjs().endOf('isoWeek');
                break;
            case 'thisMonth':
                start = dayjs().startOf('month');
                end = dayjs().endOf('month');
                break;
            case 'custom':
                start = customStart ? dayjs(customStart).startOf('day') : dayjs().subtract(30, 'day').startOf('day');
                end = customEnd ? dayjs(customEnd).endOf('day') : dayjs().endOf('day');
                break;
        }
        return { start, end };
    };

    // Automatically apply date range when timeFilter, startDate or endDate changes
    useEffect(() => {
        if (timeFilter !== 'custom') {
            const { start, end } = getRangeForFilter(timeFilter);
            setActiveRange({ start, end });
        } else {
            if (startDate && endDate) {
                if (dayjs(startDate).isAfter(dayjs(endDate))) {
                    return;
                }
                const { start, end } = getRangeForFilter('custom', startDate, endDate);
                setActiveRange({ start, end });
            }
        }
    }, [timeFilter, startDate, endDate]);

    // Filter transactions by activeRange
    const filteredTransactions = useMemo(() => {
        return transactions.filter(tx => {
            const txDate = dayjs(tx.created_at);
            return (txDate.isSame(activeRange.start, 'day') || txDate.isAfter(activeRange.start)) &&
                   (txDate.isSame(activeRange.end, 'day') || txDate.isBefore(activeRange.end));
        });
    }, [transactions, activeRange]);

    // Helper to extract discount info based on plan name regex
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

    // Financial summary metrics
    const financialMetrics = useMemo(() => {
        let gross = 0;
        let discount = 0;
        let net = 0;

        filteredTransactions.forEach(tx => {
            const price = tx.price || 0;
            const discountInfo = parseDiscountInfo(tx.plan_name, price);
            if (discountInfo) {
                gross += discountInfo.originalPrice;
                discount += discountInfo.savedAmount;
            } else {
                gross += price;
            }
            net += price;
        });

        return { gross, discount, net };
    }, [filteredTransactions]);

    const periodCoursesSold = filteredTransactions.length;

    const periodPaidUsers = useMemo(() => {
        return new Set(filteredTransactions.map(tx => tx.user?.id || '')).size;
    }, [filteredTransactions]);

    // Grouping by Hour for Hourly Reports (single day reports)
    const hourlyStats = useMemo(() => {
        const hourlyMap = new Map<number, { hour: number; gross: number; discount: number; net: number; txCount: number }>();
        
        // Fill 24 hours with 0
        for (let h = 0; h < 24; h++) {
            hourlyMap.set(h, { hour: h, gross: 0, discount: 0, net: 0, txCount: 0 });
        }

        filteredTransactions.forEach(tx => {
            const hour = dayjs(tx.created_at).hour();
            const existing = hourlyMap.get(hour);
            const price = tx.price || 0;
            const discountInfo = parseDiscountInfo(tx.plan_name, price);
            const grossVal = discountInfo ? discountInfo.originalPrice : price;
            const discountVal = discountInfo ? discountInfo.savedAmount : 0;

            if (existing) {
                existing.gross += grossVal;
                existing.discount += discountVal;
                existing.net += price;
                existing.txCount += 1;
            }
        });

        return Array.from(hourlyMap.values()).sort((a, b) => a.hour - b.hour);
    }, [filteredTransactions]);

    // Grouping by Date for Daily Reports
    const dailyStats = useMemo(() => {
        const dailyMap = new Map<string, { date: string; gross: number; discount: number; net: number; txCount: number }>();
        
        // Fill dates in range with 0
        let current = activeRange.start.clone();
        const maxDays = 366; // Safety limit
        let count = 0;
        while ((current.isBefore(activeRange.end) || current.isSame(activeRange.end, 'day')) && count < maxDays) {
            const dateStr = current.format('YYYY-MM-DD');
            dailyMap.set(dateStr, { date: dateStr, gross: 0, discount: 0, net: 0, txCount: 0 });
            current = current.add(1, 'day');
            count++;
        }

        filteredTransactions.forEach(tx => {
            const dateStr = dayjs(tx.created_at).format('YYYY-MM-DD');
            const existing = dailyMap.get(dateStr);
            const price = tx.price || 0;
            const discountInfo = parseDiscountInfo(tx.plan_name, price);
            const grossVal = discountInfo ? discountInfo.originalPrice : price;
            const discountVal = discountInfo ? discountInfo.savedAmount : 0;

            if (existing) {
                existing.gross += grossVal;
                existing.discount += discountVal;
                existing.net += price;
                existing.txCount += 1;
            } else if (timeFilter === 'custom') {
                dailyMap.set(dateStr, { date: dateStr, gross: grossVal, discount: discountVal, net: price, txCount: 1 });
            }
        });

        return Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date));
    }, [filteredTransactions, activeRange, timeFilter]);

    // Grouping by Month for Monthly Reports
    const monthlyStats = useMemo(() => {
        const monthlyMap = new Map<string, { month: string; gross: number; discount: number; net: number; txCount: number }>();

        let current = activeRange.start.clone().startOf('month');
        const maxMonths = 36; // Safety limit
        let count = 0;
        while ((current.isBefore(activeRange.end) || current.isSame(activeRange.end, 'month')) && count < maxMonths) {
            const monthStr = current.format('YYYY-MM');
            monthlyMap.set(monthStr, { month: monthStr, gross: 0, discount: 0, net: 0, txCount: 0 });
            current = current.add(1, 'month');
            count++;
        }

        filteredTransactions.forEach(tx => {
            const monthStr = dayjs(tx.created_at).format('YYYY-MM');
            const existing = monthlyMap.get(monthStr);
            const price = tx.price || 0;
            const discountInfo = parseDiscountInfo(tx.plan_name, price);
            const grossVal = discountInfo ? discountInfo.originalPrice : price;
            const discountVal = discountInfo ? discountInfo.savedAmount : 0;

            if (existing) {
                existing.gross += grossVal;
                existing.discount += discountVal;
                existing.net += price;
                existing.txCount += 1;
            } else {
                monthlyMap.set(monthStr, { month: monthStr, gross: grossVal, discount: discountVal, net: price, txCount: 1 });
            }
        });

        return Array.from(monthlyMap.values()).sort((a, b) => a.month.localeCompare(b.month));
    }, [filteredTransactions, activeRange]);

    const groupType = useMemo(() => {
        const diffDays = activeRange.end.diff(activeRange.start, 'day');
        const startDay = activeRange.start.format('YYYY-MM-DD');
        const endDay = activeRange.end.format('YYYY-MM-DD');
        if (startDay === endDay) {
            return 'hour';
        }
        if (diffDays > 60) {
            return 'month';
        }
        return 'day';
    }, [activeRange]);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };

    const formatDate = (dateStr: string) => {
        return dayjs(dateStr).format('DD/MM/YYYY HH:mm');
    };

    // ApexCharts Configurations
    const legendSeriesName = `Tổng doanh thu gồm thuế: ${financialMetrics.net.toLocaleString('vi-VN')} đ`;

    const hourlyChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                horizontal: false,
                columnWidth: '55%',
            }
        },
        colors: ['#0A7AD8'],
        xaxis: {
            categories: hourlyStats.map(item => `${String(item.hour).padStart(2, '0')}:00`),
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '11px',
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => val.toLocaleString('vi-VN') + 'đ',
                style: {
                    colors: '#6b7280',
                    fontSize: '11px',
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
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '13px',
            fontWeight: 600,
            markers: {
                shape: 'square'
            }
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    };

    const hourlyChartSeries = [
        {
            name: legendSeriesName,
            data: hourlyStats.map(item => item.net),
        },
    ];

    const dailyChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                horizontal: false,
                columnWidth: '55%',
            }
        },
        colors: ['#0A7AD8'],
        xaxis: {
            categories: dailyStats.map(item => dayjs(item.date).format('DD/MM')),
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '11px',
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => val.toLocaleString('vi-VN') + 'đ',
                style: {
                    colors: '#6b7280',
                    fontSize: '11px',
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
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '13px',
            fontWeight: 600,
            markers: {
                shape: 'square'
            }
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    };

    const dailyChartSeries = [
        {
            name: legendSeriesName,
            data: dailyStats.map(item => item.net),
        },
    ];

    const monthlyChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                horizontal: false,
                columnWidth: '35%',
            }
        },
        colors: ['#0A7AD8'],
        xaxis: {
            categories: monthlyStats.map(item => dayjs(item.month).format('MM/YYYY')),
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '11px',
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => val.toLocaleString('vi-VN') + 'đ',
                style: {
                    colors: '#6b7280',
                    fontSize: '11px',
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
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '13px',
            fontWeight: 600,
            markers: {
                shape: 'square'
            }
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    };

    const monthlyChartSeries = [
        {
            name: legendSeriesName,
            data: monthlyStats.map(item => item.net),
        },
    ];

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div>
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                    BÁO CÁO DOANH THU
                </h1>
            </div>

            {/* Filter toolbar */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 w-full lg:w-auto">
                        <div className="w-full sm:w-48">
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Thời gian</label>
                            <Select 
                                value={timeFilter} 
                                onChange={(e) => setTimeFilter(e.target.value as TimeFilterType)}
                                className="w-full"
                            >
                                <option value="today">Hôm nay</option>
                                <option value="yesterday">Hôm qua</option>
                                <option value="thisWeek">Tuần này</option>
                                <option value="thisMonth">Tháng này</option>
                                <option value="custom">Khoảng thời gian khác</option>
                            </Select>
                        </div>
                        
                        {timeFilter === 'custom' && (
                            <>
                                <div className="w-full sm:w-40">
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Từ ngày</label>
                                    <TextInput 
                                        type="date" 
                                        value={startDate} 
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full sm:w-40">
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Đến ngày</label>
                                    <TextInput 
                                        type="date" 
                                        value={endDate} 
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 self-center lg:self-end">
                        Kỳ báo cáo: <span className="text-[#0A7AD8] font-bold">{activeRange.start.format('DD/MM/YYYY')}</span> đến <span className="text-[#0A7AD8] font-bold">{activeRange.end.format('DD/MM/YYYY')}</span>
                    </div>
                </div>
            </Card>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Doanh thu gộp</p>
                        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-1">{formatPrice(financialMetrics.gross)}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Giảm giá</p>
                        <p className="text-2xl font-bold text-emerald-600 mt-1">-{formatPrice(financialMetrics.discount)}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Doanh thu thuần</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">{formatPrice(financialMetrics.net)}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Khóa học đã bán</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">{periodCoursesSold}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Người dùng trả phí</p>
                        <p className="text-2xl font-bold text-purple-600 mt-1">{periodPaidUsers}</p>
                    </div>
                </Card>
            </div>

            {/* Chart Area */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Xu hướng doanh thu
                </h3>
                {groupType === 'hour' ? (
                    hourlyStats.reduce((acc, curr) => acc + curr.net, 0) === 0 ? (
                        <div className="flex items-center justify-center py-16 text-gray-400">
                            Chưa có dữ liệu doanh thu trong khoảng thời gian này
                        </div>
                    ) : (
                        <div className="h-[300px] w-full">
                            <Chart
                                options={hourlyChartOptions}
                                series={hourlyChartSeries}
                                type="bar"
                                height="100%"
                            />
                        </div>
                    )
                ) : groupType === 'month' ? (
                    monthlyStats.length === 0 || monthlyStats.reduce((acc, curr) => acc + curr.net, 0) === 0 ? (
                        <div className="flex items-center justify-center py-16 text-gray-400">
                            Chưa có dữ liệu doanh thu trong khoảng thời gian này
                        </div>
                    ) : (
                        <div className="h-[300px] w-full">
                            <Chart
                                options={monthlyChartOptions}
                                series={monthlyChartSeries}
                                type="bar"
                                height="100%"
                            />
                        </div>
                    )
                ) : (
                    dailyStats.length === 0 || dailyStats.reduce((acc, curr) => acc + curr.net, 0) === 0 ? (
                        <div className="flex items-center justify-center py-16 text-gray-400">
                            Chưa có dữ liệu doanh thu trong khoảng thời gian này
                        </div>
                    ) : (
                        <div className="h-[300px] w-full">
                            <Chart
                                options={dailyChartOptions}
                                series={dailyChartSeries}
                                type="bar"
                                height="100%"
                            />
                        </div>
                    )
                )}
            </Card>

            {/* Summary by Hour/Day/Month Table */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4 font-bold">
                    {groupType === 'hour'
                        ? "Thống kê doanh thu theo giờ"
                        : groupType === 'month'
                        ? "Thống kê doanh thu theo tháng"
                        : "Thống kê doanh thu theo ngày"}
                </h3>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head className="bg-[#f8fafd] text-[#0A7AD8] border-b border-gray-100">
                            <Table.HeadCell>
                                {groupType === 'hour'
                                    ? "Giờ"
                                    : groupType === 'month'
                                    ? "Tháng"
                                    : "Ngày"}
                            </Table.HeadCell>
                            <Table.HeadCell>Số giao dịch thành công</Table.HeadCell>
                            <Table.HeadCell>Doanh thu gộp</Table.HeadCell>
                            <Table.HeadCell>Giảm giá</Table.HeadCell>
                            <Table.HeadCell>Doanh thu thuần</Table.HeadCell>
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
                            ) : groupType === 'hour' ? (
                                hourlyStats.filter(item => item.net > 0 || item.txCount > 0).length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={5} className="text-center py-8 text-gray-500">
                                            Không có giao dịch nào phát sinh trong thời gian này
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    hourlyStats
                                        .filter(item => item.net > 0 || item.txCount > 0)
                                        .map((item) => (
                                            <Table.Row key={item.hour}>
                                                <Table.Cell className="font-semibold text-gray-900">{item.hour}h</Table.Cell>
                                                <Table.Cell className="text-gray-500 font-medium">{item.txCount} giao dịch</Table.Cell>
                                                <Table.Cell className="font-semibold text-gray-500">{formatPrice(item.gross)}</Table.Cell>
                                                <Table.Cell className="font-semibold text-emerald-600">
                                                    {item.discount > 0 ? `-${formatPrice(item.discount)}` : '0đ'}
                                                </Table.Cell>
                                                <Table.Cell className="font-bold text-red-600">{formatPrice(item.net)}</Table.Cell>
                                            </Table.Row>
                                        ))
                                )
                            ) : groupType === 'month' ? (
                                monthlyStats.filter(item => item.net > 0 || item.txCount > 0).length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={5} className="text-center py-8 text-gray-500">
                                            Không có giao dịch nào phát sinh trong thời gian này
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    monthlyStats
                                        .filter(item => item.net > 0 || item.txCount > 0)
                                        .map((item) => (
                                            <Table.Row key={item.month}>
                                                <Table.Cell className="font-semibold text-gray-900">{dayjs(item.month).format('MM/YYYY')}</Table.Cell>
                                                <Table.Cell className="text-gray-500 font-medium">{item.txCount} giao dịch</Table.Cell>
                                                <Table.Cell className="font-semibold text-gray-500">{formatPrice(item.gross)}</Table.Cell>
                                                <Table.Cell className="font-semibold text-emerald-600">
                                                    {item.discount > 0 ? `-${formatPrice(item.discount)}` : '0đ'}
                                                </Table.Cell>
                                                <Table.Cell className="font-bold text-red-600">{formatPrice(item.net)}</Table.Cell>
                                            </Table.Row>
                                        ))
                                )
                            ) : (
                                dailyStats.filter(item => item.net > 0 || item.txCount > 0).length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={5} className="text-center py-8 text-gray-500">
                                            Không có giao dịch nào phát sinh trong thời gian này
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    dailyStats
                                        .filter(item => item.net > 0 || item.txCount > 0)
                                        .map((item) => (
                                            <Table.Row key={item.date}>
                                                <Table.Cell className="font-semibold text-gray-900">{dayjs(item.date).format('DD/MM/YYYY')}</Table.Cell>
                                                <Table.Cell className="text-gray-500 font-medium">{item.txCount} giao dịch</Table.Cell>
                                                <Table.Cell className="font-semibold text-gray-500">{formatPrice(item.gross)}</Table.Cell>
                                                <Table.Cell className="font-semibold text-emerald-600">
                                                    {item.discount > 0 ? `-${formatPrice(item.discount)}` : '0đ'}
                                                </Table.Cell>
                                                <Table.Cell className="font-bold text-red-600">{formatPrice(item.net)}</Table.Cell>
                                            </Table.Row>
                                        ))
                                )
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </Card>

            {/* Detailed Transaction History Table */}
            <Card>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4 font-bold">Chi tiết giao dịch</h3>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head className="bg-[#f8fafd] text-[#0A7AD8] border-b border-gray-100">
                            <Table.HeadCell>Ngày</Table.HeadCell>
                            <Table.HeadCell>Người dùng</Table.HeadCell>
                            <Table.HeadCell>Khóa học / Gói học</Table.HeadCell>
                            <Table.HeadCell>Doanh thu gộp</Table.HeadCell>
                            <Table.HeadCell>Giảm giá</Table.HeadCell>
                            <Table.HeadCell>Doanh thu thuần</Table.HeadCell>
                            <Table.HeadCell>Trạng thái</Table.HeadCell>
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
                            ) : filteredTransactions.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={7} className="text-center py-8 text-gray-500">
                                        Chưa có dữ liệu giao dịch trong khoảng thời gian này
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                filteredTransactions.map((tx) => {
                                    const price = tx.price || 0;
                                    const discountInfo = parseDiscountInfo(tx.plan_name, price);
                                    const grossVal = discountInfo ? discountInfo.originalPrice : price;
                                    const discountVal = discountInfo ? discountInfo.savedAmount : 0;
                                    return (
                                        <Table.Row key={tx.id}>
                                            <Table.Cell className="text-gray-500">{formatDate(tx.created_at)}</Table.Cell>
                                            <Table.Cell className="font-medium text-gray-900">{tx.user?.full_name || '-'}</Table.Cell>
                                            <Table.Cell className="text-blue-600 font-medium">{tx.plan_name || '-'}</Table.Cell>
                                            <Table.Cell className="font-semibold text-gray-500">{formatPrice(grossVal)}</Table.Cell>
                                            <Table.Cell className="font-semibold text-emerald-600">
                                                {discountVal > 0 ? `-${formatPrice(discountVal)}` : '0đ'}
                                            </Table.Cell>
                                            <Table.Cell className="font-bold text-red-600">{formatPrice(price)}</Table.Cell>
                                            <Table.Cell>
                                                <span className="text-[#339e4a] font-semibold bg-[#eafaf1] border border-[#a3e4d7] px-2.5 py-0.5 rounded-full text-[12px]">
                                                    Thành công
                                                </span>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default ReportRevenue;
