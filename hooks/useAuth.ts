import { useEffect } from "react";
import { RootState } from "@/services/state/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user, status, error } = useSelector((state: RootState) => state.authState)

  useEffect(() => {
  }, []);



  return { user, status, error };
};
