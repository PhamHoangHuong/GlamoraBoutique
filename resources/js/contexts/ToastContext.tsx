import React, { createContext, useContext, useState } from 'react';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    showToast: (message: string, type: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: Toast['type']) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="tw-fixed tw-bottom-4 tw-right-4 tw-z-[9999]">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            tw-mb-2 tw-p-4 tw-rounded-lg tw-shadow-lg tw-min-w-[300px]
                            tw-animate-fade-in-up
                            ${toast.type === 'success' ? 'tw-bg-green-500' :
                              toast.type === 'error' ? 'tw-bg-red-500' :
                              'tw-bg-blue-500'}
                            tw-text-white
                            tw-transform tw-transition-all
                            tw-duration-300
                        `}
                    >
                        <div className="tw-flex tw-items-center tw-gap-2">
                            <i className={`fas ${
                                toast.type === 'success' ? 'fa-check-circle' :
                                toast.type === 'error' ? 'fa-exclamation-circle' :
                                'fa-info-circle'
                            }`}></i>
                            <span>{toast.message}</span>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
