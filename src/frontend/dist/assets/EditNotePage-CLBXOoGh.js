import { e as useNavigate, t as useParams, d as reactExports, j as jsxRuntimeExports, m as motion, q as Link, A as AnimatePresence } from "./index--tQIKzjM.js";
import { B as Button } from "./button-rs2k0yxG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-HChoTun6.js";
import { I as Input } from "./input-C8X2sTDc.js";
import { L as Label } from "./label-DZWs_pE0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Fud4tDqw.js";
import { S as Skeleton } from "./skeleton-IdBDwz55.js";
import { T as Textarea } from "./textarea-CrOr5HUC.js";
import { d as useNote } from "./useBackend-6ecES1Qd.js";
import { c as useUpdateNote, b as useDeleteNote, u as useSummarizeTranscript } from "./useMutations-CRuNkXK1.js";
import { A as ArrowLeft, L as LoaderCircle, S as Save } from "./save-CUURYwFV.js";
import { T as Trash2 } from "./trash-2-D151v7Kb.js";
import { S as Sparkles } from "./sparkles-iQEjdQ6Q.js";
import "./index-LPfivm91.js";
import "./index-B2WMmtXn.js";
import "./index-B5oGozIH.js";
import "./x-BiGuIwf2.js";
import "./backendService-DLDa8DMz.js";
const DEPARTMENTS = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Other"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
function FieldSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full bg-white/10 rounded-lg" });
}
function EditNotePage() {
  const navigate = useNavigate();
  const { noteId } = useParams({ strict: false });
  const noteIdBig = BigInt(noteId);
  const noteQuery = useNote(noteIdBig);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const summarize = useSummarizeTranscript();
  const [form, setForm] = reactExports.useState({
    department: "",
    year: "",
    semester: "",
    subject: "",
    unit: "",
    topic: "",
    transcript: "",
    aiSummary: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [showDelete, setShowDelete] = reactExports.useState(false);
  const [populated, setPopulated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (noteQuery.data && !populated) {
      const n = noteQuery.data;
      setForm({
        department: n.department,
        year: n.year.toString(),
        semester: n.semester.toString(),
        subject: n.subject,
        unit: n.unit,
        topic: n.topic,
        transcript: n.transcript,
        aiSummary: n.aiSummary
      });
      setPopulated(true);
    }
  }, [noteQuery.data, populated]);
  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const validate = () => {
    const e = {};
    if (!form.department) e.department = "Required";
    if (!form.year) e.year = "Required";
    if (!form.semester) e.semester = "Required";
    if (!form.subject.trim()) e.subject = "Required";
    if (!form.unit.trim()) e.unit = "Required";
    if (!form.topic.trim()) e.topic = "Required";
    if (!form.transcript.trim()) e.transcript = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const toInput = () => {
    var _a;
    return {
      department: form.department,
      year: BigInt(form.year),
      semester: BigInt(form.semester),
      subject: form.subject,
      unit: form.unit,
      topic: form.topic,
      transcript: form.transcript,
      aiSummary: form.aiSummary,
      pdfFileId: ((_a = noteQuery.data) == null ? void 0 : _a.pdfFileId) ?? ""
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateNote.mutate(
      { id: noteIdBig, input: toInput() },
      { onSuccess: () => navigate({ to: "/teacher/notes" }) }
    );
  };
  const handleGenerateSummary = () => {
    if (!form.transcript.trim()) return;
    summarize.mutate(form.transcript, {
      onSuccess: (summary) => set("aiSummary", summary ?? "")
    });
  };
  const handleDelete = () => {
    deleteNote.mutate(noteIdBig, {
      onSuccess: () => navigate({ to: "/teacher/notes" })
    });
  };
  const isLoading = noteQuery.isLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 max-w-4xl mx-auto min-h-screen",
      "data-ocid": "edit_note.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/teacher/notes",
                  className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm mb-4",
                  "data-ocid": "edit_note.back_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    " Back to Notes"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-gradient-blue", children: "Edit Note" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Update the content and metadata of this note" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => setShowDelete(true),
                    className: "text-destructive hover:text-destructive hover:bg-destructive/10 gap-2",
                    "data-ocid": "edit_note.delete_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                      " Delete"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.form,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            onSubmit: handleSubmit,
            className: "glass rounded-2xl p-6 space-y-6",
            "data-ocid": "edit_note.form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Department" }),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.department,
                      onValueChange: (v) => set("department", v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "bg-white/5 border-white/10 focus:border-primary/50",
                            "data-ocid": "edit_note.department_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select dept…" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass border-white/10", children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
                      ]
                    }
                  ),
                  errors.department && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs",
                      "data-ocid": "edit_note.department.field_error",
                      children: errors.department
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Year" }),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.year, onValueChange: (v) => set("year", v), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "bg-white/5 border-white/10 focus:border-primary/50",
                        "data-ocid": "edit_note.year_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select year…" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass border-white/10", children: YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(y), children: [
                      "Year ",
                      y
                    ] }, y)) })
                  ] }),
                  errors.year && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs",
                      "data-ocid": "edit_note.year.field_error",
                      children: errors.year
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Semester" }),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.semester,
                      onValueChange: (v) => set("semester", v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "bg-white/5 border-white/10 focus:border-primary/50",
                            "data-ocid": "edit_note.semester_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select sem…" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass border-white/10", children: SEMESTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(s), children: [
                          "Sem ",
                          s
                        ] }, s)) })
                      ]
                    }
                  ),
                  errors.semester && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs",
                      "data-ocid": "edit_note.semester.field_error",
                      children: errors.semester
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Subject *" }),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.subject,
                      onChange: (e) => set("subject", e.target.value),
                      placeholder: "e.g. Embedded Systems",
                      className: "bg-white/5 border-white/10 focus:border-primary/50",
                      "data-ocid": "edit_note.subject_input"
                    }
                  ),
                  errors.subject && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs",
                      "data-ocid": "edit_note.subject.field_error",
                      children: errors.subject
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Unit *" }),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.unit,
                      onChange: (e) => set("unit", e.target.value),
                      placeholder: "e.g. Unit 2",
                      className: "bg-white/5 border-white/10 focus:border-primary/50",
                      "data-ocid": "edit_note.unit_input"
                    }
                  ),
                  errors.unit && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs",
                      "data-ocid": "edit_note.unit.field_error",
                      children: errors.unit
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Topic *" }),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.topic,
                      onChange: (e) => set("topic", e.target.value),
                      placeholder: "e.g. Multitasking",
                      className: "bg-white/5 border-white/10 focus:border-primary/50",
                      "data-ocid": "edit_note.topic_input"
                    }
                  ),
                  errors.topic && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs",
                      "data-ocid": "edit_note.topic.field_error",
                      children: errors.topic
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Transcript *" }),
                isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[200px] w-full bg-white/10 rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: form.transcript,
                    onChange: (e) => set("transcript", e.target.value),
                    placeholder: "Lecture transcript…",
                    className: "bg-white/5 border-white/10 focus:border-primary/50 min-h-[200px] resize-y font-mono text-sm",
                    "data-ocid": "edit_note.transcript_textarea"
                  }
                ),
                errors.transcript && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-destructive text-xs",
                    "data-ocid": "edit_note.transcript.field_error",
                    children: errors.transcript
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "AI Summary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      onClick: handleGenerateSummary,
                      disabled: summarize.isPending || !form.transcript.trim(),
                      className: "border-primary/30 text-primary hover:bg-primary/10 gap-2 text-xs",
                      "data-ocid": "edit_note.generate_summary_button",
                      children: summarize.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                        " Generating…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                        " Regenerate Summary"
                      ] })
                    }
                  )
                ] }),
                isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[120px] w-full bg-white/10 rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: form.aiSummary,
                    onChange: (e) => set("aiSummary", e.target.value),
                    placeholder: "AI-generated summary…",
                    className: "bg-white/5 border-white/10 focus:border-primary/50 min-h-[120px] resize-y",
                    "data-ocid": "edit_note.summary_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: updateNote.isPending || isLoading,
                    className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth",
                    "data-ocid": "edit_note.submit_button",
                    children: updateNote.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                      " Updating…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                      " Update Note"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher/notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    className: "text-muted-foreground hover:text-foreground",
                    "data-ocid": "edit_note.cancel_button",
                    children: "Cancel"
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: () => setShowDelete(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "glass border-white/10",
            "data-ocid": "edit_note.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-gradient-blue", children: "Delete Note" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-muted-foreground", children: [
                  "Are you sure you want to delete",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                    '"',
                    form.topic,
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
                    onClick: () => setShowDelete(false),
                    "data-ocid": "edit_note.cancel_button",
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
                    "data-ocid": "edit_note.confirm_button",
                    children: deleteNote.isPending ? "Deleting…" : "Delete"
                  }
                )
              ] })
            ]
          }
        ) }) })
      ]
    }
  );
}
export {
  EditNotePage as default
};
