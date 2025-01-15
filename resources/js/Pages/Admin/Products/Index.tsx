import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Products() {
    return (
        <AdminLayout>
            <Head title="Admin Products" />
            <div>Products Management</div>
        </AdminLayout>
    );
}
