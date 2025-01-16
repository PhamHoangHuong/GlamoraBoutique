import { useState } from 'react';
import { useAuthModal } from '@/contexts/AuthModalContext';

export default function RegisterForm() {
    const { openLogin } = useAuthModal();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle register logic
    };

    return (
        <div>
            <div className="tw-text-center tw-mb-8">
                <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">Đăng ký tài khoản</h2>
                <p className="tw-text-gray-600 tw-mt-2">
                    Tạo tài khoản để trải nghiệm mua sắm tốt hơn
                </p>
            </div>

            <form onSubmit={handleSubmit} className="tw-space-y-6">
                <div>
                    <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-border-primary-500 focus:tw-ring-2 focus:tw-ring-primary-200 tw-transition-all"
                        placeholder="Nhập họ và tên"
                        required
                    />
                </div>

                {/* Email, Password fields similar to LoginForm */}
                {/* ... */}

                <div>
                    <label className="tw-flex tw-items-center">
                        <input
                            type="checkbox"
                            checked={form.terms}
                            onChange={e => setForm({ ...form, terms: e.target.checked })}
                            className="tw-rounded tw-border-gray-300 tw-text-primary-600 focus:tw-ring-primary-500"
                            required
                        />
                        <span className="tw-ml-2 tw-text-sm tw-text-gray-600">
                            Tôi đồng ý với điều khoản sử dụng
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="tw-w-full tw-bg-primary-600 tw-text-white tw-py-3 tw-rounded-lg tw-font-semibold hover:tw-bg-primary-700 tw-transition-all tw-shadow-lg hover:tw-shadow-xl hover:tw-transform hover:tw-scale-[1.02]"
                >
                    Đăng ký
                </button>

                <div className="tw-text-center tw-text-sm tw-text-gray-600">
                    Đã có tài khoản?{' '}
                    <button
                        type="button"
                        onClick={openLogin}
                        className="tw-text-primary-600 hover:tw-text-primary-700 tw-font-medium"
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
}
