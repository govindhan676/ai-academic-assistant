import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Search,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useStudents } from "../../hooks/useBackend";
import type { UserProfile } from "../../types";

const PAGE_SIZE = 20;

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function shortenPrincipal(p: { toString(): string }): string {
  const s = p.toString();
  if (s.length <= 16) return s;
  return `${s.slice(0, 8)}…${s.slice(-6)}`;
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <tr key={`skeleton-row-${i}`}>
          {Array.from({ length: 4 }).map((_, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            <td key={`skeleton-col-${j}`} className="px-5 py-4">
              <Skeleton className="h-4 w-full rounded bg-white/5" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function StudentRow({
  profile,
  index,
}: { profile: UserProfile; index: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="group border-b border-white/5 hover:bg-white/5 transition-smooth"
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-brand-subtle border border-white/10 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-gradient-blue">
              {profile.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-foreground">{profile.name}</span>
        </div>
      </td>
      <td className="px-5 py-4">
        <code className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded">
          {shortenPrincipal(profile.principal)}
        </code>
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground">
        {formatDate(profile.createdAt)}
      </td>
      <td className="px-5 py-4">
        <Badge className="bg-gradient-brand-subtle border border-white/10 text-foreground text-xs">
          Student
        </Badge>
      </td>
    </motion.tr>
  );
}

export default function StudentsPage() {
  const { data: students, isLoading } = useStudents();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!students) return [];
    const q = search.toLowerCase().trim();
    return q
      ? students.filter((s) => s.name.toLowerCase().includes(q))
      : students;
  }, [students, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

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
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Student Management
            </h1>
            <p className="text-sm text-muted-foreground">
              View all registered students
            </p>
          </div>
        </div>
        {!isLoading && students && (
          <Badge className="glass border-white/15 text-muted-foreground text-sm px-3 py-1.5">
            <GraduationCap className="w-4 h-4 mr-1.5" />
            {students.length} {students.length === 1 ? "Student" : "Students"}
          </Badge>
        )}
      </motion.div>

      {/* Search + Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="glass rounded-2xl overflow-hidden"
      >
        {/* Search bar */}
        <div className="p-4 border-b border-white/8">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="students.search_input"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name…"
              className="pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {["Name", "Principal ID", "Registered Date", "Role"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton />
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      data-ocid="students.empty_state"
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-brand-subtle border border-white/10 flex items-center justify-center">
                        <GraduationCap className="w-7 h-7 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground font-medium">
                        {search
                          ? "No students match your search."
                          : "No students registered yet."}
                      </p>
                      {!search && (
                        <p className="text-sm text-muted-foreground/70">
                          Share the student portal URL to get started.
                        </p>
                      )}
                    </motion.div>
                  </td>
                </tr>
              ) : (
                paginated.map((s, i) => (
                  <StudentRow
                    key={s.principal.toString()}
                    profile={s}
                    index={i}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/8">
            <span className="text-xs text-muted-foreground">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-ocid="students.pagination_prev"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground px-2">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                data-ocid="students.pagination_next"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
