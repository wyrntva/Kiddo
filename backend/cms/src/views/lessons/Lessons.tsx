import React, { useEffect, useState } from 'react';
import { Card, Table, TextInput } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { lessonAPI, Lesson } from '../../api/lesson.api';
import { zoneAPI, Zone } from '../../api/zone.api';

const Lessons = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        emoji: '📚',
        img: '',
        zoneId: '',
        stepsCount: 5,
        duration: '20 phút',
        stars: 10,
    });

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const res = await lessonAPI.getLessons();
            setLessons(res.data?.data || []);
        } catch (err) {
            toast.error('Không thể tải danh sách bài học');
        } finally {
            setLoading(false);
        }
    };

    const fetchZones = async () => {
        try {
            const res = await zoneAPI.getZones();
            setZones(res.data?.data || []);
        } catch (err) {
            console.error('Không thể tải danh sách vùng đất cho bộ chọn');
        }
    };

    useEffect(() => {
        fetchLessons();
        fetchZones();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Bạn có chắc muốn xóa bài học ${title}?`)) return;
        try {
            await lessonAPI.deleteLesson(id);
            toast.success('Xóa bài học thành công');
            fetchLessons();
        } catch (err) {
            toast.error('Xóa bài học thất bại');
        }
    };

    const handleAddClick = () => {
        setSelectedLesson(null);
        setFormData({
            title: '',
            emoji: '📚',
            img: '',
            zoneId: zones[0]?.id || '',
            stepsCount: 5,
            duration: '20 phút',
            stars: 10,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setFormData({
            title: lesson.title,
            emoji: lesson.emoji,
            img: lesson.img || '',
            zoneId: lesson.zoneId,
            stepsCount: lesson.stepsCount,
            duration: lesson.duration,
            stars: lesson.stars,
        });
        setIsModalOpen(true);
    };

    const handleEditQuestionsClick = (lesson: Lesson) => {
        navigate(`/lessons/${lesson.id}/questions`);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadToast = toast.loading('Đang tải ảnh lên...');
        try {
            const res = await lessonAPI.uploadImage(file);
            setFormData(prev => ({ ...prev, img: res.data.url }));
            toast.success('Tải ảnh lên thành công', { id: uploadToast });
        } catch (err) {
            toast.error('Tải ảnh lên thất bại', { id: uploadToast });
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.zoneId) {
            toast.error('Vui lòng chọn một Vùng đất');
            return;
        }
        try {
            if (selectedLesson) {
                await lessonAPI.updateLesson(selectedLesson.id, formData);
                toast.success('Cập nhật bài học thành công');
            } else {
                await lessonAPI.createLesson(formData);
                toast.success('Thêm bài học mới thành công');
            }
            setIsModalOpen(false);
            fetchLessons();
        } catch (err) {
            toast.error('Thao tác thất bại');
        }
    };

    const filtered = lessons.filter(l => 
        l.title.toLowerCase().includes(search.toLowerCase()) || 
        l.zone?.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                        QUẢN LÝ BÀI HỌC
                    </h1>
                </div>
                <div className="flex gap-4 w-full md:w-auto items-center justify-end">
                    <div className="w-full md:w-72">
                        <TextInput 
                            placeholder="Tìm kiếm bài học..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={handleAddClick}
                        className="bg-[#FEA01F] hover:bg-[#E68A10] text-white px-4 py-2 font-medium border-none shrink-0 rounded-[16px] transition-colors duration-200"
                    >
                        Thêm bài học
                    </button>
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Ảnh</Table.HeadCell>
                            <Table.HeadCell>Tên bài học</Table.HeadCell>
                            <Table.HeadCell>Vùng đất</Table.HeadCell>
                            <Table.HeadCell>Số bước học</Table.HeadCell>
                            <Table.HeadCell>Sao thưởng</Table.HeadCell>
                            <Table.HeadCell><span className="sr-only">Actions</span></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={6} className="text-center py-8">
                                        Đang tải dữ liệu...
                                    </Table.Cell>
                                </Table.Row>
                            ) : filtered.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                                        Không tìm thấy bài học nào
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                filtered.map((item) => (
                                    <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            <div className={`w-16 h-12 flex items-center justify-center rounded-lg overflow-hidden ${
                                                item.img 
                                                    ? '' 
                                                    : 'bg-gray-50 border border-gray-100 p-1 dark:bg-gray-900 dark:border-gray-700'
                                            }`}>
                                                {item.img ? (
                                                    <img 
                                                        src={item.img} 
                                                        alt={item.title} 
                                                        className="w-full h-full object-cover"
                                                    />
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
                                        <Table.Cell>{item.stepsCount} bước ({item.duration})</Table.Cell>
                                        <Table.Cell className="text-yellow-500 font-bold">{item.stars} ⭐</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-4">
                                                <button onClick={() => handleEditClick(item)} className="text-[#0A7AD8] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">Sửa</button>
                                                <button onClick={() => handleEditQuestionsClick(item)} className="text-[#FEA01F] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">Câu hỏi</button>
                                                <button onClick={() => handleDelete(item.id, item.title)} className="text-[#ED052A] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">Xóa</button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </Card>

            {/* Custom Premium Tailwind Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-[16px] shadow-xl w-full max-w-lg p-6 mx-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {selectedLesson ? 'Cập nhật Bài học' : 'Thêm Bài học mới'}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên bài học</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.title} 
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vùng đất học tập</label>
                                <select
                                    value={formData.zoneId}
                                    onChange={e => setFormData({ ...formData, zoneId: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                >
                                    <option value="" disabled>-- Chọn một Vùng đất --</option>
                                    {zones.map(z => (
                                        <option key={z.id} value={z.id}>{z.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ảnh bài học</label>
                                <div className="mt-1 flex items-center gap-3">
                                    {formData.img && (
                                        <div className="w-16 h-12 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shrink-0 dark:bg-gray-900 dark:border-gray-700">
                                            <img src={formData.img} alt="Ảnh bài học" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    )}
                                    <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-[16px] py-2 px-3 hover:border-[#FEA01F] cursor-pointer transition-colors duration-200 dark:border-gray-600">
                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Tải ảnh lên</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleImageUpload} 
                                            className="hidden" 
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thời lượng ước tính</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={formData.duration} 
                                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="Ví dụ: 20 phút"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Số bước học</label>
                                    <input 
                                        type="number" 
                                        required 
                                        min={1}
                                        value={formData.stepsCount} 
                                        onChange={e => setFormData({ ...formData, stepsCount: parseInt(e.target.value, 10) || 5 })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sao thưởng</label>
                                <input 
                                    type="number" 
                                    required 
                                    min={0}
                                    value={formData.stars} 
                                    onChange={e => setFormData({ ...formData, stars: parseInt(e.target.value, 10) || 10 })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-[16px] text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-[#FEA01F] hover:bg-[#E68A10] border border-transparent rounded-[16px] text-sm font-medium text-white transition-colors duration-200"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lessons;
