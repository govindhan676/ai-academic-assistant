import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { setActor, setUserProfile } from "../services/backendService";
import { useAuthStore } from "../store/authStore";

function ActorInit() {
  const { actor } = useActor(createActor);
  if (actor) setActor(actor);
  return null;
}

const getFloatAnim = (i: number) => ({
  y: [0, -14, 0],
  transition: {
    duration: 4 + i,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
    delay: i * 0.6,
  },
});

export default function StudentRegisterPage() {
  const navigate = useNavigate();
  const { login: iiLogin, loginStatus } = useInternetIdentity();
  const { login: storeLogin } = useAuthStore();
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [success, setSuccess] = useState(false);
  const { actor } = useActor(createActor);

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
    setIsRegistering(true);
    try {
      await iiLogin();
      await new Promise((r) => setTimeout(r, 800));
      if (actor) setActor(actor);
      const profile = await setUserProfile(trimmed);
      if (!profile) {
        toast.error("Registration failed. Please try again.");
        setIsRegistering(false);
        return;
      }
      storeLogin({
        principal: profile.principal.toString(),
        name: profile.name,
        role: "student",
      });
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/student/dashboard" });
      }, 1800);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
      setIsRegistering(false);
    }
  };

  const isLoading = isRegistering || loginStatus === "logging-in";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ActorInit />

      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[100px]"
          style={{ background: "oklch(0.62 0.22 290 / 0.08)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[80px]"
          style={{ background: "oklch(0.75 0.18 195 / 0.07)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "oklch(0.62 0.24 250 / 0.05)" }}
        />
      </div>

      {/* Floating shapes */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={getFloatAnim(i)}
          className="absolute pointer-events-none"
          style={{ top: `${[15, 72, 45][i]}%`, left: `${[78, 5, 90][i]}%` }}
        >
          <div
            className="rounded-full opacity-15"
            style={{
              width: [36, 52, 24][i],
              height: [36, 52, 24][i],
              background: [
                "oklch(0.62 0.22 290 / 0.6)",
                "oklch(0.75 0.18 195 / 0.6)",
                "oklch(0.62 0.24 250 / 0.6)",
              ][i],
              filter: "blur(1px)",
            }}
          />
        </motion.div>
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.62 0.22 290) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.22 290) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Back to login */}
      <motion.a
        href="/student/login"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm group"
        data-ocid="student-register.back_link"
      >
        <ChevronLeft
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform duration-200"
        />
        Back to Login
      </motion.a>

      {/* Register card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="glass rounded-2xl p-8 shadow-2xl"
          style={{ borderColor: "oklch(0.62 0.22 290 / 0.2)" }}
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="flex flex-col items-center justify-center py-8 text-center"
                data-ocid="student-register.success_state"
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
                  Welcome aboard!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Account created successfully.
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
                      "linear-gradient(90deg, oklch(0.62 0.22 290), oklch(0.75 0.18 195))",
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
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
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.62 0.22 290))",
                        boxShadow:
                          "0 0 20px oklch(0.62 0.22 290 / 0.4), 0 0 40px oklch(0.62 0.22 290 / 0.15)",
                      }}
                    >
                      <GraduationCap size={32} className="text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles size={14} className="text-accent" />
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
                  <h1 className="text-2xl font-display font-bold text-gradient-purple mb-1">
                    Create Student Account
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Join the AI Academic Assistant platform
                  </p>
                </motion.div>

                {/* Name field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-5"
                >
                  <label
                    htmlFor="student-name"
                    className="block text-sm font-medium text-foreground/80 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !isLoading && handleRegister()
                    }
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    data-ocid="student-register.name_input"
                    className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 transition-smooth focus:outline-none disabled:opacity-60"
                    style={{
                      background: "oklch(0.11 0.03 250 / 0.6)",
                      border: "1px solid oklch(0.62 0.22 290 / 0.2)",
                      boxShadow: "inset 0 1px 2px oklch(0 0 0 / 0.2)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "oklch(0.62 0.22 290 / 0.5)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px oklch(0.62 0.22 290 / 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "oklch(0.62 0.22 290 / 0.2)";
                      e.currentTarget.style.boxShadow =
                        "inset 0 1px 2px oklch(0 0 0 / 0.2)";
                    }}
                  />
                </motion.div>

                {/* Register button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRegister}
                  disabled={isLoading || !name.trim()}
                  type="button"
                  data-ocid="student-register.submit_button"
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl text-white font-semibold text-sm transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.62 0.22 290))",
                    boxShadow: name.trim()
                      ? "0 0 20px oklch(0.62 0.22 290 / 0.35)"
                      : "none",
                  }}
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
                      Register with Internet Identity
                    </>
                  )}
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="text-center text-xs text-muted-foreground mt-4"
                >
                  You'll be prompted to authenticate with Internet Identity.
                </motion.p>

                <div className="mt-6 pt-6 border-t border-border/40 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <a
                      href="/student/login"
                      className="text-accent hover:text-accent/80 transition-smooth font-medium"
                      data-ocid="student-register.login_link"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Purple top accent */}
        <div
          className="absolute -top-px left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.62 0.22 290 / 0.6), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
