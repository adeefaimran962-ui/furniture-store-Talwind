interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'bg-[#FAFAFA] dark:bg-[#1E1E1E]',
        'border border-[#EEEEEE] dark:border-[#2A2A2A]',
        'rounded-lg overflow-hidden',
        'transition-all duration-300',
        hover ? 'hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B] cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
