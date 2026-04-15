import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  desc?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, desc, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 bg-white/[0.02] p-10 sm:p-16 text-center">
      {Icon && (
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-yellow/10 text-brand-yellow flex items-center justify-center">
          <Icon className="w-6 h-6" aria-hidden />
        </div>
      )}
      <div className="font-display uppercase text-white text-xl sm:text-2xl mb-2">
        {title}
      </div>
      {desc && (
        <p className="text-brand-gray max-w-md mx-auto leading-relaxed mb-5">
          {desc}
        </p>
      )}
      {action}
    </div>
  );
}
