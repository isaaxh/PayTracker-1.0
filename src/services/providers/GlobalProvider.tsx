import GlobalContext from "@/contexts/GlobalContext";
import { TSignupSchema, TUserData } from "@/utils/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { ReactNode, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { getFormattedDate } from "@/utils/dateHelperFn";
import { TTransaction } from "@/constants/Transactions";
import { router } from "expo-router";

interface GlobalProviderProps {
  children: ReactNode;
}

export type GlobalContextProps = {
  loading: boolean;
  userData: TUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<TUserData | null>>;
  addUserDocument: (props: TAddUserDocument) => void;
  retrieveDocument: (props: TRetrieveDocument) => void;
  retrieveAllDocuments: () => void;
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

type TRetrieveDocument = {
  collectionName: string;
  id: string;
};

type TAddTransactionDoc = {
  transactionData: TTransaction;
  uid: string;
};

const AuthProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<TUserData | null>(null);
  const [currency, setCurrency] = useState<currencyType>({
    label: "Saudi Riyals",
    value: "SAR",
  });
  const [language, setLanguage] = useState<languageType>({
    label: "English",
    value: "ENG",
  });

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
        transactions: [],
      });
      console.log("Document written successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  const retrieveAllDocuments = async () => {
    try {
      console.log("retAllDoc");
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (e) {
      console.log("retAllDoc error");
      console.log(e);
    }
  };

  const retrieveDocument = async (props: TRetrieveDocument) => {
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

      router.replace("/HomeTab");
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
    currency,
    setCurrency,
    language,
    setLanguage,
    addUserDocument,
    retrieveAllDocuments,
    retrieveDocument,
    addTransactionDoc,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default AuthProvider;
