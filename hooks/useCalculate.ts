import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateFieldInDoc } from "@/services/api/firestoreApi";
import { AppDispatch } from "@/services/state/store";
import { updateUserData } from "@/services/state/user/userSlice";

import { useFetchAllTransactions } from "./useFetchAllTransactions";
import { useUserData } from "./useUserData";

export const useCalculate = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const { transactions } = useFetchAllTransactions()

  const { userData, error, status } = useUserData();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    calculateIncomeAndExpense();
  }, [transactions]);

  useEffect(() => {
    calculateMonthlyPayout();
  }, [income, expense]);

  const calculateMonthlyPayout = () => {
    if (!userData) return;

    let totalSum = income - expense;
    updateFieldInDoc({
      id: userData.uid,
      collectionName: "users",
      fieldName: 'monthlyTotal.total',
      updateValue: totalSum,
    });

    setMonthlyTotal(totalSum);
  };

  const calculateIncomeAndExpense = () => {
    if (!userData || !transactions) return;

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) =>
      item.type === "income"
        ? (totalIncome += item.amount)
        : (totalExpense += item.amount),
    );

    setIncome(totalIncome);
    setExpense(totalExpense);


    if (userData) {
      dispatch(updateUserData(
        {
          id: userData.uid,
          collectionName: "users",
          fieldName: "grandTotal",
          updateValue: totalIncome,
        }

      ));
      dispatch(updateUserData(
        {
          id: userData.uid,
          collectionName: "users",
          fieldName: "monthlyTotal.income",
          updateValue: totalIncome,
        }

      ));
      dispatch(updateUserData(
        {
          id: userData.uid,
          collectionName: "users",
          fieldName: "monthlyTotal.expenses",
          updateValue: totalExpense,
        }

      ));
    } else {
      console.log("Cannot update useCalculate: user data is not ready.");
    }
  };

  return { monthlyTotal, income, expense, status, error };
};
