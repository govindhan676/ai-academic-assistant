import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import NotesLib "lib/notes";
import QuestionPapersLib "lib/questionpapers";
import Types "types/notes";
import MixinNotes "mixins/notes-api";
import MixinQuestionPapers "mixins/questionpapers-api";
import MixinProfiles "mixins/profiles-api";
import MixinOpenAI "mixins/openai-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Notes state
  let notesState = NotesLib.initState();

  // Question papers state
  let qpState = QuestionPapersLib.initState();
  include MixinQuestionPapers(accessControlState, qpState);

  // User profiles
  let profiles = Map.empty<Principal, Types.UserProfile>();
  include MixinProfiles(accessControlState, profiles);

  include MixinNotes(accessControlState, notesState, qpState, profiles);

  // OpenAI admin-key
  let openAIApiKey = { var value : ?Text = null };
  include MixinOpenAI(accessControlState, openAIApiKey);
};
