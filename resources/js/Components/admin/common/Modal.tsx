import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'tw-max-w-md',
        md: 'tw-max-w-lg',
        lg: 'tw-max-w-2xl',
        xl: 'tw-max-w-4xl'
    };

    return (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-y-auto">
            <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-px-4 tw-pt-4 tw-pb-20 tw-text-center sm:tw-block sm:tw-p-0">
                {/* Background overlay */}
                <div className="tw-fixed tw-inset-0 tw-transition-opacity" aria-hidden="true">
                    <div className="tw-absolute tw-inset-0 tw-bg-gray-500 tw-opacity-75"></div>
                </div>

                {/* Modal panel */}
                <div className={`tw-inline-block tw-align-bottom tw-bg-white tw-rounded-lg tw-text-left tw-overflow-hidden tw-shadow-xl tw-transform tw-transition-all sm:tw-my-8 sm:tw-align-middle ${sizeClasses[size]} tw-w-full`}>
                    <div className="tw-bg-white tw-px-4 tw-pt-5 tw-pb-4 sm:tw-p-6">
                        <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                            <h3 className="tw-text-lg tw-font-medium tw-text-gray-900">{title}</h3>
                            <button
                                onClick={onClose}
                                className="tw-text-gray-400 hover:tw-text-gray-500 focus:tw-outline-none"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
