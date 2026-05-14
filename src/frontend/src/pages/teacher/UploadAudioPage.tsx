import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileAudio,
  Mic,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  useCreateNote,
  useSummarizeTranscript,
} from "../../hooks/useMutations";
import type { NoteInput } from "../../types";

const DEPARTMENTS = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Other"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

const STEPS = [
  { label: "Transcript", icon: Mic },
  { label: "AI Summary", icon: Sparkles },
  { label: "Metadata", icon: BookOpen },
  { label: "Done", icon: CheckCircle2 },
];

interface StepIndicatorProps {
  current: number;
}

function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center gap-0 mb-10"
      data-ocid="upload_audio.step_indicator"
    >
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  scale: active ? 1.15 : 1,
                  boxShadow: active
                    ? "0 0 24px oklch(0.62 0.24 250 / 0.6)"
                    : done
                      ? "0 0 12px oklch(0.75 0.18 195 / 0.4)"
                      : "none",
                }}
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center transition-smooth",
                  done
                    ? "bg-gradient-cyan text-background"
                    : active
                      ? "bg-gradient-brand text-white"
                      : "glass border-white/10 text-muted-foreground",
                ].join(" ")}
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </motion.div>
              <span
                className={`text-xs font-medium ${
                  active
                    ? "text-primary"
                    : done
                      ? "text-cyan-400"
                      : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-16 h-px mx-1 mb-4 transition-smooth ${
                  done ? "bg-gradient-cyan" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function UploadAudioPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [metadata, setMetadata] = useState({
    department: "",
    year: "",
    semester: "",
    subject: "",
    unit: "",
    topic: "",
  });

  const summarizeMutation = useSummarizeTranscript();
  const createNoteMutation = useCreateNote();

  const handleGenerateSummary = () => {
    summarizeMutation.mutate(transcript, {
      onSuccess: (result) => {
        setSummary(result ?? "");
        setStep(2);
      },
    });
  };

  const handleSaveNote = () => {
    const input: NoteInput = {
      department: metadata.department,
      year: BigInt(metadata.year),
      semester: BigInt(metadata.semester),
      subject: metadata.subject,
      unit: metadata.unit,
      topic: metadata.topic,
      transcript,
      aiSummary: summary,
      pdfFileId: "",
    };
    createNoteMutation.mutate(input, {
      onSuccess: () => setStep(3),
    });
  };

  const metaValid =
    metadata.department &&
    metadata.year &&
    metadata.semester &&
    metadata.subject.trim() &&
    metadata.unit.trim() &&
    metadata.topic.trim();

  return (
    <div className="p-6 min-h-screen" data-ocid="upload_audio.page">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-gradient-blue">
          Upload Audio / Add Transcript
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Paste or type a lecture transcript, generate an AI summary, then save
          as a note.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="max-w-3xl mx-auto glass rounded-3xl p-8"
      >
        <StepIndicator current={step} />

        <AnimatePresence mode="wait">
          {/* STEP 0 — Transcript */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
              className="space-y-6"
            >
              {/* Audio upload zone (decorative) */}
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center gap-3 bg-white/3 hover:border-primary/30 transition-smooth cursor-default">
                <div className="w-16 h-16 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-blue">
                  <FileAudio className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Audio file upload
                </p>
                <p className="text-xs text-muted-foreground text-center max-w-xs">
                  MP3 · WAV · M4A · MP4 supported. Drag &amp; drop or click to
                  browse.
                </p>
                <span className="text-xs text-primary/70 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Using AI-powered
                  transcription service
                </span>
              </div>

              {/* Transcript input */}
              <div className="space-y-2">
                <Label
                  className="text-sm font-medium text-foreground"
                  htmlFor="transcript-input"
                >
                  Transcript <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="transcript-input"
                  placeholder="Paste or type the lecture transcript here…"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="min-h-[220px] bg-white/5 border-white/10 focus:border-primary/50 resize-y font-mono text-sm"
                  data-ocid="upload_audio.transcript_input"
                />
                <p className="text-xs text-muted-foreground">
                  {transcript.length} characters
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  disabled={transcript.trim().length < 20}
                  onClick={() => setStep(1)}
                  className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
                  data-ocid="upload_audio.next_summary_button"
                >
                  Next: Generate Summary <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 1 — AI Summary */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
              className="space-y-6"
            >
              {/* Transcript preview */}
              <div className="glass rounded-xl p-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Transcript Preview
                </p>
                <p className="text-sm text-foreground line-clamp-3">
                  {transcript.slice(0, 300)}
                  {transcript.length > 300 ? "…" : ""}
                </p>
              </div>

              {/* Generate button */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={
                    summarizeMutation.isPending ? { scale: [1, 1.08, 1] } : {}
                  }
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.2,
                    ease: "easeInOut" as const,
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-brand-subtle flex items-center justify-center glow-purple"
                >
                  <Sparkles
                    className={`w-9 h-9 ${
                      summarizeMutation.isPending
                        ? "text-accent animate-pulse"
                        : "text-primary"
                    }`}
                  />
                </motion.div>
                <Button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={summarizeMutation.isPending}
                  className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 min-w-[200px] transition-smooth"
                  data-ocid="upload_audio.generate_summary_button"
                >
                  {summarizeMutation.isPending ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Generate AI Summary
                    </>
                  )}
                </Button>
              </div>

              {/* Summary result */}
              {summary && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-4 border border-primary/20 space-y-2"
                >
                  <p className="text-xs text-primary uppercase tracking-wide font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Summary
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {summary}
                  </p>
                </motion.div>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(0)}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="upload_audio.back_button.1"
                >
                  Back
                </Button>
                {summary && (
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
                    data-ocid="upload_audio.next_metadata_button"
                  >
                    Next: Save Note <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Metadata */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
              className="space-y-5"
            >
              <p className="text-sm text-muted-foreground">
                Fill in the note metadata to categorise this content.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="dept-select">
                    Department <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={metadata.department}
                    onValueChange={(v) =>
                      setMetadata((m) => ({ ...m, department: v }))
                    }
                  >
                    <SelectTrigger
                      id="dept-select"
                      className="bg-white/5 border-white/10"
                      data-ocid="upload_audio.department_select"
                    >
                      <SelectValue placeholder="Select dept" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10">
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="year-select">
                    Year <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={metadata.year}
                    onValueChange={(v) =>
                      setMetadata((m) => ({ ...m, year: v }))
                    }
                  >
                    <SelectTrigger
                      id="year-select"
                      className="bg-white/5 border-white/10"
                      data-ocid="upload_audio.year_select"
                    >
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10">
                      {YEARS.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          Year {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sem-select">
                    Semester <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={metadata.semester}
                    onValueChange={(v) =>
                      setMetadata((m) => ({ ...m, semester: v }))
                    }
                  >
                    <SelectTrigger
                      id="sem-select"
                      className="bg-white/5 border-white/10"
                      data-ocid="upload_audio.semester_select"
                    >
                      <SelectValue placeholder="Sem" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10">
                      {SEMESTERS.map((s) => (
                        <SelectItem key={s} value={String(s)}>
                          Sem {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="subject-input">
                    Subject <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="subject-input"
                    placeholder="e.g. Embedded Systems"
                    value={metadata.subject}
                    onChange={(e) =>
                      setMetadata((m) => ({ ...m, subject: e.target.value }))
                    }
                    className="bg-white/5 border-white/10 focus:border-primary/50"
                    data-ocid="upload_audio.subject_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="unit-input">
                    Unit <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="unit-input"
                    placeholder="e.g. Unit 2"
                    value={metadata.unit}
                    onChange={(e) =>
                      setMetadata((m) => ({ ...m, unit: e.target.value }))
                    }
                    className="bg-white/5 border-white/10 focus:border-primary/50"
                    data-ocid="upload_audio.unit_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="topic-input">
                    Topic <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="topic-input"
                    placeholder="e.g. Multitasking"
                    value={metadata.topic}
                    onChange={(e) =>
                      setMetadata((m) => ({ ...m, topic: e.target.value }))
                    }
                    className="bg-white/5 border-white/10 focus:border-primary/50"
                    data-ocid="upload_audio.topic_input"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="upload_audio.back_button.2"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  disabled={!metaValid || createNoteMutation.isPending}
                  onClick={handleSaveNote}
                  className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
                  data-ocid="upload_audio.save_button"
                >
                  {createNoteMutation.isPending ? "Saving…" : "Save Note"}
                  {!createNoteMutation.isPending && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Success */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" as const }}
              className="flex flex-col items-center gap-6 py-8"
              data-ocid="upload_audio.success_state"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                }}
                className="w-24 h-24 rounded-full bg-gradient-cyan flex items-center justify-center glow-cyan"
              >
                <CheckCircle2 className="w-12 h-12 text-background" />
              </motion.div>

              <div className="text-center space-y-1">
                <h2 className="text-2xl font-display font-bold text-gradient-blue">
                  Note Saved Successfully!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Your transcript and AI summary have been stored in the
                  academic library.
                </p>
              </div>

              <div className="flex gap-3 flex-wrap justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: "/teacher/notes" })}
                  className="border-white/10 hover:bg-white/5 transition-smooth"
                  data-ocid="upload_audio.view_notes_button"
                >
                  View All Notes
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setTranscript("");
                    setSummary("");
                    setMetadata({
                      department: "",
                      year: "",
                      semester: "",
                      subject: "",
                      unit: "",
                      topic: "",
                    });
                  }}
                  className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
                  data-ocid="upload_audio.upload_another_button"
                >
                  <Mic className="w-4 h-4" /> Upload Another
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
