import GlobalContext from "@/contexts/GlobalContext";
import { TSignupSchema, TUserData } from "@/utils/types";
import {
  Transaction,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { ReactNode, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { getFormattedDate } from "@/utils/dateHelperFn";
import {
  TTransaction,
  TTransactionType,
  transactionsSchema,
} from "@/constants/Transactions";
import { router } from "expo-router";
import { TCategoryLabel } from "@/constants/Categories";
import Toast from "react-native-toast-message";
import { useToast } from "@/hooks/useToast";

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
  currency: currencyType;
  setCurrency: React.Dispatch<React.SetStateAction<currencyType>>;
  language: languageType;
  setLanguage: React.Dispatch<React.SetStateAction<languageType>>;
};

export type languageType =
  | {
      label: "English";
      value: "ENG";
    }
  | {
      label: "Arabic";
      value: "AR";
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
      console.log("Document written successfully!");
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
        console.log("Transactions are valid!");
      }
      console.log("Retrieved all documents successfully!");
    } catch (e) {
      console.log("Failed to retrieve all documents", e);
    } finally {
      setLoading(false);
    }
  };

  /* for later use*/
  /* setData((prevData) => { */
  /*   if (!prevData) return null; */
  /**/
  /*   const newTransactions = queryData.map((data) => ({ */
  /*     id: data.id, */
  /*     date: data.date.toString(), */
  /*     amount: data.amount, */
  /*     type: data.type, */
  /*     category: data.category, */
  /*     note: data.note, */
  /*   })); */
  /**/
  /*   return { */
  /*     ...prevData, */
  /*     transactions: newTransactions, // Assign the transformed transactions to the user data */
  /*   }; */
  /* }); */

  const getDocument = async (props: TGetDocument) => {
    const { collectionName, id } = props;
    let data = null;
    try {
      const docRef = doc(FIREBASE_DB, collectionName, id);
      const docSnap = await getDoc(docRef);
      data = docSnap.data();
      console.log("Document retrieved successfully!");
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
      console.log("Transaction Added successfully! ");
      showTransactionAddedToast();
    } catch (e) {
      console.log("Failed to add transaction", e);
    } finally {
      setLoading(false);
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
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default AuthProvider;
