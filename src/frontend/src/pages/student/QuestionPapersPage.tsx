import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import {
  useQuestionPapers,
  useSearchQuestionPapers,
} from "../../hooks/useBackend";
import type { NoteFilters, QuestionPaper } from "../../types";

const PAGE_SIZE = 12;
const DEPARTMENTS = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Other"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const REGULATIONS = ["R2013", "R2017", "R2021", "Other"];
type PaperTab = "all" | "university" | "internal";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function paperTypeColor(type: string) {
  if (type.toLowerCase().includes("university"))
    return "bg-primary/10 text-primary border-primary/25";
  return "bg-accent/10 text-accent border-accent/25";
}

function PaperCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 space-y-3">
      <Skeleton className="h-14 w-14 rounded-xl bg-white/10" />
      <Skeleton className="h-5 w-3/4 bg-white/10" />
      <Skeleton className="h-4 w-1/2 bg-white/10" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
        <Skeleton className="h-5 w-12 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

interface PaperCardProps {
  paper: QuestionPaper;
  index: number;
  onClick: () => void;
}

function PaperCard({ paper, index, onClick }: PaperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ease: "easeInOut" as const }}
      onClick={onClick}
      className="glass glass-hover rounded-2xl p-5 space-y-4 cursor-pointer transition-smooth group"
      data-ocid={`student_papers.item.${index + 1}`}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-brand-subtle flex items-center justify-center glow-blue">
        <FileText className="w-7 h-7 text-primary" />
      </div>

      <div className="min-w-0">
        <h3 className="font-display font-semibold text-gradient-purple truncate group-hover:opacity-90">
          {paper.subject}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {paper.regulation} · Year {String(paper.year)}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge
          variant="secondary"
          className="text-xs bg-primary/10 text-primary border-primary/20"
        >
          {paper.department}
        </Badge>
        <Badge
          variant="secondary"
          className="text-xs bg-white/5 text-muted-foreground border-white/10"
        >
          Sem {String(paper.semester)}
        </Badge>
        <Badge className={`text-xs border ${paperTypeColor(paper.paperType)}`}>
          {paper.paperType}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground/60">
        {formatDate(paper.createdAt)}
      </p>
    </motion.div>
  );
}

interface PaperDetailModalProps {
  paper: QuestionPaper | null;
  onClose: () => void;
}

function PaperDetailModal({ paper, onClose }: PaperDetailModalProps) {
  return (
    <AnimatePresence>
      {paper && (
        <Dialog open onOpenChange={onClose}>
          <DialogContent
            className="glass border-white/10 max-w-md"
            data-ocid="student_papers.dialog"
          >
            <DialogHeader>
              <DialogTitle className="text-gradient-purple font-display">
                {paper.subject}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Question paper details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-gradient-brand-subtle flex items-center justify-center glow-blue shrink-0">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {paper.subject}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {paper.regulation}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    ["Department", paper.department],
                    ["Year", `Year ${String(paper.year)}`],
                    ["Semester", `Sem ${String(paper.semester)}`],
                    ["Regulation", paper.regulation],
                    ["Type", paper.paperType],
                    ["Date", formatDate(paper.createdAt)],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="glass rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-foreground mt-0.5 truncate">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                className="w-full bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
                onClick={() => {
                  if (paper.pdfFileId) {
                    window.open(paper.pdfFileId, "_blank");
                  }
                }}
                disabled={!paper.pdfFileId}
                data-ocid="student_papers.download_button"
              >
                {paper.pdfFileId ? (
                  <>
                    <Download className="w-4 h-4" /> Download PDF
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </>
                ) : (
                  "PDF Not Available"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default function StudentQuestionPapersPage() {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<PaperTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<NoteFilters>({});
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(
    null,
  );

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const isSearching = debouncedQuery.length > 0;
  const papersQuery = useQuestionPapers(filters, page);
  const searchResult = useSearchQuestionPapers(debouncedQuery);

  const allPapers: QuestionPaper[] =
    (isSearching ? searchResult.data : papersQuery.data?.papers) ?? [];

  const filteredByTab = allPapers.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "university")
      return p.paperType.toLowerCase().includes("university");
    if (activeTab === "internal")
      return p.paperType.toLowerCase().includes("internal");
    return true;
  });

  const total = isSearching
    ? BigInt(filteredByTab.length)
    : (papersQuery.data?.total ?? BigInt(0));
  const totalPages = Math.max(1, Math.ceil(Number(total) / PAGE_SIZE));
  const isLoading = isSearching
    ? searchResult.isLoading
    : papersQuery.isLoading;

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
    setActiveTab("all");
    setPage(1);
  }, []);

  const hasFilters =
    searchQuery ||
    activeTab !== "all" ||
    filters.department ||
    filters.year !== undefined ||
    filters.semester !== undefined;

  return (
    <div className="p-6 space-y-6 min-h-screen" data-ocid="student_papers.page">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center glow-purple">
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-gradient-purple">
              Question Papers
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Browse and download university &amp; internal exam question papers
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v as PaperTab);
            setPage(1);
          }}
        >
          <TabsList className="glass border border-white/10">
            <TabsTrigger value="all" data-ocid="student_papers.tab.all">
              All Papers
            </TabsTrigger>
            <TabsTrigger
              value="university"
              data-ocid="student_papers.tab.university"
            >
              University
            </TabsTrigger>
            <TabsTrigger
              value="internal"
              data-ocid="student_papers.tab.internal"
            >
              Internal
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
          <span>Filter &amp; Search</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search question papers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 focus:border-primary/50"
              data-ocid="student_papers.search_input"
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
              data-ocid="student_papers.department_select"
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
              data-ocid="student_papers.year_select"
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
              data-ocid="student_papers.semester_select"
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
          <Select
            onValueChange={(v) =>
              v !== "__all__"
                ? setFilter("subject", v)
                : setFilter("subject", "")
            }
          >
            <SelectTrigger
              className="w-36 bg-white/5 border-white/10"
              data-ocid="student_papers.regulation_select"
            >
              <SelectValue placeholder="Regulation" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="__all__">All Regs</SelectItem>
              {REGULATIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
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
              data-ocid="student_papers.clear_filters_button"
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
            <PaperCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredByTab.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-24 gap-4"
          data-ocid="student_papers.empty_state"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-purple">
            <FileText className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground">
            No papers found
          </h3>
          <p className="text-muted-foreground text-sm text-center max-w-xs">
            {hasFilters
              ? "Try adjusting your search or filters."
              : "No question papers have been uploaded yet."}
          </p>
          {hasFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="border-white/10 hover:bg-white/5"
              data-ocid="student_papers.clear_empty_button"
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
          {filteredByTab.map((paper, idx) => (
            <PaperCard
              key={paper.id.toString()}
              paper={paper}
              index={idx}
              onClick={() => setSelectedPaper(paper)}
            />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && !isSearching && filteredByTab.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between pt-2"
        >
          <span className="text-muted-foreground text-sm">
            Page {page} of {totalPages} · {Number(total)} papers
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="w-9 h-9"
              data-ocid="student_papers.pagination_prev"
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
              data-ocid="student_papers.pagination_next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Detail Modal */}
      <PaperDetailModal
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
      />
    </div>
  );
}
