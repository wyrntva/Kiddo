import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { lessonAPI, QuizQuestion, Lesson } from '../../api/lesson.api';
import LessonTabs from './LessonTabs';
import ImageCropModal from '../../components/ImageCropModal';

const OPTION_PRESETS = [
    {
        name: 'Mẫu 1 (Toro Vui / Hộp quà / Thỏ Bunny / Cảm ơn / Chào hỏi / Giúp đỡ)',
        sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png',
        style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' }
    },
    {
        name: 'Mẫu 2 (Toro Buồn / Máy chơi game / Cái cây / Dọn đồ chơi / Mặc quần áo)',
        sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png',
        style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' }
    },
    {
        name: 'Mẫu 3 (Toro Sợ hãi / Quả bóng / Chiếc ghế / Tức giận / Hỏa hoạn / Đi lạc)',
        sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png',
        style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' }
    }
];

const STATIC_QUIZ_DATABASE = {
  1: {
    lessonTitle: 'Niềm vui của con',
    questions: [
      {
        prompt: 'Theo con, lúc này Toro đang cảm thấy thế nào?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Vui', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Buồn', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Sợ hãi', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ]
  },
  2: {
    lessonTitle: 'Nỗi buồn bé nhỏ',
    questions: [
      {
        prompt: 'Theo con, lúc chiếc diều bị rách, Toro đang cảm thấy thế nào?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Buồn', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 2, label: 'Vui', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 3, label: 'Tức giận', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      },
      {
        prompt: 'Điều gì khiến Toro cảm thấy buồn?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Chiếc diều bị rách', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 2, label: 'Toro được tặng quà', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 3, label: 'Toro được cô giáo khen', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      },
      {
        prompt: 'Khi buồn, Toro nên làm gì để cảm thấy dễ chịu hơn?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Nói với Bunny rằng mình đang buồn', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Bỏ đi một mình', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Giấu chiếc diều đi', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      },
      {
        prompt: 'Toro có thể chia sẻ nỗi buồn với ai?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Bunny', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Cái cây', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Chiếc ghế', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ]
  },
  3: {
    lessonTitle: 'Cơn giận đang tới',
    questions: [
      {
        prompt: 'Việc nào dưới đây thường khiến các bạn nhỏ cảm thấy vui?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Chơi cùng bạn bè', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Bị giành đồ chơi', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Làm hỏng món đồ yêu thích', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ]
  },
  4: {
    lessonTitle: 'Khi con thấy sợ',
    questions: [
      {
        prompt: 'Nếu là Toro, con sẽ làm gì tiếp theo?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Kể cho Bunny nghe niềm vui của mình', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Giấu bức tranh đi', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Chê tranh của bạn khác', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ]
  }
};

export default function LessonQuestions() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(null);

    // Form states
    const [prompt, setPrompt] = useState('');
    const [correctOptionId, setCorrectOptionId] = useState(1);
    const [options, setOptions] = useState([
        { id: 1, label: '', sprite: OPTION_PRESETS[0].sprite, style: { ...OPTION_PRESETS[0].style } },
        { id: 2, label: '', sprite: OPTION_PRESETS[1].sprite, style: { ...OPTION_PRESETS[1].style } },
        { id: 3, label: '', sprite: OPTION_PRESETS[2].sprite, style: { ...OPTION_PRESETS[2].style } },
    ]);

    const [showAdvanced, setShowAdvanced] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState('');
    const [activeCropIndex, setActiveCropIndex] = useState<number | null>(null);

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, optionIndex: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn file ảnh');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImageSrc(reader.result as string);
            setActiveCropIndex(optionIndex);
            setCropModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleCropComplete = async (croppedImage: Blob) => {
        if (activeCropIndex === null) return;
        const uploadToast = toast.loading('Đang tải ảnh đã cắt lên...');
        try {
            const file = new File([croppedImage], `option_${activeCropIndex + 1}.png`, { type: 'image/png' });
            const res = await lessonAPI.uploadImage(file);
            const uploadedUrl = res.data.url;
            
            handleOptionChange(activeCropIndex, 'sprite', uploadedUrl);
            
            // Set styles to 100% width/height and 0% left/top for cropped custom image
            setOptions(prev => prev.map((opt, idx) => {
                if (idx === activeCropIndex) {
                    return {
                        ...opt,
                        style: {
                            height: '100%',
                            width: '100%',
                            left: '0%',
                            top: '0%'
                        }
                    };
                }
                return opt;
            }));
            
            toast.success('Tải ảnh lên thành công', { id: uploadToast });
        } catch (err) {
            toast.error('Tải ảnh lên thất bại', { id: uploadToast });
        } finally {
            setActiveCropIndex(null);
        }
    };

    const toggleAdvanced = (index: number) => {
        setShowAdvanced(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleNudge = (index: number, field: string, amount: number) => {
        setOptions(prev => prev.map((opt, idx) => {
            if (idx === index) {
                const currentValue = opt.style[field] || '0%';
                const numeric = parseFloat(currentValue);
                if (isNaN(numeric)) return opt;
                const newValue = +(numeric + amount).toFixed(2);
                return {
                    ...opt,
                    style: {
                        ...opt.style,
                        [field]: `${newValue}%`
                    }
                };
            }
            return opt;
        }));
    };

    const handleZoom = (index: number, multiplier: number) => {
        setOptions(prev => prev.map((opt, idx) => {
            if (idx === index) {
                const currentHeight = parseFloat(opt.style.height || '100%');
                const currentWidth = parseFloat(opt.style.width || '100%');
                if (isNaN(currentHeight) || isNaN(currentWidth)) return opt;
                
                const newHeight = +(currentHeight * multiplier).toFixed(2);
                const newWidth = +(currentWidth * multiplier).toFixed(2);
                
                return {
                    ...opt,
                    style: {
                        ...opt.style,
                        height: `${newHeight}%`,
                        width: `${newWidth}%`
                    }
                };
            }
            return opt;
        }));
    };

    const fetchLessonAndQuestions = async () => {
        if (!id) return;
        setLoading(true);
        try {
            // Fetch lesson details
            const lessonRes = await lessonAPI.getLesson(id);
            const lessonData = lessonRes.data;
            setLesson(lessonData);

            // Fetch questions
            const questionsRes = await lessonAPI.getQuestions(id);
            let fetched = questionsRes.data?.data || [];
            
            if (fetched.length === 0) {
                // If database is empty, check static fallback
                const staticQuiz = Object.values(STATIC_QUIZ_DATABASE).find(
                    (q) => q.lessonTitle.toLowerCase() === lessonData.title.toLowerCase()
                );
                if (staticQuiz && staticQuiz.questions.length > 0) {
                    fetched = staticQuiz.questions.map((q, idx) => ({
                        id: `temp-${idx}`,
                        prompt: q.prompt,
                        correctOptionId: q.correctOptionId,
                        options: q.options.map(opt => ({
                            id: opt.id,
                            label: opt.label,
                            sprite: opt.sprite,
                            style: opt.style
                        })),
                        lessonId: id
                    }));
                } else {
                    // Default template question
                    fetched = [{
                        id: 'temp-0',
                        prompt: 'Theo con, Toro đang cảm thấy thế nào?',
                        correctOptionId: 1,
                        options: [
                            { id: 1, label: 'Vui', sprite: OPTION_PRESETS[0].sprite, style: { ...OPTION_PRESETS[0].style } },
                            { id: 2, label: 'Buồn', sprite: OPTION_PRESETS[1].sprite, style: { ...OPTION_PRESETS[1].style } },
                            { id: 3, label: 'Sợ hãi', sprite: OPTION_PRESETS[2].sprite, style: { ...OPTION_PRESETS[2].style } }
                        ],
                        lessonId: id
                    }];
                }
            }

            setQuestions(fetched);
            if (fetched.length > 0) {
                handleSelectQuestion(fetched[0]);
            } else {
                setSelectedQuestion(null);
                resetForm();
            }
        } catch (err) {
            toast.error('Không thể tải thông tin bài học hoặc câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessonAndQuestions();
    }, [id]);

    const handleSelectQuestion = (q: QuizQuestion) => {
        setSelectedQuestion(q);
        setPrompt(q.prompt);
        setCorrectOptionId(q.correctOptionId);
        
        // Ensure options have correct structure
        const loadedOptions = q.options.map(opt => ({
            id: opt.id,
            label: opt.label || '',
            sprite: opt.sprite || '',
            style: {
                height: opt.style?.height || '100%',
                width: opt.style?.width || '100%',
                left: opt.style?.left || '0%',
                top: opt.style?.top || '0%',
            }
        }));

        // Fill up to 2 options if missing
        while (loadedOptions.length < 2) {
            const nextId = loadedOptions.length + 1;
            const preset = OPTION_PRESETS[(nextId - 1) % OPTION_PRESETS.length] || OPTION_PRESETS[0];
            loadedOptions.push({
                id: nextId,
                label: '',
                sprite: preset.sprite,
                style: { ...preset.style }
            });
        }
        setOptions(loadedOptions);
    };

    const resetForm = () => {
        setPrompt('');
        setCorrectOptionId(1);
        setOptions([
            { id: 1, label: '', sprite: OPTION_PRESETS[0].sprite, style: { ...OPTION_PRESETS[0].style } },
            { id: 2, label: '', sprite: OPTION_PRESETS[1].sprite, style: { ...OPTION_PRESETS[1].style } },
            { id: 3, label: '', sprite: OPTION_PRESETS[2].sprite, style: { ...OPTION_PRESETS[2].style } },
        ]);
    };

    const handleAddQuestionClick = () => {
        setSelectedQuestion(null);
        resetForm();
    };

    const handlePresetChange = (optionIndex: number, presetIndex: number) => {
        if (presetIndex === -1) return; // Custom
        const preset = OPTION_PRESETS[presetIndex];
        setOptions(prev => prev.map((opt, idx) => {
            if (idx === optionIndex) {
                return {
                    ...opt,
                    sprite: preset.sprite,
                    style: { ...preset.style }
                };
            }
            return opt;
        }));
    };

    const handleOptionChange = (index: number, field: string, value: string) => {
        setOptions(prev => prev.map((opt, idx) => {
            if (idx === index) {
                if (field === 'label' || field === 'sprite') {
                    return { ...opt, [field]: value };
                } else {
                    return {
                        ...opt,
                        style: {
                            ...opt.style,
                            [field]: value
                        }
                    };
                }
            }
            return opt;
        }));
    };

    const handleAddOption = () => {
        if (options.length >= 5) {
            toast.error('Tối đa là 5 câu trả lời');
            return;
        }
        const nextId = options.length + 1;
        const preset = OPTION_PRESETS[(nextId - 1) % OPTION_PRESETS.length];
        setOptions(prev => [
            ...prev,
            {
                id: nextId,
                label: '',
                sprite: preset.sprite,
                style: { ...preset.style }
            }
        ]);
    };

    const handleRemoveOption = (targetIndex: number) => {
        if (options.length <= 2) {
            toast.error('Tối thiểu cần có 2 câu trả lời');
            return;
        }
        const filtered = options.filter((_, idx) => idx !== targetIndex);
        const reindexed = filtered.map((opt, idx) => ({
            ...opt,
            id: idx + 1
        }));
        setOptions(reindexed);
        
        // Safety: adjust correctOptionId if it's now out of bounds
        if (correctOptionId > reindexed.length) {
            setCorrectOptionId(reindexed.length);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        if (!prompt.trim()) {
            toast.error('Vui lòng nhập câu hỏi');
            return;
        }

        // Validate that all options have images
        for (let i = 0; i < options.length; i++) {
            if (!options[i].img && !options[i].sprite) {
                toast.error(`Vui lòng chọn hình ảnh cho Lựa chọn ${i + 1}`);
                return;
            }
        }

        const payload = {
            prompt,
            correctOptionId,
            options,
            lessonId: id,
        };

        const saveToast = toast.loading('Đang lưu câu hỏi...');
        try {
            if (selectedQuestion && !selectedQuestion.id.startsWith('temp-')) {
                await lessonAPI.updateQuestion(id, selectedQuestion.id, payload);
                toast.success('Cập nhật câu hỏi thành công', { id: saveToast });
            } else {
                const res = await lessonAPI.createQuestion(id, payload);
                toast.success('Tạo câu hỏi mới thành công', { id: saveToast });
                setSelectedQuestion(res.data);
            }
            // Refresh list
            const questionsRes = await lessonAPI.getQuestions(id);
            setQuestions(questionsRes.data?.data || []);
        } catch (err) {
            toast.error('Lưu câu hỏi thất bại', { id: saveToast });
        }
    };

    const handleDelete = async (qId: string) => {
        if (!id || !window.confirm('Bạn có chắc muốn xóa câu hỏi này?')) return;
        if (qId.startsWith('temp-')) {
            setQuestions(prev => prev.filter(q => q.id !== qId));
            toast.success('Xóa câu hỏi thành công');
            resetForm();
            setSelectedQuestion(null);
            return;
        }

        const deleteToast = toast.loading('Đang xóa câu hỏi...');
        try {
            await lessonAPI.deleteQuestion(id, qId);
            toast.success('Xóa câu hỏi thành công', { id: deleteToast });
            // Refresh questions
            const questionsRes = await lessonAPI.getQuestions(id);
            const fetched = questionsRes.data?.data || [];
            setQuestions(fetched);
            if (selectedQuestion?.id === qId) {
                if (fetched.length > 0) {
                    handleSelectQuestion(fetched[0]);
                } else {
                    setSelectedQuestion(null);
                    resetForm();
                }
            }
        } catch (err) {
            toast.error('Xóa câu hỏi thất bại', { id: deleteToast });
        }
    };

    if (loading && !lesson) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FEA01F] border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="pt-0 px-6 pb-4 space-y-4 h-[calc(100vh-100px)] flex flex-col">
            {/* Header / Breadcrumbs */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <button
                        onClick={() => navigate('/lessons')}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium text-sm bg-transparent border-none cursor-pointer p-0 mb-1"
                    >
                        <span>&larr;</span> Quay lại danh sách bài học
                    </button>
                    <h1 className="text-xl font-bold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                        <span>{lesson?.emoji}</span> THIẾT LẬP CÂU HỎI
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Bài học: <span className="font-semibold text-gray-800 dark:text-gray-200">{lesson?.title}</span> ({lesson?.zone?.name})
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 flex flex-col flex-1 min-h-0">
                <LessonTabs lessonId={id!} activeTab="questions" />

                {/* Main Content Card Layout */}
                <div className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row flex-1 min-h-0">
                {/* Left Sidebar - Question list */}
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 flex flex-col h-full bg-gray-50/50 dark:bg-gray-900/10">
                    <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Danh sách câu hỏi</span>
                        <button
                            onClick={handleAddQuestionClick}
                            className="bg-[#FEA01F] hover:bg-[#E68A10] text-white text-xs px-3 py-1.5 font-bold rounded-lg transition-colors border-none cursor-pointer"
                        >
                            + Thêm câu hỏi
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {questions.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 text-sm italic">
                                Chưa có câu hỏi nào.
                            </div>
                        ) : (
                            questions.map((q, idx) => (
                                <div
                                    key={q.id}
                                    onClick={() => handleSelectQuestion(q)}
                                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between group ${
                                        selectedQuestion?.id === q.id
                                            ? 'bg-[#FEF9ED] border-[#FEA01F] dark:bg-amber-500/10 dark:border-amber-500'
                                            : 'bg-white border-gray-100 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600'
                                    }`}
                                >
                                    <div className="min-w-0 pr-2">
                                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500">CÂU HỎI {idx + 1}</span>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate mt-0.5">{q.prompt}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(q.id);
                                        }}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Form - Editor */}
                <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-800 overflow-hidden">
                    <form onSubmit={handleSave} className="p-4 space-y-4 flex-1 flex flex-col h-full overflow-hidden">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 flex-shrink-0">
                            <h3 className="font-bold text-gray-800 dark:text-white text-md">
                                {selectedQuestion ? 'Cập nhật câu hỏi' : 'Tạo câu hỏi mới'}
                            </h3>
                            <button
                                type="submit"
                                className="bg-[#339E4A] hover:bg-[#2c8a40] text-white px-5 py-2 font-bold rounded-xl transition-colors border-none cursor-pointer flex items-center gap-1.5 shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                Lưu lại
                            </button>
                        </div>

                        {/* Top Info Grid (Prompt + Correct Option) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-shrink-0">
                            {/* Prompt */}
                            <div className="lg:col-span-8 space-y-1">
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400">Nội dung câu hỏi</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Ví dụ: Theo con, Toro đang cảm thấy thế nào lúc này?"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-900 dark:text-white text-xs py-1.5 px-3"
                                />
                            </div>

                            {/* Correct Option Selection */}
                            <div className="lg:col-span-4 space-y-1">
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400">Lựa chọn đúng (Đáp án)</label>
                                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
                                    {options.map((opt) => (
                                        <label
                                            key={opt.id}
                                            className={`flex items-center justify-center py-2 px-1 rounded-xl border-2 text-xs cursor-pointer transition-all ${
                                                correctOptionId === opt.id
                                                    ? 'bg-[#eefcf2] border-[#339e4a] text-[#339e4a] font-bold'
                                                    : 'bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="correctOption"
                                                value={opt.id}
                                                checked={correctOptionId === opt.id}
                                                onChange={() => setCorrectOptionId(opt.id)}
                                                className="hidden"
                                            />
                                            Lựa chọn {opt.id}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Edit Options */}
                        <div className="space-y-3 flex-1 flex flex-col min-h-0">
                            <div className="flex items-center justify-between flex-shrink-0">
                                <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Các lựa chọn câu trả lời</label>
                                {options.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={handleAddOption}
                                        className="bg-[#FEA01F] hover:bg-[#E68A10] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors border-none cursor-pointer flex items-center gap-1 shadow-sm select-none"
                                    >
                                        + Thêm lựa chọn
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto">
                                {options.map((opt, idx) => (
                                    <div key={opt.id} className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex flex-col justify-between space-y-3">
                                        {/* Header */}
                                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-1.5 flex-shrink-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-[#0a7ad8] dark:text-blue-400">Lựa chọn {opt.id}</span>
                                                {options.length > 2 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveOption(idx)}
                                                        className="text-red-500 hover:text-red-700 p-0.5 rounded transition-colors border-none bg-transparent cursor-pointer"
                                                        title="Xóa lựa chọn này"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 dark:bg-blue-900/30 text-[#0a7ad8] dark:text-blue-300">
                                                Option {opt.id}
                                            </span>
                                        </div>

                                        {/* Horizontal Layout for Preview + Main inputs */}
                                        <div className="flex gap-3 items-center">
                                            {/* Left side: Preview Box */}
                                            <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 dark:bg-gray-900/40 rounded-xl flex-shrink-0">
                                                <div className="relative w-16 h-16 bg-white border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden flex items-center justify-center shadow-inner">
                                                    {opt.sprite ? (
                                                        <img
                                                            src={opt.sprite}
                                                            alt="Preview"
                                                            style={{
                                                                position: 'absolute',
                                                                maxHeight: 'none',
                                                                maxWidth: 'none',
                                                                height: opt.style.height,
                                                                width: opt.style.width,
                                                                left: opt.style.left,
                                                                top: opt.style.top
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-[10px] text-gray-400">Không ảnh</span>
                                                    )}
                                                </div>
                                                <span className="text-[9px] font-bold text-gray-400">Xem trước</span>
                                            </div>

                                            {/* Right side: Inputs */}
                                            <div className="flex-1 space-y-2">
                                                {/* Option Label */}
                                                <div className="space-y-0.5">
                                                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400">Nhãn câu trả lời</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Ví dụ: Vui vẻ, Buồn bã..."
                                                        value={opt.label}
                                                        onChange={(e) => handleOptionChange(idx, 'label', e.target.value)}
                                                        className="w-full py-1 px-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-900 dark:text-white shadow-sm"
                                                    />
                                                </div>

                                                {/* Preset Select */}
                                                <div className="space-y-0.5">
                                                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400">Chọn mẫu ảnh có sẵn (Preset)</label>
                                                    <select
                                                        onChange={(e) => handlePresetChange(idx, parseInt(e.target.value, 10))}
                                                        className="w-full py-1 px-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[11px] focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-900 dark:text-white shadow-sm"
                                                        value={
                                                            OPTION_PRESETS.findIndex(
                                                                p => p.sprite === opt.sprite && p.style.left === opt.style.left
                                                            )
                                                        }
                                                    >
                                                        <option value={-1}>-- Căn chỉnh bằng tay --</option>
                                                        {OPTION_PRESETS.map((p, pIdx) => (
                                                            <option key={pIdx} value={pIdx}>{p.name.split(' (')[0]} ({p.name.split(' (')[1]?.split(' / ')[0]})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Advanced Settings Toggle */}
                                        <div className="pt-0.5 border-t border-gray-100 dark:border-gray-700">
                                            <button
                                                type="button"
                                                onClick={() => toggleAdvanced(idx)}
                                                className="w-full py-1 text-[10px] font-bold text-gray-400 hover:text-[#FEA01F] transition-colors flex items-center justify-center gap-1"
                                            >
                                                <span>{showAdvanced[idx] ? 'Ẩn tọa độ nâng cao' : 'Hiện tọa độ nâng cao'}</span>
                                                <svg className={`w-2.5 h-2.5 transition-transform ${showAdvanced[idx] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Advanced Settings Panel */}
                                        {showAdvanced[idx] && (
                                            <div className="p-2 bg-gray-50 dark:bg-gray-900/60 rounded-lg space-y-2 border border-gray-100 dark:border-gray-800 animate-fadeIn">
                                                {/* Sprite Image Path & Upload */}
                                                <div className="space-y-0.5">
                                                    <label className="block text-[9px] font-bold text-gray-400">Ảnh Sprite (Đường dẫn / Tải lên)</label>
                                                    <div className="flex gap-2 items-center">
                                                        <input
                                                            type="text"
                                                            value={opt.sprite}
                                                            onChange={(e) => handleOptionChange(idx, 'sprite', e.target.value)}
                                                            className="flex-1 py-1 px-2 rounded border border-gray-200 dark:border-gray-700 text-[10px] focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-900 dark:text-white"
                                                        />
                                                        <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded border border-gray-300 dark:border-gray-600 cursor-pointer flex items-center justify-center shadow-sm select-none shrink-0">
                                                            Tải ảnh
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleImageFileChange(e, idx)}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Canh lề Sprite */}
                                                <div className="space-y-2">
                                                    <label className="block text-[9px] font-bold text-gray-400">Căn lề chi tiết (Sprite Alignment)</label>
                                                    
                                                    {/* Phóng to/Thu nhỏ tỷ lệ đồng đều (Zoom) */}
                                                    <div className="space-y-0.5">
                                                        <span className="text-[9px] font-medium text-gray-400">Kích thước ảnh (Thu nhỏ / Phóng to tỷ lệ)</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleZoom(idx, 0.95)}
                                                                className="w-16 h-5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-500 hover:bg-gray-100 active:scale-90 flex items-center justify-center shadow-sm select-none shrink-0"
                                                                title="Thu nhỏ 5%"
                                                            >
                                                                Thu nhỏ
                                                            </button>
                                                            <div className="flex-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded text-[10px] text-center dark:bg-gray-900 dark:text-white bg-gray-50/50">
                                                                Rộng: {opt.style.width} / Cao: {opt.style.height}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleZoom(idx, 1.05)}
                                                                className="w-16 h-5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-500 hover:bg-gray-100 active:scale-90 flex items-center justify-center shadow-sm select-none shrink-0"
                                                                title="Phóng to 5%"
                                                            >
                                                                Phóng to
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Di chuyển Left và Top */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {['left', 'top'].map((field) => {
                                                            const friendlyLabel = field === 'left' ? 'Dịch trái/phải (Left)' : 'Dịch lên/xuống (Top)';
                                                            const nudgeAmount = 5;
                                                            
                                                            return (
                                                                <div key={field} className="space-y-0.5">
                                                                    <span className="text-[9px] font-medium text-gray-400">{friendlyLabel}</span>
                                                                    <div className="flex items-center gap-1">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleNudge(idx, field, -nudgeAmount)}
                                                                            className="w-5 h-5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-500 hover:bg-gray-100 active:scale-90 flex items-center justify-center shadow-sm select-none"
                                                                            title={`Giảm ${nudgeAmount}%`}
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <input
                                                                            type="text"
                                                                            value={opt.style[field] || '0%'}
                                                                            onChange={(e) => handleOptionChange(idx, field, e.target.value)}
                                                                            className="w-full py-0.5 px-1 rounded border border-gray-200 dark:border-gray-700 text-[10px] text-center dark:bg-gray-900 dark:text-white focus:border-[#FEA01F] focus:ring-0"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleNudge(idx, field, nudgeAmount)}
                                                                            className="w-5 h-5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-500 hover:bg-gray-100 active:scale-90 flex items-center justify-center shadow-sm select-none"
                                                                            title={`Tăng ${nudgeAmount}%`}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            
            <ImageCropModal
                open={cropModalOpen}
                onClose={() => setCropModalOpen(false)}
                imageSrc={selectedImageSrc}
                onCropComplete={handleCropComplete}
                aspect={1}
            />
        </div>
    );
}
