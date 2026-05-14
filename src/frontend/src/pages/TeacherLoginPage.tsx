import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  Shield,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import {
  getUserProfile,
  setActor,
  setUserProfile,
} from "../services/backendService";
import { useAuthStore } from "../store/authStore";

function ActorInit() {
  const { actor } = useActor(createActor);
  if (actor) setActor(actor);
  return null;
}

const getFloatAnim = (i: number) => ({
  y: [0, -18, 0],
  x: [0, i % 2 === 0 ? 8 : -8, 0],
  transition: {
    duration: 4 + i,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
    delay: i * 0.7,
  },
});

type PageStep = "login" | "register" | "success";

export default function TeacherLoginPage() {
  const navigate = useNavigate();
  const { login: iiLogin, loginStatus } = useInternetIdentity();
  const { login: storeLogin } = useAuthStore();
  const [step, setStep] = useState<PageStep>("login");
  const [name, setName] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const { actor } = useActor(createActor);

  // Step 1: Connect — check whether a profile exists
  const handleConnect = async () => {
    setIsWorking(true);
    try {
      await iiLogin();
      await new Promise((r) => setTimeout(r, 800));
      if (actor) setActor(actor);
      const profile = await getUserProfile();

      if (!profile) {
        // New user — ask for their name to register as teacher
        setIsWorking(false);
        setStep("register");
        return;
      }

      const role =
        typeof profile.role === "string"
          ? profile.role
          : Object.keys(profile.role)[0];

      if (role !== "teacher") {
        toast.error("Access denied — this account is not a teacher account.");
        setIsWorking(false);
        return;
      }

      storeLogin({
        principal: profile.principal.toString(),
        name: profile.name,
        role: "teacher",
      });
      setStep("success");
      setTimeout(() => navigate({ to: "/teacher/dashboard" }), 1800);
    } catch (err) {
      console.error(err);
      toast.error("Authentication failed. Please try again.");
      setIsWorking(false);
    }
  };

  // Step 2: Register name → create teacher profile
  const handleRegister = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please enter your full name.");
      return;
    }
    if (trimmed.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }
    setIsWorking(true);
    try {
      const profile = await setUserProfile(trimmed);
      if (!profile) {
        toast.error("Registration failed. Please try again.");
        setIsWorking(false);
        return;
      }
      storeLogin({
        principal: profile.principal.toString(),
        name: profile.name,
        role: "teacher",
      });
      setStep("success");
      setTimeout(() => navigate({ to: "/teacher/dashboard" }), 1800);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
      setIsWorking(false);
    }
  };

  const isLoading = isWorking || loginStatus === "logging-in";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ActorInit />

      {/* Ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Floating decorative shapes */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={getFloatAnim(i)}
          className="absolute pointer-events-none"
          style={{
            top: `${[15, 70, 25, 80][i]}%`,
            left: `${[10, 85, 75, 15][i]}%`,
          }}
        >
          <div
            className="rounded-full opacity-20"
            style={{
              width: [40, 24, 56, 32][i],
              height: [40, 24, 56, 32][i],
              background:
                i % 2 === 0
                  ? "oklch(0.62 0.24 250 / 0.5)"
                  : "oklch(0.62 0.22 290 / 0.5)",
              filter: "blur(1px)",
            }}
          />
        </motion.div>
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.62 0.24 250) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.24 250) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Back to home */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm group"
        data-ocid="teacher-login.back_link"
      >
        <ChevronLeft
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform duration-200"
        />
        Back to Home
      </motion.a>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {/* ── SUCCESS ── */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="flex flex-col items-center justify-center py-8 text-center"
                data-ocid="teacher-login.success_state"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                  style={{
                    background: "oklch(0.55 0.18 145 / 0.2)",
                    border: "2px solid oklch(0.65 0.2 145 / 0.4)",
                  }}
                >
                  <CheckCircle2
                    size={40}
                    style={{ color: "oklch(0.65 0.2 145)" }}
                  />
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Welcome!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Teacher portal access granted.
                  <br />
                  Redirecting to your dashboard...
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "linear", delay: 0.3 }}
                  className="h-1 rounded-full mt-6"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.62 0.24 250), oklch(0.62 0.22 290))",
                  }}
                />
              </motion.div>
            )}

            {/* ── REGISTER (new user — name form) ── */}
            {step === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center glow-blue">
                      <BrainCircuit size={32} className="text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles size={14} className="text-primary" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Heading */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-display font-bold text-gradient-blue mb-1">
                    Set Up Teacher Account
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Enter your name to complete registration
                  </p>
                </div>

                {/* Name input */}
                <div className="mb-5">
                  <label
                    htmlFor="teacher-name"
                    className="block text-sm font-medium text-foreground/80 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="teacher-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !isLoading && handleRegister()
                    }
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    data-ocid="teacher-login.name_input"
                    className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 transition-smooth focus:outline-none disabled:opacity-60"
                    style={{
                      background: "oklch(0.11 0.03 250 / 0.6)",
                      border: "1px solid oklch(0.62 0.24 250 / 0.2)",
                      boxShadow: "inset 0 1px 2px oklch(0 0 0 / 0.2)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "oklch(0.62 0.24 250 / 0.5)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px oklch(0.62 0.24 250 / 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "oklch(0.62 0.24 250 / 0.2)";
                      e.currentTarget.style.boxShadow =
                        "inset 0 1px 2px oklch(0 0 0 / 0.2)";
                    }}
                  />
                </div>

                {/* Register button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRegister}
                  disabled={isLoading || !name.trim()}
                  type="button"
                  data-ocid="teacher-login.register_button"
                  className="w-full relative flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-brand text-white font-semibold text-sm glow-blue hover:opacity-90 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Create Teacher Account
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Your identity is already verified.{" "}
                  <span className="text-primary/80">Just enter your name.</span>
                </p>
              </motion.div>
            )}

            {/* ── LOGIN (initial state) ── */}
            {step === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center glow-blue">
                      <BrainCircuit size={32} className="text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles size={14} className="text-primary" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-2xl font-display font-bold text-gradient-blue mb-1">
                    Teacher Portal
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Authenticate with Internet Identity to access your dashboard
                  </p>
                </motion.div>

                {/* Feature pills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-2 justify-center flex-wrap mb-8"
                >
                  {["Upload Audio", "AI Transcripts", "Manage Notes"].map(
                    (f) => (
                      <span
                        key={f}
                        className="text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary/80"
                      >
                        {f}
                      </span>
                    ),
                  )}
                </motion.div>

                {/* Connect button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnect}
                  disabled={isLoading}
                  type="button"
                  data-ocid="teacher-login.submit_button"
                  className="w-full relative flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-brand text-white font-semibold text-sm glow-blue hover:opacity-90 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      Connect with Internet Identity
                    </>
                  )}
                </motion.button>

                {/* Info note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="text-center text-xs text-muted-foreground mt-5"
                >
                  First time?{" "}
                  <span className="text-primary/80">
                    Your account will be set up automatically.
                  </span>
                </motion.p>

                {/* Divider */}
                <div className="mt-6 pt-6 border-t border-border/40 text-center">
                  <p className="text-xs text-muted-foreground">
                    Are you a student?{" "}
                    <a
                      href="/student/login"
                      className="text-accent hover:text-accent/80 transition-smooth"
                      data-ocid="teacher-login.student_link"
                    >
                      Student Portal
                    </a>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top accent line */}
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </motion.div>
    </div>
  );
}
