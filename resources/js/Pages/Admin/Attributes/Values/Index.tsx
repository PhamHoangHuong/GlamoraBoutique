import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/Components/common/Loading';
import Modal from '@/Components/admin/common/Modal';
import Form from '@/Components/admin/common/Form';
import Pagination from '@/Components/admin/common/Pagination';
import { attributesService } from '@/services/api/attributes.service';
import type { AttributeValue, Attribute } from '@/types/attributes';

interface FormData {
    attribute_id: number;
    value: string;
}

export default function AttributeValues() {
    const [values, setValues] = useState<AttributeValue[]>([]);
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingValue, setEditingValue] = useState<AttributeValue | null>(null);
    const { showToast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        attribute_id: 0,
        value: ''
    });

    // Search and Pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        perPage: 20,
        total: 0,
        lastPage: 1
    });
    const [filteredValues, setFilteredValues] = useState<AttributeValue[]>([]);

    const fetchAttributes = async () => {
        try {
            const response = await attributesService.getAllAttributes();
            setAttributes(response.data.data);
        } catch (error) {
            console.error('Error fetching attributes:', error);
            showToast('Không thể tải danh sách thuộc tính', 'error');
        }
    };

    const fetchValues = async (page: number = 1, perPage: number = pagination.perPage) => {
        try {
            setLoading(true);
            const response = await attributesService.getAllAttributeValues(page, perPage);
            setValues(response.data.data.data);
            setPagination({
                currentPage: response.data.data.pagination.current_page,
                perPage: response.data.data.pagination.per_page,
                total: response.data.data.pagination.total,
                lastPage: response.data.data.pagination.last_page
            });
        } catch (error) {
            console.error('Error fetching values:', error);
            showToast('Không thể tải danh sách giá trị', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttributes();
        fetchValues(pagination.currentPage);
    }, [pagination.currentPage]);

    useEffect(() => {
        if (!values) return;

        let result = [...values];
        if (searchTerm) {
            result = result.filter(value => 
                value.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                attributes.find(attr => attr.id === value.attribute_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredValues(result);
    }, [searchTerm, values, attributes]);

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa giá trị này?')) {
            try {
                await attributesService.deleteAttributeValue(id);
                showToast('Xóa giá trị thành công', 'success');
                fetchValues();
            } catch (error) {
                console.error('Error deleting value:', error);
                showToast('Không thể xóa giá trị', 'error');
            }
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            if (editingValue) {
                await attributesService.updateAttributeValue(editingValue.id, { value: data.value });
                showToast('Cập nhật giá trị thành công', 'success');
            } else {
                await attributesService.createAttributeValue({
                    attribute_id: parseInt(data.attribute_id),
                    value: data.value
                });
                showToast('Thêm giá trị thành công', 'success');
            }

            setShowModal(false);
            setEditingValue(null);
            fetchValues();
        } catch (error) {
            console.error('Error submitting value:', error);
            showToast('Có lỗi xảy ra', 'error');
        }
    };

    const totalPages = Math.ceil(filteredValues.length / pagination.perPage);
    const paginatedValues = filteredValues.slice(
        (pagination.currentPage - 1) * pagination.perPage,
        pagination.currentPage * pagination.perPage
    );

    return (
        <AdminLayout>
            <Head title="Quản lý giá trị thuộc tính" />

            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden">
                <div className="tw-px-6 tw-py-4 tw-border-b tw-border-gray-200">
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                        <h2 className="tw-text-lg tw-font-semibold tw-text-gray-900">Giá trị thuộc tính</h2>
                        <button
                            onClick={() => {
                                setFormData({ attribute_id: 0, value: '' });
                                setShowModal(true);
                            }}
                            className="tw-bg-primary-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-primary-700 tw-transition-colors"
                        >
                            Thêm giá trị mới
                        </button>
                    </div>

                    <div className="tw-mb-4">
                        <div className="tw-relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm giá trị..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-ring-primary-500 focus:tw-border-primary-500"
                            />
                            <div className="tw-absolute tw-left-3 tw-top-2.5 tw-text-gray-400">
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="tw-overflow-x-auto">
                            <table className="tw-w-full">
                                <thead className="tw-bg-gray-50">
                                    <tr>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Thuộc tính</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Giá trị</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="tw-divide-y tw-divide-gray-200">
                                    {paginatedValues.map((value) => (
                                        <tr key={value.id} className="hover:tw-bg-gray-50">
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-900">
                                                {attributes.find(attr => attr.id === value.attribute_id)?.name}
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">
                                                {value.value}
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium">
                                                <button
                                                    onClick={() => {
                                                        setEditingValue(value);
                                                        setFormData({
                                                            attribute_id: value.attribute_id,
                                                            value: value.value
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="tw-text-primary-600 hover:tw-text-primary-900 tw-mr-4"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(value.id)}
                                                    className="tw-text-red-600 hover:tw-text-red-900"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.lastPage}
                            onPageChange={(page) => fetchValues(page)}
                            totalItems={pagination.total}
                            itemsPerPage={pagination.perPage}
                            onItemsPerPageChange={(newPerPage) => {
                                fetchValues(1, newPerPage);
                            }}
                        />
                    </>
                )}
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingValue(null);
                }}
                title={editingValue ? 'Sửa giá trị' : 'Thêm giá trị mới'}
            >
                <Form
                    fields={[
                        {
                            name: 'attribute_id',
                            label: 'Thuộc tính',
                            type: 'select',
                            value: formData.attribute_id.toString(),
                            required: true,
                            options: attributes.map(attr => ({
                                value: attr.id.toString(),
                                label: attr.name
                            })),
                        },
                        {
                            name: 'value',
                            label: 'Giá trị',
                            type: 'text',
                            value: formData.value,
                            required: true,
                            placeholder: 'Nhập giá trị'
                        }
                    ]}
                    onSubmit={handleSubmit}
                    onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                    onCancel={() => {
                        setShowModal(false);
                        setEditingValue(null);
                    }}
                />
            </Modal>
        </AdminLayout>
    );
} 