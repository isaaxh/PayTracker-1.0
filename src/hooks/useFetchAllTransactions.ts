import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { useEffect } from "react";

export const useFetchAllTransactions = () => {
  const { userData, getAllDocuments } = useGlobal() as GlobalContextProps;

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const fetchAllTransactions = async () => {
    try {
      getAllDocuments({
        collectionName: `users/${userData?.uid}/transactions`,
      });
    } catch (e) {
      console.log("TransactionList: ", e);
    }
  };
  return { fetchAllTransactions };
};
