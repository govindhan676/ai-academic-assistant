import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:glow-blue active:from-blue-700 active:to-purple-700",
  secondary:
    "border border-white/20 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/30",
  danger:
    "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

export function GlowButton({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className,
  type = "button",
  onClick,
}: GlowButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <motion.button
      type={type}
      whileHover={!isDisabled ? { scale: 1.05 } : undefined}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.15 }}
      disabled={isDisabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
