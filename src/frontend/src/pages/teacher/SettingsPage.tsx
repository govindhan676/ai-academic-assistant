import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Info,
  Moon,
  Sparkles,
  Sun,
  User,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useOpenAIConfigured } from "../../hooks/useBackend";
import { useSetOpenAIKey } from "../../hooks/useMutations";
import { useAuthStore } from "../../store/authStore";

const CARD =
  "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8";

const cardVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.45, ease: "easeOut" as const },
  }),
};

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { data: isConfigured } = useOpenAIConfigured();
  const setKey = useSetOpenAIKey();

  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  // Sync dark mode on mount from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDarkMode(val: boolean) {
    setDarkMode(val);
    document.documentElement.classList.toggle("dark", val);
    localStorage.setItem("theme", val ? "dark" : "light");
  }

  async function handleSaveKey() {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      toast.error("Please enter an API key");
      return;
    }
    if (!trimmed.startsWith("sk-")) {
      toast.error('OpenAI keys start with "sk-"');
      setConnectionStatus("error");
      return;
    }
    try {
      await setKey.mutateAsync(trimmed);
      setConnectionStatus("success");
      setApiKey("");
    } catch {
      setConnectionStatus("error");
    }
  }

  function copyPrincipal() {
    if (user?.principal) {
      navigator.clipboard
        .writeText(user.principal)
        .then(() => toast.success("Principal copied"));
    }
  }

  const shortPrincipal = user?.principal
    ? `${user.principal.slice(0, 12)}\u2026${user.principal.slice(-6)}`
    : "\u2014";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.10_0.03_250)] via-[oklch(0.12_0.04_270)] to-[oklch(0.10_0.03_290)] p-6 md:p-10">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-white/50 mt-1 font-body text-sm">
          Manage your AI configuration, account preferences, and platform info.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* ─── 1. OpenAI API Key ─── */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={CARD}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/25">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-display font-semibold text-white">
                AI Configuration
              </h2>
              <p className="text-xs text-white/40">
                OpenAI API key for transcription &amp; summaries
              </p>
            </div>
          </div>

          <Separator className="bg-white/10 mb-5" />

          <p className="text-sm text-white/60 mb-5 leading-relaxed">
            Set your OpenAI API key to enable AI transcription and summary
            features. This key is shared across all teachers.
          </p>

          {/* Status banner */}
          {isConfigured && connectionStatus === "idle" && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-emerald-300 font-mono">
                OpenAI key is configured
              </span>
            </div>
          )}
          {connectionStatus === "success" && (
            <div
              data-ocid="settings.openai_success_state"
              className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-emerald-300">
                OpenAI Connected ✓
              </span>
            </div>
          )}
          {connectionStatus === "error" && (
            <div
              data-ocid="settings.openai_error_state"
              className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-xs text-red-300">
                Invalid key — please check and retry
              </span>
            </div>
          )}

          <div className="space-y-3">
            <Label
              htmlFor="api-key"
              className="text-white/70 text-xs uppercase tracking-widest"
            >
              API Key
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                data-ocid="settings.api_key_input"
                type={showKey ? "text" : "password"}
                placeholder={
                  isConfigured
                    ? "● ● ● ● ● (configured — enter new key to update)"
                    : "sk-..."
                }
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setConnectionStatus("idle");
                }}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/25 pr-10 font-mono text-sm focus:border-purple-500/50 focus:ring-purple-500/20"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                aria-label={showKey ? "Hide key" : "Show key"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <Button
              type="button"
              data-ocid="settings.save_api_key_button"
              onClick={handleSaveKey}
              disabled={setKey.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/40 border-0 mt-1"
            >
              {setKey.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </span>
              ) : isConfigured ? (
                "Update Key"
              ) : (
                "Save API Key"
              )}
            </Button>
          </div>
        </motion.div>

        {/* ─── 2. Account Settings ─── */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={CARD}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/25">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-display font-semibold text-white">
                Account Settings
              </h2>
              <p className="text-xs text-white/40">
                Your identity and preferences
              </p>
            </div>
          </div>

          <Separator className="bg-white/10 mb-5" />

          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/[0.08]">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">
                  Display Name
                </p>
                <p className="text-sm font-medium text-white">
                  {user?.name ?? "—"}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-purple-500/40 text-purple-300 bg-purple-500/10 text-xs"
              >
                Teacher
              </Badge>
            </div>

            {/* Principal */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/[0.08]">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">
                  Principal ID
                </p>
                <p
                  data-ocid="settings.principal_display"
                  className="text-sm font-mono text-white/70 truncate"
                >
                  {shortPrincipal}
                </p>
              </div>
              <button
                type="button"
                onClick={copyPrincipal}
                aria-label="Copy principal"
                className="ml-3 p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dark mode toggle */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/[0.08]">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-4 h-4 text-purple-400" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-white">Dark Mode</p>
                  <p className="text-xs text-white/40">
                    Toggle interface theme
                  </p>
                </div>
              </div>
              <Switch
                data-ocid="settings.dark_mode_toggle"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </div>
        </motion.div>

        {/* ─── 3. About ─── */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={CARD}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/25">
              <Info className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-display font-semibold text-white">
                About
              </h2>
              <p className="text-xs text-white/40">Platform information</p>
            </div>
          </div>

          <Separator className="bg-white/10 mb-5" />

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="py-3 px-4 rounded-xl bg-white/5 border border-white/[0.08]">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                  Platform
                </p>
                <p className="text-sm font-semibold text-white">
                  AI Academic Assistant
                </p>
                <p className="text-xs text-cyan-400 mt-0.5">v1.0</p>
              </div>
              <div className="py-3 px-4 rounded-xl bg-white/5 border border-white/[0.08]">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                  Runtime
                </p>
                <p className="text-sm font-semibold text-white">
                  Internet Computer
                </p>
                <p className="text-xs text-purple-400 mt-0.5">ICP Mainnet</p>
              </div>
            </div>

            <div className="py-3 px-4 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-between">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                  Support
                </p>
                <a
                  href="mailto:support@caffeine.ai"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                >
                  support@caffeine.ai
                </a>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border-white/10 text-xs">
                Built with caffeine.ai
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
