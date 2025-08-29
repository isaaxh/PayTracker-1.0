import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { transactionSchema } from "@/constants/Transactions";


export const useFetchAllTransactions = () => {
  const { userData, getAllDocuments, setTransactions } = useGlobal() as GlobalContextProps;

  const fetchAllTransactions = async () => {
    try {
      if (!userData) {
        return;
      }

      const allTransactions = await
        getAllDocuments({
          collectionName: `users/${userData?.uid}/transactions`,
          sortBy: "date",
          sortOrder: "desc"
        }, transactionSchema)

      setTransactions(allTransactions)
    } catch (e) {
      console.log("TransactionList: ", e);
    }
  };
  return { fetchAllTransactions };
};
