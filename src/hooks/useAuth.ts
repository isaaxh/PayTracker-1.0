import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import AuthContext from "@/services/contexts/AuthContext";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export const useAuth = () => {
  const { setAuthState } = useContext(AuthContext) as AuthContextProps;

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setAuthState({ user, isAuthenticated: true });
      }
    });
  }, []);

  return useContext(AuthContext);
};
