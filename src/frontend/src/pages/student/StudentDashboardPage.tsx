import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats, useNotes } from "@/hooks/useBackend";
import { useAuthStore } from "@/store/authStore";
import type { Note } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Download,
  FileText,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  duration = 1400,
}: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current || target === 0) return;
    started.current = true;
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count}</span>;
}

// ─── Floating geometric decoration ───────────────────────────────────────────
function FloatingShapes() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Large blurred blue orb top-left */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.24 250 / 0.18) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 12, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      {/* Purple orb top-right */}
      <motion.div
        className="absolute -top-10 right-20 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.22 290 / 0.14) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.12, 1], y: [0, -12, 0] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      {/* Cyan dot cluster */}
      <motion.div
        className="absolute top-16 right-1/3 w-4 h-4 rounded-full border border-cyan-400/30"
        animate={{ y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-8 left-1/4 w-2 h-2 rounded-full"
        style={{ background: "oklch(0.75 0.18 195 / 0.6)" }}
        animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      {/* Rotating grid lines */}
      <motion.div
        className="absolute top-4 right-4 w-24 h-24 opacity-10"
        style={{ border: "1px solid oklch(0.62 0.24 250)", borderRadius: 8 }}
        animate={{ rotate: [0, 45, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  color: "blue" | "purple" | "cyan";
  delay: number;
}

const glowMap = {
  blue: "glow-blue",
  purple: "glow-purple",
  cyan: "glow-cyan",
} as const;

const gradientMap = {
  blue: "from-blue-500/20 to-cyan-500/10",
  purple: "from-purple-500/20 to-pink-500/10",
  cyan: "from-cyan-500/20 to-teal-500/10",
} as const;

const iconBgMap = {
  blue: "bg-blue-500/20 text-blue-300",
  purple: "bg-purple-500/20 text-purple-300",
  cyan: "bg-cyan-500/20 text-cyan-300",
} as const;

function StatCard({ icon, count, label, color, delay }: StatCardProps) {
  return (
    <motion.div
      data-ocid={`student.stat.${label.toLowerCase().replace(/\s+/g, "_")}.card`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass glass-hover rounded-2xl p-6 flex items-center gap-5 cursor-default transition-smooth hover:${glowMap[color]} bg-gradient-to-br ${gradientMap[color]}`}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${iconBgMap[color]}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-3xl font-display font-bold text-foreground tabular-nums">
          {count === 0 && label === "Downloads" ? (
            <span>50+</span>
          ) : (
            <AnimatedCounter target={count} />
          )}
        </div>
        <div className="text-sm text-muted-foreground mt-0.5 truncate">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Quick action card ────────────────────────────────────────────────────────
interface ActionCardProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
  gradientClass: string;
  delay: number;
  ocid: string;
}

function ActionCard({
  to,
  icon,
  label,
  desc,
  gradientClass,
  delay,
  ocid,
}: ActionCardProps) {
  return (
    <motion.div
      data-ocid={ocid}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group glass glass-hover rounded-2xl p-7 flex flex-col gap-4 transition-smooth cursor-pointer"
    >
      <Link to={to} className="flex flex-col gap-4 h-full">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${gradientClass} shadow-lg`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-display font-bold text-foreground">
            {label}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {desc}
          </p>
        </div>
        <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Note card ────────────────────────────────────────────────────────────────
function NoteCard({ note, index }: { note: Note; index: number }) {
  const date = new Date(Number(note.createdAt) / 1_000_000);
  const formatted = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      data-ocid={`student.note.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group glass glass-hover rounded-2xl p-5 flex flex-col gap-3 transition-smooth"
    >
      {/* Subject gradient heading */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-gradient-blue font-display font-bold text-base leading-tight truncate">
          {note.subject}
        </h4>
        <Badge variant="secondary" className="shrink-0 text-xs">
          Sem {String(note.semester)}
        </Badge>
      </div>

      {/* Unit + topic */}
      <div>
        <p className="text-sm font-medium text-foreground truncate">
          {note.topic}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          Unit: {note.unit}
        </p>
      </div>

      {/* Department badge + date */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
          {note.department}
        </Badge>
        <span className="text-xs text-muted-foreground">{formatted}</span>
      </div>

      {/* View note hover CTA */}
      <Link
        to="/student/notes"
        data-ocid={`student.note.view_button.${index + 1}`}
        className="mt-1 w-full opacity-0 group-hover:opacity-100 transition-smooth"
      >
        <Button variant="secondary" size="sm" className="w-full gap-2 text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          View Note
        </Button>
      </Link>
    </motion.div>
  );
}

// ─── Note card skeleton ───────────────────────────────────────────────────────
function NoteCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between mt-1">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StudentDashboardPage() {
  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: notesData, isLoading: notesLoading } = useNotes({}, 0);

  const today = new Date();
  const dayName = today.toLocaleDateString("en-IN", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const notesCount = stats ? Number(stats.totalNotes) : 0;
  const papersCount = stats ? Number(stats.totalQuestionPapers) : 0;
  const recentNotes: Note[] = notesData?.notes.slice(0, 6) ?? [];

  return (
    <div className="min-h-screen pb-16" data-ocid="student.dashboard.page">
      {/* ── HERO WELCOME ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 p-8 md:p-12 glass"
        data-ocid="student.dashboard.hero.section"
      >
        <FloatingShapes />

        <div className="relative z-10 max-w-2xl">
          {/* Date pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5"
          >
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              {dayName}, {dateStr}
            </span>
          </motion.div>

          {/* Welcome */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-3"
          >
            Welcome back,{" "}
            <span className="text-gradient-blue">
              {user?.name ?? "Student"}
            </span>
            !
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.55 }}
            className="text-lg text-muted-foreground"
          >
            Your Learning Hub — explore notes, search topics, and practise with
            past papers.
          </motion.p>
        </div>

        {/* TrendingUp decorative icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="hidden md:block absolute right-8 bottom-4 text-primary"
          aria-hidden="true"
        >
          <TrendingUp className="w-40 h-40" />
        </motion.div>
      </section>

      {/* ── QUICK STATS ROW ───────────────────────────────────────────── */}
      <section
        className="px-4 mb-8"
        data-ocid="student.dashboard.stats.section"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            count={notesLoading ? 0 : notesCount}
            label="Notes Available"
            color="blue"
            delay={0}
          />
          <StatCard
            icon={<FileText className="w-6 h-6" />}
            count={statsLoading ? 0 : papersCount}
            label="Question Papers"
            color="purple"
            delay={0.1}
          />
          <StatCard
            icon={<Download className="w-6 h-6" />}
            count={0}
            label="Downloads"
            color="cyan"
            delay={0.2}
          />
        </div>
      </section>

      {/* ── QUICK ACTIONS ─────────────────────────────────────────────── */}
      <section
        className="px-4 mb-10"
        data-ocid="student.dashboard.actions.section"
      >
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="text-xl font-display font-bold text-foreground mb-5"
        >
          Quick Actions
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <ActionCard
            to="/student/notes"
            icon={<BookOpen className="w-8 h-8 text-blue-200" />}
            label="Browse Notes"
            desc="Explore subject-wise notes organised by department, unit and topic."
            gradientClass="bg-gradient-to-br from-blue-600/70 to-cyan-600/60"
            delay={0.3}
            ocid="student.browse_notes.button"
          />
          <ActionCard
            to="/student/notes"
            icon={<Search className="w-8 h-8 text-purple-200" />}
            label="Search Notes"
            desc="Find notes instantly by topic, keyword, or subject name."
            gradientClass="bg-gradient-to-br from-purple-600/70 to-pink-600/60"
            delay={0.4}
            ocid="student.search_notes.button"
          />
          <ActionCard
            to="/student/question-papers"
            icon={<FileText className="w-8 h-8 text-cyan-200" />}
            label="Question Papers"
            desc="Practice with past university and internal question papers."
            gradientClass="bg-gradient-to-br from-cyan-600/70 to-teal-600/60"
            delay={0.5}
            ocid="student.question_papers.button"
          />
        </div>
      </section>

      {/* ── RECENT NOTES ──────────────────────────────────────────────── */}
      <section
        className="px-4 mb-10"
        data-ocid="student.dashboard.recent_notes.section"
      >
        <div className="flex items-center justify-between mb-5">
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-xl font-display font-bold text-foreground"
          >
            Recently Added Notes
          </motion.h2>

          <Link
            to="/student/notes"
            data-ocid="student.view_all_notes.link"
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {notesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              <NoteCardSkeleton key={i} />
            ))}
          </div>
        ) : recentNotes.length === 0 ? (
          <motion.div
            data-ocid="student.dashboard.notes.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
          >
            <BookOpen className="w-12 h-12 text-muted-foreground/50" />
            <p className="text-muted-foreground font-medium">
              No notes available yet.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Ask your teacher to upload lecture notes.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentNotes.map((note, i) => (
              <NoteCard key={String(note.id)} note={note} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── AI TIP BANNER ──────────────────────────────────────────────── */}
      <section className="px-4" data-ocid="student.dashboard.tip.section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-2xl p-6 md:p-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.2 0.06 250 / 0.9) 0%, oklch(0.18 0.07 280 / 0.9) 50%, oklch(0.16 0.06 230 / 0.9) 100%)",
            border: "1px solid oklch(0.62 0.24 250 / 0.25)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 10% 50%, oklch(0.62 0.24 250 / 0.4), transparent)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-lg text-foreground">
                    AI-Powered Learning
                  </h3>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Every note is AI-transcribed and summarised from real
                  lectures. Use Search to pinpoint topics in seconds — and
                  download a polished PDF for offline study.
                </p>
              </div>
            </div>

            <Link
              to="/student/notes"
              data-ocid="student.tip.explore_button"
              className="sm:ml-auto shrink-0"
            >
              <Button
                variant="default"
                size="sm"
                className="gap-2 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                Explore Notes
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
