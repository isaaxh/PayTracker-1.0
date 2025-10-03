import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/services/state/store";
import { updateUserData } from "@/services/state/user/userSlice";

import { useFetchAllTransactions } from "./useFetchAllTransactions";
import { useUserData } from "./useUserData";
import { useFetchTransactions } from "./useTransactions";

export const useCalculate = () => {

  const { data: userData, isPending: userStatus } = useUserData();
  // const {  userData, status: userStatus } = useUserData();
  const {
    data: transactions,
    isPending: transactionStatus,
    error: transactionError,
  } = useFetchTransactions({ uid: userData?.uid ?? '' });

  const dispatch = useDispatch<AppDispatch>();

  const { income, expense, monthlyTotal } = useMemo(() => {
    if (!transactions) {
      console.log('useCalculate: No transactions');
      return { income: 0, expense: 0, monthlyTotal: 0 }
    };
    const totals = transactions?.reduce(
      (acc, item) => {
        if (item.type === "income") acc.income += item.amount;
        else acc.expense += item.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return {
      ...totals,
      monthlyTotal: totals.income - totals.expense,
    };
  }, [transactions])

  useEffect(() => {
    if (!userData) return;

    if (!userStatus) {
      const newValues = {
        grandTotal: income,
        "monthlyTotal.income": income,
        "monthlyTotal.expenses": expense,
        "monthlyTotal.total": monthlyTotal,
      };

      const hasChanged =
        userData.grandTotal !== income ||
        userData.monthlyTotal.income !== income ||
        userData.monthlyTotal.expenses !== expense ||
        userData.monthlyTotal.total !== monthlyTotal;

      if (hasChanged) {
        dispatch(
          updateUserData({
            id: userData.uid,
            collectionName: "users",
            updates: newValues,
          })
        );
      }

    }
  }, [userData, income, expense, monthlyTotal, dispatch])




  return { monthlyTotal, income, expense, transactionStatus, transactionError };
};
