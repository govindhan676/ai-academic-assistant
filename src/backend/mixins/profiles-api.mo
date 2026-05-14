import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProfilesLib "../lib/profiles";
import Types "../types/notes";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Principal, Types.UserProfile>,
) {
  public shared ({ caller }) func setUserProfile(name : Text) : async Types.UserProfile {
    // Existing profile: just return it; new profile: auto-assign role
    switch (ProfilesLib.getUserProfile(profiles, caller)) {
      case (?existing) existing;
      case null ProfilesLib.setUserProfile(profiles, caller, name);
    };
  };

  public query ({ caller }) func getUserProfile() : async ?Types.UserProfile {
    ProfilesLib.getUserProfile(profiles, caller);
  };

  public query ({ caller }) func getStudents() : async [Types.UserProfile] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) Runtime.trap("Unauthorized");
    ProfilesLib.getStudents(profiles);
  };
};
