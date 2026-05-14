import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Set "mo:core/Set";
import Types "../types/notes";

module {
  public type NotesState = {
    notes : Map.Map<Nat, Types.Note>;
    state : { var nextNoteId : Nat };
  };

  public func initState() : NotesState {
    {
      notes = Map.empty<Nat, Types.Note>();
      state = { var nextNoteId = 0 };
    };
  };

  public func createNote(
    s : NotesState,
    caller : Principal,
    input : Types.NoteInput,
  ) : ?Types.Note {
    let id = s.state.nextNoteId;
    s.state.nextNoteId += 1;
    let note : Types.Note = {
      id;
      department = input.department;
      year = input.year;
      semester = input.semester;
      subject = input.subject;
      unit = input.unit;
      topic = input.topic;
      transcript = input.transcript;
      aiSummary = input.aiSummary;
      pdfFileId = input.pdfFileId;
      createdAt = Time.now();
      createdBy = caller;
    };
    s.notes.add(id, note);
    ?note;
  };

  public func updateNote(
    s : NotesState,
    _caller : Principal,
    id : Nat,
    input : Types.NoteInput,
  ) : ?Types.Note {
    switch (s.notes.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.Note = {
          existing with
          department = input.department;
          year = input.year;
          semester = input.semester;
          subject = input.subject;
          unit = input.unit;
          topic = input.topic;
          transcript = input.transcript;
          aiSummary = input.aiSummary;
          pdfFileId = input.pdfFileId;
        };
        s.notes.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteNote(
    s : NotesState,
    _caller : Principal,
    id : Nat,
  ) : Bool {
    switch (s.notes.get(id)) {
      case null false;
      case (?_) {
        s.notes.remove(id);
        true;
      };
    };
  };

  public func getNotes(
    s : NotesState,
    filters : Types.NoteFilters,
    page : Nat,
    pageSize : Nat,
  ) : { notes : [Types.Note]; total : Nat } {
    let filtered = s.notes.values().filter(
      func(n : Types.Note) : Bool {
        let deptOk = switch (filters.department) { case null true; case (?d) n.department == d };
        let yearOk = switch (filters.year) { case null true; case (?y) n.year == y };
        let semOk = switch (filters.semester) { case null true; case (?sem) n.semester == sem };
        let subjOk = switch (filters.subject) { case null true; case (?sub) n.subject == sub };
        let unitOk = switch (filters.unit) { case null true; case (?u) n.unit == u };
        deptOk and yearOk and semOk and subjOk and unitOk;
      }
    );
    let all = filtered.toArray();
    let total = all.size();
    let start = page * pageSize;
    let end_ = if (start + pageSize > total) total else start + pageSize;
    let slice = if (start >= total) [] else all.sliceToArray(start, end_);
    { notes = slice; total };
  };

  public func searchNotes(
    s : NotesState,
    searchTerm : Text,
    filters : Types.NoteFilters,
  ) : [Types.Note] {
    let lower = searchTerm.toLower();
    s.notes.values().filter(
      func(n : Types.Note) : Bool {
        let matchesSearch = lower.size() == 0 or
          n.subject.toLower().contains(#text lower) or
          n.unit.toLower().contains(#text lower) or
          n.topic.toLower().contains(#text lower) or
          n.transcript.toLower().contains(#text lower);
        let deptOk = switch (filters.department) { case null true; case (?d) n.department == d };
        let yearOk = switch (filters.year) { case null true; case (?y) n.year == y };
        let semOk = switch (filters.semester) { case null true; case (?sem) n.semester == sem };
        matchesSearch and deptOk and yearOk and semOk;
      }
    ).toArray();
  };

  public func getNote(
    s : NotesState,
    id : Nat,
  ) : ?Types.Note {
    s.notes.get(id);
  };

  public func getDashboardStats(
    s : NotesState,
    questionPapersCount : Nat,
    studentsCount : Nat,
  ) : Types.DashboardStats {
    let subjects = Set.empty<Text>();
    s.notes.values().forEach(func(n : Types.Note) { subjects.add(n.subject) });
    let allNotes = s.notes.values().toArray();
    let sz = allNotes.size();
    let recent = if (sz <= 5) allNotes
      else allNotes.sliceToArray((sz - 5 : Nat), sz);
    {
      totalNotes = s.notes.size();
      totalSubjects = subjects.size();
      totalStudents = studentsCount;
      totalQuestionPapers = questionPapersCount;
      recentNotes = recent;
    };
  };

  public func getAnalytics(
    _s : NotesState,
    papers : Map.Map<Nat, Types.QuestionPaper>,
    _days : Nat,
  ) : Types.AnalyticsData {
    let deptMap = Map.empty<Text, Nat>();
    papers.values().forEach(
      func(p : Types.QuestionPaper) {
        let prev = switch (deptMap.get(p.department)) { case null 0; case (?v) v };
        deptMap.add(p.department, prev + 1);
      }
    );
    {
      notesPerDay = [];
      papersPerDepartment = deptMap.entries().toArray();
      totalDownloads = 0;
      activeStudents = 0;
    };
  };
};
