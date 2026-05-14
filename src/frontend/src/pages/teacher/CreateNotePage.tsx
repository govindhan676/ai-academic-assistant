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
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  useCreateNote,
  useSummarizeTranscript,
} from "../../hooks/useMutations";
import type { NoteInput } from "../../types";

const DEPARTMENTS = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Other"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

interface FormErrors {
  department?: string;
  year?: string;
  semester?: string;
  subject?: string;
  unit?: string;
  topic?: string;
  transcript?: string;
}

// Form state — year/semester stored as strings for input binding, converted on submit
interface NoteForm {
  department: string;
  year: string;
  semester: string;
  subject: string;
  unit: string;
  topic: string;
  transcript: string;
  aiSummary: string;
}

const EMPTY: NoteForm = {
  department: "",
  year: "",
  semester: "",
  subject: "",
  unit: "",
  topic: "",
  transcript: "",
  aiSummary: "",
};

export default function CreateNotePage() {
  const navigate = useNavigate();
  const createNote = useCreateNote();
  const summarize = useSummarizeTranscript();
  const [form, setForm] = useState<NoteForm>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});

  const set = (field: keyof NoteForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const e: FormErrors = {};
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

  const toInput = (): NoteInput => ({
    department: form.department,
    year: BigInt(form.year),
    semester: BigInt(form.semester),
    subject: form.subject,
    unit: form.unit,
    topic: form.topic,
    transcript: form.transcript,
    aiSummary: form.aiSummary,
    pdfFileId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createNote.mutate(toInput(), {
      onSuccess: () => navigate({ to: "/teacher/notes" }),
    });
  };

  const handleGenerateSummary = () => {
    if (!form.transcript.trim()) return;
    summarize.mutate(form.transcript, {
      onSuccess: (summary) => set("aiSummary", summary ?? ""),
    });
  };

  return (
    <div
      className="p-6 max-w-4xl mx-auto min-h-screen"
      data-ocid="create_note.page"
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          to="/teacher/notes"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm mb-4"
          data-ocid="create_note.back_link"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Notes
        </Link>
        <h1 className="text-3xl font-display font-bold text-gradient-blue">
          Create New Note
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Add a new academic note with transcript and AI summary
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 space-y-6"
        data-ocid="create_note.form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Department
            </Label>
            <Select
              value={form.department}
              onValueChange={(v) => set("department", v)}
            >
              <SelectTrigger
                className="bg-white/5 border-white/10 focus:border-primary/50"
                data-ocid="create_note.department_select"
              >
                <SelectValue placeholder="Select dept…" />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && (
              <p
                className="text-destructive text-xs"
                data-ocid="create_note.department.field_error"
              >
                {errors.department}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Year
            </Label>
            <Select value={form.year} onValueChange={(v) => set("year", v)}>
              <SelectTrigger
                className="bg-white/5 border-white/10 focus:border-primary/50"
                data-ocid="create_note.year_select"
              >
                <SelectValue placeholder="Select year…" />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                {YEARS.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    Year {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && (
              <p
                className="text-destructive text-xs"
                data-ocid="create_note.year.field_error"
              >
                {errors.year}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Semester
            </Label>
            <Select
              value={form.semester}
              onValueChange={(v) => set("semester", v)}
            >
              <SelectTrigger
                className="bg-white/5 border-white/10 focus:border-primary/50"
                data-ocid="create_note.semester_select"
              >
                <SelectValue placeholder="Select sem…" />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                {SEMESTERS.map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    Sem {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.semester && (
              <p
                className="text-destructive text-xs"
                data-ocid="create_note.semester.field_error"
              >
                {errors.semester}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Subject *
            </Label>
            <Input
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
              placeholder="e.g. Embedded Systems"
              className="bg-white/5 border-white/10 focus:border-primary/50"
              data-ocid="create_note.subject_input"
            />
            {errors.subject && (
              <p
                className="text-destructive text-xs"
                data-ocid="create_note.subject.field_error"
              >
                {errors.subject}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Unit *
            </Label>
            <Input
              value={form.unit}
              onChange={(e) => set("unit", e.target.value)}
              placeholder="e.g. Unit 2"
              className="bg-white/5 border-white/10 focus:border-primary/50"
              data-ocid="create_note.unit_input"
            />
            {errors.unit && (
              <p
                className="text-destructive text-xs"
                data-ocid="create_note.unit.field_error"
              >
                {errors.unit}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Topic *
            </Label>
            <Input
              value={form.topic}
              onChange={(e) => set("topic", e.target.value)}
              placeholder="e.g. Multitasking"
              className="bg-white/5 border-white/10 focus:border-primary/50"
              data-ocid="create_note.topic_input"
            />
            {errors.topic && (
              <p
                className="text-destructive text-xs"
                data-ocid="create_note.topic.field_error"
              >
                {errors.topic}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wide">
            Transcript *
          </Label>
          <Textarea
            value={form.transcript}
            onChange={(e) => set("transcript", e.target.value)}
            placeholder="Paste or type the lecture transcript here…"
            className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[200px] resize-y font-mono text-sm"
            data-ocid="create_note.transcript_textarea"
          />
          {errors.transcript && (
            <p
              className="text-destructive text-xs"
              data-ocid="create_note.transcript.field_error"
            >
              {errors.transcript}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              AI Summary
            </Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleGenerateSummary}
              disabled={summarize.isPending || !form.transcript.trim()}
              className="border-primary/30 text-primary hover:bg-primary/10 gap-2 text-xs"
              data-ocid="create_note.generate_summary_button"
            >
              {summarize.isPending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" /> Generate AI Summary
                </>
              )}
            </Button>
          </div>
          <Textarea
            value={form.aiSummary}
            onChange={(e) => set("aiSummary", e.target.value)}
            placeholder="AI-generated summary will appear here, or write your own…"
            className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[120px] resize-y"
            data-ocid="create_note.summary_textarea"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={createNote.isPending}
            className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
            data-ocid="create_note.submit_button"
          >
            {createNote.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Note
              </>
            )}
          </Button>
          <Link to="/teacher/notes">
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              data-ocid="create_note.cancel_button"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
