import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/notes";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

module {
  public func setUserProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    name : Text,
  ) : Types.UserProfile {
    // First registered user automatically becomes teacher; all others are students
    let role = if (profiles.size() == 0) "teacher" else "student";
    let profile : Types.UserProfile = {
      principal = caller;
      name;
      role;
      createdAt = Time.now();
    };
    profiles.add(caller, profile);
    profile;
  };

  public func getUserProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
  ) : ?Types.UserProfile {
    profiles.get(caller);
  };

  public func getStudents(
    profiles : Map.Map<Principal, Types.UserProfile>,
  ) : [Types.UserProfile] {
    profiles.values().toArray().filter<Types.UserProfile>(func(p) { p.role == "student" });
  };
};
