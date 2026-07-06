import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

const toneStyles = {
  info: 'border-info-200 bg-info-50 text-info-700',
  success: 'border-success-200 bg-success-50 text-success-700',
  warning: 'border-warning-200 bg-warning-50 text-warning-700',
  danger: 'border-error-200 bg-error-50 text-error-700',
};

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  danger: AlertCircle,
};

function Alert({ title, description, tone = 'info', className = '', children }) {
  const Icon = icons[tone] || icons.info;

  return (
    <div className={cn('rounded-lg border p-4', toneStyles[tone], className)}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="flex-1">
          {title ? <p className="font-medium">{title}</p> : null}
          {description ? <p className="mt-1 text-sm opacity-90">{description}</p> : null}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Alert;
