"use client";

type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
};

export function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition';
  const variantStyles =
    variant === 'primary'
      ? 'bg-sky-600 text-white hover:bg-sky-700'
      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100';

  return (
    <button type="button" onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      {label}
    </button>
  );
}
