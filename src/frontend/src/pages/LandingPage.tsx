import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  Brain,
  ChevronRight,
  Download,
  FileDown,
  FileQuestion,
  FolderOpen,
  Github,
  Menu,
  Mic,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useAnimation, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ---------- Types ----------
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

// ---------- Particle Canvas ----------
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "oklch(0.62 0.24 250 / 0.6)",
      "oklch(0.62 0.22 290 / 0.6)",
      "oklch(0.75 0.18 195 / 0.6)",
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ---------- Floating Geo Shapes ----------
const FLOAT_SHAPES = [
  {
    top: "12%",
    left: "8%",
    size: 80,
    color: "oklch(0.62 0.24 250 / 0.12)",
    delay: 0,
  },
  {
    top: "25%",
    right: "6%",
    size: 120,
    color: "oklch(0.62 0.22 290 / 0.10)",
    delay: 0.8,
  },
  {
    top: "65%",
    left: "4%",
    size: 60,
    color: "oklch(0.75 0.18 195 / 0.12)",
    delay: 1.5,
  },
  {
    top: "75%",
    right: "10%",
    size: 90,
    color: "oklch(0.62 0.24 250 / 0.08)",
    delay: 0.4,
  },
  {
    top: "45%",
    left: "3%",
    size: 40,
    color: "oklch(0.62 0.22 290 / 0.15)",
    delay: 1.2,
  },
] as const;

type ShapeEntry = (typeof FLOAT_SHAPES)[number];

function FloatingShape({ shape, index }: { shape: ShapeEntry; index: number }) {
  const style: React.CSSProperties = {
    width: shape.size,
    height: shape.size,
    top: shape.top,
    background: shape.color,
    filter: "blur(40px)",
    zIndex: 0,
  };
  if ("left" in shape) (style as Record<string, unknown>).left = shape.left;
  if ("right" in shape) (style as Record<string, unknown>).right = shape.right;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
      transition={{
        duration: 5 + index,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: shape.delay,
      }}
    />
  );
}

// ---------- Animated Counter ----------
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ---------- Section Wrapper ----------
function Section({
  id,
  children,
  className = "",
  style,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

// ---------- Feature Cards Data ----------
const FEATURES = [
  {
    icon: Mic,
    label: "Audio Transcription",
    desc: "Upload lectures in mp3/wav/m4a. Whisper AI transcribes with 99% accuracy.",
    glow: "glow-blue",
    gradient: "from-blue-600/20 to-blue-900/10",
  },
  {
    icon: Sparkles,
    label: "AI Summaries",
    desc: "GPT-powered summaries distill hours of lectures into concise study notes.",
    glow: "glow-purple",
    gradient: "from-purple-600/20 to-purple-900/10",
  },
  {
    icon: FolderOpen,
    label: "Smart Organization",
    desc: "Hierarchical structure: Department → Year → Semester → Subject → Unit.",
    glow: "glow-cyan",
    gradient: "from-cyan-600/20 to-cyan-900/10",
  },
  {
    icon: FileQuestion,
    label: "Question Bank",
    desc: "Upload and organize university and internal question papers with metadata.",
    glow: "glow-blue",
    gradient: "from-blue-600/20 to-blue-900/10",
  },
  {
    icon: FileDown,
    label: "PDF Generation",
    desc: "One-click professional PDFs with auto title pages, footers, and formatting.",
    glow: "glow-purple",
    gradient: "from-purple-600/20 to-purple-900/10",
  },
  {
    icon: BarChart2,
    label: "Analytics Dashboard",
    desc: "Track uploads, student engagement, and content growth with live charts.",
    glow: "glow-cyan",
    gradient: "from-cyan-600/20 to-cyan-900/10",
  },
];

// ---------- Workflow Steps ----------
const STEPS = [
  { icon: Upload, label: "Upload Audio", desc: "mp3, wav, m4a, mp4" },
  { icon: Wand2, label: "AI Transcription", desc: "Whisper AI engine" },
  { icon: Sparkles, label: "Generate Summary", desc: "GPT-4 summaries" },
  { icon: FolderOpen, label: "Organize Notes", desc: "Subject → Unit tree" },
  { icon: Download, label: "Download PDF", desc: "Professional layout" },
];

// ---------- Stats ----------
const STATS = [
  { value: 10000, suffix: "+", label: "Students" },
  { value: 50000, suffix: "+", label: "Notes Created" },
  { value: 99, suffix: "%", label: "Accuracy" },
  { value: 100, suffix: "+", label: "Institutions" },
];

// ---------- Navbar ----------
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#workflow" },
  { label: "Stats", href: "#stats" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: scrolled
          ? "oklch(0.08 0.025 250 / 0.92)"
          : "oklch(0.08 0.025 250 / 0.4)",
        borderBottom: "1px solid oklch(0.62 0.24 250 / 0.12)",
      }}
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-ocid="nav.logo"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center glow-blue">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-foreground text-sm tracking-tight">
            AI Academic
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-brand group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/teacher/login" })}
            className="text-sm px-4 py-1.5 rounded-lg glass border border-purple-500/30 text-foreground hover:border-purple-500/60 transition-smooth"
            data-ocid="nav.teacher_portal.button"
          >
            Teacher Portal
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/student/login" })}
            className="text-sm px-4 py-1.5 rounded-lg bg-gradient-brand text-white glow-blue hover:opacity-90 transition-smooth font-medium"
            data-ocid="nav.student_portal.button"
          >
            Student Portal
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-foreground p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile_menu.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden px-4 pb-4 flex flex-col gap-3"
            data-ocid="nav.mobile_menu.panel"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate({ to: "/teacher/login" })}
              className="text-sm px-4 py-2 rounded-lg glass border border-purple-500/30 text-foreground text-left"
              data-ocid="nav.mobile_teacher.button"
            >
              Teacher Portal
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/student/login" })}
              className="text-sm px-4 py-2 rounded-lg bg-gradient-brand text-white font-medium text-left"
              data-ocid="nav.mobile_student.button"
            >
              Student Portal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ---------- Hero ----------
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      <ParticleBackground />
      {FLOAT_SHAPES.map((shape, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static shape list
        <FloatingShape key={`float-${i}`} shape={shape} index={i} />
      ))}

      {/* Radial glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.62 0.24 250 / 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-20 pb-12">
        {/* AI Brain icon pulse */}
        <motion.div
          className="mb-8"
          animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-brand glow-purple flex items-center justify-center mx-auto">
            <Brain className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          data-ocid="hero.headline"
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.72 0.22 290), oklch(0.75 0.18 195))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Academic
          </span>
          <br />
          <span className="text-foreground">Assistant</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground text-lg md:text-2xl font-body mb-10 max-w-xl tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          data-ocid="hero.subtitle"
        >
          Smart Notes&nbsp;•&nbsp;AI Transcript&nbsp;•&nbsp;Question Bank
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate({ to: "/teacher/login" })}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white text-base transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.58 0.24 290))",
              boxShadow:
                "0 0 24px oklch(0.62 0.22 290 / 0.5), 0 0 60px oklch(0.62 0.22 290 / 0.2)",
            }}
            data-ocid="hero.teacher_portal.button"
          >
            Teacher Portal
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate({ to: "/student/login" })}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white text-base transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 230), oklch(0.70 0.20 195))",
              boxShadow:
                "0 0 24px oklch(0.75 0.18 195 / 0.5), 0 0 60px oklch(0.75 0.18 195 / 0.2)",
            }}
            data-ocid="hero.student_portal.button"
          >
            Student Portal
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="mt-14 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div
            className="glass rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 40px oklch(0.62 0.24 250 / 0.15)" }}
          >
            <img
              src="/assets/generated/hero-ai-academic.dim_1200x600.jpg"
              alt="AI Academic Assistant platform visualization"
              className="w-full h-auto object-cover opacity-90"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Features Section ----------
function FeaturesSection() {
  return (
    <Section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.72 0.22 290), oklch(0.75 0.18 195))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to manage, share, and accelerate academic
            learning with AI.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="features.list"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.label}
              className={`glass rounded-2xl p-6 flex flex-col gap-4 glass-hover cursor-default transition-smooth bg-gradient-to-br ${feat.gradient}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              data-ocid={`features.item.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.glow}`}
                style={{ background: "oklch(0.14 0.04 250 / 0.8)" }}
              >
                <feat.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {feat.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------- Workflow Section ----------
function WorkflowSection() {
  return (
    <Section
      id="workflow"
      className="py-24 px-4"
      style={{
        background:
          "radial-gradient(ellipse 100% 60% at 50% 50%, oklch(0.62 0.24 250 / 0.04), transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From raw audio to polished study notes in minutes.
          </p>
        </div>

        <div
          className="relative flex flex-col md:flex-row items-stretch gap-0"
          data-ocid="workflow.steps"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="flex flex-col md:flex-row items-center flex-1"
            >
              <motion.div
                className="flex flex-col items-center text-center p-6 glass rounded-2xl flex-1 w-full glass-hover transition-smooth"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ scale: 1.03 }}
                data-ocid={`workflow.step.${i + 1}`}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-brand glow-blue flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mb-2"
                  style={{ background: "oklch(0.62 0.22 290 / 0.6)" }}
                >
                  {i + 1}
                </div>
                <h3 className="font-display font-semibold text-base text-foreground mb-1">
                  {step.label}
                </h3>
                <p className="text-muted-foreground text-xs">{step.desc}</p>
              </motion.div>
              {i < STEPS.length - 1 && (
                <motion.div
                  className="hidden md:flex items-center justify-center w-10 shrink-0"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.25 }}
                >
                  <div
                    className="w-full h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.62 0.24 250 / 0.5), oklch(0.62 0.22 290 / 0.5))",
                    }}
                  />
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------- Stats Section ----------
function StatsSection() {
  return (
    <Section id="stats" className="py-24 px-4">
      <div
        className="max-w-5xl mx-auto glass rounded-3xl p-10 md:p-16"
        style={{ boxShadow: "0 0 60px oklch(0.62 0.24 250 / 0.1)" }}
      >
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-foreground">
            Trusted by Educators
          </h2>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          data-ocid="stats.list"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`stats.item.${i + 1}`}
            >
              <div
                className="font-display text-4xl md:text-5xl font-extrabold mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.75 0.18 195))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------- About Section ----------
function AboutSection() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}
          initial="hidden"
          animate={controls}
          data-ocid="about.text.panel"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Empowering Education
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.72 0.22 290))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              with AI
            </span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            AI Academic Assistant bridges the gap between lecture halls and
            digital learning. Teachers upload raw audio lectures; our
            Whisper-powered engine transcribes every word, GPT-4 distills key
            concepts, and content is instantly searchable and downloadable as
            PDFs.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Students gain 24/7 access to a structured knowledge base covering
            every department, year, semester, subject, and unit — empowering
            self-paced mastery and exam readiness.
          </p>
        </motion.div>

        {/* Animated graphic */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative flex items-center justify-center"
          data-ocid="about.graphic.panel"
        >
          <div
            className="glass rounded-3xl p-8 w-full max-w-sm mx-auto"
            style={{ boxShadow: "0 0 40px oklch(0.62 0.22 290 / 0.2)" }}
          >
            <div className="flex flex-col gap-4">
              {[
                "Upload Audio Lecture",
                "AI Transcript Ready",
                "PDF Downloaded",
              ].map((text, i) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-3 glass rounded-xl p-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background:
                        i === 0
                          ? "oklch(0.62 0.24 250 / 0.3)"
                          : i === 1
                            ? "oklch(0.62 0.22 290 / 0.3)"
                            : "oklch(0.75 0.18 195 / 0.3)",
                    }}
                  >
                    {i === 0 ? (
                      <Upload className="w-4 h-4 text-foreground" />
                    ) : i === 1 ? (
                      <Wand2 className="w-4 h-4 text-foreground" />
                    ) : (
                      <Download className="w-4 h-4 text-foreground" />
                    )}
                  </div>
                  <span className="text-sm text-foreground font-medium">
                    {text}
                  </span>
                  <div
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{
                      background:
                        i < 2 ? "oklch(0.75 0.18 195)" : "oklch(0.62 0.22 290)",
                    }}
                  />
                </motion.div>
              ))}
              <div className="mt-2 glass rounded-xl p-3">
                <div className="text-xs text-muted-foreground mb-2">
                  Transcription progress
                </div>
                <div
                  className="h-2 rounded-full"
                  style={{ background: "oklch(0.14 0.04 250)" }}
                >
                  <motion.div
                    className="h-2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.62 0.24 250), oklch(0.75 0.18 195))",
                    }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "88%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
                <div className="text-right text-xs text-muted-foreground mt-1">
                  88% complete
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Contact / CTA Section ----------
function ContactSection() {
  const navigate = useNavigate();

  return (
    <Section
      id="contact"
      className="py-24 px-4"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.62 0.22 290 / 0.06), transparent)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get Started Today
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Join thousands of educators and students transforming academic content
          with AI.
          <br />
          <span className="text-sm mt-2 block">
            Questions? Reach us at{" "}
            <a
              href="mailto:hello@aiacademic.ai"
              className="text-foreground underline underline-offset-2"
            >
              hello@aiacademic.ai
            </a>
          </span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate({ to: "/teacher/login" })}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.58 0.24 290))",
              boxShadow: "0 0 24px oklch(0.62 0.22 290 / 0.4)",
            }}
            data-ocid="cta.teacher_portal.button"
          >
            Teacher Portal
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate({ to: "/student/login" })}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 230), oklch(0.70 0.20 195))",
              boxShadow: "0 0 24px oklch(0.75 0.18 195 / 0.4)",
            }}
            data-ocid="cta.student_portal.button"
          >
            Student Portal
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer
      className="glass border-t py-10 px-4"
      style={{ borderColor: "oklch(0.62 0.24 250 / 0.12)" }}
      data-ocid="footer.panel"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-foreground">
            AI Academic Assistant
          </span>
        </div>

        {/* Links */}
        <nav
          className="flex items-center gap-6 text-sm text-muted-foreground"
          data-ocid="footer.links"
        >
          {["features", "about", "contact"].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() =>
                document
                  .querySelector(`#${id}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-foreground transition-colors capitalize"
              data-ocid={`footer.${id}.link`}
            >
              {id}
            </button>
          ))}
        </nav>

        {/* Copyright + social */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} AI Academic Assistant</span>
          <span className="text-xs text-muted-foreground/60">
            Built with{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
            data-ocid="footer.github.link"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---------- Page ----------
export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "oklch(0.07 0.025 250)" }}
      data-ocid="landing.page"
    >
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <StatsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
