interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  children?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <header className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] dark:from-[#1A1A1A] dark:to-[#222] text-center px-[5%] pt-[100px] pb-[80px] border-b border-[#EEEEEE] dark:border-[#2A2A2A] max-[768px]:px-5 max-[768px]:pt-[72px] max-[768px]:pb-14">
      <h4>{eyebrow}</h4>
      <h1 className="text-[#1A1A1A] dark:text-[#F0EDE8]">{title}</h1>
      <p className="max-w-[520px] mx-auto mb-8 text-[1.05rem] text-[#4A4A4A] dark:text-[#CCBBAA]">{subtitle}</p>
      {children && (
        <div className="flex gap-4 justify-center flex-wrap">{children}</div>
      )}
    </header>
  );
}
