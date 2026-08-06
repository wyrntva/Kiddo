import React, { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { lessonAPI } from '../../api/lesson.api';
import { zoneAPI, type Zone } from '../../api/zone.api';
import LessonTabs from './LessonTabs';

const LessonEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        emoji: '',
        img: '',
        level: '',
        zoneId: '',
        stars: 0,
        welcomeText: '',
        preVideoText: '',
        postVideoText: '',
        welcomeAudio: '',
        preVideoAudio: '',
        postVideoAudio: '',
        videoUrl: '',
        postQuestionText: '',
        postQuestionAudio: '',
        lockStatus: 'UNLOCKED' as 'UNLOCKED' | 'PAID' | 'DEV',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const [lessonRes, zonesRes] = await Promise.all([
                    lessonAPI.getLesson(id),
                    zoneAPI.getZones(),
                ]);
                const lesson: any = (lessonRes.data as any)?.data || lessonRes.data;
                setZones(zonesRes.data?.data || []);

                const title = lesson.title || '';
                const welcomeTextFallback = lesson.welcomeText || `Xin chào bé, Toro đây. Hôm nay Toro sẽ cùng bé học về "${title}". Bé đã sẵn sàng chưa nhỉ? Hãy chạm vào nút bắt đầu bên dưới để đi cùng Toro nào`;
                
                let preVideoTextFallback = lesson.preVideoText || `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ cảm thấy thế nào nha!`;
                if (!lesson.preVideoText && title) {
                    if (title.toLowerCase().includes('vui')) {
                        preVideoTextFallback = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã vui vì những điều gì nha!`;
                    } else if (title.toLowerCase().includes('buồn')) {
                        preVideoTextFallback = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã buồn vì những điều gì nha!`;
                    } else if (title.toLowerCase().includes('giận')) {
                        preVideoTextFallback = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã tức giận vì những điều gì nha!`;
                    } else if (title.toLowerCase().includes('sợ')) {
                        preVideoTextFallback = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã sợ hãi vì những điều gì nha!`;
                    }
                }

                const postVideoTextFallback = lesson.postVideoText || 'Mình vừa xem xong câu chuyện rồi! Bé có thích câu chuyện không nào? Bây giờ, Toro có vài câu hỏi dành cho bé đây. Bé hãy lắng nghe thật kỹ và chọn đáp án đúng nhé!';

                const welcomeAudioFallback = lesson.welcomeAudio || '/uploads/voices/gioi_thieu.mp3';
                const preVideoAudioFallback = lesson.preVideoAudio || '/uploads/voices/truoc_video.mp3';
                const postVideoAudioFallback = lesson.postVideoAudio || '/uploads/voices/sau_video.mp3';
                const videoUrlFallback = lesson.videoUrl || '/uploads/videos/videobai1.mov';
                const postQuestionTextFallback = lesson.postQuestionText || 'Chúc mừng bé đã hoàn thành các câu hỏi! Giờ chúng ta hãy cùng nhau chơi game nhé!';
                const postQuestionAudioFallback = lesson.postQuestionAudio || '';

                setFormData({
                    title: title,
                    description: lesson.description || '',
                    emoji: lesson.emoji || '',
                    img: lesson.img || '',
                    level: lesson.level || '',
                    zoneId: lesson.zoneId || '',
                    stars: lesson.stars || 0,
                    welcomeText: welcomeTextFallback,
                    preVideoText: preVideoTextFallback,
                    postVideoText: postVideoTextFallback,
                    welcomeAudio: welcomeAudioFallback,
                    preVideoAudio: preVideoAudioFallback,
                    postVideoAudio: postVideoAudioFallback,
                    videoUrl: videoUrlFallback,
                    postQuestionText: postQuestionTextFallback,
                    postQuestionAudio: postQuestionAudioFallback,
                    lockStatus: lesson.lockStatus || 'UNLOCKED',
                });
            } catch {
                toast.error('Không thể tải thông tin bài học');
                navigate('/lessons');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const uploadToast = toast.loading('Đang tải ảnh lên...');
        try {
            const res = await lessonAPI.uploadImage(file);
            setFormData(current => ({ ...current, img: res.data.url }));
            toast.success('Tải ảnh lên thành công', { id: uploadToast });
        } catch {
            toast.error('Tải ảnh lên thất bại', { id: uploadToast });
        }
    };

    const getAudioSrc = (url: string) => {
        if (!url) return '';
        if (url.startsWith('/uploads/')) {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            return `${API_URL}${url}`;
        }
        return url;
    };

    const getVideoSrc = (url: string) => {
        if (!url) return '';
        if (url.startsWith('/uploads/')) {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            return `${API_URL}${url}`;
        }
        return url;
    };

    const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'welcomeAudio' | 'preVideoAudio' | 'postVideoAudio' | 'postQuestionAudio') => {
        const file = event.target.files?.[0];
        if (!file) return;

        const uploadToast = toast.loading('Đang tải file âm thanh lên...');
        try {
            const res = await lessonAPI.uploadVoice(file);
            setFormData(current => ({ ...current, [fieldName]: res.data.url }));
            toast.success('Tải file âm thanh lên thành công', { id: uploadToast });
        } catch {
            toast.error('Tải file âm thanh lên thất bại', { id: uploadToast });
        }
    };

    const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const uploadToast = toast.loading('Đang tải video lên (có thể mất vài giây)...');
        try {
            const res = await lessonAPI.uploadVideo(file);
            setFormData(current => ({ ...current, videoUrl: res.data.url }));
            toast.success('Tải video lên thành công', { id: uploadToast });
        } catch {
            toast.error('Tải video lên thất bại', { id: uploadToast });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!id || !formData.zoneId) {
            toast.error('Vui lòng chọn một Vùng đất');
            return;
        }

        setSaving(true);
        try {
            await lessonAPI.updateLesson(id, formData);
            toast.success('Cập nhật bài học thành công');
        } catch {
            toast.error('Cập nhật bài học thất bại');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="space-y-6 px-6 pb-6 pt-0">
            <button
                type="button"
                onClick={() => navigate('/lessons')}
                className="inline-flex items-center gap-3 rounded-[12px] border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
                <span aria-hidden="true">←</span>
                Quay lại trang bài học
            </button>

            <div>
                <h1 className="text-2xl font-bold text-gray-950 dark:text-white">CẬP NHẬT BÀI HỌC</h1>
                <p className="mt-1 text-sm text-gray-500">Chỉnh sửa toàn bộ thông tin và nội dung của bài học</p>
            </div>

            <div className="w-full overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <LessonTabs lessonId={id!} activeTab="information" />
                <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-5 p-5 md:p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên bài học</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={event => setFormData({ ...formData, title: event.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vùng đất học tập</label>
                            <select
                                required
                                value={formData.zoneId}
                                onChange={event => setFormData({ ...formData, zoneId: event.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="" disabled>-- Chọn một Vùng đất --</option>
                                {zones.map(zone => (
                                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nội dung bài học</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={event => setFormData({ ...formData, description: event.target.value })}
                                placeholder="Nhập nội dung giới thiệu hiển thị bên dưới tên bài học..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ảnh bài học</label>
                            <div className="mt-1 flex items-center gap-3">
                                {formData.img && (
                                    <div className="h-[74px] w-[90px] shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                                        <img src={formData.img} alt="Ảnh bài học" className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <label className="flex min-h-[74px] flex-1 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 px-4 hover:border-[#FEA01F] dark:border-gray-600">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tải ảnh lên</span>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sao thưởng</label>
                            <input
                                type="number"
                                required
                                min={0}
                                value={formData.stars}
                                onChange={event => setFormData({ ...formData, stars: Number(event.target.value) })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái khóa</label>
                            <select
                                value={formData.lockStatus}
                                onChange={event => setFormData({ ...formData, lockStatus: event.target.value as 'UNLOCKED' | 'PAID' | 'DEV' })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                            >
                                <option value="UNLOCKED">Không khóa (Miễn phí)</option>
                                <option value="PAID">Khóa trả phí (Chỉ tài khoản Paid)</option>
                                <option value="DEV">Đang phát triển (Khóa hoàn toàn)</option>
                            </select>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700 md:col-span-2 my-2" />
                        
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nội dung màn hình chào mừng (Welcome)</h3>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lời thoại chào mừng</label>
                            <textarea
                                rows={3}
                                value={formData.welcomeText}
                                onChange={event => setFormData({ ...formData, welcomeText: event.target.value })}
                                placeholder="Nhập lời chào Toro nói lúc bé bắt đầu học..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File âm thanh chào mừng (Giọng đọc)</label>
                            <div className="mt-1 flex items-center gap-3">
                                {formData.welcomeAudio && (
                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-between dark:border-gray-700 dark:bg-gray-900">
                                        <audio src={getAudioSrc(formData.welcomeAudio)} controls className="h-8 max-w-full" />
                                        <span className="text-xs text-gray-500 truncate max-w-[200px]">{formData.welcomeAudio}</span>
                                    </div>
                                )}
                                <label className="flex min-h-[50px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 px-4 hover:border-[#FEA01F] dark:border-gray-600">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tải file âm thanh</span>
                                    <input type="file" accept="audio/*" onChange={event => handleAudioUpload(event, 'welcomeAudio')} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700 md:col-span-2 my-2" />

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nội dung trước Video (Pre-Video)</h3>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lời thoại trước Video</label>
                            <textarea
                                rows={3}
                                value={formData.preVideoText}
                                onChange={event => setFormData({ ...formData, preVideoText: event.target.value })}
                                placeholder="Nhập lời thoại Toro nói trước khi mở video..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File âm thanh trước Video (Giọng đọc)</label>
                            <div className="mt-1 flex items-center gap-3">
                                {formData.preVideoAudio && (
                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-between dark:border-gray-700 dark:bg-gray-900">
                                        <audio src={getAudioSrc(formData.preVideoAudio)} controls className="h-8 max-w-full" />
                                        <span className="text-xs text-gray-500 truncate max-w-[200px]">{formData.preVideoAudio}</span>
                                    </div>
                                )}
                                <label className="flex min-h-[50px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 px-4 hover:border-[#FEA01F] dark:border-gray-600">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tải file âm thanh</span>
                                    <input type="file" accept="audio/*" onChange={event => handleAudioUpload(event, 'preVideoAudio')} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700 md:col-span-2 my-2" />

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Video bài học</h3>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File Video bài học</label>
                            <div className="mt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                {formData.videoUrl && (
                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col gap-2 dark:border-gray-700 dark:bg-gray-900">
                                        <video src={getVideoSrc(formData.videoUrl)} controls className="w-full max-h-[220px] rounded-lg bg-black object-contain" />
                                        <span className="text-xs text-gray-500 truncate max-w-full">{formData.videoUrl}</span>
                                    </div>
                                )}
                                <label className="flex min-h-[70px] sm:w-[200px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 px-4 hover:border-[#FEA01F] dark:border-gray-600">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tải Video mới lên</span>
                                    <span className="text-xs text-gray-400">MP4, WebM, MOV</span>
                                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700 md:col-span-2 my-2" />

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nội dung sau Video (Post-Video)</h3>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lời thoại sau Video</label>
                            <textarea
                                rows={3}
                                value={formData.postVideoText}
                                onChange={event => setFormData({ ...formData, postVideoText: event.target.value })}
                                placeholder="Nhập lời thoại Toro nói sau khi xem xong video..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File âm thanh sau Video (Giọng đọc)</label>
                            <div className="mt-1 flex items-center gap-3">
                                {formData.postVideoAudio && (
                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-between dark:border-gray-700 dark:bg-gray-900">
                                        <audio src={getAudioSrc(formData.postVideoAudio)} controls className="h-8 max-w-full" />
                                        <span className="text-xs text-gray-500 truncate max-w-[200px]">{formData.postVideoAudio}</span>
                                    </div>
                                )}
                                <label className="flex min-h-[50px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 px-4 hover:border-[#FEA01F] dark:border-gray-600">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tải file âm thanh</span>
                                    <input type="file" accept="audio/*" onChange={event => handleAudioUpload(event, 'postVideoAudio')} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700 md:col-span-2 my-2" />

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nội dung sau câu hỏi (Post-Question)</h3>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lời thoại sau câu hỏi</label>
                            <textarea
                                rows={3}
                                value={formData.postQuestionText}
                                onChange={event => setFormData({ ...formData, postQuestionText: event.target.value })}
                                placeholder="Nhập lời thoại Toro nói sau khi bé hoàn thành các câu hỏi..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File âm thanh sau câu hỏi (Giọng đọc)</label>
                            <div className="mt-1 flex items-center gap-3">
                                {formData.postQuestionAudio && (
                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-between dark:border-gray-700 dark:bg-gray-900">
                                        <audio src={getAudioSrc(formData.postQuestionAudio)} controls className="h-8 max-w-full" />
                                        <span className="text-xs text-gray-500 truncate max-w-[200px]">{formData.postQuestionAudio}</span>
                                    </div>
                                )}
                                <label className="flex min-h-[50px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 px-4 hover:border-[#FEA01F] dark:border-gray-600">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tải file âm thanh</span>
                                    <input type="file" accept="audio/*" onChange={event => handleAudioUpload(event, 'postQuestionAudio')} className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/lessons')}
                                className="rounded-[16px] border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-[16px] bg-[#FEA01F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#E68A10] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LessonEdit;
