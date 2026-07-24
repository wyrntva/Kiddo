import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { lessonAPI, type Lesson, type QuizQuestion } from '../../api/lesson.api';
import LessonTabs from './LessonTabs';

const DEFAULT_IMAGES = [
    '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png',
    '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png',
    '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png',
];

type Answer = QuizQuestion['options'][number];

const createAnswer = (index: number): Answer => ({
    id: index + 1,
    label: '',
    sprite: DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
    style: { height: '100%', width: '100%', left: '0%', top: '0%' },
});

const LessonQuestionsSimple = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [voiceUrl, setVoiceUrl] = useState('');
    const [answers, setAnswers] = useState<Answer[]>([createAnswer(0), createAnswer(1), createAnswer(2)]);
    const [correctAnswer, setCorrectAnswer] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const resetForm = () => {
        setSelectedId(null);
        setPrompt('');
        setVoiceUrl('');
        setAnswers([createAnswer(0), createAnswer(1), createAnswer(2)]);
        setCorrectAnswer(1);
    };

    const loadData = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const [lessonRes, questionsRes] = await Promise.all([
                lessonAPI.getLesson(id),
                lessonAPI.getQuestions(id),
            ]);
            setLesson(lessonRes.data);
            setQuestions(questionsRes.data?.data || []);
        } catch {
            toast.error('Không thể tải danh sách câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const selectQuestion = (question: QuizQuestion) => {
        setSelectedId(question.id);
        setPrompt(question.prompt);
        setVoiceUrl(question.voiceUrl || '');
        setCorrectAnswer(question.correctOptionId);
        setAnswers(question.options.map((answer, index) => ({
            ...answer,
            id: index + 1,
            style: answer.style || { height: '100%', width: '100%', left: '0%', top: '0%' },
        })));
    };

    const updateAnswer = (index: number, changes: Partial<Answer>) => {
        setAnswers(current => current.map((answer, answerIndex) => (
            answerIndex === index ? { ...answer, ...changes } : answer
        )));
    };

    const uploadAnswerImage = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const uploadToast = toast.loading('Đang tải ảnh lên...');
        try {
            const response = await lessonAPI.uploadImage(file);
            updateAnswer(index, {
                sprite: response.data.url,
                style: { height: '100%', width: '100%', left: '0%', top: '0%' },
            });
            toast.success('Tải ảnh thành công', { id: uploadToast });
        } catch {
            toast.error('Tải ảnh thất bại', { id: uploadToast });
        } finally {
            event.target.value = '';
        }
    };

    const uploadQuestionVoice = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const uploadToast = toast.loading('Đang tải giọng đọc lên...');
        try {
            const response = await lessonAPI.uploadVoice(file);
            setVoiceUrl(response.data.url);
            toast.success('Tải giọng đọc thành công', { id: uploadToast });
        } catch {
            toast.error('Tải giọng đọc thất bại', { id: uploadToast });
        } finally {
            event.target.value = '';
        }
    };

    const addAnswer = () => {
        if (answers.length >= 5) {
            toast.error('Mỗi câu hỏi có tối đa 5 câu trả lời');
            return;
        }
        setAnswers(current => [...current, createAnswer(current.length)]);
    };

    const removeAnswer = (index: number) => {
        if (answers.length <= 2) {
            toast.error('Cần ít nhất 2 câu trả lời');
            return;
        }
        const next = answers
            .filter((_, answerIndex) => answerIndex !== index)
            .map((answer, answerIndex) => ({ ...answer, id: answerIndex + 1 }));
        setAnswers(next);
        if (correctAnswer === index + 1) setCorrectAnswer(1);
        else if (correctAnswer > index + 1) setCorrectAnswer(correctAnswer - 1);
    };

    const saveQuestion = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!id || !prompt.trim()) {
            toast.error('Vui lòng nhập nội dung câu hỏi');
            return;
        }
        const missingImgIndex = answers.findIndex(answer => !answer.sprite && !answer.img);
        if (missingImgIndex >= 0) {
            toast.error(`Vui lòng chọn hình ảnh cho Câu trả lời ${missingImgIndex + 1}`);
            return;
        }

        setSaving(true);
        try {
            const payload = { prompt: prompt.trim(), voiceUrl, correctOptionId: correctAnswer, options: answers };
            if (selectedId) {
                await lessonAPI.updateQuestion(id, selectedId, payload);
                toast.success('Cập nhật câu hỏi thành công');
            } else {
                await lessonAPI.createQuestion(id, payload);
                toast.success('Thêm câu hỏi thành công');
            }
            await loadData();
            resetForm();
        } catch {
            toast.error('Lưu câu hỏi thất bại');
        } finally {
            setSaving(false);
        }
    };

    const deleteQuestion = async (question: QuizQuestion) => {
        if (!id || !window.confirm(`Xóa câu hỏi “${question.prompt}”?`)) return;
        try {
            await lessonAPI.deleteQuestion(id, question.id);
            toast.success('Xóa câu hỏi thành công');
            if (selectedId === question.id) resetForm();
            await loadData();
        } catch {
            toast.error('Xóa câu hỏi thất bại');
        }
    };

    if (loading && !lesson) {
        return <div className="flex h-[70vh] items-center justify-center text-gray-500">Đang tải...</div>;
    }

    return (
        <div className="flex flex-col gap-4 px-6 pb-6 pt-0">
            <div>
                <button
                    type="button"
                    onClick={() => navigate('/lessons')}
                    className="mb-1 border-none bg-transparent p-0 text-sm font-medium text-gray-500 hover:text-gray-800"
                >
                    ← Quay lại danh sách bài học
                </button>
                <h1 className="text-xl font-bold uppercase text-[#37393E] dark:text-white">THIẾT LẬP BÀI HỌC</h1>
                <p className="text-sm text-gray-500">{lesson?.title}</p>
            </div>

            <div className="flex flex-col overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <LessonTabs lessonId={id!} activeTab="questions" />

                <div className="grid lg:grid-cols-[320px_1fr]">
                    <aside className="flex flex-col border-r border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/20">
                        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white">Danh sách câu hỏi</h2>
                                <p className="text-xs text-gray-500">{questions.length} câu hỏi</p>
                            </div>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-xl bg-[#FEA01F] px-3 py-2 text-xs font-bold text-white hover:bg-[#E68A10]"
                            >
                                + Thêm mới
                            </button>
                        </div>

                        <div className="space-y-2 p-3">
                            {questions.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
                                    <p className="font-medium text-gray-700 dark:text-gray-200">Chưa có câu hỏi</p>
                                    <p className="mt-1 text-xs text-gray-500">Nhập câu hỏi ở bên phải để bắt đầu.</p>
                                </div>
                            ) : questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${
                                        selectedId === question.id
                                            ? 'border-[#FEA01F] bg-orange-50'
                                            : 'border-gray-200 bg-white hover:border-orange-300 dark:border-gray-700 dark:bg-gray-800'
                                    }`}
                                    onClick={() => selectQuestion(question)}
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#E68A10]">
                                        {index + 1}
                                    </span>
                                    <p className="min-w-0 flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">{question.prompt}</p>
                                    <button
                                        type="button"
                                        aria-label="Xóa câu hỏi"
                                        onClick={event => {
                                            event.stopPropagation();
                                            deleteQuestion(question);
                                        }}
                                        className="text-red-500 opacity-60 hover:opacity-100"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <main className="p-5 lg:p-6">
                        <form onSubmit={saveQuestion} className="mx-auto max-w-4xl space-y-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {selectedId ? 'Chỉnh sửa câu hỏi' : 'Tạo câu hỏi mới'}
                                    </h2>
                                    <p className="text-sm text-gray-500">Nhập câu hỏi, các câu trả lời và chọn một đáp án đúng.</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="shrink-0 rounded-xl bg-[#339E4A] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2c8a40] disabled:opacity-60"
                                >
                                    {saving ? 'Đang lưu...' : '✓ Lưu câu hỏi'}
                                </button>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Nội dung câu hỏi</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={prompt}
                                    onChange={event => setPrompt(event.target.value)}
                                    placeholder="Ví dụ: Theo con, Toro đang cảm thấy thế nào?"
                                    className="block w-full rounded-xl border-gray-300 text-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/20">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Giọng đọc câu hỏi</p>
                                        <p className="text-xs text-gray-500">Tải file MP3, WAV, M4A, OGG hoặc WebM, tối đa 10 MB.</p>
                                    </div>
                                    <label className="cursor-pointer rounded-xl border border-[#FEA01F] bg-white px-4 py-2 text-sm font-bold text-[#E68A10] hover:bg-orange-50 dark:bg-gray-800">
                                        {voiceUrl ? 'Thay giọng đọc' : '+ Tải giọng đọc'}
                                        <input
                                            type="file"
                                            accept="audio/mpeg,audio/wav,audio/mp4,audio/ogg,audio/webm,.mp3,.wav,.m4a,.ogg,.webm"
                                            className="hidden"
                                            onChange={uploadQuestionVoice}
                                        />
                                    </label>
                                </div>
                                {voiceUrl && (
                                    <div className="mt-3 flex items-center gap-3">
                                        <audio controls src={voiceUrl} className="h-10 min-w-0 flex-1" />
                                        <button
                                            type="button"
                                            onClick={() => setVoiceUrl('')}
                                            className="rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )}
                            </div>

                            <section>
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase text-gray-800 dark:text-gray-200">Các câu trả lời</h3>
                                        <p className="text-xs text-gray-500">Bấm vào vòng tròn để chọn đáp án đúng.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addAnswer}
                                        className="rounded-xl border border-[#FEA01F] px-3 py-2 text-xs font-bold text-[#E68A10] hover:bg-orange-50"
                                    >
                                        + Thêm câu trả lời
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {answers.map((answer, index) => {
                                        const isCorrect = correctAnswer === answer.id;
                                        return (
                                            <div
                                                key={answer.id}
                                                className={`grid items-center gap-3 rounded-xl border-2 p-3 md:grid-cols-[36px_64px_1fr_auto] ${
                                                    isCorrect ? 'border-[#339E4A] bg-green-50' : 'border-gray-200 dark:border-gray-700'
                                                }`}
                                            >
                                                <label className="flex cursor-pointer justify-center" title="Chọn làm đáp án đúng">
                                                    <input
                                                        type="radio"
                                                        name="correctAnswer"
                                                        checked={isCorrect}
                                                        onChange={() => setCorrectAnswer(answer.id)}
                                                        className="h-5 w-5 border-gray-300 text-[#339E4A] focus:ring-[#339E4A]"
                                                    />
                                                </label>

                                                <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-white">
                                                    <img src={answer.sprite} alt="" className="h-full w-full object-cover" />
                                                </div>

                                                <div>
                                                    <label className="mb-1 block text-xs font-bold text-gray-600">
                                                        Câu trả lời {index + 1} {isCorrect && <span className="text-[#339E4A]">— Đáp án đúng</span>}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={answer.label}
                                                        onChange={event => updateAnswer(index, { label: event.target.value })}
                                                        placeholder={`Nhập câu trả lời ${index + 1} (Không bắt buộc)`}
                                                        className="block w-full rounded-lg border-gray-300 text-sm focus:border-[#FEA01F] focus:ring-[#FEA01F]"
                                                    />
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <label className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium hover:bg-gray-50">
                                                        Đổi ảnh
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={event => uploadAnswerImage(event, index)}
                                                        />
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAnswer(index)}
                                                        className="rounded-lg px-2 py-2 text-sm text-red-500 hover:bg-red-50"
                                                        aria-label={`Xóa câu trả lời ${index + 1}`}
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LessonQuestionsSimple;
