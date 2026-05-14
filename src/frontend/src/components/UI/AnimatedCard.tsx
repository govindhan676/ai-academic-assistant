import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type GlowColor = "blue" | "purple" | "cyan";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  glowColor?: GlowColor;
}

const glowMap: Record<GlowColor, string> = {
  blue: "hover:glow-blue",
  purple: "hover:glow-purple",
  cyan: "hover:glow-cyan",
};

export function AnimatedCard({
  children,
  className,
  onClick,
  hoverable = true,
  glowColor = "blue",
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={
        hoverable
          ? { scale: 1.02, borderColor: "oklch(0.62 0.24 250 / 0.35)" }
          : undefined
      }
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-6 transition-smooth",
        hoverable && glowMap[glowColor],
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
