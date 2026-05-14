import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/notes";

module {
  public type QuestionPapersState = {
    papers : Map.Map<Nat, Types.QuestionPaper>;
    state : { var nextPaperId : Nat };
  };

  public func initState() : QuestionPapersState {
    {
      papers = Map.empty<Nat, Types.QuestionPaper>();
      state = { var nextPaperId = 0 };
    };
  };

  public func uploadQuestionPaper(
    s : QuestionPapersState,
    caller : Principal,
    input : Types.QuestionPaperInput,
  ) : ?Types.QuestionPaper {
    let id = s.state.nextPaperId;
    s.state.nextPaperId += 1;
    let paper : Types.QuestionPaper = {
      id;
      department = input.department;
      year = input.year;
      semester = input.semester;
      regulation = input.regulation;
      subject = input.subject;
      paperType = input.paperType;
      pdfFileId = input.pdfFileId;
      createdAt = Time.now();
      uploadedBy = caller;
    };
    s.papers.add(id, paper);
    ?paper;
  };

  public func getQuestionPapers(
    s : QuestionPapersState,
    filters : Types.NoteFilters,
    page : Nat,
    pageSize : Nat,
  ) : { papers : [Types.QuestionPaper]; total : Nat } {
    let filtered = s.papers.values().filter(
      func(p : Types.QuestionPaper) : Bool {
        let deptOk = switch (filters.department) { case null true; case (?d) p.department == d };
        let yearOk = switch (filters.year) { case null true; case (?y) p.year == y };
        let semOk = switch (filters.semester) { case null true; case (?sem) p.semester == sem };
        deptOk and yearOk and semOk;
      }
    );
    let all = filtered.toArray();
    let total = all.size();
    let start = page * pageSize;
    let end_ = if (start + pageSize > total) total else start + pageSize;
    let slice = if (start >= total) [] else all.sliceToArray(start, end_);
    { papers = slice; total };
  };

  public func searchQuestionPapers(
    s : QuestionPapersState,
    searchTerm : Text,
  ) : [Types.QuestionPaper] {
    let lower = searchTerm.toLower();
    s.papers.values().filter(
      func(p : Types.QuestionPaper) : Bool {
        lower.size() == 0 or
          p.subject.toLower().contains(#text lower) or
          p.department.toLower().contains(#text lower) or
          p.regulation.toLower().contains(#text lower);
      }
    ).toArray();
  };
};
