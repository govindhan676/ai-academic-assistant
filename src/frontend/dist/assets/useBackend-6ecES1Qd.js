import "./index--tQIKzjM.js";
import { u as useActor, j as useQuery, s as setActor, c as createActor, k as getNotes, l as getNote, m as searchNotes, n as getQuestionPapers, o as searchQuestionPapers, p as getDashboardStats, q as getStudents, r as getAnalytics, t as isOpenAIConfigured } from "./backendService-DLDa8DMz.js";
function useNotes(filters, page) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["notes", filters, page],
    queryFn: () => getNotes(filters, page),
    enabled: !!actor && !isFetching
  });
}
function useNote(id) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["note", id.toString()],
    queryFn: () => getNote(id),
    enabled: !!id && !!actor && !isFetching
  });
}
function useSearchNotes(query, filters) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["notes-search", query, filters],
    queryFn: () => searchNotes(query, filters),
    enabled: query.length > 0 && !!actor && !isFetching
  });
}
function useQuestionPapers(filters, page) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["question-papers", filters, page],
    queryFn: () => getQuestionPapers(filters, page),
    enabled: !!actor && !isFetching
  });
}
function useSearchQuestionPapers(query) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["papers-search", query],
    queryFn: () => searchQuestionPapers(query),
    enabled: query.length > 0 && !!actor && !isFetching
  });
}
function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    enabled: !!actor && !isFetching
  });
}
function useStudents() {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    enabled: !!actor && !isFetching
  });
}
function useAnalytics(days) {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["analytics", days],
    queryFn: () => getAnalytics(days),
    enabled: !!actor && !isFetching
  });
}
function useOpenAIConfigured() {
  const { actor, isFetching } = useActor(createActor);
  if (actor) setActor(actor);
  return useQuery({
    queryKey: ["openai-configured"],
    queryFn: isOpenAIConfigured,
    enabled: !!actor && !isFetching
  });
}
export {
  useAnalytics as a,
  useNotes as b,
  useSearchNotes as c,
  useNote as d,
  useQuestionPapers as e,
  useStudents as f,
  useOpenAIConfigured as g,
  useSearchQuestionPapers as h,
  useDashboardStats as u
};
