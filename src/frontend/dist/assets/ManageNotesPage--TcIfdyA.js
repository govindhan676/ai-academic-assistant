import { c as createLucideIcon, e as useNavigate, d as reactExports, j as jsxRuntimeExports, m as motion, q as Link, k as ue, i as ChevronLeft, C as ChevronRight, A as AnimatePresence, F as FileText } from "./index--tQIKzjM.js";
import { B as Button } from "./button-rs2k0yxG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-HChoTun6.js";
import { I as Input } from "./input-C8X2sTDc.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Fud4tDqw.js";
import { S as Skeleton } from "./skeleton-IdBDwz55.js";
import { b as useNotes, c as useSearchNotes } from "./useBackend-6ecES1Qd.js";
import { b as useDeleteNote } from "./useMutations-CRuNkXK1.js";
import { F as Funnel } from "./funnel-BGJ3dA73.js";
import { S as Search } from "./search-DHwquPJe.js";
import { X } from "./x-BiGuIwf2.js";
import { T as Trash2 } from "./trash-2-D151v7Kb.js";
import { D as Download } from "./download-BoMwYMwG.js";
import "./index-LPfivm91.js";
import "./index-B2WMmtXn.js";
import "./index-B5oGozIH.js";
import "./backendService-DLDa8DMz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ],
  ["path", { d: "m15 5 3 3", key: "1w25hb" }]
];
const PencilLine = createLucideIcon("pencil-line", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const PAGE_SIZE = 10;
const DEPARTMENTS = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Other"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function SkeletonRow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/5", children: [...Array(8)].map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-white/10" }) }, `skeleton-col-${i}`)
  )) });
}
function ManageNotesPage() {
  var _a, _b;
  const navigate = useNavigate();
  const [page, setPage] = reactExports.useState(1);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState("");
  const [filters, setFilters] = reactExports.useState({});
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);
  const isSearching = debouncedQuery.length > 0;
  const notesQuery = useNotes(filters, page);
  const searchResult = useSearchNotes(debouncedQuery, filters);
  const deleteNote = useDeleteNote();
  const activeQuery = isSearching ? searchResult : notesQuery;
  const notes = (isSearching ? searchResult.data : (_a = notesQuery.data) == null ? void 0 : _a.notes) ?? [];
  const total = isSearching ? BigInt(notes.length) : ((_b = notesQuery.data) == null ? void 0 : _b.total) ?? BigInt(0);
  const totalPages = Math.max(1, Math.ceil(Number(total) / PAGE_SIZE));
  const setDeptFilter = reactExports.useCallback((value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, department: value || void 0 }));
  }, []);
  const setYearFilter = reactExports.useCallback((value) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      year: value ? BigInt(value) : void 0
    }));
  }, []);
  const setSemFilter = reactExports.useCallback((value) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      semester: value ? BigInt(value) : void 0
    }));
  }, []);
  const clearFilters = reactExports.useCallback(() => {
    setFilters({});
    setSearchQuery("");
    setPage(1);
  }, []);
  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteNote.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null)
    });
  };
  const hasFilters = searchQuery || filters.department || filters.year !== void 0 || filters.semester !== void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 min-h-screen", "data-ocid": "manage_notes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-gradient-blue", children: "Manage Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Organise and manage your academic notes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher/notes/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth",
              "data-ocid": "manage_notes.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Note"
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "glass rounded-2xl p-4 space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Filters" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search notes…",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "pl-9 bg-white/5 border-white/10 focus:border-primary/50",
                  "data-ocid": "manage_notes.search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filters.department ?? "",
                onValueChange: (v) => setDeptFilter(v === "__all__" ? "" : v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-36 bg-white/5 border-white/10",
                      "data-ocid": "manage_notes.department_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Department" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "glass border-white/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "All Depts" }),
                    DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filters.year !== void 0 ? filters.year.toString() : "",
                onValueChange: (v) => setYearFilter(v === "__all__" ? "" : v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-28 bg-white/5 border-white/10",
                      "data-ocid": "manage_notes.year_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Year" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "glass border-white/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "All Years" }),
                    YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(y), children: [
                      "Year ",
                      y
                    ] }, y))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filters.semester !== void 0 ? filters.semester.toString() : "",
                onValueChange: (v) => setSemFilter(v === "__all__" ? "" : v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-32 bg-white/5 border-white/10",
                      "data-ocid": "manage_notes.semester_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Semester" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "glass border-white/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "All Sems" }),
                    SEMESTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(s), children: [
                      "Sem ",
                      s
                    ] }, s))
                  ] })
                ]
              }
            ),
            hasFilters ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: clearFilters,
                className: "text-muted-foreground hover:text-foreground gap-1",
                "data-ocid": "manage_notes.clear_filters_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                  " Clear"
                ]
              }
            ) : null
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        className: "glass rounded-2xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/10 text-muted-foreground", children: [
              "Subject",
              "Unit",
              "Topic",
              "Dept",
              "Sem",
              "Year",
              "Created",
              "Actions"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: h }, h)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: activeQuery.isLoading ? [...Array(5)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, {}, `skeleton-row-${i}`)
            )) : notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) }) }) : notes.map((note, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.tr,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: idx * 0.04 },
                className: "border-b border-white/5 hover:bg-white/5 transition-smooth",
                "data-ocid": `manage_notes.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground max-w-[120px] truncate", children: note.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground max-w-[100px] truncate", children: note.unit }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground max-w-[130px] truncate", children: note.topic }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: note.department }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: note.semester }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: note.year }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(note.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "icon",
                        variant: "ghost",
                        className: "w-8 h-8 hover:text-primary hover:bg-primary/10",
                        onClick: () => navigate({
                          to: "/teacher/notes/$noteId",
                          params: { noteId: note.id.toString() }
                        }),
                        "data-ocid": `manage_notes.edit_button.${idx + 1}`,
                        "aria-label": "Edit note",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(PencilLine, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "icon",
                        variant: "ghost",
                        className: "w-8 h-8 hover:text-destructive hover:bg-destructive/10",
                        onClick: () => setDeleteTarget(note),
                        "data-ocid": `manage_notes.delete_button.${idx + 1}`,
                        "aria-label": "Delete note",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "icon",
                        variant: "ghost",
                        className: "w-8 h-8",
                        "aria-label": "Download PDF",
                        "data-ocid": `manage_notes.download_button.${idx + 1}`,
                        onClick: () => note.pdfFileId ? window.open(
                          `/api/object-storage/${note.pdfFileId}`,
                          "_blank"
                        ) : ue.error("PDF not available"),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
                      }
                    )
                  ] }) })
                ]
              },
              note.id.toString()
            )) })
          ] }) }),
          !activeQuery.isLoading && notes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: isSearching ? `${notes.length} result${notes.length !== 1 ? "s" : ""}` : `Page ${page} of ${totalPages} · ${Number(total)} total` }),
            !isSearching && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "icon",
                  variant: "ghost",
                  disabled: page <= 1,
                  onClick: () => setPage((p) => p - 1),
                  className: "w-8 h-8",
                  "data-ocid": "manage_notes.pagination_prev",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "icon",
                  variant: "ghost",
                  disabled: page >= totalPages,
                  onClick: () => setPage((p) => p + 1),
                  className: "w-8 h-8",
                  "data-ocid": "manage_notes.pagination_next",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: () => setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "glass border-white/10",
        "data-ocid": "manage_notes.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-gradient-blue", children: "Delete Note" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-muted-foreground", children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                '"',
                deleteTarget.topic,
                '"'
              ] }),
              "? This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: () => setDeleteTarget(null),
                "data-ocid": "manage_notes.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                onClick: handleDelete,
                disabled: deleteNote.isPending,
                className: "bg-destructive/80 hover:bg-destructive",
                "data-ocid": "manage_notes.confirm_button",
                children: deleteNote.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: "flex flex-col items-center justify-center py-20 gap-4",
      "data-ocid": "manage_notes.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground", children: "No notes yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "Start building your academic library by adding your first note." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher/notes/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2",
            "data-ocid": "manage_notes.empty_add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Add First Note"
            ]
          }
        ) })
      ]
    }
  );
}
export {
  ManageNotesPage as default
};
