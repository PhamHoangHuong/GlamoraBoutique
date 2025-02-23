import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ToastProvider } from '@/contexts/ToastContext';

interface MenuItem {
    name: string;
    icon: string;
    route: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const menuItems: MenuItem[] = [
        { name: 'Dashboard', icon: 'fas fa-chart-line', route: 'admin.dashboard' },
        { name: 'Customers', icon: 'fas fa-users', route: 'admin.customers' },
        { name: 'Products', icon: 'fas fa-box', route: 'admin.products' },
        { name: 'Attributes', icon: 'fas fa-tags', route: 'admin.attributes' },
        { name: 'Orders', icon: 'fas fa-shopping-cart', route: 'admin.orders' },
        { name: 'Sources', icon: 'fas fa-store', route: 'admin.sources' },
        // { name: 'Users', icon: 'fas fa-users', route: 'admin.users' },
        { name: 'Settings', icon: 'fas fa-cog', route: 'admin.settings' },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setSidebarOpen(window.innerWidth >= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ToastProvider>
            <div className="tw-min-h-screen tw-bg-gray-100">
                {/* Sidebar */}
                <aside className={`
                    tw-fixed tw-top-0 tw-left-0 tw-z-40 tw-h-screen tw-transition-transform
                    ${sidebarOpen ? 'tw-translate-x-0' : 'tw-translate-x-[-100%]'}
                    tw-w-64 tw-bg-white tw-border-r tw-border-gray-200 tw-shadow-lg
                `}>
                    <div className="tw-flex tw-flex-col tw-h-full">
                        {/* Logo */}
                        <div className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-4 tw-border-b">
                            <Link
                                href={route('admin.dashboard')}
                                className="tw-flex tw-items-center tw-space-x-2 tw-no-underline hover:tw-opacity-80 tw-transition-opacity"
                            >
                                <i className="fas fa-store tw-text-2xl tw-text-primary-600"></i>
                                <span className="tw-text-xl tw-font-bold tw-text-gray-800">Admin Panel</span>
                            </Link>
                            {isMobile && (
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
                                >
                                    <i className="fas fa-times tw-text-gray-600"></i>
                                </button>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="tw-flex-1 tw-px-4 tw-py-6 tw-space-y-1 tw-overflow-y-auto">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    className={`
                                        tw-flex tw-items-center tw-px-4 tw-py-3 tw-text-gray-700 tw-rounded-lg
                                        tw-no-underline tw-transition-all tw-duration-200
                                        hover:tw-bg-primary-50 hover:tw-text-primary-600 hover:tw-translate-x-1
                                        hover:tw-shadow-sm
                                        ${route().current(item.route) ? 'tw-bg-primary-50 tw-text-primary-600 tw-shadow-sm' : ''}
                                    `}
                                >
                                    <i className={`${item.icon} tw-w-5 tw-text-center tw-transition-transform group-hover:tw-scale-110`}></i>
                                    <span className="tw-ml-3 tw-font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* User Profile */}
                        <div className="tw-border-t tw-border-gray-200 tw-p-4 hover:tw-bg-gray-50 tw-transition-colors tw-cursor-pointer">
                            <div className="tw-flex tw-items-center tw-space-x-3">
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin+User"
                                    alt="Admin"
                                    className="tw-w-10 tw-h-10 tw-rounded-full tw-transition-transform hover:tw-scale-110"
                                />
                                <div>
                                    <p className="tw-font-medium tw-text-gray-800">Admin User</p>
                                    <p className="tw-text-sm tw-text-gray-500">admin@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className={`tw-transition-all tw-duration-300 ${sidebarOpen ? 'tw-ml-64' : 'tw-ml-0'}`}>
                    {/* Header */}
                    <header className="tw-bg-white tw-border-b tw-border-gray-200 tw-sticky tw-top-0 tw-z-30">
                        <div className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors tw-duration-200"
                            >
                                <i className={`fas ${sidebarOpen ? 'fa-bars' : 'fa-bars'} tw-text-gray-600`}></i>
                            </button>

                            <div className="tw-flex tw-items-center tw-space-x-4">
                                {/* Notifications */}
                                <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-all tw-duration-200 hover:tw-scale-105 tw-relative">
                                    <i className="far fa-bell tw-text-gray-600"></i>
                                    <span className="tw-absolute tw-top-0 tw-right-0 tw-w-2 tw-h-2 tw-bg-red-500 tw-rounded-full tw-animate-pulse"></span>
                                </button>

                                {/* Quick Actions */}
                                <div className="tw-relative">
                                    <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-all tw-duration-200 hover:tw-scale-105">
                                        <i className="fas fa-ellipsis-v tw-text-gray-600"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="tw-p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}
