import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/Components/common/Loading';
import Modal from '@/Components/admin/common/Modal';
import Form from '@/Components/admin/common/Form';
import { attributesService } from '@/services/api/attributes.service';
import type { AttributeValue, CreateAttributeValueDTO } from '@/types/attributes';

interface FormData {
    attribute_id: number;
    value: string;
}

interface AttributeValuesResponse {
    data: AttributeValue[];
}

export default function AttributeValues({ attributeId }: { attributeId: number }) {
    const [values, setValues] = useState<AttributeValue[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingValue, setEditingValue] = useState<AttributeValue | null>(null);
    const { showToast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        attribute_id: attributeId,
        value: ''
    });

    const fetchValues = async () => {
        try {
            setLoading(true);
            const response = await attributesService.getAllAttributeValues();
            const filteredValues = response.data.data.filter((v: AttributeValue) => v.attribute_id === attributeId);
            setValues(filteredValues);
        } catch (error) {
            console.error('Error fetching values:', error);
            showToast('Không thể tải danh sách giá trị', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchValues();
    }, [attributeId]);

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
            const valueData: CreateAttributeValueDTO = {
                attribute_id: attributeId,
                value: data.value
            };

            if (editingValue) {
                await attributesService.updateAttributeValue(editingValue.id, { value: data.value });
                showToast('Cập nhật giá trị thành công', 'success');
            } else {
                await attributesService.createAttributeValue(valueData);
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

    return (
        <div>
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                <h3 className="tw-text-lg tw-font-medium">Giá trị thuộc tính</h3>
                <button
                    onClick={() => {
                        setFormData({ attribute_id: attributeId, value: '' });
                        setShowModal(true);
                    }}
                    className="tw-bg-primary-600 tw-text-white tw-px-3 tw-py-1 tw-rounded"
                >
                    Thêm giá trị
                </button>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div className="tw-grid tw-grid-cols-4 tw-gap-4">
                    {values.map((value) => (
                        <div key={value.id} className="tw-bg-gray-50 tw-p-3 tw-rounded tw-flex tw-justify-between tw-items-center">
                            <span>{value.value}</span>
                            <div>
                                <button
                                    onClick={() => {
                                        setEditingValue(value);
                                        setFormData({ attribute_id: value.attribute_id, value: value.value });
                                        setShowModal(true);
                                    }}
                                    className="tw-text-primary-600 hover:tw-text-primary-900 tw-mr-2"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(value.id)}
                                    className="tw-text-red-600 hover:tw-text-red-900"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
        </div>
    );
} 