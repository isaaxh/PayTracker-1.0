import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { useEffect, useState } from "react";
import { useFetchUserData } from "./useFetchUserData";
import { updateFieldInDoc } from "@/services/api/firestoreApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/state/store";
import { updateUserData } from "@/services/state/user/userSlice";

export const useCalculate = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const { transactions } = useGlobal() as GlobalContextProps;

  const { userData } = useFetchUserData();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    calculateIncomeAndExpense();
  }, [transactions]);

  useEffect(() => {
    calculateMonthlyPayout();
  }, [income, expense]);

  const calculateMonthlyPayout = () => {
    if (!userData.data) return;

    let totalSum = income - expense;
    updateFieldInDoc({
      id: userData.data.uid,
      collectionName: "users",
      fieldName: 'monthlyTotal.total',
      updateValue: totalSum,
    });

    setMonthlyTotal(totalSum);
  };

  const calculateIncomeAndExpense = () => {
    if (!userData.data || !transactions) return;

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) =>
      item.type === "income"
        ? (totalIncome += item.amount)
        : (totalExpense += item.amount),
    );

    setIncome(totalIncome);
    setExpense(totalExpense);


    if (userData.data) {
      dispatch(updateUserData(
        {
          id: userData.data.uid,
          collectionName: "users",
          fieldName: "grandTotal",
          updateValue: totalIncome,
        }

      ));
      dispatch(updateUserData(
        {
          id: userData.data.uid,
          collectionName: "users",
          fieldName: "monthlyTotal.income",
          updateValue: totalIncome,
        }

      ));
      dispatch(updateUserData(
        {
          id: userData.data.uid,
          collectionName: "users",
          fieldName: "monthlyTotal.expenses",
          updateValue: totalExpense,
        }

      ));
    } else {
      console.log("Cannot update useCalculate: user data is not ready.");
    }
  };

  return { monthlyTotal, income, expense };
};
