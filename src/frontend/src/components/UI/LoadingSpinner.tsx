import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  fullPage = false,
  className,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={cn(
        "rounded-full animate-spin",
        sizeMap[size],
        "border-transparent",
        className,
      )}
      style={{
        borderTopColor: "oklch(0.75 0.2 240)",
        borderRightColor: "oklch(0.62 0.22 290 / 0.4)",
      }}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return spinner;
}
