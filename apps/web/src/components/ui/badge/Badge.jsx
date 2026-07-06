import { cn } from '@/utils/cn';

const variantClasses = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-error-50 text-error-700',
};

function Badge({ className = '', variant = 'default', children, ...props }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', variantClasses[variant] || variantClasses.default, className)}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
