import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Users() {
    return (
        <AdminLayout>
            <Head title="Admin Users" />
            <div>Users Management</div>
        </AdminLayout>
    );
}
