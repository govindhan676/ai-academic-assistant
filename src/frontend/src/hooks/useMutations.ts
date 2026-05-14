import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import {
  createNote,
  deleteNote,
  setActor,
  setOpenAIApiKey,
  setUserProfile,
  summarizeTranscript,
  updateNote,
  uploadQuestionPaper,
} from "../services/backendService";
import type { NoteInput, QuestionPaperInput } from "../types";

function useActorSetup() {
  const { actor } = useActor(createActor);
  if (actor) setActor(actor);
}

export function useCreateNote() {
  const qc = useQueryClient();
  useActorSetup();
  return useMutation({
    mutationFn: (input: NoteInput) => createNote(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Note created successfully");
    },
    onError: () => toast.error("Failed to create note"),
  });
}

export function useUpdateNote() {
  const qc = useQueryClient();
  useActorSetup();
  return useMutation({
    mutationFn: ({ id, input }: { id: bigint; input: NoteInput }) =>
      updateNote(id, input),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      qc.invalidateQueries({ queryKey: ["note", id.toString()] });
      toast.success("Note updated successfully");
    },
    onError: () => toast.error("Failed to update note"),
  });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  useActorSetup();
  return useMutation({
    mutationFn: (id: bigint) => deleteNote(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Note deleted");
    },
    onError: () => toast.error("Failed to delete note"),
  });
}

export function useUploadQuestionPaper() {
  const qc = useQueryClient();
  useActorSetup();
  return useMutation({
    mutationFn: (input: QuestionPaperInput) => uploadQuestionPaper(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["question-papers"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Question paper uploaded");
    },
    onError: () => toast.error("Failed to upload question paper"),
  });
}

export function useSetUserProfile() {
  const qc = useQueryClient();
  useActorSetup();
  return useMutation({
    mutationFn: ({ name }: { name: string }) => setUserProfile(name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("Profile updated");
    },
    onError: () => toast.error("Failed to update profile"),
  });
}

export function useSummarizeTranscript() {
  useActorSetup();
  return useMutation({
    mutationFn: (transcript: string) => summarizeTranscript(transcript),
    onSuccess: () => toast.success("Summary generated"),
    onError: () => toast.error("Failed to generate summary"),
  });
}

export function useSetOpenAIKey() {
  const qc = useQueryClient();
  useActorSetup();
  return useMutation({
    mutationFn: (key: string) => setOpenAIApiKey(key),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["openai-configured"] });
      toast.success("OpenAI API key saved");
    },
    onError: () => toast.error("Failed to save API key"),
  });
}
