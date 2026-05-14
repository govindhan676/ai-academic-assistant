import { c as createLucideIcon, e as useNavigate, d as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence, C as ChevronRight, l as BookOpen } from "./index--tQIKzjM.js";
import { B as Button } from "./button-rs2k0yxG.js";
import { I as Input } from "./input-C8X2sTDc.js";
import { L as Label } from "./label-DZWs_pE0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Fud4tDqw.js";
import { T as Textarea } from "./textarea-CrOr5HUC.js";
import { u as useSummarizeTranscript, a as useCreateNote } from "./useMutations-CRuNkXK1.js";
import { S as Sparkles } from "./sparkles-iQEjdQ6Q.js";
import { A as ArrowRight } from "./arrow-right-BiYtw5SS.js";
import { C as CircleCheck } from "./circle-check-0ZUIPUN2.js";
import { M as Mic } from "./mic-BVi8au6H.js";
import "./index-LPfivm91.js";
import "./index-B2WMmtXn.js";
import "./backendService-DLDa8DMz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "rslqgf" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    {
      d: "M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",
      key: "9f7x3i"
    }
  ]
];
const FileAudio = createLucideIcon("file-audio", __iconNode);
const DEPARTMENTS = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Other"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const STEPS = [
  { label: "Transcript", icon: Mic },
  { label: "AI Summary", icon: Sparkles },
  { label: "Metadata", icon: BookOpen },
  { label: "Done", icon: CircleCheck }
];
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center justify-center gap-0 mb-10",
      "data-ocid": "upload_audio.step_indicator",
      children: STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = idx < current;
        const active = idx === current;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: {
                  scale: active ? 1.15 : 1,
                  boxShadow: active ? "0 0 24px oklch(0.62 0.24 250 / 0.6)" : done ? "0 0 12px oklch(0.75 0.18 195 / 0.4)" : "none"
                },
                className: [
                  "w-10 h-10 rounded-full flex items-center justify-center transition-smooth",
                  done ? "bg-gradient-cyan text-background" : active ? "bg-gradient-brand text-white" : "glass border-white/10 text-muted-foreground"
                ].join(" "),
                children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-medium ${active ? "text-primary" : done ? "text-cyan-400" : "text-muted-foreground"}`,
                children: step.label
              }
            )
          ] }),
          idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-16 h-px mx-1 mb-4 transition-smooth ${done ? "bg-gradient-cyan" : "bg-white/10"}`
            }
          )
        ] }, step.label);
      })
    }
  );
}
function UploadAudioPage() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(0);
  const [transcript, setTranscript] = reactExports.useState("");
  const [summary, setSummary] = reactExports.useState("");
  const [metadata, setMetadata] = reactExports.useState({
    department: "",
    year: "",
    semester: "",
    subject: "",
    unit: "",
    topic: ""
  });
  const summarizeMutation = useSummarizeTranscript();
  const createNoteMutation = useCreateNote();
  const handleGenerateSummary = () => {
    summarizeMutation.mutate(transcript, {
      onSuccess: (result) => {
        setSummary(result ?? "");
        setStep(2);
      }
    });
  };
  const handleSaveNote = () => {
    const input = {
      department: metadata.department,
      year: BigInt(metadata.year),
      semester: BigInt(metadata.semester),
      subject: metadata.subject,
      unit: metadata.unit,
      topic: metadata.topic,
      transcript,
      aiSummary: summary,
      pdfFileId: ""
    };
    createNoteMutation.mutate(input, {
      onSuccess: () => setStep(3)
    });
  };
  const metaValid = metadata.department && metadata.year && metadata.semester && metadata.subject.trim() && metadata.unit.trim() && metadata.topic.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 min-h-screen", "data-ocid": "upload_audio.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-gradient-blue", children: "Upload Audio / Add Transcript" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Paste or type a lecture transcript, generate an AI summary, then save as a note." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.08 },
        className: "max-w-3xl mx-auto glass rounded-3xl p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -40 },
                transition: { duration: 0.3, ease: "easeInOut" },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center gap-3 bg-white/3 hover:border-primary/30 transition-smooth cursor-default", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileAudio, { className: "w-8 h-8 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Audio file upload" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center max-w-xs", children: "MP3 · WAV · M4A · MP4 supported. Drag & drop or click to browse." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary/70 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                      " Using AI-powered transcription service"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "transcript-input",
                        children: [
                          "Transcript ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "transcript-input",
                        placeholder: "Paste or type the lecture transcript here…",
                        value: transcript,
                        onChange: (e) => setTranscript(e.target.value),
                        className: "min-h-[220px] bg-white/5 border-white/10 focus:border-primary/50 resize-y font-mono text-sm",
                        "data-ocid": "upload_audio.transcript_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      transcript.length,
                      " characters"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      disabled: transcript.trim().length < 20,
                      onClick: () => setStep(1),
                      className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth",
                      "data-ocid": "upload_audio.next_summary_button",
                      children: [
                        "Next: Generate Summary ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  ) })
                ]
              },
              "step0"
            ),
            step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -40 },
                transition: { duration: 0.3, ease: "easeInOut" },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Transcript Preview" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground line-clamp-3", children: [
                      transcript.slice(0, 300),
                      transcript.length > 300 ? "…" : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        animate: summarizeMutation.isPending ? { scale: [1, 1.08, 1] } : {},
                        transition: {
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.2,
                          ease: "easeInOut"
                        },
                        className: "w-20 h-20 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-purple",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Sparkles,
                          {
                            className: `w-9 h-9 ${summarizeMutation.isPending ? "text-accent animate-pulse" : "text-primary"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        onClick: handleGenerateSummary,
                        disabled: summarizeMutation.isPending,
                        className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2 min-w-[200px] transition-smooth",
                        "data-ocid": "upload_audio.generate_summary_button",
                        children: summarizeMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 animate-spin" }),
                          " Generating…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                          " Generate AI Summary"
                        ] })
                      }
                    )
                  ] }),
                  summary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      className: "glass rounded-xl p-4 border border-primary/20 space-y-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary uppercase tracking-wide font-medium flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                          " AI Summary"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: summary })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        onClick: () => setStep(0),
                        className: "text-muted-foreground hover:text-foreground",
                        "data-ocid": "upload_audio.back_button.1",
                        children: "Back"
                      }
                    ),
                    summary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        onClick: () => setStep(2),
                        className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth",
                        "data-ocid": "upload_audio.next_metadata_button",
                        children: [
                          "Next: Save Note ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                        ]
                      }
                    )
                  ] })
                ]
              },
              "step1"
            ),
            step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -40 },
                transition: { duration: 0.3, ease: "easeInOut" },
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Fill in the note metadata to categorise this content." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "dept-select", children: [
                        "Department ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: metadata.department,
                          onValueChange: (v) => setMetadata((m) => ({ ...m, department: v })),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: "dept-select",
                                className: "bg-white/5 border-white/10",
                                "data-ocid": "upload_audio.department_select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select dept" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass border-white/10", children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "year-select", children: [
                        "Year ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: metadata.year,
                          onValueChange: (v) => setMetadata((m) => ({ ...m, year: v })),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: "year-select",
                                className: "bg-white/5 border-white/10",
                                "data-ocid": "upload_audio.year_select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Year" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass border-white/10", children: YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(y), children: [
                              "Year ",
                              y
                            ] }, y)) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "sem-select", children: [
                        "Semester ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: metadata.semester,
                          onValueChange: (v) => setMetadata((m) => ({ ...m, semester: v })),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: "sem-select",
                                className: "bg-white/5 border-white/10",
                                "data-ocid": "upload_audio.semester_select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sem" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass border-white/10", children: SEMESTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(s), children: [
                              "Sem ",
                              s
                            ] }, s)) })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "subject-input", children: [
                        "Subject ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "subject-input",
                          placeholder: "e.g. Embedded Systems",
                          value: metadata.subject,
                          onChange: (e) => setMetadata((m) => ({ ...m, subject: e.target.value })),
                          className: "bg-white/5 border-white/10 focus:border-primary/50",
                          "data-ocid": "upload_audio.subject_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "unit-input", children: [
                        "Unit ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "unit-input",
                          placeholder: "e.g. Unit 2",
                          value: metadata.unit,
                          onChange: (e) => setMetadata((m) => ({ ...m, unit: e.target.value })),
                          className: "bg-white/5 border-white/10 focus:border-primary/50",
                          "data-ocid": "upload_audio.unit_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "topic-input", children: [
                        "Topic ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "topic-input",
                          placeholder: "e.g. Multitasking",
                          value: metadata.topic,
                          onChange: (e) => setMetadata((m) => ({ ...m, topic: e.target.value })),
                          className: "bg-white/5 border-white/10 focus:border-primary/50",
                          "data-ocid": "upload_audio.topic_input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        onClick: () => setStep(1),
                        className: "text-muted-foreground hover:text-foreground",
                        "data-ocid": "upload_audio.back_button.2",
                        children: "Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        disabled: !metaValid || createNoteMutation.isPending,
                        onClick: handleSaveNote,
                        className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth",
                        "data-ocid": "upload_audio.save_button",
                        children: [
                          createNoteMutation.isPending ? "Saving…" : "Save Note",
                          !createNoteMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                        ]
                      }
                    )
                  ] })
                ]
              },
              "step2"
            ),
            step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.4, ease: "easeInOut" },
                className: "flex flex-col items-center gap-6 py-8",
                "data-ocid": "upload_audio.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0 },
                      animate: { scale: 1 },
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1
                      },
                      className: "w-24 h-24 rounded-full bg-gradient-cyan flex items-center justify-center glow-cyan",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-background" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-gradient-blue", children: "Note Saved Successfully!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your transcript and AI summary have been stored in the academic library." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        onClick: () => navigate({ to: "/teacher/notes" }),
                        className: "border-white/10 hover:bg-white/5 transition-smooth",
                        "data-ocid": "upload_audio.view_notes_button",
                        children: "View All Notes"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        onClick: () => {
                          setStep(0);
                          setTranscript("");
                          setSummary("");
                          setMetadata({
                            department: "",
                            year: "",
                            semester: "",
                            subject: "",
                            unit: "",
                            topic: ""
                          });
                        },
                        className: "bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth",
                        "data-ocid": "upload_audio.upload_another_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" }),
                          " Upload Another"
                        ]
                      }
                    )
                  ] })
                ]
              },
              "step3"
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  UploadAudioPage as default
};
