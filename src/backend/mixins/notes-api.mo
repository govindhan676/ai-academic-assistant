import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import NotesLib "../lib/notes";
import Types "../types/notes";
import QuestionPapersLib "../lib/questionpapers";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

mixin (
  accessControlState : AccessControl.AccessControlState,
  notesState : NotesLib.NotesState,
  qpState : QuestionPapersLib.QuestionPapersState,
  profiles : Map.Map<Principal, Types.UserProfile>,
) {
  public shared ({ caller }) func createNote(input : Types.NoteInput) : async ?Types.Note {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) Runtime.trap("Unauthorized");
    NotesLib.createNote(notesState, caller, input);
  };

  public shared ({ caller }) func updateNote(id : Nat, input : Types.NoteInput) : async ?Types.Note {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) Runtime.trap("Unauthorized");
    NotesLib.updateNote(notesState, caller, id, input);
  };

  public shared ({ caller }) func deleteNote(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) Runtime.trap("Unauthorized");
    NotesLib.deleteNote(notesState, caller, id);
  };

  public query func getNotes(filters : Types.NoteFilters, page : Nat, pageSize : Nat) : async { notes : [Types.Note]; total : Nat } {
    NotesLib.getNotes(notesState, filters, page, pageSize);
  };

  public query func searchNotes(searchTerm : Text, filters : Types.NoteFilters) : async [Types.Note] {
    NotesLib.searchNotes(notesState, searchTerm, filters);
  };

  public query func getNote(id : Nat) : async ?Types.Note {
    NotesLib.getNote(notesState, id);
  };

  public query func getDashboardStats() : async Types.DashboardStats {
    let studentsCount = profiles.values().toArray().filter(func(p) { p.role == "student" }).size();
    NotesLib.getDashboardStats(notesState, qpState.papers.size(), studentsCount);
  };

  public query ({ caller }) func getAnalytics(days : Nat) : async Types.AnalyticsData {
    NotesLib.getAnalytics(notesState, qpState.papers, days);
  };
};
