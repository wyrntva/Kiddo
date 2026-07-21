import { Card } from 'flowbite-react';

const Courses = () => {
    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div>
                <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white">
                    QUẢN LÝ KHÓA HỌC
                </h1>
            </div>
            <Card>
                <div className="text-center py-16 text-gray-500">
                    <p className="text-lg font-medium">Trang quản lý khóa học</p>
                    <p className="text-sm mt-2">Chức năng đang được phát triển...</p>
                </div>
            </Card>
        </div>
    );
};

export default Courses;
