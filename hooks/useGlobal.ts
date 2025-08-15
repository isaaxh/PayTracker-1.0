import GlobalContext from "@/services/contexts/GlobalContext";
import { useContext } from "react";

export const useGlobal = () => {
  return useContext(GlobalContext);
};
