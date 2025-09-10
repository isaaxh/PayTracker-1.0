import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ReactNode, useState } from "react";
import { Keyboard } from "react-native";
import { TLoginSchema, TSignupSchema } from "utils/types";
import { GlobalContextProps } from "./GlobalProvider";
import { useGlobal } from "hooks/useGlobal";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import AuthContext from "../contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextProps = {
  authState: TAuthState;
  setAuthState: React.Dispatch<React.SetStateAction<TAuthState>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signup: (data: TSignupSchema) => void;
  login: (data: TLoginSchema) => void;
  logout: () => void;
};

type TAuthState = {
  isAuthenticated: boolean | null;
  user: TUser | null;
};
type TUser = User | null;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<TAuthState>({
    isAuthenticated: null,
    user: null,
  });
  const [loading, setLoading] = useState(false);

  const { addUserDocument, setUserData, setTransactions } =
    useGlobal() as GlobalContextProps;

  const auth = FIREBASE_AUTH;

  const login = async (data: TLoginSchema) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (e: any) {
      console.log(e);
      alert("login failed:" + e.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: TSignupSchema) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      updateProfile(response.user, {
        displayName: data.name,
      });
      addUserDocument({
        data,
        uid: response.user.uid,
      });
    } catch (e: any) {
      console.log(e);
      alert("Registration failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await FIREBASE_AUTH.signOut();
    setAuthState({ isAuthenticated: null, user: null });
    setUserData(null);
    setTransactions([]);
  };

  const value: AuthContextProps = {
    authState,
    setAuthState,
    loading,
    setLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
