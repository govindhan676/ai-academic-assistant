import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  getAnalytics,
  getDashboardStats,
  getNote,
  getNotes,
  getQuestionPapers,
  getStudents,
  getUserProfile,
  isOpenAIConfigured,
  searchNotes,
  searchQuestionPapers,
  setActor,
} from "../services/backendService";
import type { NoteFilters } from "../types";

/** Initialise the service actor from the core-infrastructure hook */
export function useInitActor() {
  const { actor } = useActor(createActor);
  if (actor) setActor(actor);
  return actor;
}

export function useNotes(filters: NoteFilters, page: number) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["notes", filters, page],
    queryFn: () => getNotes(filters, page),
    enabled: !!actor && !isFetching,
  });
}

export function useNote(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["note", id.toString()],
    queryFn: () => getNote(id),
    enabled: !!id && !!actor && !isFetching,
  });
}

export function useSearchNotes(query: string, filters: NoteFilters) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["notes-search", query, filters],
    queryFn: () => searchNotes(query, filters),
    enabled: query.length > 0 && !!actor && !isFetching,
  });
}

export function useQuestionPapers(filters: NoteFilters, page: number) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["question-papers", filters, page],
    queryFn: () => getQuestionPapers(filters, page),
    enabled: !!actor && !isFetching,
  });
}

export function useSearchQuestionPapers(query: string) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["papers-search", query],
    queryFn: () => searchQuestionPapers(query),
    enabled: query.length > 0 && !!actor && !isFetching,
  });
}

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    enabled: !!actor && !isFetching,
  });
}

export function useStudents() {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    enabled: !!actor && !isFetching,
  });
}

export function useAnalytics(days: number) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["analytics", days],
    queryFn: () => getAnalytics(days),
    enabled: !!actor && !isFetching,
  });
}

export function useOpenAIConfigured() {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["openai-configured"],
    queryFn: isOpenAIConfigured,
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    enabled: !!actor && !isFetching,
  });
}
