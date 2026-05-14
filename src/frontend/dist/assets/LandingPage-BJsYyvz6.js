import { c as createLucideIcon, a as animateVisualElement, s as setTarget, u as useConstant, b as useIsomorphicLayoutEffect, r as resolveElements, d as reactExports, j as jsxRuntimeExports, e as useNavigate, m as motion, B as Brain, A as AnimatePresence, C as ChevronRight, f as ChartNoAxesColumn, U as Upload } from "./index--tQIKzjM.js";
import { X } from "./x-BiGuIwf2.js";
import { M as Mic } from "./mic-BVi8au6H.js";
import { S as Sparkles } from "./sparkles-iQEjdQ6Q.js";
import { D as Download } from "./download-BoMwYMwG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
];
const FileDown = createLucideIcon("file-down", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z", key: "1mlx9k" }],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", key: "mhlwft" }]
];
const FileQuestion = createLucideIcon("file-question", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
];
const Github = createLucideIcon("github", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode);
function stopAnimation(visualElement) {
  visualElement.values.forEach((value) => value.stop());
}
function setVariants(visualElement, variantLabels) {
  const reversedLabels = [...variantLabels].reverse();
  reversedLabels.forEach((key) => {
    const variant = visualElement.getVariant(key);
    variant && setTarget(visualElement, variant);
    if (visualElement.variantChildren) {
      visualElement.variantChildren.forEach((child) => {
        setVariants(child, variantLabels);
      });
    }
  });
}
function setValues(visualElement, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement, [definition]);
  } else {
    setTarget(visualElement, definition);
  }
}
function animationControls() {
  const subscribers = /* @__PURE__ */ new Set();
  const controls = {
    subscribe(visualElement) {
      subscribers.add(visualElement);
      return () => void subscribers.delete(visualElement);
    },
    start(definition, transitionOverride) {
      const animations = [];
      subscribers.forEach((visualElement) => {
        animations.push(animateVisualElement(visualElement, definition, {
          transitionOverride
        }));
      });
      return Promise.all(animations);
    },
    set(definition) {
      return subscribers.forEach((visualElement) => {
        setValues(visualElement, definition);
      });
    },
    stop() {
      subscribers.forEach((visualElement) => {
        stopAnimation(visualElement);
      });
    },
    mount() {
      return () => {
        controls.stop();
      };
    }
  };
  return controls;
}
function useAnimationControls() {
  const controls = useConstant(animationControls);
  useIsomorphicLayoutEffect(controls.mount, []);
  return controls;
}
const useAnimation = useAnimationControls;
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
function ParticleBackground() {
  const canvasRef = reactExports.useRef(null);
  const particlesRef = reactExports.useRef([]);
  const rafRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const colors = [
      "oklch(0.62 0.24 250 / 0.6)",
      "oklch(0.62 0.22 290 / 0.6)",
      "oklch(0.75 0.18 195 / 0.6)"
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
      color: colors[Math.floor(Math.random() * colors.length)]
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "absolute inset-0 pointer-events-none",
      style: { zIndex: 0 }
    }
  );
}
const FLOAT_SHAPES = [
  {
    top: "12%",
    left: "8%",
    size: 80,
    color: "oklch(0.62 0.24 250 / 0.12)",
    delay: 0
  },
  {
    top: "25%",
    right: "6%",
    size: 120,
    color: "oklch(0.62 0.22 290 / 0.10)",
    delay: 0.8
  },
  {
    top: "65%",
    left: "4%",
    size: 60,
    color: "oklch(0.75 0.18 195 / 0.12)",
    delay: 1.5
  },
  {
    top: "75%",
    right: "10%",
    size: 90,
    color: "oklch(0.62 0.24 250 / 0.08)",
    delay: 0.4
  },
  {
    top: "45%",
    left: "3%",
    size: 40,
    color: "oklch(0.62 0.22 290 / 0.15)",
    delay: 1.2
  }
];
function FloatingShape({ shape, index }) {
  const style = {
    width: shape.size,
    height: shape.size,
    top: shape.top,
    background: shape.color,
    filter: "blur(40px)",
    zIndex: 0
  };
  if ("left" in shape) style.left = shape.left;
  if ("right" in shape) style.right = shape.right;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute rounded-full pointer-events-none",
      style,
      animate: { y: [0, -20, 0], scale: [1, 1.08, 1] },
      transition: {
        duration: 5 + index,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: shape.delay
      }
    }
  );
}
function Counter({ target, suffix = "" }) {
  const [count, setCount] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, { once: true });
  reactExports.useEffect(() => {
    if (!inView2) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView2, target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    count.toLocaleString(),
    suffix
  ] });
}
function Section({
  id,
  children,
  className = "",
  style
}) {
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, { once: true, margin: "-80px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.section,
    {
      id,
      ref,
      initial: { opacity: 0, y: 30 },
      animate: inView2 ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.7, ease: "easeOut" },
      className,
      style,
      children
    }
  );
}
const FEATURES = [
  {
    icon: Mic,
    label: "Audio Transcription",
    desc: "Upload lectures in mp3/wav/m4a. Whisper AI transcribes with 99% accuracy.",
    glow: "glow-blue",
    gradient: "from-blue-600/20 to-blue-900/10"
  },
  {
    icon: Sparkles,
    label: "AI Summaries",
    desc: "GPT-powered summaries distill hours of lectures into concise study notes.",
    glow: "glow-purple",
    gradient: "from-purple-600/20 to-purple-900/10"
  },
  {
    icon: FolderOpen,
    label: "Smart Organization",
    desc: "Hierarchical structure: Department → Year → Semester → Subject → Unit.",
    glow: "glow-cyan",
    gradient: "from-cyan-600/20 to-cyan-900/10"
  },
  {
    icon: FileQuestion,
    label: "Question Bank",
    desc: "Upload and organize university and internal question papers with metadata.",
    glow: "glow-blue",
    gradient: "from-blue-600/20 to-blue-900/10"
  },
  {
    icon: FileDown,
    label: "PDF Generation",
    desc: "One-click professional PDFs with auto title pages, footers, and formatting.",
    glow: "glow-purple",
    gradient: "from-purple-600/20 to-purple-900/10"
  },
  {
    icon: ChartNoAxesColumn,
    label: "Analytics Dashboard",
    desc: "Track uploads, student engagement, and content growth with live charts.",
    glow: "glow-cyan",
    gradient: "from-cyan-600/20 to-cyan-900/10"
  }
];
const STEPS = [
  { icon: Upload, label: "Upload Audio", desc: "mp3, wav, m4a, mp4" },
  { icon: WandSparkles, label: "AI Transcription", desc: "Whisper AI engine" },
  { icon: Sparkles, label: "Generate Summary", desc: "GPT-4 summaries" },
  { icon: FolderOpen, label: "Organize Notes", desc: "Subject → Unit tree" },
  { icon: Download, label: "Download PDF", desc: "Professional layout" }
];
const STATS = [
  { value: 1e4, suffix: "+", label: "Students" },
  { value: 5e4, suffix: "+", label: "Notes Created" },
  { value: 99, suffix: "%", label: "Accuracy" },
  { value: 100, suffix: "+", label: "Institutions" }
];
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#workflow" },
  { label: "Stats", href: "#stats" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];
function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = reactExports.useCallback((href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el == null ? void 0 : el.scrollIntoView({ behavior: "smooth" });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.nav,
    {
      className: "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      initial: { y: -80, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6, ease: "easeOut" },
      style: {
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: scrolled ? "oklch(0.08 0.025 250 / 0.92)" : "oklch(0.08 0.025 250 / 0.4)",
        borderBottom: "1px solid oklch(0.62 0.24 250 / 0.12)"
      },
      "data-ocid": "nav.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 group",
              onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
              "data-ocid": "nav.logo",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-white" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm tracking-tight", children: "AI Academic" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-6", children: NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => scrollTo(link.href),
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group",
              "data-ocid": `nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`,
              children: [
                link.label,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-brand group-hover:w-full transition-all duration-300" })
              ]
            },
            link.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/teacher/login" }),
                className: "text-sm px-4 py-1.5 rounded-lg glass border border-purple-500/30 text-foreground hover:border-purple-500/60 transition-smooth",
                "data-ocid": "nav.teacher_portal.button",
                children: "Teacher Portal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/student/login" }),
                className: "text-sm px-4 py-1.5 rounded-lg bg-gradient-brand text-white glow-blue hover:opacity-90 transition-smooth font-medium",
                "data-ocid": "nav.student_portal.button",
                children: "Student Portal"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "md:hidden text-foreground p-1",
              onClick: () => setMobileOpen((v) => !v),
              "aria-label": "Toggle menu",
              "data-ocid": "nav.mobile_menu.toggle",
              children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25 },
            className: "md:hidden overflow-hidden px-4 pb-4 flex flex-col gap-3",
            "data-ocid": "nav.mobile_menu.panel",
            children: [
              NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => scrollTo(link.href),
                  className: "text-sm text-muted-foreground hover:text-foreground text-left transition-colors",
                  children: link.label
                },
                link.label
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/teacher/login" }),
                  className: "text-sm px-4 py-2 rounded-lg glass border border-purple-500/30 text-foreground text-left",
                  "data-ocid": "nav.mobile_teacher.button",
                  children: "Teacher Portal"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/student/login" }),
                  className: "text-sm px-4 py-2 rounded-lg bg-gradient-brand text-white font-medium text-left",
                  "data-ocid": "nav.mobile_student.button",
                  children: "Student Portal"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function HeroSection() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "hero",
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
      "data-ocid": "hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleBackground, {}),
        FLOAT_SHAPES.map((shape, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static shape list
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShape, { shape, index: i }, `float-${i}`)
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(ellipse, oklch(0.62 0.24 250 / 0.12) 0%, transparent 70%)",
              filter: "blur(40px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center text-center px-4 pt-20 pb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "mb-8",
              animate: { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] },
              transition: {
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-brand glow-purple flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-10 h-10 text-white" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              className: "font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6",
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.1 },
              "data-ocid": "hero.headline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.72 0.22 290), oklch(0.75 0.18 195))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "AI Academic"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Assistant" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-muted-foreground text-lg md:text-2xl font-body mb-10 max-w-xl tracking-wide",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.25 },
              "data-ocid": "hero.subtitle",
              children: "Smart Notes • AI Transcript • Question Bank"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col sm:flex-row gap-4 items-center",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.97 },
                    onClick: () => navigate({ to: "/teacher/login" }),
                    className: "flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white text-base transition-smooth",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.58 0.24 290))",
                      boxShadow: "0 0 24px oklch(0.62 0.22 290 / 0.5), 0 0 60px oklch(0.62 0.22 290 / 0.2)"
                    },
                    "data-ocid": "hero.teacher_portal.button",
                    children: [
                      "Teacher Portal",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.97 },
                    onClick: () => navigate({ to: "/student/login" }),
                    className: "flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white text-base transition-smooth",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.55 0.22 230), oklch(0.70 0.20 195))",
                      boxShadow: "0 0 24px oklch(0.75 0.18 195 / 0.5), 0 0 60px oklch(0.75 0.18 195 / 0.2)"
                    },
                    "data-ocid": "hero.student_portal.button",
                    children: [
                      "Student Portal",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "mt-14 w-full max-w-4xl mx-auto",
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.6 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "glass rounded-2xl overflow-hidden",
                  style: { boxShadow: "0 0 40px oklch(0.62 0.24 250 / 0.15)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/hero-ai-academic.dim_1200x600.jpg",
                      alt: "AI Academic Assistant platform visualization",
                      className: "w-full h-auto object-cover opacity-90"
                    }
                  )
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function FeaturesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "features", className: "py-24 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "font-display text-4xl md:text-5xl font-bold mb-4",
          style: {
            background: "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.72 0.22 290), oklch(0.75 0.18 195))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          },
          children: "Powerful Features"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Everything you need to manage, share, and accelerate academic learning with AI." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        "data-ocid": "features.list",
        children: FEATURES.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: `glass rounded-2xl p-6 flex flex-col gap-4 glass-hover cursor-default transition-smooth bg-gradient-to-br ${feat.gradient}`,
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.1 },
            whileHover: { y: -4 },
            "data-ocid": `features.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-xl flex items-center justify-center ${feat.glow}`,
                  style: { background: "oklch(0.14 0.04 250 / 0.8)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(feat.icon, { className: "w-6 h-6 text-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: feat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feat.desc })
            ]
          },
          feat.label
        ))
      }
    )
  ] }) });
}
function WorkflowSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "workflow",
      className: "py-24 px-4",
      style: {
        background: "radial-gradient(ellipse 100% 60% at 50% 50%, oklch(0.62 0.24 250 / 0.04), transparent)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4", children: "How It Works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "From raw audio to polished study notes in minutes." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative flex flex-col md:flex-row items-stretch gap-0",
            "data-ocid": "workflow.steps",
            children: STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col md:flex-row items-center flex-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      className: "flex flex-col items-center text-center p-6 glass rounded-2xl flex-1 w-full glass-hover transition-smooth",
                      initial: { opacity: 0, scale: 0.85 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.5, delay: i * 0.12 },
                      whileHover: { scale: 1.03 },
                      "data-ocid": `workflow.step.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-gradient-brand glow-blue flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-6 h-6 text-white" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mb-2",
                            style: { background: "oklch(0.62 0.22 290 / 0.6)" },
                            children: i + 1
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground mb-1", children: step.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: step.desc })
                      ]
                    }
                  ),
                  i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      className: "hidden md:flex items-center justify-center w-10 shrink-0",
                      initial: { scaleX: 0, opacity: 0 },
                      whileInView: { scaleX: 1, opacity: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.4, delay: i * 0.12 + 0.25 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-full h-px",
                            style: {
                              background: "linear-gradient(90deg, oklch(0.62 0.24 250 / 0.5), oklch(0.62 0.22 290 / 0.5))"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
                      ]
                    }
                  )
                ]
              },
              step.label
            ))
          }
        )
      ] })
    }
  );
}
function StatsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "stats", className: "py-24 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto glass rounded-3xl p-10 md:p-16",
      style: { boxShadow: "0 0 60px oklch(0.62 0.24 250 / 0.1)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "Trusted by Educators" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-4 gap-8",
            "data-ocid": "stats.list",
            children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "text-center",
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: i * 0.1 },
                "data-ocid": `stats.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-display text-4xl md:text-5xl font-extrabold mb-2",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.75 0.18 195))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { target: stat.value, suffix: stat.suffix })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm font-medium", children: stat.label })
                ]
              },
              stat.label
            ))
          }
        )
      ]
    }
  ) });
}
function AboutSection() {
  const controls = useAnimation();
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, { once: true, margin: "-80px" });
  reactExports.useEffect(() => {
    if (inView2) controls.start("visible");
  }, [inView2, controls]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "py-24 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ref,
        variants: {
          hidden: { opacity: 0, x: -40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" }
          }
        },
        initial: "hidden",
        animate: controls,
        "data-ocid": "about.text.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4", children: [
            "Empowering Education",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  background: "linear-gradient(135deg, oklch(0.75 0.2 240), oklch(0.72 0.22 290))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                },
                children: "with AI"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed mb-6", children: "AI Academic Assistant bridges the gap between lecture halls and digital learning. Teachers upload raw audio lectures; our Whisper-powered engine transcribes every word, GPT-4 distills key concepts, and content is instantly searchable and downloadable as PDFs." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: "Students gain 24/7 access to a structured knowledge base covering every department, year, semester, subject, and unit — empowering self-paced mastery and exam readiness." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
        className: "relative flex items-center justify-center",
        "data-ocid": "about.graphic.panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass rounded-3xl p-8 w-full max-w-sm mx-auto",
            style: { boxShadow: "0 0 40px oklch(0.62 0.22 290 / 0.2)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
              [
                "Upload Audio Lecture",
                "AI Transcript Ready",
                "PDF Downloaded"
              ].map((text, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "flex items-center gap-3 glass rounded-xl p-3",
                  initial: { opacity: 0, x: 20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { delay: 0.3 + i * 0.15, duration: 0.5 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        style: {
                          background: i === 0 ? "oklch(0.62 0.24 250 / 0.3)" : i === 1 ? "oklch(0.62 0.22 290 / 0.3)" : "oklch(0.75 0.18 195 / 0.3)"
                        },
                        children: i === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-foreground" }) : i === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4 text-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-foreground" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: text }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "ml-auto w-2 h-2 rounded-full",
                        style: {
                          background: i < 2 ? "oklch(0.75 0.18 195)" : "oklch(0.62 0.22 290)"
                        }
                      }
                    )
                  ]
                },
                text
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 glass rounded-xl p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-2", children: "Transcription progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-2 rounded-full",
                    style: { background: "oklch(0.14 0.04 250)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-2 rounded-full",
                        style: {
                          background: "linear-gradient(90deg, oklch(0.62 0.24 250), oklch(0.75 0.18 195))"
                        },
                        initial: { width: "0%" },
                        whileInView: { width: "88%" },
                        viewport: { once: true },
                        transition: { duration: 1.5, ease: "easeOut", delay: 0.5 }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-xs text-muted-foreground mt-1", children: "88% complete" })
              ] })
            ] })
          }
        )
      }
    )
  ] }) });
}
function ContactSection() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "contact",
      className: "py-24 px-4",
      style: {
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.62 0.22 290 / 0.06), transparent)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.h2,
          {
            className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: "Get Started Today"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.p,
          {
            className: "text-muted-foreground text-lg mb-10",
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.15 },
            children: [
              "Join thousands of educators and students transforming academic content with AI.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm mt-2 block", children: [
                "Questions? Reach us at",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "mailto:hello@aiacademic.ai",
                    className: "text-foreground underline underline-offset-2",
                    children: "hello@aiacademic.ai"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.25 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.97 },
                  onClick: () => navigate({ to: "/teacher/login" }),
                  className: "flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.58 0.24 290))",
                    boxShadow: "0 0 24px oklch(0.62 0.22 290 / 0.4)"
                  },
                  "data-ocid": "cta.teacher_portal.button",
                  children: "Teacher Portal"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.97 },
                  onClick: () => navigate({ to: "/student/login" }),
                  className: "flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-white",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.55 0.22 230), oklch(0.70 0.20 195))",
                    boxShadow: "0 0 24px oklch(0.75 0.18 195 / 0.4)"
                  },
                  "data-ocid": "cta.student_portal.button",
                  children: "Student Portal"
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "footer",
    {
      className: "glass border-t py-10 px-4",
      style: { borderColor: "oklch(0.62 0.24 250 / 0.12)" },
      "data-ocid": "footer.panel",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "AI Academic Assistant" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            className: "flex items-center gap-6 text-sm text-muted-foreground",
            "data-ocid": "footer.links",
            children: ["features", "about", "contact"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  return (_a = document.querySelector(`#${id}`)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "hover:text-foreground transition-colors capitalize",
                "data-ocid": `footer.${id}.link`,
                children: id
              },
              id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " AI Academic Assistant"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/60", children: [
            "Built with",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hover:text-muted-foreground transition-colors",
                children: "caffeine.ai"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://github.com",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-foreground transition-colors",
              "aria-label": "GitHub",
              "data-ocid": "footer.github.link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    }
  );
}
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen",
      style: { background: "oklch(0.07 0.025 250)" },
      "data-ocid": "landing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
      ]
    }
  );
}
export {
  LandingPage as default
};
