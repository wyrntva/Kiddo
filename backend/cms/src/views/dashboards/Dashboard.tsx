import React, { useEffect, useState } from 'react';
import { Card, Table } from 'flowbite-react';
import { poolArenaUserAPI } from '../../api/poolArenaUser.api';
import { zoneAPI } from '../../api/zone.api';
import { lessonAPI } from '../../api/lesson.api';
import { newsAPI } from '../../api/news.api';
import type { PoolArenaUser } from '../../types/api';
import type { Zone } from '../../api/zone.api';
import type { Lesson } from '../../api/lesson.api';
import type { NewsArticle } from '../../api/news.api';

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [zonesCount, setZonesCount] = useState(0);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<PoolArenaUser[]>([]);
  const [recentLessons, setRecentLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const usersRes = await poolArenaUserAPI.getUsers({ limit: 5 });
        const allUsers = usersRes.data?.data || [];
        setUsersCount(usersRes.data?.total || allUsers.length);
        setRecentUsers(allUsers.slice(0, 5));

        // Fetch zones
        const zonesRes = await zoneAPI.getZones();
        const allZones = zonesRes.data?.data || [];
        setZonesCount(allZones.length);

        // Fetch lessons
        const lessonsRes = await lessonAPI.getLessons();
        const allLessons = lessonsRes.data?.data || [];
        setLessonsCount(allLessons.length);
        setRecentLessons(allLessons.slice(0, 5));

        // Fetch news
        const newsRes = await newsAPI.getAll(1, 1);
        setNewsCount(newsRes.data?.total || 0);
      } catch (err) {
        console.error('Không thể tải thông tin tổng quan', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-0 px-6 pb-6 space-y-6">
      {/* Page Header matching others */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white">
            TỔNG QUAN HỆ THỐNG
          </h1>
        </div>
      </div>

      {/* Stats Grid - No icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Người dùng nhí</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {loading ? '...' : usersCount}
            </h3>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vùng đất học tập</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {loading ? '...' : zonesCount}
            </h3>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Số bài học</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {loading ? '...' : lessonsCount}
            </h3>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tin tức & hoạt động</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {loading ? '...' : newsCount}
            </h3>
          </div>
        </Card>
      </div>

      {/* Lists Row - No icons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <Card>
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Người dùng đăng ký gần đây
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Học sinh</Table.HeadCell>
                <Table.HeadCell>Phụ huynh</Table.HeadCell>
                <Table.HeadCell>Điểm số</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {loading ? (
                  <Table.Row>
                    <Table.Cell colSpan={3} className="text-center py-4">Đang tải...</Table.Cell>
                  </Table.Row>
                ) : recentUsers.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={3} className="text-center py-4 text-gray-500">Chưa có người dùng</Table.Cell>
                  </Table.Row>
                ) : (
                  recentUsers.map((u) => (
                    <Table.Row key={u.id}>
                      <Table.Cell className="font-medium text-gray-900 dark:text-white">{u.full_name}</Table.Cell>
                      <Table.Cell>{u.parent_name || 'N/A'}</Table.Cell>
                      <Table.Cell className="font-bold text-yellow-500">{u.points} sao</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </Card>

        {/* Recent lessons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Bài học mới thêm
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Tên bài học</Table.HeadCell>
                <Table.HeadCell>Vùng đất</Table.HeadCell>
                <Table.HeadCell>Sao thưởng</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {loading ? (
                  <Table.Row>
                    <Table.Cell colSpan={3} className="text-center py-4">Đang tải...</Table.Cell>
                  </Table.Row>
                ) : recentLessons.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={3} className="text-center py-4 text-gray-500">Chưa có bài học</Table.Cell>
                  </Table.Row>
                ) : (
                  recentLessons.map((l) => (
                    <Table.Row key={l.id}>
                      <Table.Cell className="font-medium text-gray-900 dark:text-white">{l.title}</Table.Cell>
                      <Table.Cell>
                        <span className="px-2.5 py-0.5 rounded text-white text-xs" style={{ backgroundColor: l.zone?.color }}>
                          {l.zone?.name}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="font-bold text-yellow-500">{l.stars} sao</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;