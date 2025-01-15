import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/Components/common/Loading';
import Modal from '@/Components/admin/common/Modal';
import Form from '@/Components/admin/common/Form';
import Pagination from '@/Components/admin/common/Pagination';

interface Attribute {
    id: number;
    name: string;
    type: 'select' | 'color' | 'text';
    values: string[];
}

const ITEMS_PER_PAGE = 5;

const SAMPLE_ATTRIBUTES: Attribute[] = [
    { id: 1, name: 'Size', type: 'select', values: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: 'Color', type: 'color', values: ['#FF0000', '#00FF00', '#0000FF'] },
    { id: 3, name: 'Material', type: 'text', values: ['Cotton', 'Polyester', 'Wool'] },
    { id: 4, name: 'Style', type: 'select', values: ['Casual', 'Formal', 'Sport'] },
    { id: 5, name: 'Pattern', type: 'select', values: ['Solid', 'Striped', 'Floral'] },
    { id: 6, name: 'Season', type: 'select', values: ['Spring', 'Summer', 'Fall', 'Winter'] },
    { id: 7, name: 'Fit', type: 'select', values: ['Regular', 'Slim', 'Loose'] },
    { id: 8, name: 'Neckline', type: 'select', values: ['Round', 'V-neck', 'Collar'] },
    { id: 9, name: 'Sleeve', type: 'select', values: ['Short', 'Long', '3/4'] },
    { id: 10, name: 'Occasion', type: 'select', values: ['Casual', 'Party', 'Work'] },
    { id: 11, name: 'Brand', type: 'select', values: ['Nike', 'Adidas', 'Puma'] },
    { id: 12, name: 'Fabric Weight', type: 'select', values: ['Light', 'Medium', 'Heavy'] },
    { id: 13, name: 'Care Instructions', type: 'text', values: ['Machine Wash', 'Hand Wash', 'Dry Clean'] },
    { id: 14, name: 'Length', type: 'select', values: ['Short', 'Regular', 'Long'] },
    { id: 15, name: 'Age Group', type: 'select', values: ['Adult', 'Kids', 'Teen'] },
];

export default function Attributes() {
    const [attributes, setAttributes] = useState<Attribute[]>(SAMPLE_ATTRIBUTES);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        type: 'select',
        values: ''
    });

    // Search and Pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAttributes, setFilteredAttributes] = useState<Attribute[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Filter and paginate attributes
    useEffect(() => {
        let result = [...attributes];

        if (searchTerm) {
            result = result.filter(attr =>
                attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                attr.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                attr.values.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredAttributes(result);
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchTerm, attributes]);

    const totalPages = Math.ceil(filteredAttributes.length / itemsPerPage);
    const paginatedAttributes = filteredAttributes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this attribute?')) {
            setAttributes(prev => prev.filter(attr => attr.id !== id));
            showToast('Attribute deleted successfully', 'success');
        }
    };

    const handleEdit = (attribute: Attribute) => {
        setEditingAttribute(attribute);
        setShowModal(true);
    };

    const handleFormChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (data: any) => {
        if (editingAttribute) {
            setAttributes(prev =>
                prev.map(attr =>
                    attr.id === editingAttribute.id ? { ...data, id: attr.id } : attr
                )
            );
            showToast('Attribute updated successfully', 'success');
        } else {
            setAttributes(prev => [...prev, { ...data, id: Date.now() }]);
            showToast('Attribute added successfully', 'success');
        }
        setShowModal(false);
        setEditingAttribute(null);
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    return (
        <AdminLayout>
            <Head title="Manage Attributes" />

            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden">
                <div className="tw-px-6 tw-py-4 tw-border-b tw-border-gray-200">
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                        <h2 className="tw-text-lg tw-font-semibold tw-text-gray-900">Product Attributes</h2>
                        <button
                            onClick={() => setShowModal(true)}
                            className="tw-bg-primary-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-primary-700 tw-transition-colors"
                        >
                            Add New Attribute
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="tw-mb-4">
                        <div className="tw-relative">
                            <input
                                type="text"
                                placeholder="Search attributes..."
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
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Name</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Type</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Values</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="tw-divide-y tw-divide-gray-200">
                                    {paginatedAttributes.map((attribute) => (
                                        <tr key={attribute.id} className="hover:tw-bg-gray-50">
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-900">{attribute.name}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">{attribute.type}</td>
                                            <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-500">
                                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                                    {attribute.values.map((value, index) => (
                                                        <span
                                                            key={index}
                                                            className="tw-px-2 tw-py-1 tw-rounded-full tw-bg-gray-100 tw-text-gray-700 tw-text-xs"
                                                        >
                                                            {value}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium">
                                                <button
                                                    onClick={() => handleEdit(attribute)}
                                                    className="tw-text-primary-600 hover:tw-text-primary-900 tw-mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(attribute.id)}
                                                    className="tw-text-red-600 hover:tw-text-red-900"
                                                >
                                                    Delete
                                                </button>
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
                            onItemsPerPageChange={handleItemsPerPageChange}
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
                title={editingAttribute ? 'Edit Attribute' : 'Add New Attribute'}
            >
                <Form
                    fields={[
                        {
                            name: 'name',
                            label: 'Name',
                            type: 'text',
                            value: formData.name,
                            required: true,
                            placeholder: 'Enter attribute name'
                        },
                        {
                            name: 'type',
                            label: 'Type',
                            type: 'select',
                            value: formData.type,
                            required: true,
                            options: [
                                { value: 'select', label: 'Select' },
                                { value: 'color', label: 'Color' },
                                { value: 'text', label: 'Text' }
                            ]
                        },
                        {
                            name: 'values',
                            label: 'Values',
                            type: 'textarea',
                            value: formData.values,
                            required: true,
                            placeholder: 'Enter values (comma-separated)',
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
