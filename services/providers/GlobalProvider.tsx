import GlobalContext from "@/contexts/GlobalContext";
import { TSignupSchema, TUserData } from "utils/types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ReactNode, useState } from "react";
import { getFormattedDate } from "utils/dateHelperFn";
import {
  TTransaction,
  TTransactionType,
  transactionsSchema,
} from "@/constants/TransactionsTypes";
import { TCategoryLabel } from "@/constants/CategoriesTypes";
import { useToast } from "hooks/useToast";
import { i18n } from "../i18n/i18n";
import { TAppSettingsSchema } from "@/constants/Settings";
import { FIREBASE_DB } from "firebaseConfig";
import z, { ZodObject } from "zod";

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
  getDocument: <T>(props: TGetDocument) => Promise<T | null>;
  getAllDocuments: <T extends z.ZodRawShape>(
    props: TGetAllDocument,
    schema: ZodObject<T>
  ) => Promise<z.infer<typeof schema>[]>;
  addTransactionDoc: (props: TAddTransactionDoc) => void;
  updateFieldInDoc: (props: TUpdateFieldInDoc) => void;
  removeDocument: (props: TRemoveDocument) => void;
  appSettings: TAppSettingsSchema;
  setAppSettings: React.Dispatch<React.SetStateAction<TAppSettingsSchema>>;
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
  dateOrder: "asc" | "desc";
  filterQuery?: TFilterQuery;
  rangeFilterQuery?: TRangeFilterQuery;
  docLimit?: number | null;
};

export type TFilterQuery =
  | {
      field: "category";
      value: TCategoryLabel;
      dateOrder: "desc" | "asc";
    }
  | {
      field: "type";
      value: TTransactionType;
      dateOrder: "desc" | "asc";
    };

export type TRangeFilterQuery =
  | {
      field: "date";
      start: Date;
      end: Date;
      order: "asc" | "desc";
    }
  | {
      field: "amount";
      start: number;
      end: number;
      order: "asc" | "desc";
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

type TRemoveDocument = {
  id: string;
  collectionName: string;
};

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<TUserData | null>(null);
  const [transactions, setTransactions] = useState<TTransaction[] | []>([]);
  const [appSettings, setAppSettings] = useState<TAppSettingsSchema>({
    theme: { label: "Dark", value: "dark" },
    language: {
      label: "English",
      value: "en",
    },
    currency: {
      label: "Saudi Riyal",
      value: "SAR",
    },
  });

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

  const getAllDocuments = async <T extends z.ZodRawShape>(
    props: TGetAllDocument,
    schema: ZodObject<T>
  ): Promise<z.infer<typeof schema>[]> => {
    setLoading(true);
    const {
      collectionName,
      dateOrder,
      filterQuery,
      rangeFilterQuery,
      docLimit,
    } = props;

    try {
      const docRef = collection(FIREBASE_DB, collectionName);

      let customQueryParams = query(
        docRef,
        ...(filterQuery
          ? [where(filterQuery.field, "==", filterQuery.value)]
          : []),
        ...(rangeFilterQuery
          ? [
              where(rangeFilterQuery.field, ">=", rangeFilterQuery.start),
              where(rangeFilterQuery.field, "<=", rangeFilterQuery.end),
              orderBy(
                rangeFilterQuery.field,
                rangeFilterQuery?.order || "desc"
              ),
            ]
          : []),
        ...(!rangeFilterQuery
          ? [orderBy("date", filterQuery?.dateOrder || dateOrder)]
          : []),
        ...(docLimit ? [limit(docLimit)] : [])
      );

      const querySnapshot = await getDocs(customQueryParams);

      // Map the raw Firestore data
      const queryData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      // Perform validation using the provided schema
      const result = z.array(schema).safeParse(queryData);

      if (!result.success) {
        console.error(result.error.format());
        return []; // Return an empty array on validation failure
      } else {
        // The `result.data` is already correctly typed and validated
        return result.data;
      }
    } catch (e) {
      console.log("Failed to retrieve all documents: ", e);
      return []; // Ensure an array is always returned on error
    } finally {
      setLoading(false);
    }
  };

  const getDocument = async <T,>(props: TGetDocument): Promise<T | null> => {
    const { collectionName, id } = props;
    let data: T | null = null;
    try {
      const docRef = doc(FIREBASE_DB, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        data = docSnap.data() as T;
      }
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
          transactionData.id.toString()
        ),
        {
          id: transactionData.id,
          date: transactionData.date,
          amount: transactionData.amount,
          type: transactionData.type,
          category: transactionData.category,
          note: transactionData.note,
        }
      );
    } catch (e) {
      console.log("Error adding transaction", e);
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
      await updateDoc(userRef, {
        [fieldName]: updateValue,
      });
    } catch (e) {
      console.log("updateFieldInDoc: Error updating", e);
      showToast({
        type: "error",
        text1: i18n.t("oops"),
        text2: i18n.t("updateFailed"),
      });
    }
  };

  const removeDocument = async (props: TRemoveDocument) => {
    const { id, collectionName } = props;

    try {
      const docRef = doc(FIREBASE_DB, collectionName, id);
      await deleteDoc(docRef);
    } catch (e) {
      console.log("Error deleting document", e);
    }
  };

  const value: GlobalContextProps = {
    loading,
    userData,
    setUserData,
    transactions,
    setTransactions,
    appSettings,
    setAppSettings,
    addUserDocument,
    getAllDocuments,
    getDocument,
    addTransactionDoc,
    updateFieldInDoc,
    removeDocument,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
