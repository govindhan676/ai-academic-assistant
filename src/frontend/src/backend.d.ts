import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AnalyticsData {
    notesPerDay: Array<[string, bigint]>;
    activeStudents: bigint;
    papersPerDepartment: Array<[string, bigint]>;
    totalDownloads: bigint;
}
export type Timestamp = bigint;
export interface QuestionPaperInput {
    semester: bigint;
    subject: string;
    regulation: string;
    year: bigint;
    paperType: string;
    department: string;
    pdfFileId: FileId;
}
export interface QuestionPaper {
    id: bigint;
    semester: bigint;
    subject: string;
    regulation: string;
    createdAt: Timestamp;
    year: bigint;
    paperType: string;
    department: string;
    pdfFileId: FileId;
    uploadedBy: Principal;
}
export interface NoteFilters {
    semester?: bigint;
    subject?: string;
    unit?: string;
    year?: bigint;
    department?: string;
}
export interface DashboardStats {
    totalStudents: bigint;
    totalSubjects: bigint;
    totalNotes: bigint;
    totalQuestionPapers: bigint;
    recentNotes: Array<Note>;
}
export interface NoteInput {
    topic: string;
    semester: bigint;
    subject: string;
    unit: string;
    year: bigint;
    aiSummary: string;
    department: string;
    transcript: string;
    pdfFileId: FileId;
}
export type FileId = string;
export interface UserProfile {
    principal: Principal;
    name: string;
    createdAt: Timestamp;
    role: string;
}
export interface Note {
    id: bigint;
    topic: string;
    semester: bigint;
    subject: string;
    createdAt: Timestamp;
    createdBy: Principal;
    unit: string;
    year: bigint;
    aiSummary: string;
    department: string;
    transcript: string;
    pdfFileId: FileId;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createNote(input: NoteInput): Promise<Note | null>;
    deleteNote(id: bigint): Promise<boolean>;
    generateAISummary(transcript: string): Promise<string | null>;
    getAnalytics(days: bigint): Promise<AnalyticsData>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getNote(id: bigint): Promise<Note | null>;
    getNotes(filters: NoteFilters, page: bigint, pageSize: bigint): Promise<{
        total: bigint;
        notes: Array<Note>;
    }>;
    getQuestionPapers(filters: NoteFilters, page: bigint, pageSize: bigint): Promise<{
        total: bigint;
        papers: Array<QuestionPaper>;
    }>;
    getStudents(): Promise<Array<UserProfile>>;
    getUserProfile(): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isOpenAIConfigured(): Promise<boolean>;
    searchNotes(searchTerm: string, filters: NoteFilters): Promise<Array<Note>>;
    searchQuestionPapers(searchTerm: string): Promise<Array<QuestionPaper>>;
    setOpenAIApiKey(key: string): Promise<void>;
    setUserProfile(name: string): Promise<UserProfile>;
    summarizeTranscript(transcript: string): Promise<string | null>;
    updateNote(id: bigint, input: NoteInput): Promise<Note | null>;
    uploadQuestionPaper(input: QuestionPaperInput): Promise<QuestionPaper | null>;
}
