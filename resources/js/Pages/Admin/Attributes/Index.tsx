import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/Components/common/Loading';
import Modal from '@/Components/admin/common/Modal';
import Form from '@/Components/admin/common/Form';
import Pagination from '@/Components/admin/common/Pagination';
import { attributesService } from '@/services/api/attributes.service';
import type { Attribute, CreateAttributeDTO, UpdateAttributeDTO, CreateAttributeValueDTO } from '@/types/attributes';
import AttributeValues from './AttributeValues';

const ITEMS_PER_PAGE = 5;

interface FormData {
    name: string;
    description: string;
}

export default function Attributes() {
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);
    const { showToast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: ''
    });

    // Search and Pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAttributes, setFilteredAttributes] = useState<Attribute[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Fetch attributes from API
    const fetchAttributes = async () => {
        try {
            setLoading(true);
            const response = await attributesService.getAllAttributes();
            setAttributes(response.data.data);
        } catch (error) {
            console.error('Error fetching attributes:', error);
            showToast('Không thể tải danh sách thuộc tính', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttributes();
    }, []);

    // Filter attributes
    useEffect(() => {
        if (!attributes) return;

        let result = [...attributes];

        if (searchTerm) {
            result = result.filter(attr =>
                attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                attr.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredAttributes(result);
        setCurrentPage(1);
    }, [searchTerm, attributes]);

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa thuộc tính này?')) {
            try {
                await attributesService.deleteAttribute(id);
                showToast('Xóa thuộc tính thành công', 'success');
                fetchAttributes(); // Refresh list
            } catch (error) {
                console.error('Error deleting attribute:', error);
                showToast('Không thể xóa thuộc tính', 'error');
            }
        }
    };

    const handleEdit = (attribute: Attribute) => {
        setEditingAttribute(attribute);
        setFormData({
            name: attribute.name,
            description: attribute.description || ''
        });
        setShowModal(true);
    };

    const handleFormChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (data: any) => {
        try {
            const attributeData: CreateAttributeDTO | UpdateAttributeDTO = {
                name: data.name,
                description: data.description
            };

            if (editingAttribute) {
                await attributesService.updateAttribute(editingAttribute.id, attributeData);
                showToast('Cập nhật thuộc tính thành công', 'success');
            } else {
                await attributesService.createAttribute(attributeData as CreateAttributeDTO);
                showToast('Tạo thuộc tính thành công', 'success');
            }

            setShowModal(false);
            setEditingAttribute(null);
            fetchAttributes();
        } catch (error) {
            console.error('Error submitting attribute:', error);
            showToast('Có lỗi xảy ra', 'error');
        }
    };

    const totalPages = Math.ceil(filteredAttributes.length / itemsPerPage);
    const paginatedAttributes = filteredAttributes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AdminLayout>
            <Head title="Quản lý thuộc tính" />

            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden">
                <div className="tw-px-6 tw-py-4 tw-border-b tw-border-gray-200">
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                        <h2 className="tw-text-lg tw-font-semibold tw-text-gray-900">Thuộc tính sản phẩm</h2>
                        <button
                            onClick={() => {
                                setFormData({ name: '', description: '' });
                                setShowModal(true);
                            }}
                            className="tw-bg-primary-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-primary-700 tw-transition-colors"
                        >
                            Thêm thuộc tính mới
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="tw-mb-4">
                        <div className="tw-relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm thuộc tính..."
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
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Tên</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Mô tả</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Giá trị</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="tw-divide-y tw-divide-gray-200">
                                    {paginatedAttributes.map((attribute) => (
                                        <tr key={attribute.id} className="hover:tw-bg-gray-50">
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-900">
                                                {attribute.name}
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">
                                                {attribute.description}
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-500">
                                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                                    {attribute.values?.map(value => (
                                                        <span key={value.id} className="tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded">
                                                            {value.value}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium">
                                                <div className="tw-flex tw-items-center tw-space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(attribute)}
                                                        className="tw-text-primary-600 hover:tw-text-primary-900"
                                                        title="Sửa thuộc tính"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <a 
                                                        href={`/admin/attributes/${attribute.id}/values`}
                                                        className="tw-text-green-600 hover:tw-text-green-900"
                                                        title="Quản lý giá trị"
                                                    >
                                                        <i className="fas fa-list-ul"></i>
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(attribute.id)}
                                                        className="tw-text-red-600 hover:tw-text-red-900"
                                                        title="Xóa thuộc tính"
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

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={filteredAttributes.length}
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
                    setEditingAttribute(null);
                }}
                title={editingAttribute ? 'Sửa thuộc tính' : 'Thêm thuộc tính mới'}
            >
                <Form
                    fields={[
                        {
                            name: 'name',
                            label: 'Tên thuộc tính',
                            type: 'text',
                            value: formData.name,
                            required: true,
                            placeholder: 'Nhập tên thuộc tính'
                        },
                        {
                            name: 'description',
                            label: 'Mô tả',
                            type: 'textarea',
                            value: formData.description,
                            placeholder: 'Nhập mô tả thuộc tính',
                            rows: 3
                        }
                    ]}
                    onSubmit={handleSubmit}
                    onChange={handleFormChange}
                    onCancel={() => {
                        setShowModal(false);
                        setEditingAttribute(null);
                    }}
                />
            </Modal>
        </AdminLayout>
    );
}
