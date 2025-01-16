import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface OrderDetailModalProps {
    order: any;
    onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
    if (!order) return null;

    const statusMap = {
        pending: {
            label: 'Chờ xác nhận',
            color: 'tw-text-yellow-600 tw-bg-yellow-50'
        },
        processing: {
            label: 'Đang xử lý',
            color: 'tw-text-blue-600 tw-bg-blue-50'
        },
        shipping: {
            label: 'Đang giao hàng',
            color: 'tw-text-purple-600 tw-bg-purple-50'
        },
        delivered: {
            label: 'Đã giao hàng',
            color: 'tw-text-green-600 tw-bg-green-50'
        },
        cancelled: {
            label: 'Đã hủy',
            color: 'tw-text-red-600 tw-bg-red-50'
        }
    };

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="tw-relative tw-z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="tw-ease-out tw-duration-300"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
                </Transition.Child>

                <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
                    <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="tw-ease-out tw-duration-300"
                            enterFrom="tw-opacity-0 tw-scale-95"
                            enterTo="tw-opacity-100 tw-scale-100"
                            leave="tw-ease-in tw-duration-200"
                            leaveFrom="tw-opacity-100 tw-scale-100"
                            leaveTo="tw-opacity-0 tw-scale-95"
                        >
                            <Dialog.Panel className="tw-w-full tw-max-w-2xl tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900 tw-mb-4"
                                >
                                    Chi tiết đơn hàng #{order.id}
                                </Dialog.Title>

                                <div className="tw-mb-6">
                                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                                        <div className="tw-text-sm tw-text-gray-500">
                                            Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}
                                        </div>
                                        <span className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium ${statusMap[order.status as keyof typeof statusMap].color}`}>
                                            {statusMap[order.status as keyof typeof statusMap].label}
                                        </span>
                                    </div>
                                </div>

                                <div className="tw-border-t tw-border-gray-200 tw-py-4">
                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="tw-flex tw-items-center tw-py-4 tw-border-b tw-border-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="tw-w-16 tw-h-16 tw-object-cover tw-rounded-lg"
                                            />
                                            <div className="tw-ml-4 tw-flex-1">
                                                <h4 className="tw-font-medium">{item.name}</h4>
                                                <p className="tw-text-sm tw-text-gray-500">
                                                    Size: {item.size} | Màu: {item.color}
                                                </p>
                                                <div className="tw-flex tw-justify-between tw-mt-2">
                                                    <span className="tw-text-sm">
                                                        {item.quantity} x {item.price.toLocaleString()}đ
                                                    </span>
                                                    <span className="tw-font-medium">
                                                        {(item.quantity * item.price).toLocaleString()}đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="tw-mt-6 tw-space-y-2">
                                    <div className="tw-flex tw-justify-between">
                                        <span className="tw-text-gray-600">Tổng tiền hàng:</span>
                                        <span>{order.total.toLocaleString()}đ</span>
                                    </div>
                                    <div className="tw-flex tw-justify-between">
                                        <span className="tw-text-gray-600">Phí vận chuyển:</span>
                                        <span>30.000đ</span>
                                    </div>
                                    <div className="tw-flex tw-justify-between tw-font-medium tw-text-lg tw-pt-2 tw-border-t">
                                        <span>Tổng cộng:</span>
                                        <span className="tw-text-primary-600">
                                            {(order.total + 30000).toLocaleString()}đ
                                        </span>
                                    </div>
                                </div>

                                <div className="tw-mt-6">
                                    <button
                                        type="button"
                                        className="tw-w-full tw-bg-primary-600 tw-text-white tw-py-2 tw-rounded-lg hover:tw-bg-primary-700 tw-transition-colors"
                                        onClick={onClose}
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
