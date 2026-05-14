import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useNotes, useSearchNotes } from "../../hooks/useBackend";
import type { Note, NoteFilters } from "../../types";

const PAGE_SIZE = 12;
const DEPARTMENTS = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Other"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function NoteCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 space-y-3">
      <Skeleton className="h-5 w-3/4 bg-white/10" />
      <Skeleton className="h-4 w-1/2 bg-white/10" />
      <Skeleton className="h-4 w-full bg-white/10" />
      <Skeleton className="h-4 w-2/3 bg-white/10" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
        <Skeleton className="h-5 w-12 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

interface NoteCardProps {
  note: Note;
  index: number;
  onClick: () => void;
}

function NoteCard({ note, index, onClick }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ease: "easeInOut" as const }}
      onClick={onClick}
      className="glass glass-hover rounded-2xl p-5 space-y-3 cursor-pointer transition-smooth group"
      data-ocid={`student_notes.item.${index + 1}`}
    >
      <div>
        <h3 className="font-display font-semibold text-gradient-blue truncate group-hover:opacity-90">
          {note.subject}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {note.unit} · {note.topic}
        </p>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {note.transcript.slice(0, 120)}
        {note.transcript.length > 120 ? "…" : ""}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        <Badge
          variant="secondary"
          className="text-xs bg-primary/10 text-primary border-primary/20"
        >
          {note.department}
        </Badge>
        <Badge
          variant="secondary"
          className="text-xs bg-white/5 text-muted-foreground border-white/10"
        >
          Sem {String(note.semester)}
        </Badge>
        <Badge
          variant="secondary"
          className="text-xs bg-white/5 text-muted-foreground border-white/10"
        >
          Year {String(note.year)}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground/60">
        {formatDate(note.createdAt)}
      </p>
    </motion.div>
  );
}

interface DrawerProps {
  note: Note | null;
  onClose: () => void;
}

function NoteDrawer({ note, onClose }: DrawerProps) {
  return (
    <AnimatePresence>
      {note && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-[480px] z-50 glass border-l border-white/10 flex flex-col"
            data-ocid="student_notes.drawer"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/10">
              <div className="min-w-0 pr-3">
                <h2 className="text-xl font-display font-bold text-gradient-blue truncate">
                  {note.subject}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {note.unit} · {note.topic}
                </p>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="shrink-0 hover:bg-white/10"
                data-ocid="student_notes.close_button"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-5">
                {/* Metadata badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/15 text-primary border-primary/25">
                    {note.department}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-muted-foreground"
                  >
                    Year {String(note.year)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-muted-foreground"
                  >
                    Sem {String(note.semester)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-muted-foreground text-xs"
                  >
                    {formatDate(note.createdAt)}
                  </Badge>
                </div>

                {/* AI Summary */}
                {note.aiSummary && (
                  <div className="glass rounded-xl p-4 border border-primary/15 space-y-2">
                    <p className="text-xs text-primary uppercase tracking-wide font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Summary
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {note.aiSummary}
                    </p>
                  </div>
                )}

                {/* Full Transcript */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    Full Transcript
                  </p>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {note.transcript}
                  </p>
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
              <Button
                type="button"
                className="w-full bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
                onClick={() => {
                  if (note.pdfFileId)
                    window.open(
                      `/api/object-storage/${note.pdfFileId}`,
                      "_blank",
                    );
                }}
                disabled={!note.pdfFileId}
                data-ocid="student_notes.download_button"
              >
                <Download className="w-4 h-4" />
                {note.pdfFileId ? "Download PDF" : "PDF Not Available"}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function StudentNotesPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<NoteFilters>({});
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const isSearching = debouncedQuery.length > 0;
  const notesQuery = useNotes(filters, page);
  const searchResult = useSearchNotes(debouncedQuery, filters);

  const notes: Note[] =
    (isSearching ? searchResult.data : notesQuery.data?.notes) ?? [];
  const total = isSearching
    ? BigInt(notes.length)
    : (notesQuery.data?.total ?? BigInt(0));
  const totalPages = Math.max(1, Math.ceil(Number(total) / PAGE_SIZE));
  const isLoading = isSearching ? searchResult.isLoading : notesQuery.isLoading;

  const setFilter = useCallback((key: keyof NoteFilters, value: string) => {
    setPage(1);
    setFilters((prev) => {
      if (!value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return {
        ...prev,
        [key]: key === "year" || key === "semester" ? BigInt(value) : value,
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery("");
    setPage(1);
  }, []);

  const hasFilters =
    searchQuery ||
    filters.department ||
    filters.year !== undefined ||
    filters.semester !== undefined;

  return (
    <div className="p-6 space-y-6 min-h-screen" data-ocid="student_notes.page">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center glow-blue">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-gradient-blue">
              Browse Notes
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Search and explore academic notes by subject, unit, or topic
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="glass rounded-2xl p-4 space-y-3"
      >
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Filter className="w-4 h-4" />
          <span>Filter &amp; Search</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by subject, unit, or topic…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 focus:border-primary/50"
              data-ocid="student_notes.search_input"
            />
          </div>
          <Select
            value={filters.department ?? ""}
            onValueChange={(v) =>
              setFilter("department", v === "__all__" ? "" : v)
            }
          >
            <SelectTrigger
              className="w-36 bg-white/5 border-white/10"
              data-ocid="student_notes.department_select"
            >
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="__all__">All Depts</SelectItem>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.year !== undefined ? filters.year.toString() : ""}
            onValueChange={(v) => setFilter("year", v === "__all__" ? "" : v)}
          >
            <SelectTrigger
              className="w-28 bg-white/5 border-white/10"
              data-ocid="student_notes.year_select"
            >
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="__all__">All Years</SelectItem>
              {YEARS.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  Year {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={
              filters.semester !== undefined ? filters.semester.toString() : ""
            }
            onValueChange={(v) =>
              setFilter("semester", v === "__all__" ? "" : v)
            }
          >
            <SelectTrigger
              className="w-32 bg-white/5 border-white/10"
              data-ocid="student_notes.semester_select"
            >
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="__all__">All Sems</SelectItem>
              {SEMESTERS.map((s) => (
                <SelectItem key={s} value={String(s)}>
                  Sem {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground gap-1"
              data-ocid="student_notes.clear_filters_button"
            >
              <X className="w-4 h-4" /> Clear
            </Button>
          ) : null}
        </div>
      </motion.div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            <NoteCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-24 gap-4"
          data-ocid="student_notes.empty_state"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-blue">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground">
            No notes found
          </h3>
          <p className="text-muted-foreground text-sm text-center max-w-xs">
            {hasFilters
              ? "Try adjusting your search or filters to find notes."
              : "Your teacher has not uploaded any notes yet."}
          </p>
          {hasFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="border-white/10 hover:bg-white/5"
              data-ocid="student_notes.clear_empty_button"
            >
              Clear Filters
            </Button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {notes.map((note, idx) => (
            <NoteCard
              key={note.id.toString()}
              note={note}
              index={idx}
              onClick={() => setSelectedNote(note)}
            />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && !isSearching && notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between pt-2"
        >
          <span className="text-muted-foreground text-sm">
            Page {page} of {totalPages} · {Number(total)} notes
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="w-9 h-9"
              data-ocid="student_notes.pagination_prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="w-9 h-9"
              data-ocid="student_notes.pagination_next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Detail drawer */}
      <NoteDrawer note={selectedNote} onClose={() => setSelectedNote(null)} />
    </div>
  );
}
