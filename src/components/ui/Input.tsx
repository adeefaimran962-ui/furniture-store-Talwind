import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-[0.8rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-['Inter']">
          {label}
        </label>
      )}
      <input
        id={id}
        className={[
          'w-full px-[14px] py-[11px]',
          'font-["Inter"] text-[0.9rem]',
          'bg-white dark:bg-[#1E1E1E]',
          'text-[#1A1A1A] dark:text-[#F0EDE8]',
          'border border-[#EEEEEE] dark:border-[#2A2A2A]',
          'rounded-[4px] transition-all duration-300',
          'focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)]',
          'box-border',
          className,
        ].join(' ')}
        {...props}
      />
    </div>
  );
}
