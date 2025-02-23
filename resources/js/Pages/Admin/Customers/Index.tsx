import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/Components/common/Loading';
import Modal from '@/Components/admin/common/Modal';
import Form from '@/Components/admin/common/Form';
import Pagination from '@/Components/admin/common/Pagination';
import { customersService } from '@/services/api/customers.service';
import type { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '@/types/customers';

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const { showToast } = useToast();

    // Search and Pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [formData, setFormData] = useState<UpdateCustomerDTO>({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        group_id: undefined,
        status: undefined
    });

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await customersService.getAllCustomers();
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            showToast('Không thể tải danh sách khách hàng', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (!customers) return;

        let result = [...customers];
        if (searchTerm) {
            result = result.filter(customer =>
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phone.toString().includes(searchTerm) ||
                (customer.fullname && customer.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredCustomers(result);
        setCurrentPage(1);
    }, [searchTerm, customers]);

    const handleSwitchStatus = async (id: number) => {
        try {
            await customersService.switchStatus(id);
            showToast('Cập nhật trạng thái thành công', 'success');
            fetchCustomers();
        } catch (error) {
            console.error('Error switching status:', error);
            showToast('Không thể cập nhật trạng thái', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
            try {
                await customersService.deleteCustomer(id);
                showToast('Xóa khách hàng thành công', 'success');
                fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
                showToast('Không thể xóa khách hàng', 'error');
            }
        }
    };

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setFormData({
            fullname: customer.fullname || '',
            email: customer.email,
            phone: customer.phone,
            address: customer.address || '',
            status: customer.status
        });
        setShowModal(true);
    };

    const handleSubmit = async (data: any) => {
        try {
            if (editingCustomer) {
                const updateData: UpdateCustomerDTO = {};
                
                if (data.fullname) updateData.fullname = data.fullname;
                if (data.email) updateData.email = data.email;
                if (data.phone) updateData.phone = data.phone;
                if (data.address) updateData.address = data.address;
                if (data.password) {
                    updateData.password = data.password;
                    updateData.password_confirmation = data.password_confirmation;
                }

                await customersService.updateCustomer(editingCustomer.id, updateData);
                showToast('Cập nhật khách hàng thành công', 'success');
                setShowModal(false);
                setEditingCustomer(null);
                fetchCustomers();
            }
        } catch (error: any) {
            console.error('Error submitting customer:', error);
            if (error.response?.data?.message) {
                showToast(error.response.data.message, 'error');
            } else {
                showToast('Có lỗi xảy ra', 'error');
            }
        }
    };

    // Pagination
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AdminLayout>
            <Head title="Quản lý khách hàng" />

            <div className="tw-container tw-mx-auto tw-py-6">
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
                    <h1 className="tw-text-2xl tw-font-semibold">Quản lý khách hàng</h1>
                    <div className="tw-flex tw-gap-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="tw-px-4 tw-py-2 tw-border tw-rounded-lg"
                        />
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-overflow-x-auto">
                            <table className="tw-min-w-full tw-divide-y tw-divide-gray-200">
                                <thead className="tw-bg-gray-50">
                                    <tr>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Email</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Họ tên</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Số điện thoại</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Địa chỉ</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Trạng thái</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="tw-divide-y tw-divide-gray-200">
                                    {paginatedCustomers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{customer.email}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{customer.fullname || '-'}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{customer.phone}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{customer.address || '-'}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                                <button
                                                    onClick={() => handleSwitchStatus(customer.id)}
                                                    className={`tw-px-3 tw-py-1 tw-rounded ${
                                                        customer.status === 1
                                                            ? 'tw-bg-green-100 tw-text-green-800'
                                                            : 'tw-bg-red-100 tw-text-red-800'
                                                    }`}
                                                >
                                                    {customer.status === 1 ? 'Hoạt động' : 'Khóa'}
                                                </button>
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                                <div className="tw-flex tw-items-center tw-space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(customer)}
                                                        className="tw-text-blue-600 hover:tw-text-blue-900"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(customer.id)}
                                                        className="tw-text-red-600 hover:tw-text-red-900"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={filteredCustomers.length}
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={setItemsPerPage}
                        />
                    </>
                )}
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingCustomer(null);
                }}
                title="Chỉnh sửa khách hàng"
            >
                <Form
                    fields={[
                        {
                            name: 'fullname',
                            label: 'Họ tên',
                            type: 'text',
                            value: formData.fullname,
                            placeholder: 'Nhập họ tên'
                        },
                        {
                            name: 'email',
                            label: 'Email',
                            type: 'email',
                            value: formData.email,
                            required: true,
                            placeholder: 'Nhập email'
                        },
                        {
                            name: 'phone',
                            label: 'Số điện thoại',
                            type: 'text',
                            value: formData.phone,
                            required: true,
                            placeholder: 'Nhập số điện thoại'
                        },
                        {
                            name: 'address',
                            label: 'Địa chỉ',
                            type: 'text',
                            value: formData.address,
                            placeholder: 'Nhập địa chỉ'
                        },
                        {
                            name: 'password',
                            label: 'Mật khẩu mới',
                            type: 'password',
                            value: '',
                            placeholder: 'Nhập mật khẩu mới (để trống nếu không đổi)'
                        },
                        {
                            name: 'password_confirmation',
                            label: 'Xác nhận mật khẩu',
                            type: 'password',
                            value: '',
                            placeholder: 'Xác nhận mật khẩu mới'
                        }
                    ]}
                    onSubmit={handleSubmit}
                    onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                    onCancel={() => {
                        setShowModal(false);
                        setEditingCustomer(null);
                    }}
                />
            </Modal>
        </AdminLayout>
    );
} 