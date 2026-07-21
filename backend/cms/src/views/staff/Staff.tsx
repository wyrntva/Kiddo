/**
 * Staff Page — displays staff list with pagination, create/edit/delete actions.
 *
 * Extracted: StaffFormModal → StaffFormModal.tsx
 */
import { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Checkbox, Label } from 'flowbite-react';
import toast from 'react-hot-toast';
import { userAPI } from '../../api/user.api';
import { roleAPI } from '../../api/role.api';
import CustomPagination from '../../components/shared/CustomPagination';
import StaffFormModal from './StaffFormModal';
import type { User, Role } from './StaffFormModal';

// ============================================
// CONSTANTS
// ============================================

const ROLE_BADGE_COLORS: Record<string, string> = {
    'admin': 'failure',
    'Quản trị': 'failure',
    'accountant': 'info',
    'Trưởng ca': 'info',
    'staff': 'success',
    'Nhân viên': 'success',
};

const ITEMS_PER_PAGE = 50;

// ============================================
// MAIN COMPONENT
// ============================================

const Staff = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showInactive, setShowInactive] = useState(false);

    // --- Data Loading ---

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await userAPI.getUsers();
            const mappedUsers = (response.data || []).map((u: any) => {
                const isSystemAdmin = u.role === 'ADMIN';
                const mappedRoleId = isSystemAdmin ? 1 : (u.role === 'PARENT' ? 2 : 3);
                return {
                    id: u.id,
                    username: u.phone || u.email || '',
                    full_name: u.name || '',
                    email: u.email || '',
                    role_id: mappedRoleId,
                    is_active: u.isActive !== undefined ? u.isActive : true,
                    role: {
                        id: mappedRoleId,
                        name: isSystemAdmin ? 'Quản trị' : (u.role === 'PARENT' ? 'Phụ huynh' : 'Học sinh'),
                    }
                };
            });
            setUsers(mappedUsers);
        } catch (_error) {
            toast.error('Không thể tải danh sách tài khoản');
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await roleAPI.getRoles();
            setRoles(response.data);
        } catch (_error) {
            toast.error('Không thể tải danh sách vai trò');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    // --- Pagination ---

    const filteredUsers = users.filter(u => showInactive || u.is_active);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    // --- Actions ---

    const handleCreate = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const handleEdit = async (user: User) => {
        try {
            setEditingUser(user);
            setModalOpen(true);
        } catch (_error) {
            toast.error('Không thể tải chi tiết tài khoản');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Bạn có chắc muốn xóa tài khoản này?')) return;
        try {
            await userAPI.deleteUser(id);
            toast.success('Xóa tài khoản thành công');
            fetchUsers();
        } catch (error) {
            const errData = (error as { response?: { data?: { message?: string; detail?: string } } })?.response?.data;
            const errorMsg = errData?.message || errData?.detail || 'Xóa tài khoản thất bại';
            toast.error(errorMsg);
        }
    };

    // --- Render ---

    return (
        <div className="pt-0 px-6 pb-6 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-[16px] font-semibold uppercase text-[#37393E] dark:text-white">
                        QUẢN LÝ TÀI KHOẢN QUẢN TRỊ
                    </h1>
                </div>
                <div className="flex gap-4 w-full md:w-auto items-center justify-end">
                    <div className="flex items-center gap-2">
                        <Checkbox id="showInactive" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} />
                        <Label htmlFor="showInactive" className="text-sm text-gray-500 font-medium cursor-pointer">Hiển thị tài khoản đã xóa</Label>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-[#FEA01F] hover:bg-[#E68A10] text-white px-4 py-2 font-medium border-none shrink-0 rounded-[16px] transition-colors duration-200"
                    >
                        Thêm tài khoản
                    </button>
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Số điện thoại</Table.HeadCell>
                            <Table.HeadCell>Gmail</Table.HeadCell>
                            <Table.HeadCell>Họ và tên</Table.HeadCell>
                            <Table.HeadCell>Trạng thái</Table.HeadCell>
                            <Table.HeadCell><span className="sr-only">Actions</span></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5} className="text-center py-8">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ) : users.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5} className="text-center py-8 text-gray-500">
                                        Chưa có tài khoản nào
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                currentUsers.map((staff) => (
                                    <StaffRow
                                        key={staff.id}
                                        staff={staff}
                                        onEdit={() => handleEdit(staff)}
                                        onDelete={() => handleDelete(staff.id)}
                                    />
                                ))
                            )}
                        </Table.Body>
                    </Table>
                </div>

                {filteredUsers.length > 0 && (
                    <div className="flex justify-between items-center pt-4 p-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm text-blue-700 dark:text-blue-400">
                            Hiển thị từ {indexOfFirstItem + 1} đến {Math.min(indexOfLastItem, filteredUsers.length)} trên tổng {filteredUsers.length}
                        </span>
                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                )}
            </Card>

            <StaffFormModal
                open={modalOpen}
                onClose={() => { setModalOpen(false); setEditingUser(null); }}
                editingUser={editingUser}
                roles={roles}
                onSaved={fetchUsers}
            />
        </div>
    );
};

export default Staff;

// ============================================
// SUB-COMPONENT: Staff Table Row
// ============================================

function StaffRow({ staff, onEdit, onDelete }: {
    staff: User; onEdit: () => void; onDelete: () => void;
}) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{staff.username}</Table.Cell>
            <Table.Cell>{staff.email || '----'}</Table.Cell>
            <Table.Cell className="font-medium text-gray-900 dark:text-white">{staff.full_name}</Table.Cell>
            <Table.Cell>
                <Badge color={staff.is_active ? 'success' : 'gray'}>
                    {staff.is_active ? 'Hoạt động' : 'Vô hiệu'}
                </Badge>
            </Table.Cell>
            <Table.Cell>
                <div className="flex gap-4">
                    <button onClick={onEdit} className="text-[#0A7AD8] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">Sửa</button>
                    <button onClick={onDelete} className="text-[#ED052A] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">Xóa</button>
                </div>
            </Table.Cell>
        </Table.Row>
    );
}
