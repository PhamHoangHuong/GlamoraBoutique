import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard() {
    const stats = [
        { title: 'Total Sales', value: '$12,345', icon: 'fas fa-dollar-sign', change: '+12.5%', color: 'tw-text-green-600' },
        { title: 'Total Orders', value: '150', icon: 'fas fa-shopping-cart', change: '+8.2%', color: 'tw-text-blue-600' },
        { title: 'Total Users', value: '1,250', icon: 'fas fa-users', change: '+15.3%', color: 'tw-text-purple-600' },
        { title: 'Total Products', value: '324', icon: 'fas fa-box', change: '+3.7%', color: 'tw-text-orange-600' },
    ];

    const recentOrders = [
        { id: '#12345', customer: 'John Doe', date: '2024-03-20', status: 'Completed', amount: '$99.99' },
        { id: '#12346', customer: 'Jane Smith', date: '2024-03-19', status: 'Pending', amount: '$149.99' },
        { id: '#12347', customer: 'Bob Johnson', date: '2024-03-18', status: 'Processing', amount: '$79.99' },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            {/* Stats Grid */}
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="tw-bg-white tw-rounded-lg tw-p-6 tw-shadow-sm">
                        <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                            <div className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center ${stat.color} tw-bg-opacity-10`}>
                                <i className={`${stat.icon} ${stat.color}`}></i>
                            </div>
                            <span className="tw-text-sm tw-font-medium tw-text-green-600">{stat.change}</span>
                        </div>
                        <h3 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-1">{stat.value}</h3>
                        <p className="tw-text-sm tw-text-gray-500">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden">
                <div className="tw-px-6 tw-py-4 tw-border-b tw-border-gray-200">
                    <h2 className="tw-text-lg tw-font-semibold tw-text-gray-900">Recent Orders</h2>
                </div>
                <div className="tw-overflow-x-auto">
                    <table className="tw-w-full">
                        <thead className="tw-bg-gray-50">
                            <tr>
                                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Order ID</th>
                                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Customer</th>
                                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Date</th>
                                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Status</th>
                                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="tw-divide-y tw-divide-gray-200">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:tw-bg-gray-50">
                                    <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900">{order.id}</td>
                                    <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">{order.customer}</td>
                                    <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">{order.date}</td>
                                    <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                        <span className={`tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-rounded-full
                                            ${order.status === 'Completed' ? 'tw-bg-green-100 tw-text-green-800' :
                                              order.status === 'Pending' ? 'tw-bg-yellow-100 tw-text-yellow-800' :
                                              'tw-bg-blue-100 tw-text-blue-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">{order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
