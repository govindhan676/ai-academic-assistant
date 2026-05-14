import { AnimatedCard } from "@/components/UI/AnimatedCard";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { useAnalytics, useDashboardStats } from "@/hooks/useBackend";
import { useAuthStore } from "@/store/authStore";
import type { Note } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock,
  FileText,
  Files,
  Mic,
  PlusCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Animated counter ───────────────────────────────────────────────────────
function AnimatedCounter({
  to,
  duration = 1.6,
}: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const startedAt = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (to === 0) return;
    startedAt.current = null;

    const step = (timestamp: number) => {
      if (startedAt.current === null) startedAt.current = timestamp;
      const elapsed = timestamp - startedAt.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out-cubic
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * to));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, duration]);

  return <span>{value.toLocaleString()}</span>;
}

// ─── Glassmorphic Recharts tooltip ─────────────────────────────────────────
function GlassTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name?: string; fill?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-lg border border-white/10">
      {label && <p className="text-xs text-muted-foreground mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <p
          // biome-ignore lint/suspicious/noArrayIndexKey: static tooltip list
          key={`tooltip-${i}`}
          className="text-sm font-semibold"
          style={{ color: entry.fill ?? "var(--brand-blue)" }}
        >
          {entry.name ? `${entry.name}: ` : ""}
          {entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── Stat card config ───────────────────────────────────────────────────────
const PIE_COLORS = [
  "oklch(0.62 0.24 250)",
  "oklch(0.62 0.22 290)",
  "oklch(0.75 0.18 195)",
  "oklch(0.65 0.20 220)",
  "oklch(0.68 0.20 270)",
];

interface StatConfig {
  key: keyof {
    totalNotes: number;
    totalSubjects: number;
    totalStudents: number;
    totalQuestionPapers: number;
  };
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  glowColor: "blue" | "purple" | "cyan";
  gradient: string;
  iconBg: string;
}

const STAT_CONFIGS: StatConfig[] = [
  {
    key: "totalNotes",
    label: "Total Notes",
    icon: FileText,
    glowColor: "blue",
    gradient: "from-blue-500/20 to-blue-600/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    key: "totalSubjects",
    label: "Total Subjects",
    icon: BookOpen,
    glowColor: "purple",
    gradient: "from-purple-500/20 to-purple-600/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-700",
  },
  {
    key: "totalStudents",
    label: "Total Students",
    icon: Users,
    glowColor: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/10",
    iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-700",
  },
  {
    key: "totalQuestionPapers",
    label: "Question Papers",
    icon: Files,
    glowColor: "blue",
    gradient: "from-blue-400/20 to-indigo-600/10",
    iconBg: "bg-gradient-to-br from-blue-400 to-indigo-600",
  },
];

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  color: string;
  ocid: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Upload Audio",
    icon: Mic,
    to: "/teacher/upload",
    color: "text-blue-400",
    ocid: "quick.upload_audio",
  },
  {
    label: "Add Note",
    icon: PlusCircle,
    to: "/teacher/notes/new",
    color: "text-purple-400",
    ocid: "quick.add_note",
  },
  {
    label: "Upload Paper",
    icon: Files,
    to: "/teacher/question-papers",
    color: "text-cyan-400",
    ocid: "quick.upload_paper",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    to: "/teacher/analytics",
    color: "text-indigo-400",
    ocid: "quick.analytics",
  },
];

// ─── Format timestamp ────────────────────────────────────────────────────────
function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function TeacherDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(30);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const notesBarData = (analytics?.notesPerDay ?? [])
    .map(([day, count]) => ({
      day: day.slice(5), // MM-DD
      notes: Number(count),
    }))
    .slice(-14);

  const deptPieData = (analytics?.papersPerDepartment ?? []).map(
    ([name, value]) => ({
      name,
      value: Number(value),
    }),
  );

  if (statsLoading) return <LoadingSpinner fullPage />;

  const statValues = {
    totalNotes: Number(stats?.totalNotes ?? 0),
    totalSubjects: Number(stats?.totalSubjects ?? 0),
    totalStudents: Number(stats?.totalStudents ?? 0),
    totalQuestionPapers: Number(stats?.totalQuestionPapers ?? 0),
  };

  const recentNotes: Note[] = stats?.recentNotes ?? [];

  return (
    <div className="px-6 py-8 space-y-8 min-h-full">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        data-ocid="dashboard.header"
      >
        <div>
          <p className="text-sm font-body text-muted-foreground uppercase tracking-widest mb-1">
            Teacher Dashboard
          </p>
          <h1 className="font-display text-3xl font-bold">
            Welcome back,{" "}
            <span className="text-gradient-blue">
              {user?.name ?? "Teacher"}
            </span>
          </h1>
        </div>
        <div
          className="glass rounded-xl px-4 py-3 flex items-center gap-3"
          data-ocid="dashboard.datetime"
        >
          <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{timeStr}</p>
            <p className="text-xs text-muted-foreground">{dateStr}</p>
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.stats"
      >
        {STAT_CONFIGS.map((cfg, i) => {
          const Icon = cfg.icon;
          const count = statValues[cfg.key];
          return (
            <motion.div
              key={cfg.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`dashboard.stat.${i + 1}`}
            >
              <AnimatedCard glowColor={cfg.glowColor} className="h-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      {cfg.label}
                    </p>
                    <p className="font-display text-4xl font-bold text-foreground">
                      <AnimatedCounter to={count} />
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs text-emerald-400">Active</span>
                    </div>
                  </div>
                  <div
                    className={`${cfg.iconBg} p-3 rounded-2xl shrink-0 ml-3`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div
                  className={`mt-4 h-1 rounded-full bg-gradient-to-r ${cfg.gradient} opacity-60`}
                />
              </AnimatedCard>
            </motion.div>
          );
        })}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
          data-ocid="dashboard.chart.bar"
        >
          <AnimatedCard hoverable={false} className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Notes by Day
              </h2>
              <span className="text-xs text-muted-foreground glass px-3 py-1 rounded-full">
                Last 14 days
              </span>
            </div>
            {analyticsLoading ? (
              <div className="flex items-center justify-center h-48">
                <LoadingSpinner />
              </div>
            ) : notesBarData.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-48 text-muted-foreground"
                data-ocid="chart.bar.empty_state"
              >
                <BarChart3 className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">No activity yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={notesBarData}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.62 0.24 250 / 0.08)"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "oklch(0.58 0.015 240)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.58 0.015 240)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<GlassTooltip />}
                    cursor={{ fill: "oklch(0.62 0.24 250 / 0.06)" }}
                  />
                  <Bar
                    dataKey="notes"
                    name="Notes"
                    radius={[6, 6, 0, 0]}
                    fill="oklch(0.62 0.24 250)"
                  >
                    {notesBarData.map((_, idx) => (
                      <Cell
                        // biome-ignore lint/suspicious/noArrayIndexKey: static chart list
                        key={`cell-${idx}`}
                        fill={`oklch(${0.55 + idx * 0.007} 0.24 ${250 + idx * 2})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </AnimatedCard>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
          data-ocid="dashboard.chart.pie"
        >
          <AnimatedCard hoverable={false} className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                By Department
              </h2>
            </div>
            {analyticsLoading ? (
              <div className="flex items-center justify-center h-48">
                <LoadingSpinner />
              </div>
            ) : deptPieData.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-48 text-muted-foreground"
                data-ocid="chart.pie.empty_state"
              >
                <Files className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">No papers yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={deptPieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deptPieData.map((_, idx) => (
                      <Cell
                        // biome-ignore lint/suspicious/noArrayIndexKey: static chart list
                        key={`pie-cell-${idx}`}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<GlassTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{
                      fontSize: "11px",
                      color: "oklch(0.58 0.015 240)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </AnimatedCard>
        </motion.div>
      </div>

      {/* ── Bottom Row: Recent Notes + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
          data-ocid="dashboard.recent_notes"
        >
          <AnimatedCard hoverable={false}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Recent Notes
              </h2>
              <Link
                to="/teacher/notes"
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-smooth"
                data-ocid="dashboard.view_all_notes_link"
              >
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {recentNotes.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-12 text-muted-foreground"
                data-ocid="dashboard.recent_notes.empty_state"
              >
                <FileText className="w-12 h-12 mb-3 opacity-25" />
                <p className="text-sm font-medium mb-1">No notes yet</p>
                <p className="text-xs opacity-60">
                  Upload audio or create a note to get started
                </p>
                <Link
                  to="/teacher/notes/new"
                  className="mt-4 text-xs text-primary underline underline-offset-2"
                  data-ocid="dashboard.create_note_link"
                >
                  Create your first note
                </Link>
              </div>
            ) : (
              <div
                className="divide-y divide-border/40"
                data-ocid="dashboard.notes.list"
              >
                {recentNotes.slice(0, 5).map((note, idx) => (
                  <motion.div
                    key={note.id.toString()}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.07 }}
                    className="group flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-white/5 transition-smooth cursor-default"
                    data-ocid={`dashboard.notes.item.${idx + 1}`}
                  >
                    <div className="bg-gradient-brand-subtle rounded-lg p-2 shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {note.topic}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {note.subject} · {note.unit} · {note.department}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {formatDate(note.createdAt)}
                      </span>
                      <Link
                        to="/teacher/notes/$noteId"
                        params={{ noteId: note.id.toString() }}
                        className="opacity-0 group-hover:opacity-100 transition-smooth"
                        data-ocid={`dashboard.notes.edit_button.${idx + 1}`}
                      >
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatedCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          data-ocid="dashboard.quick_actions"
        >
          <AnimatedCard hoverable={false} className="h-full">
            <h2 className="font-display text-lg font-semibold text-foreground mb-5">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {QUICK_ACTIONS.map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.to}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + i * 0.08 }}
                  >
                    <Link
                      to={action.to}
                      className="glass glass-hover flex items-center gap-4 p-4 rounded-xl transition-smooth group"
                      data-ocid={action.ocid}
                    >
                      <div className="glass rounded-lg p-2 shrink-0 group-hover:scale-110 transition-smooth">
                        <Icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground flex-1 min-w-0">
                        {action.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
}
