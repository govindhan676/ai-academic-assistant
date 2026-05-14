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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save, Sparkles, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNote } from "../../hooks/useBackend";
import {
  useDeleteNote,
  useSummarizeTranscript,
  useUpdateNote,
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

function FieldSkeleton() {
  return <Skeleton className="h-10 w-full bg-white/10 rounded-lg" />;
}

export default function EditNotePage() {
  const navigate = useNavigate();
  const { noteId } = useParams({ strict: false }) as { noteId: string };
  const noteIdBig = BigInt(noteId);

  const noteQuery = useNote(noteIdBig);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const summarize = useSummarizeTranscript();

  const [form, setForm] = useState<NoteForm>({
    department: "",
    year: "",
    semester: "",
    subject: "",
    unit: "",
    topic: "",
    transcript: "",
    aiSummary: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showDelete, setShowDelete] = useState(false);
  const [populated, setPopulated] = useState(false);

  useEffect(() => {
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
        aiSummary: n.aiSummary,
      });
      setPopulated(true);
    }
  }, [noteQuery.data, populated]);

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
    pdfFileId: noteQuery.data?.pdfFileId ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    updateNote.mutate(
      { id: noteIdBig, input: toInput() },
      { onSuccess: () => navigate({ to: "/teacher/notes" }) },
    );
  };

  const handleGenerateSummary = () => {
    if (!form.transcript.trim()) return;
    summarize.mutate(form.transcript, {
      onSuccess: (summary) => set("aiSummary", summary ?? ""),
    });
  };

  const handleDelete = () => {
    deleteNote.mutate(noteIdBig, {
      onSuccess: () => navigate({ to: "/teacher/notes" }),
    });
  };

  const isLoading = noteQuery.isLoading;

  return (
    <div
      className="p-6 max-w-4xl mx-auto min-h-screen"
      data-ocid="edit_note.page"
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          to="/teacher/notes"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm mb-4"
          data-ocid="edit_note.back_link"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Notes
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-gradient-blue">
              Edit Note
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Update the content and metadata of this note
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowDelete(true)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
            data-ocid="edit_note.delete_button"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 space-y-6"
        data-ocid="edit_note.form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Department
            </Label>
            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Select
                value={form.department}
                onValueChange={(v) => set("department", v)}
              >
                <SelectTrigger
                  className="bg-white/5 border-white/10 focus:border-primary/50"
                  data-ocid="edit_note.department_select"
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
            )}
            {errors.department && (
              <p
                className="text-destructive text-xs"
                data-ocid="edit_note.department.field_error"
              >
                {errors.department}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Year
            </Label>
            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Select value={form.year} onValueChange={(v) => set("year", v)}>
                <SelectTrigger
                  className="bg-white/5 border-white/10 focus:border-primary/50"
                  data-ocid="edit_note.year_select"
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
            )}
            {errors.year && (
              <p
                className="text-destructive text-xs"
                data-ocid="edit_note.year.field_error"
              >
                {errors.year}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Semester
            </Label>
            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Select
                value={form.semester}
                onValueChange={(v) => set("semester", v)}
              >
                <SelectTrigger
                  className="bg-white/5 border-white/10 focus:border-primary/50"
                  data-ocid="edit_note.semester_select"
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
            )}
            {errors.semester && (
              <p
                className="text-destructive text-xs"
                data-ocid="edit_note.semester.field_error"
              >
                {errors.semester}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Subject *
            </Label>
            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Input
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
                placeholder="e.g. Embedded Systems"
                className="bg-white/5 border-white/10 focus:border-primary/50"
                data-ocid="edit_note.subject_input"
              />
            )}
            {errors.subject && (
              <p
                className="text-destructive text-xs"
                data-ocid="edit_note.subject.field_error"
              >
                {errors.subject}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Unit *
            </Label>
            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Input
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
                placeholder="e.g. Unit 2"
                className="bg-white/5 border-white/10 focus:border-primary/50"
                data-ocid="edit_note.unit_input"
              />
            )}
            {errors.unit && (
              <p
                className="text-destructive text-xs"
                data-ocid="edit_note.unit.field_error"
              >
                {errors.unit}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Topic *
            </Label>
            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Input
                value={form.topic}
                onChange={(e) => set("topic", e.target.value)}
                placeholder="e.g. Multitasking"
                className="bg-white/5 border-white/10 focus:border-primary/50"
                data-ocid="edit_note.topic_input"
              />
            )}
            {errors.topic && (
              <p
                className="text-destructive text-xs"
                data-ocid="edit_note.topic.field_error"
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
          {isLoading ? (
            <Skeleton className="h-[200px] w-full bg-white/10 rounded-lg" />
          ) : (
            <Textarea
              value={form.transcript}
              onChange={(e) => set("transcript", e.target.value)}
              placeholder="Lecture transcript…"
              className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[200px] resize-y font-mono text-sm"
              data-ocid="edit_note.transcript_textarea"
            />
          )}
          {errors.transcript && (
            <p
              className="text-destructive text-xs"
              data-ocid="edit_note.transcript.field_error"
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
              data-ocid="edit_note.generate_summary_button"
            >
              {summarize.isPending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" /> Regenerate Summary
                </>
              )}
            </Button>
          </div>
          {isLoading ? (
            <Skeleton className="h-[120px] w-full bg-white/10 rounded-lg" />
          ) : (
            <Textarea
              value={form.aiSummary}
              onChange={(e) => set("aiSummary", e.target.value)}
              placeholder="AI-generated summary…"
              className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[120px] resize-y"
              data-ocid="edit_note.summary_textarea"
            />
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={updateNote.isPending || isLoading}
            className="bg-gradient-brand hover:opacity-90 glow-blue gap-2 transition-smooth"
            data-ocid="edit_note.submit_button"
          >
            {updateNote.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Updating…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Update Note
              </>
            )}
          </Button>
          <Link to="/teacher/notes">
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              data-ocid="edit_note.cancel_button"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </motion.form>

      <AnimatePresence>
        {showDelete && (
          <Dialog open onOpenChange={() => setShowDelete(false)}>
            <DialogContent
              className="glass border-white/10"
              data-ocid="edit_note.dialog"
            >
              <DialogHeader>
                <DialogTitle className="text-gradient-blue">
                  Delete Note
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Are you sure you want to delete{" "}
                  <span className="text-foreground font-medium">
                    "{form.topic}"
                  </span>
                  ? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowDelete(false)}
                  data-ocid="edit_note.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteNote.isPending}
                  className="bg-destructive/80 hover:bg-destructive"
                  data-ocid="edit_note.confirm_button"
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
