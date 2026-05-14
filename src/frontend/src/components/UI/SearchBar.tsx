import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchBar({
  value: externalValue,
  onChange,
  onSearch,
  placeholder = "Search...",
  className,
  debounceMs = 300,
}: SearchBarProps) {
  const [internal, setInternal] = useState(externalValue ?? "");
  const [focused, setFocused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (externalValue !== undefined) setInternal(externalValue);
  }, [externalValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInternal(val);
    onChange?.(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch?.(val), debounceMs);
  }

  function handleClear() {
    setInternal("");
    onChange?.("");
    onSearch?.("");
  }

  return (
    <div
      className={cn(
        "relative flex items-center transition-smooth rounded-xl overflow-hidden",
        focused
          ? "ring-2 ring-[oklch(0.75_0.18_195_/_0.6)] shadow-[0_0_16px_oklch(0.75_0.18_195_/_0.25)]"
          : "ring-1 ring-white/10",
        className,
      )}
      style={{
        background: "oklch(0.11 0.03 250 / 0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Search
        className={`absolute left-3.5 w-4 h-4 pointer-events-none transition-smooth ${
          focused ? "text-cyan-400" : "text-muted-foreground"
        }`}
      />
      <input
        type="text"
        value={internal}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        data-ocid="search.input"
      />
      {internal && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
