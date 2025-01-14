import { useEffect } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const header = document.querySelector('.site-header');
        const handleScroll = () => {
            if (window.scrollY > 100) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
