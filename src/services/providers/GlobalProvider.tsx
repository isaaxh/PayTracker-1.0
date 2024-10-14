import GlobalContext from "@/contexts/GlobalContext";
import { TSignupSchema, TUserData } from "@/utils/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ReactNode, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { getFormattedDate } from "@/utils/dateHelperFn";
import {
  TTransaction,
  TTransactionType,
  transactionsSchema,
} from "@/constants/Transactions";
import { TCategoryLabel } from "@/constants/Categories";
import { useToast } from "@/hooks/useToast";
import { i18n } from "../i18n/i18n";

interface GlobalProviderProps {
  children: ReactNode;
}

export type GlobalContextProps = {
  loading: boolean;
  userData: TUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<TUserData | null>>;
  transactions: TTransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<TTransaction[]>>;
  addUserDocument: (props: TAddUserDocument) => void;
  getDocument: (props: TGetDocument) => void;
  getAllDocuments: (props: TGetAllDocument) => void;
  addTransactionDoc: (props: TAddTransactionDoc) => void;
  updateFieldInDoc: (props: TUpdateFieldInDoc) => void;
  currency: currencyType;
  setCurrency: React.Dispatch<React.SetStateAction<currencyType>>;
  language: languageType;
  setLanguage: React.Dispatch<React.SetStateAction<languageType>>;
};

export type languageType =
  | {
      label: "English";
      value: "en";
    }
  | {
      label: "Arabic";
      value: "ar";
    };
export type currencyType =
  | {
      label: "Saudi Riyals";
      value: "SAR";
    }
  | {
      label: "US Dollar";
      value: "USD";
    };

type TAddUserDocument = {
  data: TSignupSchema;
  uid: string;
  createdAt: string;
};

type TGetDocument = {
  collectionName: string;
  id: string;
};

type TGetAllDocument = {
  collectionName: string;
};

type TAddTransactionDoc = {
  transactionData: TTransaction;
  uid: string;
};

type TUpdateFieldInDoc = {
  id: string;
  collectionName: string;
  fieldName: string;
  updateValue: string | number;
};

const AuthProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<TUserData | null>(null);
  const [transactions, setTransactions] = useState<TTransaction[] | []>([]);
  const [currency, setCurrency] = useState<currencyType>({
    label: "Saudi Riyals",
    value: "SAR",
  });
  const [language, setLanguage] = useState<languageType>({
    label: "English",
    value: "ENG",
  });
  const { showTransactionAddedToast } = useToast();
  const { showToast } = useToast();

  const addUserDocument = async (props: TAddUserDocument) => {
    setLoading(true);
    const { uid, data, createdAt } = props;
    try {
      await setDoc(doc(FIREBASE_DB, "users", uid), {
        uid: uid,
        displayName: data.name,
        email: data.email,
        createdAt: createdAt,
        grandTotal: 0,
        monthlyTotal: {
          month: getFormattedDate(),
          income: 0,
          expenses: 0,
          total: 0,
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  const getAllDocuments = async (props: TGetAllDocument) => {
    setLoading(true);
    const { collectionName } = props;
    try {
      const querySnapshot = await getDocs(
        collection(FIREBASE_DB, collectionName),
      );
      const queryData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      const newTransactions: TTransaction[] = queryData.map((data) => ({
        id: data.id,
        date: data.date.toString(),
        amount: data.amount as number,
        type: data.type as TTransactionType,
        category: data.category as TCategoryLabel,
        note: data.note,
      }));

      const result = transactionsSchema.safeParse(newTransactions);

      if (!result.success) {
        console.error(result.error.format());
      } else {
        setTransactions(() => {
          return [...(newTransactions.length ? newTransactions : [])];
        });
      }
    } catch (e) {
      console.log("Failed to retrieve all documents", e);
    } finally {
      setLoading(false);
    }
  };

  const getDocument = async (props: TGetDocument) => {
    const { collectionName, id } = props;
    let data = null;
    try {
      const docRef = doc(FIREBASE_DB, collectionName, id);
      const docSnap = await getDoc(docRef);
      data = docSnap.data();
    } catch (e) {
      console.log("Error retrieving document: ", e);
    }

    return data;
  };

  const addTransactionDoc = async (props: TAddTransactionDoc) => {
    setLoading(true);
    const { uid, transactionData } = props;
    try {
      await setDoc(
        doc(
          FIREBASE_DB,
          `users/${uid}/transactions`,
          transactionData.id.toString(),
        ),
        {
          id: transactionData.id,
          date: transactionData.date,
          amount: transactionData.amount,
          type: transactionData.type,
          category: transactionData.category,
          note: transactionData.note,
        },
      );
    } catch (e) {
      console.log("Failed to add transaction", e);
      showToast({
        type: "error",
        text1: i18n.t("oops"),
        text2: i18n.t("transactionFailed"),
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFieldInDoc = async (props: TUpdateFieldInDoc) => {
    const { id, collectionName, fieldName, updateValue } = props;
    const userRef = doc(FIREBASE_DB, collectionName, id);
    try {
      showToast({
        type: "info",
        text1: i18n.t("inProgress"),
        text2: i18n.t("pleaseWait"),
      });
      await updateDoc(userRef, {
        [fieldName]: updateValue,
      });

      showToast({
        type: "success",
        text1: i18n.t("successful"),
        text2: i18n.t("updateSuccessful"),
      });
    } catch (e) {
      console.log("updateFieldInDoc: failed", e);
      showToast({
        type: "error",
        text1: i18n.t("oops"),
        text2: i18n.t("updateFailed"),
      });
    }
  };

  const value: GlobalContextProps = {
    loading,
    userData,
    setUserData,
    transactions,
    setTransactions,
    currency,
    setCurrency,
    language,
    setLanguage,
    addUserDocument,
    getAllDocuments,
    getDocument,
    addTransactionDoc,
    updateFieldInDoc,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default AuthProvider;
