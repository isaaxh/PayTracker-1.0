import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { FIREBASE_DB } from "../../firebaseConfig";
import { TUserData } from "@/utils/types";

export const useFetchUserData = () => {
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useGlobal() as GlobalContextProps;
  const {
    authState: { user },
  } = useAuth() as AuthContextProps;

  const fetchUserData = async () => {
    if (!user?.uid) return;
    try {
      const docRef = doc(FIREBASE_DB, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data() as TUserData);
        console.log("User data fetch successful");
      } else {
        console.log("User data does not exist");
      }
    } catch (e) {
      console.log("User data fetch failed: ", e);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  return { userData, fetchUserData, loading };
};
