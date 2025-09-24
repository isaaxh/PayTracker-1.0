import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { transactionSchema } from "@/constants/TransactionsTypes";
import { useEffect } from "react";
import { useFetchUserData } from "./useFetchUserData";


export const useFetchAllTransactions = () => {
  const { getAllDocuments, transactions, setTransactions } = useGlobal() as GlobalContextProps;

  const { userData, error, status: userStatus } = useFetchUserData();

  useEffect(() => {
    if (userData && userStatus === 'idle') {

      const fetchAllTransactions = async () => {
        try {
          if (!userData) {
            return;
          }

          const allTransactions = await
            getAllDocuments({
              collectionName: `users/${userData.uid}/transactions`,
              dateOrder: "desc"
            }, transactionSchema)

          console.log('userData:', userData);

          setTransactions(allTransactions)
        } catch (e) {
          console.log("TransactionList: ", e);
        }
      };

      fetchAllTransactions();
    }
  }, [userData, userStatus])

  return { transactions };
};
