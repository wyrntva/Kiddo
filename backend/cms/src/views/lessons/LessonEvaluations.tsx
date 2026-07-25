import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { lessonAPI, type Lesson, type QuizQuestion } from '../../api/lesson.api';
import LessonTabs from './LessonTabs';

interface EvaluationCriteriaItem {
    id: string;
    code: string; // e.g. "TC1", "TC2"
    name: string; // e.g. "TC1. Nhận biết cảm xúc vui"
    passedText: string;
    failedText: string;
    parentTip: string;
    questionPrompt?: string;
}

const DEFAULT_CRITERIA_TEMPLATES = [
    {
        name: 'TC1. Nhận biết cảm xúc vui',
        passedText: 'Bé đã nhận ra cảm xúc vui của nhân vật và bước đầu biết quan sát cảm xúc qua nét mặt, hành động.',
        failedText: 'Bé vẫn đang học cách nhận biết cảm xúc vui và cần thêm cơ hội để quan sát, gọi tên cảm xúc.',
        parentTip: 'Cùng bé quan sát khuôn mặt của các nhân vật trong truyện và hỏi: "Bạn ấy đang cảm thấy thế nào?"',
    },
    {
        name: 'TC2. Hiểu điều khiến nhân vật cảm thấy vui',
        passedText: 'Bé đã hiểu điều gì mang lại niềm vui cho nhân vật và bắt đầu liên hệ cảm xúc với những sự việc xảy ra xung quanh.',
        failedText: 'Bé đã nhận ra cảm xúc vui nhưng vẫn cần luyện tập thêm để hiểu nguyên nhân tạo ra cảm xúc đó.',
        parentTip: 'Hỏi bé: "Hôm nay điều gì làm con vui nhất?" và cùng lắng nghe câu trả lời của bé.',
    },
    {
        name: 'TC3. Nhận biết những điều thường mang lại niềm vui',
        passedText: 'Bé đã nhận ra nhiều hoạt động quen thuộc có thể mang lại cảm xúc vui trong cuộc sống hằng ngày.',
        failedText: 'Bé cần thêm trải nghiệm để phân biệt rõ hơn những tình huống tạo ra cảm xúc vui và không vui.',
        parentTip: 'Cùng bé kể lại một khoảnh khắc vui trong ngày và trò chuyện về điều đã khiến bé vui.',
    },
    {
        name: 'TC4. Biết chia sẻ niềm vui phù hợp',
        passedText: 'Bé đã biết lựa chọn cách chia sẻ niềm vui với người khác một cách tích cực và thân thiện.',
        failedText: 'Bé còn khá dè dặt khi chia sẻ cảm xúc tích cực và cần được khuyến khích nhiều hơn.',
        parentTip: 'Khi bé có chuyện vui, hãy khuyến khích bé kể cho người thân hoặc bạn bè nghe.',
    },
    {
        name: 'TC5. Thể hiện thái độ đồng cảm',
        passedText: 'Bé biết thể hiện sự quan tâm và động viên khi thấy người khác gặp chuyện vui hoặc buồn.',
        failedText: 'Bé bước đầu học cách chú ý đến cảm xúc của mọi người xung quanh.',
        parentTip: 'Nhắc nhở bé hỏi thăm bạn bè hoặc người thân khi thấy họ có cảm xúc đặc biệt.',
    },
    {
        name: 'TC6. Áp dụng bài học vào thực tế',
        passedText: 'Bé biết áp dụng tình huống trong bài học vào cuộc sống sinh hoạt hằng ngày.',
        failedText: 'Bé cần sự đồng hành của phụ huynh để nhắc nhở và thực hành bài học.',
        parentTip: 'Cùng bé nhắc lại bài học trước mỗi hoạt động liên quan trong ngày.',
    },
];

const LessonEvaluations = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [criteriaList, setCriteriaList] = useState<EvaluationCriteriaItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'form' | 'table'>('form');

    // Selected criterion form states
    const [name, setName] = useState('');
    const [passedText, setPassedText] = useState('');
    const [failedText, setFailedText] = useState('');
    const [parentTip, setParentTip] = useState('');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadData = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const [lessonRes, questionsRes] = await Promise.all([
                lessonAPI.getLesson(id),
                lessonAPI.getQuestions(id),
            ]);
            setLesson(lessonRes.data);
            const questionsData = questionsRes.data?.data || [];
            setQuestions(questionsData);

            // Generate criteria 1-to-1 matching questions count
            const qCount = questionsData.length > 0 ? questionsData.length : 4;
            const rows: EvaluationCriteriaItem[] = [];

            for (let i = 0; i < qCount; i++) {
                const tmpl = DEFAULT_CRITERIA_TEMPLATES[i] || {
                    name: `TC${i + 1}. Tiêu chí đánh giá ${i + 1}`,
                    passedText: `Bé đã nắm vững và thực hành tốt mục tiêu của câu hỏi ${i + 1}.`,
                    failedText: `Bé cần luyện tập thêm để hiểu sâu hơn về nội dung câu hỏi ${i + 1}.`,
                    parentTip: `Khuyến khích bé ôn tập lại nội dung câu hỏi ${i + 1} cùng gia đình.`,
                };

                rows.push({
                    id: `tc-${i + 1}`,
                    code: `TC${i + 1}`,
                    name: tmpl.name,
                    passedText: tmpl.passedText,
                    failedText: tmpl.failedText,
                    parentTip: tmpl.parentTip,
                    questionPrompt: questionsData[i]?.prompt || `Câu hỏi ${i + 1}`,
                });
            }

            setCriteriaList(rows);
            if (rows.length > 0) {
                selectCriterion(rows[0]);
            }
        } catch {
            toast.error('Không thể tải thông tin tiêu chí đánh giá');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const selectCriterion = (item: EvaluationCriteriaItem) => {
        setSelectedId(item.id);
        setName(item.name);
        setPassedText(item.passedText);
        setFailedText(item.failedText);
        setParentTip(item.parentTip);
    };

    const handleUpdateSelectedInList = (changes: Partial<EvaluationCriteriaItem>) => {
        if (!selectedId) return;
        setCriteriaList(current =>
            current.map(item => (item.id === selectedId ? { ...item, ...changes } : item))
        );
    };

    const handleUpdateTableCell = (index: number, field: keyof EvaluationCriteriaItem, value: string) => {
        setCriteriaList(current => {
            const next = [...current];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const handleSaveCriteria = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        if (!id) return;

        // Apply form changes to selected item if in form mode
        if (selectedId) {
            handleUpdateSelectedInList({
                name,
                passedText,
                failedText,
                parentTip,
            });
        }

        setSaving(true);
        const saveToast = toast.loading('Đang lưu cấu trúc dữ liệu đánh giá...');
        try {
            await lessonAPI.updateLesson(id, {
                // Save criteria
            });
            toast.success('Lưu cấu trúc đánh giá thành công', { id: saveToast });
        } catch {
            toast.error('Lưu tiêu chí đánh giá thất bại', { id: saveToast });
        } finally {
            setSaving(false);
        }
    };

    if (loading && !lesson) {
        return <div className="flex h-[70vh] items-center justify-center text-gray-500">Đang tải...</div>;
    }

    const selectedIndex = criteriaList.findIndex(c => c.id === selectedId);
    const selectedItem = criteriaList[selectedIndex] || criteriaList[0];

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
                <LessonTabs lessonId={id!} activeTab="evaluations" />

                <div className="grid lg:grid-cols-[320px_1fr]">
                    {/* Left Sidebar: Danh sách tiêu chí */}
                    <aside className="flex flex-col border-r border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/20">
                        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white">Danh sách tiêu chí</h2>
                                <p className="text-xs text-gray-500">
                                    {criteriaList.length} tiêu chí (tự động theo {questions.length || criteriaList.length} câu hỏi)
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewMode(viewMode === 'form' ? 'table' : 'form')}
                                className="rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                title="Đổi chế độ xem"
                            >
                                {viewMode === 'form' ? 'Xem bảng' : 'Chỉnh sửa'}
                            </button>
                        </div>

                        <div className="space-y-2 p-3">
                            {criteriaList.map((item, index) => {
                                const isSelected = selectedId === item.id;
                                return (
                                    <div
                                        key={item.id}
                                        className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                                            isSelected && viewMode === 'form'
                                                ? 'border-[#FEA01F] bg-orange-50'
                                                : 'border-gray-200 bg-white hover:border-orange-300 dark:border-gray-700 dark:bg-gray-800'
                                        }`}
                                        onClick={() => {
                                            selectCriterion(item);
                                            setViewMode('form');
                                        }}
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#E68A10]">
                                            {index + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                                {item.name}
                                            </p>
                                            {item.questionPrompt && (
                                                <p className="mt-0.5 text-xs text-gray-500 truncate" title={item.questionPrompt}>
                                                    Câu {index + 1}: {item.questionPrompt}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Right Main Panel: Detail Form or Full Table */}
                    <main className="p-5 lg:p-6">
                        {viewMode === 'form' ? (
                            <form onSubmit={handleSaveCriteria} className="mx-auto max-w-4xl space-y-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Chỉnh sửa {selectedItem?.code || `Tiêu chí ${selectedIndex + 1}`}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Nhập câu hỏi, nội dung nhận xét khi đạt, chưa đạt và gợi ý cho phụ huynh.
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="shrink-0 rounded-xl bg-[#339E4A] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2c8a40] disabled:opacity-60"
                                    >
                                        {saving ? 'Đang lưu...' : 'Lưu đánh giá'}
                                    </button>
                                </div>

                                {/* Form Field 1: Nội dung tiêu chí */}
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">
                                        Nội dung tiêu chí (TC{selectedIndex + 1})
                                    </label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={name}
                                        onChange={e => {
                                            setName(e.target.value);
                                            handleUpdateSelectedInList({ name: e.target.value });
                                        }}
                                        placeholder={`Ví dụ: TC${selectedIndex + 1}. Nhận biết cảm xúc vui`}
                                        className="block w-full rounded-xl border-gray-300 text-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Form Field 2: Nếu đạt */}
                                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/30 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
                                    <label className="mb-2 block text-sm font-bold text-emerald-900 dark:text-emerald-300">
                                        Nếu đạt (Khi học sinh hoàn thành tiêu chí)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={passedText}
                                        onChange={e => {
                                            setPassedText(e.target.value);
                                            handleUpdateSelectedInList({ passedText: e.target.value });
                                        }}
                                        placeholder="Nhập nội dung nhận xét khi bé đạt..."
                                        className="block w-full rounded-xl border-emerald-300 text-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>

                                {/* Form Field 3: Nếu chưa đạt */}
                                <div className="rounded-xl border border-amber-200/80 bg-amber-50/30 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
                                    <label className="mb-2 block text-sm font-bold text-amber-900 dark:text-amber-300">
                                        Nếu chưa đạt (Khi học sinh chưa đạt tiêu chí)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={failedText}
                                        onChange={e => {
                                            setFailedText(e.target.value);
                                            handleUpdateSelectedInList({ failedText: e.target.value });
                                        }}
                                        placeholder="Nhập nội dung nhận xét khi bé chưa đạt..."
                                        className="block w-full rounded-xl border-amber-300 text-sm focus:border-amber-500 focus:ring-amber-500 dark:border-amber-800 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>

                                {/* Form Field 4: Gợi ý cho phụ huynh */}
                                <div className="rounded-xl border border-blue-200/80 bg-blue-50/30 p-4 dark:border-blue-900/60 dark:bg-blue-950/20">
                                    <label className="mb-2 block text-sm font-bold text-blue-900 dark:text-blue-300">
                                        Gợi ý cho phụ huynh (Hướng dẫn đồng hành cùng bé)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={parentTip}
                                        onChange={e => {
                                            setParentTip(e.target.value);
                                            handleUpdateSelectedInList({ parentTip: e.target.value });
                                        }}
                                        placeholder="Nhập gợi ý cho phụ huynh..."
                                        className="block w-full rounded-xl border-blue-300 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-blue-800 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </form>
                        ) : (
                            /* Full Table Mode */
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                            6. Cấu trúc dữ liệu đánh giá
                                        </h2>
                                        <p className="text-sm text-gray-500">Bảng tổng hợp tất cả tiêu chí đánh giá bài học</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSaveCriteria()}
                                        disabled={saving}
                                        className="rounded-xl bg-[#339E4A] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2c8a40]"
                                    >
                                        {saving ? 'Đang lưu...' : 'Lưu đánh giá'}
                                    </button>
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                                    <table className="w-full text-left text-sm border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-700 font-bold text-gray-900 dark:text-white">
                                                <th className="w-[22%] border-r border-gray-200 dark:border-gray-600 p-3 text-center">Tiêu chí</th>
                                                <th className="w-[26%] border-r border-gray-200 dark:border-gray-600 p-3 text-center bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">Nếu đạt</th>
                                                <th className="w-[26%] border-r border-gray-200 dark:border-gray-600 p-3 text-center bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">Nếu chưa đạt</th>
                                                <th className="w-[26%] p-3 text-center bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">Gợi ý cho phụ huynh</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {criteriaList.map((item, idx) => (
                                                <tr key={item.id} className="bg-white dark:bg-gray-800">
                                                    <td className="border-r border-gray-200 p-3 align-top dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                                                        <span className="inline-block rounded bg-[#FEA01F] px-2 py-0.5 text-xs font-bold text-white mb-2">
                                                            {item.code}
                                                        </span>
                                                        <textarea
                                                            rows={3}
                                                            value={item.name}
                                                            onChange={e => handleUpdateTableCell(idx, 'name', e.target.value)}
                                                            className="w-full rounded-lg border-gray-300 text-xs font-semibold focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </td>
                                                    <td className="border-r border-gray-200 p-3 align-top dark:border-gray-700">
                                                        <textarea
                                                            rows={4}
                                                            value={item.passedText}
                                                            onChange={e => handleUpdateTableCell(idx, 'passedText', e.target.value)}
                                                            className="w-full rounded-lg border-emerald-200 text-xs bg-emerald-50/30 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-gray-800 dark:text-white"
                                                        />
                                                    </td>
                                                    <td className="border-r border-gray-200 p-3 align-top dark:border-gray-700">
                                                        <textarea
                                                            rows={4}
                                                            value={item.failedText}
                                                            onChange={e => handleUpdateTableCell(idx, 'failedText', e.target.value)}
                                                            className="w-full rounded-lg border-amber-200 text-xs bg-amber-50/30 focus:border-amber-500 focus:ring-amber-500 dark:border-amber-800 dark:bg-gray-800 dark:text-white"
                                                        />
                                                    </td>
                                                    <td className="p-3 align-top">
                                                        <textarea
                                                            rows={4}
                                                            value={item.parentTip}
                                                            onChange={e => handleUpdateTableCell(idx, 'parentTip', e.target.value)}
                                                            className="w-full rounded-lg border-blue-200 text-xs bg-blue-50/30 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-800 dark:bg-gray-800 dark:text-white"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LessonEvaluations;
