import Principal "mo:core/Principal";
import Common "common";

module {
  public type Note = {
    id : Nat;
    department : Text;
    year : Nat;
    semester : Nat;
    subject : Text;
    unit : Text;
    topic : Text;
    transcript : Text;
    aiSummary : Text;
    pdfFileId : Common.FileId;
    createdAt : Common.Timestamp;
    createdBy : Principal;
  };

  public type NoteInput = {
    department : Text;
    year : Nat;
    semester : Nat;
    subject : Text;
    unit : Text;
    topic : Text;
    transcript : Text;
    aiSummary : Text;
    pdfFileId : Common.FileId;
  };

  public type NoteFilters = {
    department : ?Text;
    year : ?Nat;
    semester : ?Nat;
    subject : ?Text;
    unit : ?Text;
  };

  public type QuestionPaper = {
    id : Nat;
    department : Text;
    year : Nat;
    semester : Nat;
    regulation : Text;
    subject : Text;
    paperType : Text;
    pdfFileId : Common.FileId;
    createdAt : Common.Timestamp;
    uploadedBy : Principal;
  };

  public type QuestionPaperInput = {
    department : Text;
    year : Nat;
    semester : Nat;
    regulation : Text;
    subject : Text;
    paperType : Text;
    pdfFileId : Common.FileId;
  };

  public type DashboardStats = {
    totalNotes : Nat;
    totalSubjects : Nat;
    totalStudents : Nat;
    totalQuestionPapers : Nat;
    recentNotes : [Note];
  };

  public type AnalyticsData = {
    notesPerDay : [(Text, Nat)];
    papersPerDepartment : [(Text, Nat)];
    totalDownloads : Nat;
    activeStudents : Nat;
  };

  public type UserProfile = {
    principal : Principal;
    name : Text;
    role : Text;
    createdAt : Common.Timestamp;
  };
};
