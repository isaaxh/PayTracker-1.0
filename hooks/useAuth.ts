import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import AuthContext from "@/services/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { TUserData } from "utils/types";
import { useGlobal } from "./useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useFetchAllTransactions } from "./useFetchAllTransactions";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { FIREBASE_AUTH, FIREBASE_DB } from "firebaseConfig";
import { AppDispatch, RootState } from "@/services/state/store";
import { useDispatch, useSelector } from "react-redux";
import { createSerializableUser, setAuthUser } from "@/services/state/auth/authSlice";

export const useAuth = () => {
  // const {
  //   authState: { user },
  //   setAuthState,
  // } = useContext(AuthContext) as AuthContextProps;

  // const { userData, setUserData } =
  //   useGlobal() as GlobalContextProps;
  // const { fetchAllTransactions } = useFetchAllTransactions();

  // const { user } = useSelector((state: RootState) => state.authState);
  // const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // dispatch(setAuthUser(createSerializableUser(user)));
        // setAuthState((prev) => ({ ...prev, user }));
      }
    });
    return () => unsubscribe();
  }, []);



  // useEffect(() => {

  //   fetchAllTransactions();
  // }, [userData]);

  return useContext(AuthContext);
};
