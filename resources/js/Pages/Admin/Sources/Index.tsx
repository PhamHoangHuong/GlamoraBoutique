import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/Components/common/Loading';
import Modal from '@/Components/admin/common/Modal';
import Form from '@/Components/admin/common/Form';
import Pagination from '@/Components/admin/common/Pagination';
import { sourcesService } from '@/services/api/sources.service';
import type { Source, CreateSourceDTO, UpdateSourceDTO } from '@/types/sources';
import { locationService } from '@/services/api/location.service';
import type { Province, District, Ward } from '@/services/api/location.service';

export default function Sources() {
    const [sources, setSources] = useState<Source[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingSource, setEditingSource] = useState<Source | null>(null);
    const { showToast } = useToast();

    // Search and Pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredSources, setFilteredSources] = useState<Source[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [formData, setFormData] = useState<UpdateSourceDTO>({
        name: '',
        address: '',
        province_id: '',
        district_id: '',
        ward_id: '',
        active: true
    });

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const fetchSources = async () => {
        try {
            setLoading(true);
            const response = await sourcesService.getAllSources();
            setSources(response.data.data);
        } catch (error) {
            console.error('Error fetching sources:', error);
            showToast('Không thể tải danh sách kho', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSources();
    }, []);

    useEffect(() => {
        if (!sources) return;

        let result = [...sources];
        if (searchTerm) {
            result = result.filter(source =>
                source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                source.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredSources(result);
        setCurrentPage(1);
    }, [searchTerm, sources]);

    // Fetch provinces khi component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await locationService.getProvinces();
                setProvinces(response.data.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    // Fetch districts khi chọn province
    useEffect(() => {
        const fetchDistricts = async () => {
            if (formData.province_id) {
                try {
                    const response = await locationService.getDistricts(formData.province_id);
                    setDistricts(response.data.data);
                    // Reset district và ward khi đổi province
                    setFormData(prev => ({ ...prev, district_id: '', ward_id: '' }));
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };
        fetchDistricts();
    }, [formData.province_id]);

    // Fetch wards khi chọn district
    useEffect(() => {
        const fetchWards = async () => {
            if (formData.district_id) {
                try {
                    const response = await locationService.getWards(formData.district_id);
                    setWards(response.data.data);
                    // Reset ward khi đổi district
                    setFormData(prev => ({ ...prev, ward_id: '' }));
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            }
        };
        fetchWards();
    }, [formData.district_id]);

    const handleSubmit = async (data: any) => {
        try {
            // Đảm bảo active là boolean
            const submitData = {
                ...data,
                active: Boolean(data.active)
            };

            if (editingSource) {
                await sourcesService.updateSource(editingSource.id, submitData);
                showToast('Cập nhật kho thành công', 'success');
            } else {
                await sourcesService.createSource(submitData);
                showToast('Tạo kho thành công', 'success');
            }
            setShowModal(false);
            setEditingSource(null);
            fetchSources();
        } catch (error: any) {
            console.error('Error submitting source:', error);
            if (error.response?.data?.errors) {
                // Hiển thị lỗi validation
                const errorMessages = Object.values(error.response.data.errors).flat();
                showToast(errorMessages[0], 'error');
            } else {
                showToast(error.response?.data?.message || 'Có lỗi xảy ra', 'error');
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa kho này?')) {
            try {
                await sourcesService.deleteSource(id);
                showToast('Xóa kho thành công', 'success');
                fetchSources();
            } catch (error) {
                console.error('Error deleting source:', error);
                showToast('Không thể xóa kho', 'error');
            }
        }
    };

    const handleEdit = async (source: Source) => {
        setEditingSource(source);
        setFormData({
            name: source.name,
            address: source.address,
            province_id: source.province_id,
            district_id: source.district_id,
            ward_id: source.ward_id,
            active: Boolean(source.active)
        });

        try {
            // Load provinces
            const provincesResponse = await locationService.getProvinces();
            setProvinces(provincesResponse.data.data);

            // Load districts của province được chọn
            const districtsResponse = await locationService.getDistricts(source.province_id);
            setDistricts(districtsResponse.data.data);

            // Load wards của district được chọn
            const wardsResponse = await locationService.getWards(source.district_id);
            setWards(wardsResponse.data.data);
        } catch (error) {
            console.error('Error loading location data:', error);
        }

        setShowModal(true);
    };

    // Pagination
    const totalPages = Math.ceil(filteredSources.length / itemsPerPage);
    const paginatedSources = filteredSources.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AdminLayout>
            <Head title="Quản lý kho" />

            <div className="tw-container tw-mx-auto tw-py-6">
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
                    <h1 className="tw-text-2xl tw-font-semibold">Quản lý kho</h1>
                    <div className="tw-flex tw-gap-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="tw-px-4 tw-py-2 tw-border tw-rounded-lg"
                        />
                        <button
                            onClick={() => {
                                setEditingSource(null);
                                setFormData({
                                    name: '',
                                    address: '',
                                    province_id: '',
                                    district_id: '',
                                    ward_id: '',
                                    active: true
                                });
                                setShowModal(true);
                            }}
                            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
                        >
                            Thêm kho
                        </button>
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
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Tên kho</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Địa chỉ</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Tỉnh/TP</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Quận/Huyện</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Phường/Xã</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Trạng thái</th>
                                        <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="tw-divide-y tw-divide-gray-200">
                                    {paginatedSources.map((source) => (
                                        <tr key={source.id}>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{source.name}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{source.address}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{source.province}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{source.district}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{source.ward}</td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                                <span className={`tw-px-2 tw-py-1 tw-rounded ${
                                                    source.active
                                                        ? 'tw-bg-green-100 tw-text-green-800'
                                                        : 'tw-bg-red-100 tw-text-red-800'
                                                }`}>
                                                    {source.active ? 'Hoạt động' : 'Không hoạt động'}
                                                </span>
                                            </td>
                                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                                <div className="tw-flex tw-items-center tw-space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(source)}
                                                        className="tw-text-blue-600 hover:tw-text-blue-900"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(source.id)}
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
                            totalItems={filteredSources.length}
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
                    setEditingSource(null);
                }}
                title={editingSource ? "Chỉnh sửa kho" : "Thêm kho mới"}
            >
                <Form
                    fields={[
                        {
                            name: 'name',
                            label: 'Tên kho',
                            type: 'text',
                            value: formData.name,
                            required: true,
                            placeholder: 'Nhập tên kho'
                        },
                        {
                            name: 'address',
                            label: 'Địa chỉ',
                            type: 'text',
                            value: formData.address,
                            required: true,
                            placeholder: 'Nhập địa chỉ'
                        },
                        {
                            name: 'province_id',
                            label: 'Tỉnh/Thành phố',
                            type: 'select',
                            value: formData.province_id,
                            required: true,
                            isSearchable: true,
                            options: provinces.map(province => ({
                                value: province.code,
                                label: province.name
                            }))
                        },
                        {
                            name: 'district_id',
                            label: 'Quận/Huyện',
                            type: 'select',
                            value: formData.district_id,
                            required: true,
                            isSearchable: true,
                            options: districts.map(district => ({
                                value: district.code,
                                label: district.name
                            }))
                        },
                        {
                            name: 'ward_id',
                            label: 'Phường/Xã',
                            type: 'select',
                            value: formData.ward_id,
                            required: true,
                            isSearchable: true,
                            options: wards.map(ward => ({
                                value: ward.code,
                                label: ward.name
                            }))
                        },
                        {
                            name: 'active',
                            label: 'Trạng thái',
                            type: 'checkbox',
                            value: formData.active,
                            text: 'Hoạt động'
                        }
                    ]}
                    onSubmit={handleSubmit}
                    onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                    onCancel={() => {
                        setShowModal(false);
                        setEditingSource(null);
                    }}
                />
            </Modal>
        </AdminLayout>
    );
} 