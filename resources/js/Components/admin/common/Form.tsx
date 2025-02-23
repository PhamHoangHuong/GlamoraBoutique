import React from 'react';
import Select from 'react-select';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'number' | 'email' | 'password' | 'color' | 'checkbox';
    value: any;
    options?: { value: string | number; label: string }[];
    required?: boolean;
    placeholder?: string;
    rows?: number;
    text?: string;
    isSearchable?: boolean;
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
                            <Select
                                value={field.options?.find(option => option.value === field.value)}
                                onChange={(option) => onChange(field.name, option?.value || '')}
                                options={field.options}
                                className="tw-w-full"
                                classNamePrefix="select"
                                isClearable
                                isSearchable={field.isSearchable !== false}
                                placeholder={`Chọn ${field.label.toLowerCase()}`}
                                noOptionsMessage={() => "Không có dữ liệu"}
                            />
                        ) : field.type === 'checkbox' ? (
                            <div className="tw-flex tw-items-center">
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => onChange(field.name, e.target.checked)}
                                    className="tw-h-4 tw-w-4 tw-rounded tw-border-gray-300"
                                />
                                {field.text && (
                                    <span className="tw-ml-2 tw-text-sm tw-text-gray-600">{field.text}</span>
                                )}
                            </div>
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
