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
import { useFetchUserData } from "./useFetchUserData";
import { AppDispatch, RootState } from "@/services/state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/services/state/user/userSlice";
import { setUser } from "@/services/state/auth/authSlice";

export const useAuth = () => {
  const {
    // authState: { user },
    // setAuthState,
  } = useContext(AuthContext) as AuthContextProps;

  // const { userData, setUserData } =
  //   useGlobal() as GlobalContextProps;
  const { fetchAllTransactions } = useFetchAllTransactions();

  const { user } = useSelector((state: RootState) => state.authState)
  const userData = useSelector((state: RootState) => state.userData)
  const dispatch = useDispatch<AppDispatch>();
  // const { userData } = useFetchUserData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        dispatch(setUser(user))
        // setAuthState((prev) => ({ ...prev, user }));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.uid && userData.status === 'idle') {

      try {
        dispatch(fetchUserData({ collectionName: 'users', id: user.uid }));
        console.log('Fetching user data for uid:', user.uid);
      } catch (error) {
        console.log('Error fetching user data:', error);

      }
    }
  }, [user]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!user?.uid) return;
  //     try {
  //       const docRef = doc(FIREBASE_DB, "users", user.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         setUserData(docSnap.data() as TUserData);
  //       } else {
  //         console.log("no such document exists");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchUserData();
  // }, [user, setUserData]);

  useEffect(() => {
    /* if (transactions.length) return; */

    fetchAllTransactions();
  }, [userData]);

  return useContext(AuthContext);
};
