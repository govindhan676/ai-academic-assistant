import type { Principal } from "@icp-sdk/core/principal";
import type {
  AnalyticsData as BackendAnalyticsData,
  DashboardStats as BackendDashboardStats,
  Note as BackendNote,
  NoteFilters as BackendNoteFilters,
  NoteInput as BackendNoteInput,
  QuestionPaper as BackendQuestionPaper,
  QuestionPaperInput as BackendQuestionPaperInput,
  UserProfile as BackendUserProfile,
  UserRole as BackendUserRole,
} from "../backend";

// Re-export backend types directly
export type Note = BackendNote;
export type QuestionPaper = BackendQuestionPaper;
export type UserProfile = BackendUserProfile;
export type AnalyticsData = BackendAnalyticsData;
export type DashboardStats = BackendDashboardStats;
export type NoteFilters = BackendNoteFilters;
export type NoteInput = BackendNoteInput;
export type QuestionPaperInput = BackendQuestionPaperInput;
export type UserRole = BackendUserRole;
export type { Principal };

export type AppUserRole = "teacher" | "student";

export interface AuthUser {
  principal: string;
  name: string;
  role: AppUserRole;
}

export interface PaginatedNotes {
  notes: Note[];
  total: bigint;
}

export interface PaginatedPapers {
  papers: QuestionPaper[];
  total: bigint;
}
