import React, { useEffect, useState } from 'react';
import { Card, Table, TextInput, Button } from 'flowbite-react';
import toast from 'react-hot-toast';
import { zoneAPI, Zone } from '../../api/zone.api';

const Contents = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        key: '',
        desc: '',
        color: '#FEA01F',
        img: '',
    });
    
    const fetchZones = async () => {
        setLoading(true);
        try {
            const res = await zoneAPI.getZones();
            setZones(res.data?.data || []);
        } catch (err) {
            toast.error('Không thể tải danh sách vùng đất');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchZones();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Bạn có chắc muốn xóa vùng đất ${name}?`)) return;
        try {
            await zoneAPI.deleteZone(id);
            toast.success('Xóa vùng đất thành công');
            fetchZones();
        } catch (err) {
            toast.error('Xóa vùng đất thất bại');
        }
    };

    const handleAddClick = () => {
        setSelectedZone(null);
        setFormData({
            name: '',
            key: '',
            desc: '',
            color: '#FEA01F',
            img: '',
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (zone: Zone) => {
        setSelectedZone(zone);
        setFormData({
            name: zone.name,
            key: zone.key,
            desc: zone.desc,
            color: zone.color,
            img: zone.img,
        });
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const uploadToast = toast.loading('Đang tải ảnh lên...');
        try {
            const res = await zoneAPI.uploadImage(file);
            setFormData(prev => ({ ...prev, img: res.data.url }));
            toast.success('Tải ảnh lên thành công', { id: uploadToast });
        } catch (err) {
            toast.error('Tải ảnh lên thất bại', { id: uploadToast });
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedZone) {
                await zoneAPI.updateZone(selectedZone.id, formData);
                toast.success('Cập nhật vùng đất thành công');
            } else {
                await zoneAPI.createZone(formData);
                toast.success('Thêm vùng đất mới thành công');
            }
            setIsModalOpen(false);
            fetchZones();
        } catch (err) {
            toast.error('Thao tác thất bại');
        }
    };

    const filtered = zones.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.desc.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
                        QUẢN LÝ NỘI DUNG (VÙNG ĐẤT)
                    </h1>
                </div>
                <div className="flex gap-4 w-full md:w-auto items-center justify-end">
                    <div className="w-full md:w-72">
                        <TextInput 
                            placeholder="Tìm kiếm vùng đất..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={handleAddClick}
                        className="bg-[#FEA01F] hover:bg-[#E68A10] text-white px-4 py-2 font-medium border-none shrink-0 rounded-[16px] transition-colors duration-200"
                    >
                        Thêm vùng đất
                    </button>
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Map</Table.HeadCell>
                            <Table.HeadCell>Tên vùng đất</Table.HeadCell>
                            <Table.HeadCell>Mô tả</Table.HeadCell>
                            <Table.HeadCell>Mã màu</Table.HeadCell>
                            <Table.HeadCell>Số bài học</Table.HeadCell>
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
                                        Không tìm thấy vùng đất nào
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                filtered.map((item) => (
                                    <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            <div className="w-16 h-12 flex items-center justify-center bg-gray-50 rounded-lg p-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                                                <img 
                                                    src={item.img} 
                                                    alt={item.name} 
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/assets/logo_ottopia-ByvZYZ-U.png';
                                                    }}
                                                />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-medium text-gray-900 dark:text-white">{item.name}</Table.Cell>
                                        <Table.Cell>{item.desc}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span>{item.color}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-semibold text-blue-600">{item.lessons?.length || 0} bài</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-4">
                                                <button onClick={() => handleEditClick(item)} className="text-[#0A7AD8] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">Sửa</button>
                                                <button onClick={() => handleDelete(item.id, item.name)} className="text-[#ED052A] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">Xóa</button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </Card>

            {/* Premium Custom Tailwind Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-[16px] shadow-xl w-full max-w-lg p-6 mx-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {selectedZone ? 'Cập nhật Vùng đất' : 'Thêm Vùng đất mới'}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên vùng đất</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.name} 
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Khoá phân biệt (Key)</label>
                                <input 
                                    type="text" 
                                    required 
                                    disabled={!!selectedZone}
                                    value={formData.key} 
                                    onChange={e => setFormData({ ...formData, key: e.target.value })}
                                    placeholder="Ví dụ: emotion, friendship"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Mã định danh kỹ thuật để đồng bộ liên kết hòn đảo ở Frontend (ví dụ: <code>emotion</code>). Không được sửa khi cập nhật.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả</label>
                                <textarea 
                                    required 
                                    value={formData.desc} 
                                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mã màu (Hex)</label>
                                    <div className="flex gap-2 items-center mt-1">
                                        <input 
                                            type="color" 
                                            value={formData.color} 
                                            onChange={e => setFormData({ ...formData, color: e.target.value })}
                                            className="w-10 h-10 border border-gray-300 rounded-md p-1 cursor-pointer"
                                        />
                                        <input 
                                            type="text" 
                                            required 
                                            value={formData.color} 
                                            onChange={e => setFormData({ ...formData, color: e.target.value })}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FEA01F] focus:ring-[#FEA01F] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ảnh hòn đảo</label>
                                    <div className="mt-1 flex items-center gap-3">
                                        {formData.img && (
                                            <div className="w-16 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shrink-0 dark:bg-gray-900 dark:border-gray-750">
                                                <img src={formData.img} alt="Bản đồ" className="max-w-full max-h-full object-contain" />
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

export default Contents;
