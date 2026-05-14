import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import QuestionPapersLib "../lib/questionpapers";
import Types "../types/notes";

mixin (
  accessControlState : AccessControl.AccessControlState,
  qpState : QuestionPapersLib.QuestionPapersState,
) {
  public shared ({ caller }) func uploadQuestionPaper(input : Types.QuestionPaperInput) : async ?Types.QuestionPaper {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) Runtime.trap("Unauthorized");
    QuestionPapersLib.uploadQuestionPaper(qpState, caller, input);
  };

  public query func getQuestionPapers(filters : Types.NoteFilters, page : Nat, pageSize : Nat) : async { papers : [Types.QuestionPaper]; total : Nat } {
    QuestionPapersLib.getQuestionPapers(qpState, filters, page, pageSize);
  };

  public query func searchQuestionPapers(searchTerm : Text) : async [Types.QuestionPaper] {
    QuestionPapersLib.searchQuestionPapers(qpState, searchTerm);
  };
};
