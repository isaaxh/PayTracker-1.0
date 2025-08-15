import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";

export const useFetchAllTransactions = () => {
  const { userData, getAllDocuments } = useGlobal() as GlobalContextProps;

  const fetchAllTransactions = async () => {
    try {
      if (!userData) {
        console.log("no user data found");
        return;
      }
      getAllDocuments({
        collectionName: `users/${userData?.uid}/transactions`,
        sortBy: "date",
        sortOrder: "desc",
      });
    } catch (e) {
      console.log("TransactionList: ", e);
    }
  };
  return { fetchAllTransactions };
};
