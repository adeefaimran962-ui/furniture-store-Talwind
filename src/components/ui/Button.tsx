import type { ButtonHTMLAttributes } from 'react';

type Variant = 'dark' | 'gold' | 'outline' | 'danger' | 'white';
type Size    = 'lg' | 'md' | 'sm' | 'xs';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantCls: Record<Variant, string> = {
  dark:    'bg-[#2C2C2C] text-white border-[#2C2C2C] hover:bg-[#B8860B] hover:border-[#B8860B]',
  gold:    'bg-[#B8860B] text-white border-[#B8860B] hover:bg-[#8B6508] hover:border-[#8B6508]',
  outline: 'bg-transparent text-[#B8860B] border-[#B8860B] hover:bg-[#B8860B] hover:text-white',
  danger:  'bg-transparent text-[#dc3545] border-[#dc3545] hover:bg-[#dc3545] hover:text-white',
  white:   'bg-white text-[#B8860B] border-white hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C]',
};

const sizeCls: Record<Size, string> = {
  lg: 'px-10 py-4 text-[0.9rem]',
  md: 'px-7 py-3 text-[0.8rem]',
  sm: 'px-[18px] py-2 text-[0.75rem]',
  xs: 'px-3 py-[5px] text-[0.7rem]',
};

export default function Button({
  variant = 'dark', size = 'md', fullWidth = false,
  className = '', children, ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-["Inter"] font-semibold uppercase tracking-[1.5px]',
        'border-2 rounded-[4px] cursor-pointer',
        'transition-all duration-300 hover:-translate-y-0.5',
        variantCls[variant],
        sizeCls[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
