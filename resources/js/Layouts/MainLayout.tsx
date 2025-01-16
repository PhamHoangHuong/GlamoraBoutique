import { useEffect } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { AuthModalProvider } from '@/contexts/AuthModalContext';
import AuthModal from '@/Components/auth/AuthModal';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthModalProvider>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <main>{children}</main>
                <Footer />
                <AuthModal />
            </div>
        </AuthModalProvider>
    );
}
