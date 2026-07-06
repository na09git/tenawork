export const designTokens = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#2563eb",
      600: "#1d4ed8",
      700: "#1e40af",
    },
    secondary: {
      50: "#f5f3ff",
      500: "#7c3aed",
      600: "#6d28d9",
    },
    success: {
      50: "#ecfdf5",
      500: "#10b981",
      600: "#059669",
    },
    warning: {
      50: "#fffbeb",
      500: "#f59e0b",
      600: "#d97706",
    },
    error: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
    },
    info: {
      50: "#eff6ff",
      500: "#3b82f6",
      600: "#2563eb",
    },
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      500: "#64748b",
      700: "#334155",
      900: "#0f172a",
    },
  },
  spacing: {
    xs: "0.375rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
    md: "0 8px 24px -12px rgb(15 23 42 / 0.25)",
    lg: "0 20px 45px -18px rgb(15 23 42 / 0.28)",
  },
};

export const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const variantClasses = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
  secondary:
    "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500",
  outline:
    "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus-visible:ring-primary-500",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 focus-visible:ring-primary-500",
  success:
    "bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-500",
  danger:
    "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500",
};
