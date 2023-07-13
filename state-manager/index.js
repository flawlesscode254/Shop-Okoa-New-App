import { useGlobalState, setGlobalState } from "./useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const users = useGlobalState("currentUser");
  const currentUser = users[0];
  const persist = async (set) => {
    await setGlobalState("currentUser", JSON.stringify(set));
  };
  const signOut = async () => {
    await AsyncStorage.removeItem("@authUser");
    await setGlobalState("currentUser", null);
  };
  return { currentUser, signOut, persist };
}
