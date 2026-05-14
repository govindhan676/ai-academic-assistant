import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuestionPapers } from "@/hooks/useBackend";
import { useUploadQuestionPaper } from "@/hooks/useMutations";
import type { NoteFilters, QuestionPaper } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Files,
  Search,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

/* ─── constants ─── */
const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "IT", "Other"];
const YEARS = ["1st", "2nd", "3rd", "4th"];
const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const PAPER_TYPES = ["University", "Internal"];
const PAGE_SIZE = 10;

const glass = "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl";
const gradientBtn =
  "bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity";

/* ─── helpers ─── */
function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ─── sub-components ─── */
function GlassSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-white/60 uppercase tracking-wider">
        {label}
      </Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white/90
          text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
          [&>option]:bg-[#0f0f1a] [&>option]:text-white transition-all"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <tr key={`skeleton-row-${i}`} className="border-b border-white/5">
          {Array.from({ length: 8 }).map((_, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            <td key={`skeleton-col-${j}`} className="px-4 py-3">
              <Skeleton className="h-4 w-full bg-white/10 rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* ─── Upload Panel ─── */
function UploadPanel() {
  const uploadMutation = useUploadQuestionPaper();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({
    department: "",
    year: "",
    semester: "",
    regulation: "",
    subject: "",
    paperType: "",
  });

  const setField = (k: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
    else toast.error("Only PDF files are accepted");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked?.type === "application/pdf") setFile(picked);
    else toast.error("Only PDF files are accepted");
  };

  const resetForm = () => {
    setFile(null);
    setProgress(0);
    setForm({
      department: "",
      year: "",
      semester: "",
      regulation: "",
      subject: "",
      paperType: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return false;
    }
    const missing = Object.entries(form).find(
      ([k, v]) => k !== "regulation" && !v,
    );
    if (missing) {
      toast.error(`${missing[0]} is required`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate progress
    setProgress(10);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) {
          clearInterval(interval);
          return p;
        }
        return p + Math.floor(Math.random() * 15);
      });
    }, 200);

    const pdfFileId = `${file!.name.replace(/\s+/g, "_")}_${Date.now()}`;
    const yearMap: Record<string, bigint> = {
      "1st": 1n,
      "2nd": 2n,
      "3rd": 3n,
      "4th": 4n,
    };

    try {
      await uploadMutation.mutateAsync({
        department: form.department,
        year: yearMap[form.year] ?? 1n,
        semester: BigInt(form.semester),
        regulation: form.regulation || "N/A",
        subject: form.subject,
        paperType: form.paperType,
        pdfFileId,
      });
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        resetForm();
        toast.success("Question paper uploaded successfully!");
      }, 400);
    } catch {
      clearInterval(interval);
      setProgress(0);
    }
  };

  return (
    <motion.div
      className={`${glass} p-6 space-y-5`}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Panel header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/25 border border-blue-500/20">
          <Files size={18} className="text-blue-400" />
        </div>
        <h2 className="font-display font-bold text-white text-lg">
          Upload Question Paper
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropzone */}
        <label
          htmlFor="pdf-upload-input"
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 block
            ${dragging ? "border-violet-400 bg-violet-500/10" : "border-white/15 hover:border-violet-400/50 hover:bg-white/3"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          data-ocid="qp_upload.dropzone"
        >
          <input
            id="pdf-upload-input"
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div
                key="file"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-1.5"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                  <FileText size={22} className="text-green-400" />
                </div>
                <p className="font-medium text-white/90 text-sm truncate max-w-[200px] mx-auto">
                  {file.name}
                </p>
                <p className="text-xs text-white/40">
                  {formatBytes(file.size)}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Upload size={20} className="text-white/40" />
                </div>
                <p className="text-sm text-white/50">
                  Drag & drop PDF or{" "}
                  <span className="text-violet-400 underline underline-offset-2">
                    browse
                  </span>
                </p>
                <p className="text-xs text-white/30">PDF files only</p>
              </motion.div>
            )}
          </AnimatePresence>
        </label>

        {/* Progress bar */}
        <AnimatePresence>
          {progress > 0 && progress < 100 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-1.5"
            >
              <div className="flex justify-between text-xs text-white/40">
                <span>Uploading…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form fields grid */}
        <div className="grid grid-cols-2 gap-3">
          <GlassSelect
            label="Department"
            value={form.department}
            onChange={setField("department")}
            options={DEPARTMENTS}
            placeholder="Select dept"
          />
          <GlassSelect
            label="Year"
            value={form.year}
            onChange={setField("year")}
            options={YEARS}
            placeholder="Select year"
          />
          <GlassSelect
            label="Semester"
            value={form.semester}
            onChange={setField("semester")}
            options={SEMESTERS}
            placeholder="Select sem"
          />
          <GlassSelect
            label="Paper Type"
            value={form.paperType}
            onChange={setField("paperType")}
            options={PAPER_TYPES}
            placeholder="Select type"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Subject *
          </Label>
          <Input
            value={form.subject}
            onChange={(e) => setField("subject")(e.target.value)}
            placeholder="e.g. Digital Signal Processing"
            className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/25 focus:border-violet-500/50 focus:ring-violet-500/25 rounded-xl"
            data-ocid="qp_upload.subject_input"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Regulation
          </Label>
          <Input
            value={form.regulation}
            onChange={(e) => setField("regulation")(e.target.value)}
            placeholder="e.g. 2021, R2020"
            className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/25 focus:border-violet-500/50 focus:ring-violet-500/25 rounded-xl"
            data-ocid="qp_upload.regulation_input"
          />
        </div>

        <Button
          type="submit"
          disabled={uploadMutation.isPending}
          className={`w-full h-11 ${gradientBtn}`}
          data-ocid="qp_upload.submit_button"
        >
          {uploadMutation.isPending ? (
            <span className="flex items-center gap-2">
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              Uploading…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload size={16} /> Upload Paper
            </span>
          )}
        </Button>
      </form>
    </motion.div>
  );
}

/* ─── Papers List Panel ─── */
function PapersListPanel() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState<{
    department: string;
    year: string;
    semester: string;
    paperType: string;
  }>({ department: "", year: "", semester: "", paperType: "" });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryFilters: NoteFilters = {
    ...(filters.department && { department: filters.department }),
    ...(filters.year && {
      year: BigInt(["1st", "2nd", "3rd", "4th"].indexOf(filters.year) + 1),
    }),
    ...(filters.semester && { semester: BigInt(filters.semester) }),
    ...(debouncedSearch && { subject: debouncedSearch }),
  };

  const { data, isLoading } = useQuestionPapers(queryFilters, page);
  const papers = data?.papers ?? [];
  const total = Number(data?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleSearch = (v: string) => {
    setSearch(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(v);
      setPage(1);
    }, 350);
  };

  const setFilter = (k: keyof typeof filters) => (v: string) => {
    setFilters((prev) => ({ ...prev, [k]: v }));
    setPage(1);
  };

  return (
    <motion.div
      className={`${glass} p-6 flex flex-col gap-4`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 border border-violet-500/20">
            <FileText size={18} className="text-violet-400" />
          </div>
          <h2 className="font-display font-bold text-white text-lg">
            Uploaded Papers
          </h2>
          {!isLoading && (
            <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">
              {total}
            </Badge>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
        />
        <Input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by subject…"
          className="pl-9 bg-white/5 border-white/10 text-white/90 placeholder:text-white/25 focus:border-violet-500/50 rounded-xl"
          data-ocid="qp_list.search_input"
        />
      </div>

      {/* Filters row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { key: "department" as const, opts: DEPARTMENTS, ph: "All Depts" },
          { key: "year" as const, opts: YEARS, ph: "All Years" },
          { key: "semester" as const, opts: SEMESTERS, ph: "All Sems" },
          { key: "paperType" as const, opts: PAPER_TYPES, ph: "All Types" },
        ].map(({ key, opts, ph }) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) => setFilter(key)(e.target.value)}
            className="h-9 px-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs
              focus:outline-none focus:ring-1 focus:ring-violet-500/50 [&>option]:bg-[#0f0f1a]
              [&>option]:text-white transition-all"
            data-ocid={`qp_list.${key}_filter`}
          >
            <option value="">{ph}</option>
            {opts.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              {[
                "Subject",
                "Department",
                "Sem",
                "Year",
                "Regulation",
                "Type",
                "Uploaded",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-white/40 text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : papers.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                    data-ocid="qp_list.empty_state"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <FileText size={24} className="text-white/20" />
                    </div>
                    <p className="text-white/30 font-medium">
                      No question papers uploaded yet
                    </p>
                    <p className="text-white/20 text-xs">
                      Upload your first paper using the panel on the left
                    </p>
                  </motion.div>
                </td>
              </tr>
            ) : (
              papers.map((paper, i) => (
                <motion.tr
                  key={paper.id.toString()}
                  className="border-b border-white/5 hover:bg-white/4 transition-colors group"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  data-ocid={`qp_list.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-white/90 truncate max-w-[160px] block">
                      {paper.subject}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/25 text-xs">
                      {paper.department}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {paper.semester.toString()}
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {paper.year.toString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-cyan-400/80">
                      {paper.regulation}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`text-xs ${
                        paper.paperType === "University"
                          ? "bg-violet-500/15 text-violet-300 border-violet-500/25"
                          : "bg-amber-500/15 text-amber-300 border-amber-500/25"
                      }`}
                    >
                      {paper.paperType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">
                    {formatDate(paper.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          toast.info(
                            "PDF download: open via object-storage URL",
                          );
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-cyan-400 transition-all"
                        aria-label="Download paper"
                        data-ocid={`qp_list.download_button.${i + 1}`}
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-white/30">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, total)} of {total}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-1.5 rounded-lg border border-white/10 text-white/50 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              data-ocid="qp_list.pagination_prev"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pg = i + 1;
              return (
                <button
                  key={`page-${pg}`}
                  type="button"
                  onClick={() => setPage(pg)}
                  className={`w-7 h-7 text-xs rounded-lg font-medium transition-all
                    ${
                      page === pg
                        ? "bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-md shadow-violet-500/25"
                        : "border border-white/10 text-white/40 hover:bg-white/5"
                    }`}
                >
                  {pg}
                </button>
              );
            })}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-white/10 text-white/50 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              data-ocid="qp_list.pagination_next"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Page ─── */
export default function QuestionPapersTeacherPage() {
  return (
    <div
      className="min-h-screen p-6 space-y-6"
      data-ocid="question_papers_teacher.page"
    >
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-violet-500" />
          <h1 className="font-display font-bold text-2xl text-white tracking-tight">
            Question Papers
          </h1>
        </div>
        <p className="text-sm text-white/40 pl-3">
          Upload and manage university &amp; internal question papers
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 items-start">
        <UploadPanel />
        <PapersListPanel />
      </div>
    </div>
  );
}
