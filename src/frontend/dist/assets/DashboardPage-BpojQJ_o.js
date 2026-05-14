import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, n as cn, h as useAuthStore, L as LoadingSpinner, F as FileText, l as BookOpen, o as Users, p as Files, q as Link, C as ChevronRight, d as reactExports } from "./index--tQIKzjM.js";
import { u as useDashboardStats, a as useAnalytics } from "./useBackend-6ecES1Qd.js";
import { T as TrendingUp } from "./trending-up-Di3L6lLR.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, b as Cell, P as PieChart, c as Pie, L as Legend } from "./PieChart-S-se-V6E.js";
import { M as Mic } from "./mic-BVi8au6H.js";
import "./backendService-DLDa8DMz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const glowMap = {
  blue: "hover:glow-blue",
  purple: "hover:glow-purple",
  cyan: "hover:glow-cyan"
};
function AnimatedCard({
  children,
  className,
  onClick,
  hoverable = true,
  glowColor = "blue"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      whileHover: hoverable ? { scale: 1.02, borderColor: "oklch(0.62 0.24 250 / 0.35)" } : void 0,
      whileTap: onClick ? { scale: 0.98 } : void 0,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
      onClick,
      className: cn(
        "glass rounded-2xl p-6 transition-smooth",
        hoverable && glowMap[glowColor],
        onClick && "cursor-pointer",
        className
      ),
      children
    }
  );
}
function AnimatedCounter({
  to,
  duration = 1.6
}) {
  const [value, setValue] = reactExports.useState(0);
  const startedAt = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (to === 0) return;
    startedAt.current = null;
    const step = (timestamp) => {
      if (startedAt.current === null) startedAt.current = timestamp;
      const elapsed = timestamp - startedAt.current;
      const progress = Math.min(elapsed / (duration * 1e3), 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * to));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value.toLocaleString() });
}
function GlassTooltip({
  active,
  payload,
  label
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-4 py-3 shadow-lg border border-white/10", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
    payload.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "text-sm font-semibold",
        style: { color: entry.fill ?? "var(--brand-blue)" },
        children: [
          entry.name ? `${entry.name}: ` : "",
          entry.value
        ]
      },
      `tooltip-${i}`
    ))
  ] });
}
const PIE_COLORS = [
  "oklch(0.62 0.24 250)",
  "oklch(0.62 0.22 290)",
  "oklch(0.75 0.18 195)",
  "oklch(0.65 0.20 220)",
  "oklch(0.68 0.20 270)"
];
const STAT_CONFIGS = [
  {
    key: "totalNotes",
    label: "Total Notes",
    icon: FileText,
    glowColor: "blue",
    gradient: "from-blue-500/20 to-blue-600/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-700"
  },
  {
    key: "totalSubjects",
    label: "Total Subjects",
    icon: BookOpen,
    glowColor: "purple",
    gradient: "from-purple-500/20 to-purple-600/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-700"
  },
  {
    key: "totalStudents",
    label: "Total Students",
    icon: Users,
    glowColor: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/10",
    iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-700"
  },
  {
    key: "totalQuestionPapers",
    label: "Question Papers",
    icon: Files,
    glowColor: "blue",
    gradient: "from-blue-400/20 to-indigo-600/10",
    iconBg: "bg-gradient-to-br from-blue-400 to-indigo-600"
  }
];
const QUICK_ACTIONS = [
  {
    label: "Upload Audio",
    icon: Mic,
    to: "/teacher/upload",
    color: "text-blue-400",
    ocid: "quick.upload_audio"
  },
  {
    label: "Add Note",
    icon: CirclePlus,
    to: "/teacher/notes/new",
    color: "text-purple-400",
    ocid: "quick.add_note"
  },
  {
    label: "Upload Paper",
    icon: Files,
    to: "/teacher/question-papers",
    color: "text-cyan-400",
    ocid: "quick.upload_paper"
  },
  {
    label: "Analytics",
    icon: ChartColumn,
    to: "/teacher/analytics",
    color: "text-indigo-400",
    ocid: "quick.analytics"
  }
];
function formatDate(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function TeacherDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(30);
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const notesBarData = ((analytics == null ? void 0 : analytics.notesPerDay) ?? []).map(([day, count]) => ({
    day: day.slice(5),
    // MM-DD
    notes: Number(count)
  })).slice(-14);
  const deptPieData = ((analytics == null ? void 0 : analytics.papersPerDepartment) ?? []).map(
    ([name, value]) => ({
      name,
      value: Number(value)
    })
  );
  if (statsLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  const statValues = {
    totalNotes: Number((stats == null ? void 0 : stats.totalNotes) ?? 0),
    totalSubjects: Number((stats == null ? void 0 : stats.totalSubjects) ?? 0),
    totalStudents: Number((stats == null ? void 0 : stats.totalStudents) ?? 0),
    totalQuestionPapers: Number((stats == null ? void 0 : stats.totalQuestionPapers) ?? 0)
  };
  const recentNotes = (stats == null ? void 0 : stats.recentNotes) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 space-y-8 min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        "data-ocid": "dashboard.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground uppercase tracking-widest mb-1", children: "Teacher Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold", children: [
              "Welcome back,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-blue", children: (user == null ? void 0 : user.name) ?? "Teacher" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-xl px-4 py-3 flex items-center gap-3",
              "data-ocid": "dashboard.datetime",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: timeStr }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: dateStr })
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "dashboard.stats",
        children: STAT_CONFIGS.map((cfg, i) => {
          const Icon = cfg.icon;
          const count = statValues[cfg.key];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: i * 0.1 },
              "data-ocid": `dashboard.stat.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedCard, { glowColor: cfg.glowColor, className: "h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-2", children: cfg.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-bold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { to: count }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-emerald-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-400", children: "Active" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `${cfg.iconBg} p-3 rounded-2xl shrink-0 ml-3`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-white" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `mt-4 h-1 rounded-full bg-gradient-to-r ${cfg.gradient} opacity-60`
                  }
                )
              ] })
            },
            cfg.key
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.3 },
          className: "lg:col-span-3",
          "data-ocid": "dashboard.chart.bar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedCard, { hoverable: false, className: "h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Notes by Day" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground glass px-3 py-1 rounded-full", children: "Last 14 days" })
            ] }),
            analyticsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : notesBarData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center h-48 text-muted-foreground",
                "data-ocid": "chart.bar.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-10 h-10 mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No activity yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              BarChart,
              {
                data: notesBarData,
                margin: { top: 4, right: 4, left: -20, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      stroke: "oklch(0.62 0.24 250 / 0.08)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      dataKey: "day",
                      tick: { fill: "oklch(0.58 0.015 240)", fontSize: 11 },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tick: { fill: "oklch(0.58 0.015 240)", fontSize: 11 },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip, {}),
                      cursor: { fill: "oklch(0.62 0.24 250 / 0.06)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Bar,
                    {
                      dataKey: "notes",
                      name: "Notes",
                      radius: [6, 6, 0, 0],
                      fill: "oklch(0.62 0.24 250)",
                      children: notesBarData.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Cell,
                        {
                          fill: `oklch(${0.55 + idx * 7e-3} 0.24 ${250 + idx * 2})`
                        },
                        `cell-${idx}`
                      ))
                    }
                  )
                ]
              }
            ) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.4 },
          className: "lg:col-span-2",
          "data-ocid": "dashboard.chart.pie",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedCard, { hoverable: false, className: "h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "By Department" }) }),
            analyticsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : deptPieData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center h-48 text-muted-foreground",
                "data-ocid": "chart.pie.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Files, { className: "w-10 h-10 mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No papers yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: deptPieData,
                  cx: "50%",
                  cy: "45%",
                  innerRadius: 55,
                  outerRadius: 85,
                  paddingAngle: 3,
                  dataKey: "value",
                  children: deptPieData.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cell,
                    {
                      fill: PIE_COLORS[idx % PIE_COLORS.length]
                    },
                    `pie-cell-${idx}`
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Legend,
                {
                  iconType: "circle",
                  iconSize: 8,
                  wrapperStyle: {
                    fontSize: "11px",
                    color: "oklch(0.58 0.015 240)"
                  }
                }
              )
            ] }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.5 },
          className: "lg:col-span-2",
          "data-ocid": "dashboard.recent_notes",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedCard, { hoverable: false, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Recent Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/teacher/notes",
                  className: "flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-smooth",
                  "data-ocid": "dashboard.view_all_notes_link",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                  ]
                }
              )
            ] }),
            recentNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-12 text-muted-foreground",
                "data-ocid": "dashboard.recent_notes.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mb-3 opacity-25" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "No notes yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-60", children: "Upload audio or create a note to get started" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/teacher/notes/new",
                      className: "mt-4 text-xs text-primary underline underline-offset-2",
                      "data-ocid": "dashboard.create_note_link",
                      children: "Create your first note"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "divide-y divide-border/40",
                "data-ocid": "dashboard.notes.list",
                children: recentNotes.slice(0, 5).map((note, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -10 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.6 + idx * 0.07 },
                    className: "group flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-white/5 transition-smooth cursor-default",
                    "data-ocid": `dashboard.notes.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-brand-subtle rounded-lg p-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: note.topic }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                          note.subject,
                          " · ",
                          note.unit,
                          " · ",
                          note.department
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:block", children: formatDate(note.createdAt) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/teacher/notes/$noteId",
                            params: { noteId: note.id.toString() },
                            className: "opacity-0 group-hover:opacity-100 transition-smooth",
                            "data-ocid": `dashboard.notes.edit_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-primary" })
                          }
                        )
                      ] })
                    ]
                  },
                  note.id.toString()
                ))
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.55 },
          "data-ocid": "dashboard.quick_actions",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedCard, { hoverable: false, className: "h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-5", children: "Quick Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: QUICK_ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.65 + i * 0.08 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: action.to,
                      className: "glass glass-hover flex items-center gap-4 p-4 rounded-xl transition-smooth group",
                      "data-ocid": action.ocid,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-lg p-2 shrink-0 group-hover:scale-110 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${action.color}` }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground flex-1 min-w-0", children: action.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0" })
                      ]
                    }
                  )
                },
                action.to
              );
            }) })
          ] })
        }
      )
    ] })
  ] });
}
export {
  TeacherDashboardPage as default
};
