import { j as jsxRuntimeExports, m as motion, d as reactExports, k as ue, p as Files, A as AnimatePresence, F as FileText, U as Upload, i as ChevronLeft, C as ChevronRight } from "./index--tQIKzjM.js";
import { B as Badge } from "./badge-CThuzPO0.js";
import { B as Button } from "./button-rs2k0yxG.js";
import { I as Input } from "./input-C8X2sTDc.js";
import { L as Label } from "./label-DZWs_pE0.js";
import { S as Skeleton } from "./skeleton-IdBDwz55.js";
import { e as useQuestionPapers } from "./useBackend-6ecES1Qd.js";
import { d as useUploadQuestionPaper } from "./useMutations-CRuNkXK1.js";
import { S as Search } from "./search-DHwquPJe.js";
import { E as ExternalLink } from "./external-link-Bae42x3p.js";
import "./index-LPfivm91.js";
import "./backendService-DLDa8DMz.js";
const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "IT", "Other"];
const YEARS = ["1st", "2nd", "3rd", "4th"];
const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const PAPER_TYPES = ["University", "Internal"];
const PAGE_SIZE = 10;
const glass = "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl";
const gradientBtn = "bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity";
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function GlassSelect({
  label,
  value,
  onChange,
  options,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-white/60 uppercase tracking-wider", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        className: "w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white/90\n          text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50\n          [&>option]:bg-[#0f0f1a] [&>option]:text-white transition-all",
        children: [
          placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: placeholder }),
          options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
        ]
      }
    )
  ] });
}
function SkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({ length: 5 }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
    /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/5", children: Array.from({ length: 8 }).map((_2, j) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-white/10 rounded" }) }, `skeleton-col-${j}`)
    )) }, `skeleton-row-${i}`)
  )) });
}
function UploadPanel() {
  const uploadMutation = useUploadQuestionPaper();
  const fileInputRef = reactExports.useRef(null);
  const [file, setFile] = reactExports.useState(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [form, setForm] = reactExports.useState({
    department: "",
    year: "",
    semester: "",
    regulation: "",
    subject: "",
    paperType: ""
  });
  const setField = (k) => (v) => setForm((prev) => ({ ...prev, [k]: v }));
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if ((dropped == null ? void 0 : dropped.type) === "application/pdf") setFile(dropped);
    else ue.error("Only PDF files are accepted");
  }, []);
  const handleFileChange = (e) => {
    var _a;
    const picked = (_a = e.target.files) == null ? void 0 : _a[0];
    if ((picked == null ? void 0 : picked.type) === "application/pdf") setFile(picked);
    else ue.error("Only PDF files are accepted");
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
      paperType: ""
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const validate = () => {
    if (!file) {
      ue.error("Please select a PDF file");
      return false;
    }
    const missing = Object.entries(form).find(
      ([k, v]) => k !== "regulation" && !v
    );
    if (missing) {
      ue.error(`${missing[0]} is required`);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
    const pdfFileId = `${file.name.replace(/\s+/g, "_")}_${Date.now()}`;
    const yearMap = {
      "1st": 1n,
      "2nd": 2n,
      "3rd": 3n,
      "4th": 4n
    };
    try {
      await uploadMutation.mutateAsync({
        department: form.department,
        year: yearMap[form.year] ?? 1n,
        semester: BigInt(form.semester),
        regulation: form.regulation || "N/A",
        subject: form.subject,
        paperType: form.paperType,
        pdfFileId
      });
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        resetForm();
        ue.success("Question paper uploaded successfully!");
      }, 400);
    } catch {
      clearInterval(interval);
      setProgress(0);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: `${glass} p-6 space-y-5`,
      initial: { opacity: 0, x: -24 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/25 border border-blue-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Files, { size: 18, className: "text-blue-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-white text-lg", children: "Upload Question Paper" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "pdf-upload-input",
              className: `relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 block
            ${dragging ? "border-violet-400 bg-violet-500/10" : "border-white/15 hover:border-violet-400/50 hover:bg-white/3"}`,
              onDragOver: (e) => {
                e.preventDefault();
                setDragging(true);
              },
              onDragLeave: () => setDragging(false),
              onDrop: handleDrop,
              "data-ocid": "qp_upload.dropzone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pdf-upload-input",
                    ref: fileInputRef,
                    type: "file",
                    accept: ".pdf,application/pdf",
                    className: "hidden",
                    onChange: handleFileChange
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    className: "space-y-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 22, className: "text-green-400" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-white/90 text-sm truncate max-w-[200px] mx-auto", children: file.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40", children: formatBytes(file.size) })
                    ]
                  },
                  "file"
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className: "space-y-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 20, className: "text-white/40" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/50", children: [
                        "Drag & drop PDF or",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-violet-400 underline underline-offset-2", children: "browse" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30", children: "PDF files only" })
                    ]
                  },
                  "empty"
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: progress > 0 && progress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "space-y-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-white/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    progress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full",
                    animate: { width: `${progress}%` },
                    transition: { duration: 0.3 }
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassSelect,
              {
                label: "Department",
                value: form.department,
                onChange: setField("department"),
                options: DEPARTMENTS,
                placeholder: "Select dept"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassSelect,
              {
                label: "Year",
                value: form.year,
                onChange: setField("year"),
                options: YEARS,
                placeholder: "Select year"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassSelect,
              {
                label: "Semester",
                value: form.semester,
                onChange: setField("semester"),
                options: SEMESTERS,
                placeholder: "Select sem"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassSelect,
              {
                label: "Paper Type",
                value: form.paperType,
                onChange: setField("paperType"),
                options: PAPER_TYPES,
                placeholder: "Select type"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-white/60 uppercase tracking-wider", children: "Subject *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.subject,
                onChange: (e) => setField("subject")(e.target.value),
                placeholder: "e.g. Digital Signal Processing",
                className: "bg-white/5 border-white/10 text-white/90 placeholder:text-white/25 focus:border-violet-500/50 focus:ring-violet-500/25 rounded-xl",
                "data-ocid": "qp_upload.subject_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-white/60 uppercase tracking-wider", children: "Regulation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.regulation,
                onChange: (e) => setField("regulation")(e.target.value),
                placeholder: "e.g. 2021, R2020",
                className: "bg-white/5 border-white/10 text-white/90 placeholder:text-white/25 focus:border-violet-500/50 focus:ring-violet-500/25 rounded-xl",
                "data-ocid": "qp_upload.regulation_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: uploadMutation.isPending,
              className: `w-full h-11 ${gradientBtn}`,
              "data-ocid": "qp_upload.submit_button",
              children: uploadMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full",
                    animate: { rotate: 360 },
                    transition: {
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }
                  }
                ),
                "Uploading…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
                " Upload Paper"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function PapersListPanel() {
  const [page, setPage] = reactExports.useState(1);
  const [search, setSearch] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [filters, setFilters] = reactExports.useState({ department: "", year: "", semester: "", paperType: "" });
  const debounceRef = reactExports.useRef(null);
  const queryFilters = {
    ...filters.department && { department: filters.department },
    ...filters.year && {
      year: BigInt(["1st", "2nd", "3rd", "4th"].indexOf(filters.year) + 1)
    },
    ...filters.semester && { semester: BigInt(filters.semester) },
    ...debouncedSearch && { subject: debouncedSearch }
  };
  const { data, isLoading } = useQuestionPapers(queryFilters, page);
  const papers = (data == null ? void 0 : data.papers) ?? [];
  const total = Number((data == null ? void 0 : data.total) ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const handleSearch = (v) => {
    setSearch(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(v);
      setPage(1);
    }, 350);
  };
  const setFilter = (k) => (v) => {
    setFilters((prev) => ({ ...prev, [k]: v }));
    setPage(1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: `${glass} p-6 flex flex-col gap-4`,
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: "easeOut", delay: 0.08 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 border border-violet-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, className: "text-violet-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-white text-lg", children: "Uploaded Papers" }),
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs", children: total })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 15,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => handleSearch(e.target.value),
              placeholder: "Search by subject…",
              className: "pl-9 bg-white/5 border-white/10 text-white/90 placeholder:text-white/25 focus:border-violet-500/50 rounded-xl",
              "data-ocid": "qp_list.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
          { key: "department", opts: DEPARTMENTS, ph: "All Depts" },
          { key: "year", opts: YEARS, ph: "All Years" },
          { key: "semester", opts: SEMESTERS, ph: "All Sems" },
          { key: "paperType", opts: PAPER_TYPES, ph: "All Types" }
        ].map(({ key, opts, ph }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filters[key],
            onChange: (e) => setFilter(key)(e.target.value),
            className: "h-9 px-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs\n              focus:outline-none focus:ring-1 focus:ring-violet-500/50 [&>option]:bg-[#0f0f1a]\n              [&>option]:text-white transition-all",
            "data-ocid": `qp_list.${key}_filter`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: ph }),
              opts.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
            ]
          },
          key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-white/8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[700px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/8 bg-white/3", children: [
            "Subject",
            "Department",
            "Sem",
            "Year",
            "Regulation",
            "Type",
            "Uploaded",
            "Actions"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left font-semibold text-white/40 text-xs uppercase tracking-wider whitespace-nowrap",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : papers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: "space-y-3",
              "data-ocid": "qp_list.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 24, className: "text-white/20" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 font-medium", children: "No question papers uploaded yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/20 text-xs", children: "Upload your first paper using the panel on the left" })
              ]
            }
          ) }) }) : papers.map((paper, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.tr,
            {
              className: "border-b border-white/5 hover:bg-white/4 transition-colors group",
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.04 },
              "data-ocid": `qp_list.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white/90 truncate max-w-[160px] block", children: paper.subject }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/15 text-blue-300 border-blue-500/25 text-xs", children: paper.department }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/60", children: paper.semester.toString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/60", children: paper.year.toString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-cyan-400/80", children: paper.regulation }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${paper.paperType === "University" ? "bg-violet-500/15 text-violet-300 border-violet-500/25" : "bg-amber-500/15 text-amber-300 border-amber-500/25"}`,
                    children: paper.paperType
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/40 text-xs whitespace-nowrap", children: formatDate(paper.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      ue.info(
                        "PDF download: open via object-storage URL"
                      );
                    },
                    className: "p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-cyan-400 transition-all",
                    "aria-label": "Download paper",
                    "data-ocid": `qp_list.download_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 })
                  }
                ) }) })
              ]
            },
            paper.id.toString()
          )) })
        ] }) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/30", children: [
            "Showing ",
            (page - 1) * PAGE_SIZE + 1,
            "–",
            Math.min(page * PAGE_SIZE, total),
            " of ",
            total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: page <= 1,
                onClick: () => setPage((p) => p - 1),
                className: "p-1.5 rounded-lg border border-white/10 text-white/50 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all",
                "data-ocid": "qp_list.pagination_prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 15 })
              }
            ),
            Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pg = i + 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPage(pg),
                  className: `w-7 h-7 text-xs rounded-lg font-medium transition-all
                    ${page === pg ? "bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-md shadow-violet-500/25" : "border border-white/10 text-white/40 hover:bg-white/5"}`,
                  children: pg
                },
                `page-${pg}`
              );
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: page >= totalPages,
                onClick: () => setPage((p) => p + 1),
                className: "p-1.5 rounded-lg border border-white/10 text-white/50 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all",
                "data-ocid": "qp_list.pagination_next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 15 })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function QuestionPapersTeacherPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen p-6 space-y-6",
      "data-ocid": "question_papers_teacher.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35 },
            className: "space-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-violet-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-white tracking-tight", children: "Question Papers" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/40 pl-3", children: "Upload and manage university & internal question papers" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UploadPanel, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PapersListPanel, {})
        ] })
      ]
    }
  );
}
export {
  QuestionPapersTeacherPage as default
};
