import { clearTransactions, fetchAllTransactionData } from './../services/state/transactions/transactionSlice';
import { useCallback, useEffect } from "react";
import { useFetchUserData } from "./useFetchUserData";
import { AppDispatch, RootState } from '@/services/state/store';
import { useDispatch, useSelector } from 'react-redux';


export const useFetchAllTransactions = () => {

  const { userData } = useFetchUserData();
  const { user } = useSelector((state: RootState) => state.authState);
  const { data: transactions, status: transactionStatus, error } = useSelector((state: RootState) => state.transactionData)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {

    if (!user?.uid && transactionStatus === 'idle') {
      dispatch(clearTransactions())
      return
    }

    if (userData?.uid && transactionStatus === 'idle') {
      dispatch(fetchAllTransactionData({
        collectionName: `users/${userData.uid}/transactions`,
        dateOrder: "desc"
      }))
    }

  }, [userData, transactionStatus, user])

  const refetch = useCallback(() => {
    if (userData?.uid) {
      dispatch(
        fetchAllTransactionData({
          collectionName: `users/${userData.uid}/transactions`,
          dateOrder: "desc",
        })
      );
    }
  }, []);

  return { transactions, error, transactionStatus, refetch };
};
