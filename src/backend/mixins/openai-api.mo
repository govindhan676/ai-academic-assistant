import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import OpenAILib "../lib/openai";

mixin (
  accessControlState : AccessControl.AccessControlState,
  openAIApiKey : { var value : ?Text },
) {
  public query func isOpenAIConfigured() : async Bool {
    openAIApiKey.value != null;
  };

  public shared ({ caller }) func setOpenAIApiKey(key : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) Runtime.trap("Unauthorized");
    openAIApiKey.value := ?key;
  };

  public shared (_) func summarizeTranscript(transcript : Text) : async ?Text {
    let key = switch (openAIApiKey.value) {
      case null { return null };
      case (?k) k;
    };
    let config = OpenAILib.configForKey(key);
    let prompt = "Summarize the following academic lecture transcript in a clear, structured way with key points:\n\n" # transcript;
    ?(await* OpenAILib.runChatCompletion(config, prompt));
  };

  public shared ({ caller }) func generateAISummary(transcript : Text) : async ?Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) Runtime.trap("Unauthorized");
    let key = switch (openAIApiKey.value) {
      case null Runtime.trap("OpenAI API key not configured");
      case (?k) k;
    };
    let config = OpenAILib.configForKey(key);
    let prompt = "Summarize the following academic lecture transcript in a clear, structured way with key points:\n\n" # transcript;
    ?(await* OpenAILib.runChatCompletion(config, prompt));
  };
};
