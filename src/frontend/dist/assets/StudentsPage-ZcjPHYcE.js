import { d as reactExports, j as jsxRuntimeExports, m as motion, o as Users, i as ChevronLeft, C as ChevronRight } from "./index--tQIKzjM.js";
import { B as Badge } from "./badge-CThuzPO0.js";
import { I as Input } from "./input-C8X2sTDc.js";
import { S as Skeleton } from "./skeleton-IdBDwz55.js";
import { f as useStudents } from "./useBackend-6ecES1Qd.js";
import { G as GraduationCap } from "./graduation-cap-COX9yIHY.js";
import { S as Search } from "./search-DHwquPJe.js";
import "./index-LPfivm91.js";
import "./backendService-DLDa8DMz.js";
const PAGE_SIZE = 20;
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function shortenPrincipal(p) {
  const s = p.toString();
  if (s.length <= 16) return s;
  return `${s.slice(0, 8)}…${s.slice(-6)}`;
}
function TableSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({ length: 6 }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
    /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: Array.from({ length: 4 }).map((_2, j) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded bg-white/5" }) }, `skeleton-col-${j}`)
    )) }, `skeleton-row-${i}`)
  )) });
}
function StudentRow({
  profile,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.04, duration: 0.3 },
      className: "group border-b border-white/5 hover:bg-white/5 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-brand-subtle border border-white/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gradient-blue", children: profile.name.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: profile.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded", children: shortenPrincipal(profile.principal) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-sm text-muted-foreground", children: formatDate(profile.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gradient-brand-subtle border border-white/10 text-foreground text-xs", children: "Student" }) })
      ]
    }
  );
}
function StudentsPage() {
  const { data: students, isLoading } = useStudents();
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => {
    if (!students) return [];
    const q = search.toLowerCase().trim();
    return q ? students.filter((s) => s.name.toLowerCase().includes(q)) : students;
  }, [students, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const handleSearch = (v) => {
    setSearch(v);
    setPage(1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex items-center justify-between flex-wrap gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Student Management" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "View all registered students" })
            ] })
          ] }),
          !isLoading && students && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "glass border-white/15 text-muted-foreground text-sm px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4 mr-1.5" }),
            students.length,
            " ",
            students.length === 1 ? "Student" : "Students"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1, duration: 0.4 },
        className: "glass rounded-2xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-white/8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "students.search_input",
                value: search,
                onChange: (e) => handleSearch(e.target.value),
                placeholder: "Search by name…",
                className: "pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/8", children: ["Name", "Principal ID", "Registered Date", "Role"].map(
              (col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                  children: col
                },
                col
              )
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, {}) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-5 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                "data-ocid": "students.empty_state",
                className: "flex flex-col items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-brand-subtle border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-7 h-7 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: search ? "No students match your search." : "No students registered yet." }),
                  !search && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70", children: "Share the student portal URL to get started." })
                ]
              }
            ) }) }) : paginated.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              StudentRow,
              {
                profile: s,
                index: i
              },
              s.principal.toString()
            )) })
          ] }) }),
          !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3.5 border-t border-white/8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Showing ",
              (currentPage - 1) * PAGE_SIZE + 1,
              "–",
              Math.min(currentPage * PAGE_SIZE, filtered.length),
              " of",
              " ",
              filtered.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "students.pagination_prev",
                  disabled: currentPage === 1,
                  onClick: () => setPage((p) => Math.max(1, p - 1)),
                  className: "w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-30 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-2", children: [
                currentPage,
                " / ",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "students.pagination_next",
                  disabled: currentPage === totalPages,
                  onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                  className: "w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-30 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  StudentsPage as default
};
