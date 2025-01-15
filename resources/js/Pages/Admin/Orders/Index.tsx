import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Orders() {
    return (
        <AdminLayout>
            <Head title="Admin Orders" />
            <div>Orders Management</div>
        </AdminLayout>
    );
}
