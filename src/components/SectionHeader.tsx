interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4">{title}</h2>
      <p className="text-lg opacity-80 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}
