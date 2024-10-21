import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { useEffect, useState } from "react";
import { useFetchUserData } from "./useFetchUserData";

export const useCalculate = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const { userData, transactions, updateFieldInDoc } =
    useGlobal() as GlobalContextProps;

  const { fetchUserData } = useFetchUserData();

  useEffect(() => {
    if (transactions.length) {
      calculateIncomeAndExpense();
    }
  }, [transactions]);

  useEffect(() => {
    if (income || expense) {
      calculateMonthlyPayout();
    }
  }, [income, expense]);

  const calculateMonthlyPayout = async () => {
    if (!userData) return;

    let totalSum = income - expense;

    await updateFieldInDoc({
      id: userData.uid,
      collectionName: "users",
      fieldName: "monthlyTotal.total",
      updateValue: totalSum,
    });

    setMonthlyTotal(totalSum);

    fetchUserData();
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

    updateFieldInDoc({
      id: userData.uid,
      collectionName: "users",
      fieldName: "grandTotal",
      updateValue: totalIncome,
    });

    updateFieldInDoc({
      id: userData.uid,
      collectionName: "users",
      fieldName: "monthlyTotal.income",
      updateValue: totalIncome,
    });

    updateFieldInDoc({
      id: userData.uid,
      collectionName: "users",
      fieldName: "monthlyTotal.expenses",
      updateValue: totalExpense,
    });
  };

  return { monthlyTotal, income, expense };
};
