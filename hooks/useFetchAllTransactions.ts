import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { transactionSchema } from "@/constants/TransactionsTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/services/state/store";


export const useFetchAllTransactions = () => {
  const { getAllDocuments, setTransactions } = useGlobal() as GlobalContextProps;
  const userData = useSelector((state: RootState) => state.userData)

  const fetchAllTransactions = async () => {
    try {
      if (!userData) {
        console.log('No user data available in useFetchAllTransactions');

        return;
      }

      // const allTransactions = await
      //   getAllDocuments({
      //     collectionName: `users/${userData.data?.uid}/transactions`,
      //     dateOrder: "desc"
      //   }, transactionSchema)

      // setTransactions(allTransactions)
    } catch (e) {
      console.log("TransactionList: ", e);
    }
  };
  return { fetchAllTransactions };
};
