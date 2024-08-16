import { createContext } from "react";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";

export default createContext<GlobalContextProps | null>(null);
