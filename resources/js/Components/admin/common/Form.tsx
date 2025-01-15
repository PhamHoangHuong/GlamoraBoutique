import React from 'react';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'number' | 'email' | 'password' | 'color';
    value: any;
    options?: { value: string | number; label: string }[];
    required?: boolean;
    placeholder?: string;
    rows?: number;
}

interface FormProps {
    fields: FormField[];
    onSubmit: (data: any) => void;
    onChange: (name: string, value: any) => void;
    submitText?: string;
    cancelText?: string;
    onCancel?: () => void;
    loading?: boolean;
}

export default function Form({
    fields,
    onSubmit,
    onChange,
    submitText = 'Save',
    cancelText = 'Cancel',
    onCancel,
    loading = false
}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="tw-space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="tw-mb-4">
                        <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                            {field.label}
                            {field.required && <span className="tw-text-red-500">*</span>}
                        </label>

                        {field.type === 'textarea' ? (
                            <textarea
                                value={field.value}
                                onChange={(e) => onChange(field.name, e.target.value)}
                                className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-shadow-sm tw-px-3 tw-py-2"
                                rows={field.rows || 3}
                                required={field.required}
                                placeholder={field.placeholder}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                value={field.value}
                                onChange={(e) => onChange(field.name, e.target.value)}
                                className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-shadow-sm tw-px-3 tw-py-2"
                                required={field.required}
                            >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                value={field.value}
                                onChange={(e) => onChange(field.name, e.target.value)}
                                className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-shadow-sm tw-px-3 tw-py-2"
                                required={field.required}
                                placeholder={field.placeholder}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="tw-flex tw-justify-end tw-gap-3 tw-mt-6">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="tw-px-4 tw-py-2 tw-bg-gray-100 tw-text-gray-700 tw-rounded-md hover:tw-bg-gray-200"
                    >
                        {cancelText}
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="tw-px-4 tw-py-2 tw-bg-primary-600 tw-text-white tw-rounded-md hover:tw-bg-primary-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                >
                    {loading ? (
                        <span className="tw-flex tw-items-center tw-gap-2">
                            <i className="fas fa-spinner tw-animate-spin"></i>
                            Loading...
                        </span>
                    ) : (
                        submitText
                    )}
                </button>
            </div>
        </form>
    );
}
