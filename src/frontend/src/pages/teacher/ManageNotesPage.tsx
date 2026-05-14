import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Filter,
  PencilLine,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useNotes, useSearchNotes } from "../../hooks/useBackend";
import { useDeleteNote } from "../../hooks/useMutations";
import type { Note, NoteFilters } from "../../types";

const PAGE_SIZE = 10;

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

function SkeletonRow() {
  return (
    <tr className="border-b border-white/5">
      {[...Array(8)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <td key={`skeleton-col-${i}`} className="px-4 py-3">
          <Skeleton className="h-4 w-full bg-white/10" />
        </td>
      ))}
    </tr>
  );
}

export default function ManageNotesPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<NoteFilters>({});
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const isSearching = debouncedQuery.length > 0;
  const notesQuery = useNotes(filters, page);
  const searchResult = useSearchNotes(debouncedQuery, filters);
  const deleteNote = useDeleteNote();

  const activeQuery = isSearching ? searchResult : notesQuery;
  const notes: Note[] =
    (isSearching ? searchResult.data : notesQuery.data?.notes) ?? [];
  const total = isSearching
    ? BigInt(notes.length)
    : (notesQuery.data?.total ?? BigInt(0));
  const totalPages = Math.max(1, Math.ceil(Number(total) / PAGE_SIZE));

  const setDeptFilter = useCallback((value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, department: value || undefined }));
  }, []);

  const setYearFilter = useCallback((value: string) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      year: value ? BigInt(value) : undefined,
    }));
  }, []);

  const setSemFilter = useCallback((value: string) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      semester: value ? BigInt(value) : undefined,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery("");
    setPage(1);
  }, []);

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteNote.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const hasFilters =
    searchQuery ||
    filters.department ||
    filters.year !== undefined ||
    filters.semester !== undefined;

  return (
    <div className="p-6 space-y-6 min-h-screen" data-ocid="manage_notes.page">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient-blue">
            Manage Notes
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Organise and manage your academic notes
          </p>
        </div>
        <Link to="/teacher/notes/new">
          <Button
            className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
            data-ocid="manage_notes.add_button"
          >
            <Plus className="w-4 h-4" />
            Add Note
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4 space-y-3"
      >
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 focus:border-primary/50"
              data-ocid="manage_notes.search_input"
            />
          </div>
          <Select
            value={filters.department ?? ""}
            onValueChange={(v) => setDeptFilter(v === "__all__" ? "" : v)}
          >
            <SelectTrigger
              className="w-36 bg-white/5 border-white/10"
              data-ocid="manage_notes.department_select"
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
            onValueChange={(v) => setYearFilter(v === "__all__" ? "" : v)}
          >
            <SelectTrigger
              className="w-28 bg-white/5 border-white/10"
              data-ocid="manage_notes.year_select"
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
            onValueChange={(v) => setSemFilter(v === "__all__" ? "" : v)}
          >
            <SelectTrigger
              className="w-32 bg-white/5 border-white/10"
              data-ocid="manage_notes.semester_select"
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
              data-ocid="manage_notes.clear_filters_button"
            >
              <X className="w-4 h-4" /> Clear
            </Button>
          ) : null}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground">
                {[
                  "Subject",
                  "Unit",
                  "Topic",
                  "Dept",
                  "Sem",
                  "Year",
                  "Created",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeQuery.isLoading ? (
                [...Array(5)].map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                  <SkeletonRow key={`skeleton-row-${i}`} />
                ))
              ) : notes.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                notes.map((note, idx) => (
                  <motion.tr
                    key={note.id.toString()}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-smooth"
                    data-ocid={`manage_notes.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground max-w-[120px] truncate">
                      {note.subject}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[100px] truncate">
                      {note.unit}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[130px] truncate">
                      {note.topic}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {note.department}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {note.semester}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {note.year}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatDate(note.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 hover:text-primary hover:bg-primary/10"
                          onClick={() =>
                            navigate({
                              to: "/teacher/notes/$noteId",
                              params: { noteId: note.id.toString() },
                            })
                          }
                          data-ocid={`manage_notes.edit_button.${idx + 1}`}
                          aria-label="Edit note"
                        >
                          <PencilLine className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteTarget(note)}
                          data-ocid={`manage_notes.delete_button.${idx + 1}`}
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          aria-label="Download PDF"
                          data-ocid={`manage_notes.download_button.${idx + 1}`}
                          onClick={() =>
                            note.pdfFileId
                              ? window.open(
                                  `/api/object-storage/${note.pdfFileId}`,
                                  "_blank",
                                )
                              : toast.error("PDF not available")
                          }
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!activeQuery.isLoading && notes.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-muted-foreground text-xs">
              {isSearching
                ? `${notes.length} result${notes.length !== 1 ? "s" : ""}`
                : `Page ${page} of ${totalPages} · ${Number(total)} total`}
            </span>
            {!isSearching && (
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="w-8 h-8"
                  data-ocid="manage_notes.pagination_prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="w-8 h-8"
                  data-ocid="manage_notes.pagination_next"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Delete dialog */}
      <AnimatePresence>
        {deleteTarget && (
          <Dialog open onOpenChange={() => setDeleteTarget(null)}>
            <DialogContent
              className="glass border-white/10"
              data-ocid="manage_notes.dialog"
            >
              <DialogHeader>
                <DialogTitle className="text-gradient-blue">
                  Delete Note
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Are you sure you want to delete{" "}
                  <span className="text-foreground font-medium">
                    "{deleteTarget.topic}"
                  </span>
                  ? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDeleteTarget(null)}
                  data-ocid="manage_notes.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteNote.isPending}
                  className="bg-destructive/80 hover:bg-destructive"
                  data-ocid="manage_notes.confirm_button"
                >
                  {deleteNote.isPending ? "Deleting…" : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 gap-4"
      data-ocid="manage_notes.empty_state"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-blue">
        <FileText className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-display font-semibold text-foreground">
        No notes yet
      </h3>
      <p className="text-muted-foreground text-sm text-center max-w-xs">
        Start building your academic library by adding your first note.
      </p>
      <Link to="/teacher/notes/new">
        <Button
          type="button"
          className="bg-gradient-brand hover:opacity-90 glow-blue gap-2"
          data-ocid="manage_notes.empty_add_button"
        >
          <Plus className="w-4 h-4" /> Add First Note
        </Button>
      </Link>
    </motion.div>
  );
}
