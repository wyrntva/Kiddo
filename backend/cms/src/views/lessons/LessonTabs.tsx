import { useNavigate } from 'react-router';

interface LessonTabsProps {
    lessonId: string;
    activeTab: 'information' | 'questions' | 'evaluations';
}

const LessonTabs = ({ lessonId, activeTab }: LessonTabsProps) => {
    const navigate = useNavigate();
    const tabs = [
        {
            key: 'information' as const,
            label: 'Thông tin bài học',
            path: `/lessons/${lessonId}/edit`,
        },
        {
            key: 'questions' as const,
            label: 'Câu hỏi',
            path: `/lessons/${lessonId}/questions`,
        },
        {
            key: 'evaluations' as const,
            label: 'Đánh giá',
            path: `/lessons/${lessonId}/evaluations`,
        },
    ];

    return (
        <nav
            aria-label="Thiết lập bài học"
            className="flex border-b border-gray-200 bg-white px-5 pt-2 dark:border-gray-700 dark:bg-gray-800"
        >
            {tabs.map(tab => {
                const isActive = activeTab === tab.key;
                return (
                    <button
                        key={tab.key}
                        type="button"
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => navigate(tab.path)}
                        className={`border-x-0 border-t-0 bg-transparent px-4 py-4 text-sm font-medium transition-colors ${
                            isActive
                                ? 'border-b-2 border-[#FEA01F] text-[#FEA01F]'
                                : 'border-b-2 border-transparent text-gray-600 hover:text-[#FEA01F] dark:text-gray-300'
                        }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </nav>
    );
};

export default LessonTabs;
