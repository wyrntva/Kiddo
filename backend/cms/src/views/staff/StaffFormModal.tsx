import { useState, useRef, useEffect } from 'react';
import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';
import toast from 'react-hot-toast';
import { userAPI } from '../../api/user.api';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    username: string;
    full_name: string;
    email?: string;
    role_id: number;
    role: Role;
    is_active: boolean;
}

interface StaffFormData {
    username: string;
    full_name: string;
    email: string;
    password: string;
    role_id: number;
    is_active: boolean;
}

interface StaffFormModalProps {
    open: boolean;
    onClose: () => void;
    editingUser: User | null;
    roles: Role[];
    onSaved: () => void;
}

const StaffFormModal = ({ open, onClose, editingUser, roles, onSaved }: StaffFormModalProps) => {
    const [formData, setFormData] = useState<StaffFormData>(() => getInitialFormData(editingUser, roles));
    const [saving, setSaving] = useState(false);
    const isEditing = editingUser !== null;

    // Sync form data when editingUser or roles change or when modal opens
    useEffect(() => {
        if (open) {
            setFormData(getInitialFormData(editingUser, roles));
        }
    }, [editingUser, roles, open]);

    const update = <K extends keyof StaffFormData>(key: K, value: StaffFormData[K]) =>
        setFormData(prev => ({ ...prev, [key]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.full_name || !formData.username) {
            toast.error('Vui lòng điền đầy đủ thông tin: Họ và tên và Số điện thoại');
            return;
        }

        if (!isEditing && !formData.password) {
            toast.error('Vui lòng điền mật khẩu');
            return;
        }

        setSaving(true);
        try {
            if (isEditing) {
                const data: any = {
                    full_name: formData.full_name,
                    email: formData.email,
                    phone: formData.username,
                    is_active: formData.is_active,
                    role_id: 1,
                };
                if (formData.password) {
                    data.password = formData.password;
                }
                await userAPI.updateUser(editingUser!.id, data);
                toast.success('Cập nhật tài khoản thành công');
            } else {
                const data = {
                    username: formData.username,
                    password: formData.password,
                    full_name: formData.full_name,
                    email: formData.email,
                    role_id: 1,
                    is_active: formData.is_active,
                };
                await userAPI.createUser(data);
                toast.success('Thêm tài khoản thành công');
            }
            onClose();
            onSaved();
        } catch (error) {
            const errData = (error as { response?: { data?: { message?: string; detail?: string } } })?.response?.data;
            toast.error(errData?.message || errData?.detail || 'Thao tác thất bại');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal show={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    {isEditing ? 'Chỉnh sửa tài khoản quản trị' : 'Thêm tài khoản quản trị mới'}
                </Modal.Header>
                <Modal.Body className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="full_name" value="Họ và tên" />
                            <TextInput
                                id="full_name"
                                value={formData.full_name || ''}
                                onChange={(e) => update('full_name', e.target.value)}
                                placeholder="Nhập họ và tên..."
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="username" value="Số điện thoại" />
                            <TextInput
                                id="username"
                                value={formData.username || ''}
                                onChange={(e) => update('username', e.target.value)}
                                placeholder="Nhập số điện thoại..."
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Gmail" />
                            <TextInput
                                id="email"
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => update('email', e.target.value)}
                                placeholder="example@gmail.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" value={isEditing ? "Mật khẩu mới (tùy chọn)" : "Mật khẩu"} />
                            <TextInput
                                id="password"
                                type="password"
                                value={formData.password || ''}
                                onChange={(e) => update('password', e.target.value)}
                                placeholder="******"
                                required={!isEditing}
                            />
                        </div>

                        <div>
                            <Label htmlFor="is_active" value="Trạng thái" />
                            <Select
                                id="is_active"
                                value={(formData.is_active ?? true).toString()}
                                onChange={(e) => update('is_active', e.target.value === 'true')}
                                required
                            >
                                <option value="true">Hoạt động</option>
                                <option value="false">Vô hiệu hóa</option>
                            </Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" color="blue" disabled={saving}>
                        {saving ? 'Đang lưu...' : isEditing ? 'Cập nhật' : 'Thêm'}
                    </Button>
                    <Button color="gray" onClick={onClose} disabled={saving}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default StaffFormModal;

export type { User, Role };

function getInitialFormData(user: User | null, roles: Role[]): StaffFormData {
    if (user) {
        return {
            username: user.username,
            full_name: user.full_name,
            email: user.email || '',
            password: '',
            role_id: 1,
            is_active: user.is_active,
        };
    }
    return {
        username: '',
        full_name: '',
        email: '',
        password: '',
        role_id: 1,
        is_active: true,
    };
}
