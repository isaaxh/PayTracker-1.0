import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { useEffect, useState } from "react";

export const useCalculate = () => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const { userData, setUserData, transactions } =
    useGlobal() as GlobalContextProps;

  useEffect(() => {
    calculateIncomeAndExpense();
  }, [transactions]);

  useEffect(() => {
    calculateMonthlyPayout();
  }, [income, expense]);

  const calculateMonthlyPayout = () => {
    if (!userData) return;

    let totalSum = income - expense;

    setGrandTotal(totalSum);
    setUserData({
      ...userData,
      monthlyTotal: { ...userData.monthlyTotal, total: totalSum },
    });
  };

  const calculateIncomeAndExpense = () => {
    if (!userData) return;

    /* let grandTotalSum = 0; */
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((item) =>
      item.type === "income"
        ? (totalIncome += item.amount)
        : (totalExpense += item.amount),
    );

    setIncome(totalIncome);
    setExpense(totalExpense);

    setUserData({
      ...userData,
      grandTotal: totalIncome,
      monthlyTotal: {
        ...userData.monthlyTotal,
        income: totalIncome,
        expenses: totalExpense,
      },
    });
  };

  return { grandTotal, income, expense };
};
