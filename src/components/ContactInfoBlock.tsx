import type { ReactNode } from 'react';

interface ContactInfoBlockProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export default function ContactInfoBlock({ icon, title, children }: ContactInfoBlockProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-amber border-2 border-charcoal shadow-hard-sm flex items-center justify-center shrink-0 mt-1">
        {icon}
      </div>
      <div className="w-full">
        <h4 className="font-bold text-xl mb-2">{title}</h4>
        {children}
      </div>
    </div>
  );
}
