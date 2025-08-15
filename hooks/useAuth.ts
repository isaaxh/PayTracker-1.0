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

export const useAuth = () => {
  const {
    authState: { user },
    setAuthState,
  } = useContext(AuthContext) as AuthContextProps;

  const { userData, setUserData, transactions } =
    useGlobal() as GlobalContextProps;
  const { fetchAllTransactions } = useFetchAllTransactions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setAuthState({ user, isAuthenticated: true });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;
      try {
        const docRef = doc(FIREBASE_DB, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as TUserData);
        } else {
          console.log("no such document exists");
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, [user, setUserData]);

  useEffect(() => {
    /* if (transactions.length) return; */

    fetchAllTransactions();
  }, [userData]);

  return useContext(AuthContext);
};
