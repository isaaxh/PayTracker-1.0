import { useEffect } from "react";
import { AppDispatch, RootState } from "@/services/state/store";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";
import { clearAuthUser, createSerializableUser, setAuthUser } from "@/services/state/auth/authSlice";

export const useAuth = () => {
  const { user, status, error } = useSelector((state: RootState) => state.authState)
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     if (user) {
  //       dispatch(setAuthUser(createSerializableUser(user)));
  //     } else {
  //       dispatch(clearAuthUser());
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [dispatch]);



  return { user, status, error };
};
