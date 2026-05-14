import type { createActor } from "../backend";
import type {
  AnalyticsData,
  DashboardStats,
  Note,
  NoteFilters,
  NoteInput,
  PaginatedNotes,
  PaginatedPapers,
  QuestionPaper,
  QuestionPaperInput,
  UserProfile,
} from "../types";

let _actor: ReturnType<typeof createActor> | null = null;

export function setActor(actor: ReturnType<typeof createActor>) {
  _actor = actor;
}

function getActor() {
  if (!_actor) throw new Error("Actor not initialized");
  return _actor;
}

export async function getNotes(
  filters: NoteFilters,
  page: number,
  pageSize = 10,
): Promise<PaginatedNotes> {
  const result = await getActor().getNotes(
    filters,
    BigInt(page),
    BigInt(pageSize),
  );
  return { notes: result.notes, total: result.total };
}

export async function getNote(id: bigint): Promise<Note | null> {
  return getActor().getNote(id);
}

export async function createNote(input: NoteInput): Promise<Note | null> {
  return getActor().createNote(input);
}

export async function updateNote(
  id: bigint,
  input: NoteInput,
): Promise<Note | null> {
  return getActor().updateNote(id, input);
}

export async function deleteNote(id: bigint): Promise<boolean> {
  return getActor().deleteNote(id);
}

export async function searchNotes(
  query: string,
  filters: NoteFilters,
): Promise<Note[]> {
  return getActor().searchNotes(query, filters);
}

export async function getQuestionPapers(
  filters: NoteFilters,
  page: number,
  pageSize = 10,
): Promise<PaginatedPapers> {
  const result = await getActor().getQuestionPapers(
    filters,
    BigInt(page),
    BigInt(pageSize),
  );
  return { papers: result.papers, total: result.total };
}

export async function uploadQuestionPaper(
  input: QuestionPaperInput,
): Promise<QuestionPaper | null> {
  return getActor().uploadQuestionPaper(input);
}

export async function deleteQuestionPaper(_id: bigint): Promise<boolean> {
  // Not yet available in backend interface — graceful noop
  console.warn("deleteQuestionPaper not implemented in backend");
  return false;
}

export async function searchQuestionPapers(
  query: string,
): Promise<QuestionPaper[]> {
  return getActor().searchQuestionPapers(query);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return getActor().getDashboardStats();
}

export async function getStudents(): Promise<UserProfile[]> {
  return getActor().getStudents();
}

export async function getAnalytics(days: number): Promise<AnalyticsData> {
  return getActor().getAnalytics(BigInt(days));
}

export async function summarizeTranscript(
  transcript: string,
): Promise<string | null> {
  return getActor().summarizeTranscript(transcript);
}

export async function isOpenAIConfigured(): Promise<boolean> {
  return getActor().isOpenAIConfigured();
}

export async function setOpenAIApiKey(key: string): Promise<void> {
  return getActor().setOpenAIApiKey(key);
}

export async function setUserProfile(
  name: string,
): Promise<UserProfile | null> {
  return getActor().setUserProfile(name);
}

export async function getUserProfile(): Promise<UserProfile | null> {
  return getActor().getUserProfile();
}
