export default function Loading({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
    const sizeClasses = {
        small: 'tw-w-5 tw-h-5',
        default: 'tw-w-8 tw-h-8',
        large: 'tw-w-12 tw-h-12'
    };

    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-p-4">
            <div className={`tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary-600 ${sizeClasses[size]}`}></div>
            <span className="tw-sr-only">Loading...</span>
        </div>
    );
}
