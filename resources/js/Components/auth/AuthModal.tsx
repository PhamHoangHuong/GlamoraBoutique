import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthModal } from '@/contexts/AuthModalContext';
import LoginForm from '@/Components/auth/LoginForm';
import RegisterForm from '@/Components/auth/RegisterForm';

export default function AuthModal() {
    const { isOpen, mode, closeModal } = useAuthModal();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="tw-relative tw-z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="tw-ease-out tw-duration-300"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25 tw-backdrop-blur-sm" />
                </Transition.Child>

                <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
                    <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="tw-ease-out tw-duration-300"
                            enterFrom="tw-opacity-0 tw-scale-95"
                            enterTo="tw-opacity-100 tw-scale-100"
                            leave="tw-ease-in tw-duration-200"
                            leaveFrom="tw-opacity-100 tw-scale-100"
                            leaveTo="tw-opacity-0 tw-scale-95"
                        >
                            <Dialog.Panel className="tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-8 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                                <button
                                    onClick={closeModal}
                                    className="tw-absolute tw-right-4 tw-top-4 tw-text-gray-400 hover:tw-text-gray-500"
                                >
                                    <i className="fas fa-times"></i>
                                </button>

                                {mode === 'login' ? <LoginForm /> : <RegisterForm />}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
