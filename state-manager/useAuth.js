import { createGlobalState } from "react-hooks-global-state";
import AsyncStorage from "@react-native-async-storage/async-storage";

const user = AsyncStorage.getItem("@authUser")
  .then((first) => JSON.parse(first))
  .then((second) => {
    if (second) {
      return second;
    }
  });

const { setGlobalState, useGlobalState } = createGlobalState({
  currentUser: user ? user : null,
});

export { setGlobalState, useGlobalState };
