import { createContext } from "react";
import { AuthContextProps } from "@/services/providers/AuthProvider";

export default createContext<AuthContextProps | null>(null);
