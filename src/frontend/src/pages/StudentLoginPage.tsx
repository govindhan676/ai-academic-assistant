import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, GraduationCap, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { getUserProfile, setActor } from "../services/backendService";
import { useAuthStore } from "../store/authStore";

function ActorInit() {
  const { actor } = useActor(createActor);
  if (actor) setActor(actor);
  return null;
}

const getFloatAnim = (i: number) => ({
  y: [0, -16, 0],
  x: [0, i % 2 === 0 ? 10 : -10, 0],
  transition: {
    duration: 3.5 + i * 0.8,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
    delay: i * 0.5,
  },
});

export default function StudentLoginPage() {
  const navigate = useNavigate();
  const { login: iiLogin, loginStatus } = useInternetIdentity();
  const { login: storeLogin } = useAuthStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const { actor } = useActor(createActor);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await iiLogin();
      await new Promise((r) => setTimeout(r, 800));
      if (actor) setActor(actor);
      const profile = await getUserProfile();
      if (!profile) {
        toast.error("No student account found. Please register first.");
        setIsConnecting(false);
        return;
      }
      const role =
        typeof profile.role === "string"
          ? profile.role
          : Object.keys(profile.role)[0];
      if (role !== "student") {
        toast.error("Access denied — student accounts only.");
        setIsConnecting(false);
        return;
      }
      storeLogin({
        principal: profile.principal.toString(),
        name: profile.name,
        role: "student",
      });
      toast.success(`Welcome back, ${profile.name}!`);
      navigate({ to: "/student/dashboard" });
    } catch (err) {
      console.error(err);
      toast.error("Authentication failed. Please try again.");
      setIsConnecting(false);
    }
  };

  const isLoading = isConnecting || loginStatus === "logging-in";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ActorInit />

      {/* Ambient gradient — purple theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px]"
          style={{ background: "oklch(0.62 0.22 290 / 0.1)" }}
        />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/8 blur-[80px]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "oklch(0.62 0.22 290 / 0.05)" }}
        />
      </div>

      {/* Floating shapes — purple hue */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={getFloatAnim(i)}
          className="absolute pointer-events-none"
          style={{
            top: `${[20, 65, 30, 75][i]}%`,
            left: `${[80, 12, 82, 8][i]}%`,
          }}
        >
          <div
            className="rounded-full opacity-20"
            style={{
              width: [32, 48, 20, 40][i],
              height: [32, 48, 20, 40][i],
              background: "oklch(0.62 0.22 290 / 0.6)",
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

      {/* Back to home */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm group"
        data-ocid="student-login.back_link"
      >
        <ChevronLeft
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform duration-200"
        />
        Back to Home
      </motion.a>

      {/* Login card */}
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
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: 15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
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
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-display font-bold text-gradient-purple mb-1">
              Student Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Access your notes, question papers, and study resources
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 justify-center flex-wrap mb-8"
          >
            {["View Notes", "Question Papers", "Download PDFs"].map((f) => (
              <span
                key={f}
                className="text-xs px-3 py-1 rounded-full border text-accent/80"
                style={{
                  borderColor: "oklch(0.62 0.22 290 / 0.2)",
                  background: "oklch(0.62 0.22 290 / 0.1)",
                }}
              >
                {f}
              </span>
            ))}
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
            data-ocid="student-login.submit_button"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl text-white font-semibold text-sm transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.62 0.22 290))",
              boxShadow: "0 0 20px oklch(0.62 0.22 290 / 0.35)",
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
                Connecting...
              </>
            ) : (
              <>
                <LogIn size={16} />
                Login with Internet Identity
              </>
            )}
          </motion.button>

          {/* Register link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-center text-sm text-muted-foreground mt-5"
          >
            New student?{" "}
            <a
              href="/student/register"
              className="text-accent hover:text-accent/80 transition-smooth font-medium"
              data-ocid="student-login.register_link"
            >
              Register here
            </a>
          </motion.p>

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-border/40 text-center">
            <p className="text-xs text-muted-foreground">
              Are you a teacher?{" "}
              <a
                href="/teacher/login"
                className="text-primary hover:text-primary/80 transition-smooth"
                data-ocid="student-login.teacher_link"
              >
                Teacher Portal
              </a>
            </p>
          </div>
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

      {/* Floating book icon decoration */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-12 right-12 opacity-10 pointer-events-none hidden lg:block"
      >
        <BookOpen size={64} className="text-accent" />
      </motion.div>
    </div>
  );
}
