import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { FIREBASE_DB } from "../../firebaseConfig";
import { TUserData } from "@/utils/types";

export const useFetchUserData = () => {
  const { userData, setUserData } = useGlobal() as GlobalContextProps;
  const {
    authState: { user },
  } = useAuth() as AuthContextProps;

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
  }, [user]);

  return userData;
};
