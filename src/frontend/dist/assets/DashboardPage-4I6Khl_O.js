import { c as createLucideIcon, h as useAuthStore, j as jsxRuntimeExports, m as motion, l as BookOpen, F as FileText, q as Link, C as ChevronRight, d as reactExports } from "./index--tQIKzjM.js";
import { B as Badge } from "./badge-CThuzPO0.js";
import { B as Button } from "./button-rs2k0yxG.js";
import { S as Skeleton } from "./skeleton-IdBDwz55.js";
import { u as useDashboardStats, b as useNotes } from "./useBackend-6ecES1Qd.js";
import { T as TrendingUp } from "./trending-up-Di3L6lLR.js";
import { D as Download } from "./download-BoMwYMwG.js";
import { S as Search } from "./search-DHwquPJe.js";
import { S as Sparkles } from "./sparkles-iQEjdQ6Q.js";
import { A as ArrowRight } from "./arrow-right-BiYtw5SS.js";
import "./index-LPfivm91.js";
import "./backendService-DLDa8DMz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function AnimatedCounter({
  target,
  duration = 1400
}) {
  const [count, setCount] = reactExports.useState(0);
  const started = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (started.current || target === 0) return;
    started.current = true;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: count });
}
function FloatingShapes() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 overflow-hidden pointer-events-none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute -top-20 -left-20 w-80 h-80 rounded-full",
            style: {
              background: "radial-gradient(circle, oklch(0.62 0.24 250 / 0.18) 0%, transparent 70%)"
            },
            animate: { scale: [1, 1.08, 1], rotate: [0, 12, 0] },
            transition: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute -top-10 right-20 w-64 h-64 rounded-full",
            style: {
              background: "radial-gradient(circle, oklch(0.62 0.22 290 / 0.14) 0%, transparent 70%)"
            },
            animate: { scale: [1, 1.12, 1], y: [0, -12, 0] },
            transition: {
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute top-16 right-1/3 w-4 h-4 rounded-full border border-cyan-400/30",
            animate: { y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] },
            transition: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute top-8 left-1/4 w-2 h-2 rounded-full",
            style: { background: "oklch(0.75 0.18 195 / 0.6)" },
            animate: { y: [0, -10, 0], opacity: [0.6, 1, 0.6] },
            transition: {
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.8
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute top-4 right-4 w-24 h-24 opacity-10",
            style: { border: "1px solid oklch(0.62 0.24 250)", borderRadius: 8 },
            animate: { rotate: [0, 45, 0] },
            transition: {
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }
          }
        )
      ]
    }
  );
}
const glowMap = {
  blue: "glow-blue",
  purple: "glow-purple",
  cyan: "glow-cyan"
};
const gradientMap = {
  blue: "from-blue-500/20 to-cyan-500/10",
  purple: "from-purple-500/20 to-pink-500/10",
  cyan: "from-cyan-500/20 to-teal-500/10"
};
const iconBgMap = {
  blue: "bg-blue-500/20 text-blue-300",
  purple: "bg-purple-500/20 text-purple-300",
  cyan: "bg-cyan-500/20 text-cyan-300"
};
function StatCard({ icon, count, label, color, delay }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `student.stat.${label.toLowerCase().replace(/\s+/g, "_")}.card`,
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      whileHover: { y: -4, scale: 1.02 },
      className: `glass glass-hover rounded-2xl p-6 flex items-center gap-5 cursor-default transition-smooth hover:${glowMap[color]} bg-gradient-to-br ${gradientMap[color]}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${iconBgMap[color]}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold text-foreground tabular-nums", children: count === 0 && label === "Downloads" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "50+" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: count }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: label })
        ] })
      ]
    }
  );
}
function ActionCard({
  to,
  icon,
  label,
  desc,
  gradientClass,
  delay,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      "data-ocid": ocid,
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      whileHover: { y: -6, scale: 1.02 },
      className: "group glass glass-hover rounded-2xl p-7 flex flex-col gap-4 transition-smooth cursor-pointer",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "flex flex-col gap-4 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-16 h-16 rounded-2xl flex items-center justify-center ${gradientClass} shadow-lg`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-medium text-sm mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Explore" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1.5" })
        ] })
      ] })
    }
  );
}
function NoteCard({ note, index }) {
  const date = new Date(Number(note.createdAt) / 1e6);
  const formatted = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `student.note.item.${index + 1}`,
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      },
      whileHover: { y: -4, scale: 1.01 },
      className: "group glass glass-hover rounded-2xl p-5 flex flex-col gap-3 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-gradient-blue font-display font-bold text-base leading-tight truncate", children: note.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0 text-xs", children: [
            "Sem ",
            String(note.semester)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: note.topic }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
            "Unit: ",
            note.unit
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary/10 text-primary border-primary/20", children: note.department }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatted })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/student/notes",
            "data-ocid": `student.note.view_button.${index + 1}`,
            className: "mt-1 w-full opacity-0 group-hover:opacity-100 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", className: "w-full gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              "View Note"
            ] })
          }
        )
      ]
    }
  );
}
function NoteCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
    ] })
  ] });
}
function StudentDashboardPage() {
  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: notesData, isLoading: notesLoading } = useNotes({}, 0);
  const today = /* @__PURE__ */ new Date();
  const dayName = today.toLocaleDateString("en-IN", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const notesCount = stats ? Number(stats.totalNotes) : 0;
  const papersCount = stats ? Number(stats.totalQuestionPapers) : 0;
  const recentNotes = (notesData == null ? void 0 : notesData.notes.slice(0, 6)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-16", "data-ocid": "student.dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 p-8 md:p-12 glass",
        "data-ocid": "student.dashboard.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapes, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.5 },
                className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-primary", children: [
                    dayName,
                    ", ",
                    dateStr
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  delay: 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                },
                className: "text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-3",
                children: [
                  "Welcome back,",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-blue", children: (user == null ? void 0 : user.name) ?? "Student" }),
                  "!"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.28, duration: 0.55 },
                className: "text-lg text-muted-foreground",
                children: "Your Learning Hub — explore notes, search topics, and practise with past papers."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.7 },
              animate: { opacity: 0.12, scale: 1 },
              transition: { delay: 0.5, duration: 0.7 },
              className: "hidden md:block absolute right-8 bottom-4 text-primary",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-40 h-40" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "px-4 mb-8",
        "data-ocid": "student.dashboard.stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6" }),
              count: notesLoading ? 0 : notesCount,
              label: "Notes Available",
              color: "blue",
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6" }),
              count: statsLoading ? 0 : papersCount,
              label: "Question Papers",
              color: "purple",
              delay: 0.1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-6 h-6" }),
              count: 0,
              label: "Downloads",
              color: "cyan",
              delay: 0.2
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "px-4 mb-10",
        "data-ocid": "student.dashboard.actions.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.25, duration: 0.45 },
              className: "text-xl font-display font-bold text-foreground mb-5",
              children: "Quick Actions"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionCard,
              {
                to: "/student/notes",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-blue-200" }),
                label: "Browse Notes",
                desc: "Explore subject-wise notes organised by department, unit and topic.",
                gradientClass: "bg-gradient-to-br from-blue-600/70 to-cyan-600/60",
                delay: 0.3,
                ocid: "student.browse_notes.button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionCard,
              {
                to: "/student/notes",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 text-purple-200" }),
                label: "Search Notes",
                desc: "Find notes instantly by topic, keyword, or subject name.",
                gradientClass: "bg-gradient-to-br from-purple-600/70 to-pink-600/60",
                delay: 0.4,
                ocid: "student.search_notes.button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionCard,
              {
                to: "/student/question-papers",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-cyan-200" }),
                label: "Question Papers",
                desc: "Practice with past university and internal question papers.",
                gradientClass: "bg-gradient-to-br from-cyan-600/70 to-teal-600/60",
                delay: 0.5,
                ocid: "student.question_papers.button"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "px-4 mb-10",
        "data-ocid": "student.dashboard.recent_notes.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                initial: { opacity: 0, x: -12 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.45 },
                className: "text-xl font-display font-bold text-foreground",
                children: "Recently Added Notes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/student/notes",
                "data-ocid": "student.view_all_notes.link",
                className: "flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-smooth font-medium",
                children: [
                  "View All ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] }),
          notesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            /* @__PURE__ */ jsxRuntimeExports.jsx(NoteCardSkeleton, {}, i)
          )) }) : recentNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": "student.dashboard.notes.empty_state",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "glass rounded-2xl p-12 flex flex-col items-center gap-4 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No notes available yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70", children: "Ask your teacher to upload lecture notes." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: recentNotes.map((note, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(NoteCard, { note, index: i }, String(note.id))) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4", "data-ocid": "student.dashboard.tip.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.55 },
        className: "relative overflow-hidden rounded-2xl p-6 md:p-8",
        style: {
          background: "linear-gradient(135deg, oklch(0.2 0.06 250 / 0.9) 0%, oklch(0.18 0.07 280 / 0.9) 50%, oklch(0.16 0.06 230 / 0.9) 100%)",
          border: "1px solid oklch(0.62 0.24 250 / 0.25)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-30 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 60% 80% at 10% 50%, oklch(0.62 0.24 250 / 0.4), transparent)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row sm:items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "AI-Powered Learning" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-yellow-400" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xl", children: "Every note is AI-transcribed and summarised from real lectures. Use Search to pinpoint topics in seconds — and download a polished PDF for offline study." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/student/notes",
                "data-ocid": "student.tip.explore_button",
                className: "sm:ml-auto shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "default",
                    size: "sm",
                    className: "gap-2 whitespace-nowrap",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                      "Explore Notes"
                    ]
                  }
                )
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  StudentDashboardPage as default
};
