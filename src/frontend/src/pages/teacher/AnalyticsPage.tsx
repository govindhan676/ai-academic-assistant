import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, Download, FileText, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useAnalytics, useDashboardStats } from "../../hooks/useBackend";

// ─── Theme constants
const CHART_COLORS = [
  "oklch(0.62 0.24 250)",
  "oklch(0.62 0.22 290)",
  "oklch(0.75 0.18 195)",
  "oklch(0.65 0.20 220)",
  "oklch(0.68 0.20 270)",
];

const GRID_STROKE = "oklch(0.93 0.01 240 / 0.08)";
const AXIS_TICK = "oklch(0.58 0.015 240)";

// ─── Custom glassmorphic tooltip
function GlassTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name?: string; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-xl border border-white/15 text-sm">
      {label && <p className="text-muted-foreground text-xs mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p
          // biome-ignore lint/suspicious/noArrayIndexKey: static tooltip list
          key={`tooltip-${i}`}
          className="font-semibold text-foreground"
        >
          <span style={{ color: p.color ?? "#fff" }}>
            {p.name ? `${p.name}: ` : ""}
          </span>
          {p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Animated metric card
function MetricCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number | bigint | null | undefined;
  color: string;
  delay: number;
}) {
  const num = value == null ? "—" : Number(value).toLocaleString();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-white/20 transition-smooth"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {label}
        </p>
        <motion.p
          className="text-2xl font-display font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.15 }}
        >
          {num}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Date-range options
const DATE_RANGES = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 3 months", days: 90 },
];

// ─── Helpers
function shortDate(str: string) {
  const d = new Date(str);
  if (Number.isNaN(d.getTime())) return str;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function buildWeeklyData(notesPerDay: Array<[string, bigint]>, days: number) {
  const weeks: Record<string, number> = {};
  const cutoff = Date.now() - days * 86_400_000;
  for (const [dateStr, count] of notesPerDay) {
    const ts = new Date(dateStr).getTime();
    if (ts < cutoff) continue;
    const weekKey = Math.floor(ts / (7 * 86_400_000)) * 7 * 86_400_000;
    const label = new Date(weekKey).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    weeks[label] = (weeks[label] ?? 0) + Number(count);
  }
  return Object.entries(weeks).map(([week, notes]) => ({ week, notes }));
}

// ─── Chart card wrapper
function ChartCard({
  title,
  children,
  delay,
}: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-base font-display font-semibold text-foreground mb-5">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

// ─── Main page
export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const { data: analytics, isLoading: aLoading } = useAnalytics(days);
  const { data: stats, isLoading: sLoading } = useDashboardStats();
  const isLoading = aLoading || sLoading;

  const barData = useMemo(() => {
    if (!analytics?.notesPerDay) return [];
    return analytics.notesPerDay.map(([date, count]) => ({
      date: shortDate(date),
      notes: Number(count),
    }));
  }, [analytics]);

  const pieData = useMemo(() => {
    if (!analytics?.papersPerDepartment) return [];
    return analytics.papersPerDepartment.map(([name, value]) => ({
      name,
      value: Number(value),
    }));
  }, [analytics]);

  const lineData = useMemo(() => {
    if (!analytics?.notesPerDay) return [];
    return buildWeeklyData(analytics.notesPerDay, days);
  }, [analytics, days]);

  const avgDailyNotes = useMemo(() => {
    if (!barData.length) return 0;
    return Math.round(
      barData.reduce((s, d) => s + d.notes, 0) / barData.length,
    );
  }, [barData]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center glow-blue">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Platform usage &amp; content metrics
            </p>
          </div>
        </div>

        {/* Date range selector */}
        <div className="flex items-center gap-1.5 glass rounded-xl p-1">
          {DATE_RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              data-ocid={`analytics.range_${r.days}`}
              onClick={() => setDays(r.days)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                days === r.days
                  ? "bg-gradient-brand text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Metric cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              key={`skeleton-${i}`}
              className="h-24 rounded-2xl bg-white/5"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={FileText}
            label="Total Transcriptions"
            value={stats?.totalNotes}
            color="oklch(0.62 0.24 250)"
            delay={0.1}
          />
          <MetricCard
            icon={Download}
            label="Total Downloads"
            value={analytics?.totalDownloads}
            color="oklch(0.75 0.18 195)"
            delay={0.18}
          />
          <MetricCard
            icon={Users}
            label="Active Students"
            value={analytics?.activeStudents}
            color="oklch(0.62 0.22 290)"
            delay={0.26}
          />
          <MetricCard
            icon={TrendingUp}
            label="Avg Daily Notes"
            value={avgDailyNotes}
            color="oklch(0.68 0.20 270)"
            delay={0.34}
          />
        </div>
      )}

      {/* Charts */}
      {isLoading ? (
        <div className="space-y-5">
          <Skeleton className="h-72 rounded-2xl bg-white/5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Skeleton className="h-64 rounded-2xl bg-white/5" />
            <Skeleton className="h-64 rounded-2xl bg-white/5" />
          </div>
        </div>
      ) : (
        <>
          {/* Bar chart — daily notes */}
          <ChartCard
            title={`Daily Note Creation (Last ${days} Days)`}
            delay={0.4}
          >
            {barData.length === 0 ? (
              <p className="text-center text-muted-foreground py-16 text-sm">
                No data for this period.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={barData}
                  margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="oklch(0.62 0.24 250)"
                        stopOpacity={1}
                      />
                      <stop
                        offset="100%"
                        stopColor="oklch(0.62 0.22 290)"
                        stopOpacity={0.7}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={GRID_STROKE}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: AXIS_TICK, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval={Math.ceil(barData.length / 10)}
                  />
                  <YAxis
                    tick={{ fill: AXIS_TICK, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <RechartTooltip
                    content={<GlassTooltip />}
                    cursor={{ fill: "oklch(0.62 0.24 250 / 0.06)" }}
                  />
                  <Bar
                    dataKey="notes"
                    fill="url(#barGradient)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Pie chart — notes by department */}
            <ChartCard title="Notes by Department" delay={0.5}>
              {pieData.length === 0 ? (
                <p className="text-center text-muted-foreground py-16 text-sm">
                  No data available.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="40%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius: iR,
                        outerRadius: oR,
                        percent,
                      }) => {
                        if (percent < 0.05) return null;
                        const RAD = Math.PI / 180;
                        const r = iR + (oR - iR) * 0.5;
                        const x = cx + r * Math.cos(-midAngle * RAD);
                        const y = cy + r * Math.sin(-midAngle * RAD);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fontWeight={600}
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {pieData.map((_, idx) => (
                        <Cell
                          // biome-ignore lint/suspicious/noArrayIndexKey: static chart list
                          key={`cell-${idx}`}
                          fill={CHART_COLORS[idx % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span style={{ color: AXIS_TICK, fontSize: 12 }}>
                          {value}
                        </span>
                      )}
                    />
                    <RechartTooltip content={<GlassTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            {/* Area chart — weekly notes */}
            <ChartCard title="Weekly Note Creation" delay={0.6}>
              {lineData.length === 0 ? (
                <p className="text-center text-muted-foreground py-16 text-sm">
                  No data for this period.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart
                    data={lineData}
                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="oklch(0.75 0.18 195)"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="100%"
                          stopColor="oklch(0.75 0.18 195)"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={GRID_STROKE}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      tick={{ fill: AXIS_TICK, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: AXIS_TICK, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <RechartTooltip
                      content={<GlassTooltip />}
                      cursor={{
                        stroke: "oklch(0.75 0.18 195 / 0.3)",
                        strokeWidth: 1,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="notes"
                      stroke="oklch(0.75 0.18 195)"
                      strokeWidth={2.5}
                      fill="url(#areaGradient)"
                      dot={{
                        fill: "oklch(0.75 0.18 195)",
                        r: 3.5,
                        strokeWidth: 0,
                      }}
                      activeDot={{
                        r: 5,
                        fill: "oklch(0.75 0.18 195)",
                        strokeWidth: 0,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>
        </>
      )}
    </div>
  );
}
