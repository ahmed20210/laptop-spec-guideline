import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = "", hoverEffect = true }: GlassCardProps) {
  return (
    <div
      className={`
        glass-panel rounded-2xl p-5 transition-all duration-300
        ${hoverEffect ? "hover-lift hover:border-cyan-400/30 hover:shadow-cyan-500/10" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}