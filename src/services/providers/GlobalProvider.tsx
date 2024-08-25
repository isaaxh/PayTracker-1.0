import GlobalContext from "@/contexts/GlobalContext";
import { TSignupSchema, TUserData } from "@/utils/types";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { ReactNode, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { getFormattedDate } from "@/utils/dateHelperFn";

interface GlobalProviderProps {
  children: ReactNode;
}

export type GlobalContextProps = {
  userData: TUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<TUserData | null>>;
  addUserDocument: (props: addUserDocumentType) => void;
  retrieveDocument: (props: retrieveDocumentType) => void;
  retrieveAllDocuments: () => void;
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

type addUserDocumentType = {
  data: TSignupSchema;
  uid: string;
  createdAt: string;
};

type retrieveDocumentType = {
  collectionName: string;
  id: string;
};

const AuthProvider = ({ children }: GlobalProviderProps) => {
  const [userData, setUserData] = useState<TUserData | null>(null);
  const [currency, setCurrency] = useState<currencyType>({
    label: "Saudi Riyals",
    value: "SAR",
  });
  const [language, setLanguage] = useState<languageType>({
    label: "English",
    value: "ENG",
  });

  const addUserDocument = async (props: addUserDocumentType) => {
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

  const retrieveDocument = async (props: retrieveDocumentType) => {
    const { collectionName, id } = props;
    let data = null;
    try {
      console.log("retDoc");
      const docRef = doc(FIREBASE_DB, collectionName, id);
      const docSnap = await getDoc(docRef);
      data = docSnap.data();
      /* console.log("userdata global pro ", data); */
    } catch (e) {
      console.log("retDoc error");
      console.log(e);
    }

    return data;
  };

  const value: GlobalContextProps = {
    userData,
    setUserData,
    currency,
    setCurrency,
    language,
    setLanguage,
    addUserDocument,
    retrieveAllDocuments,
    retrieveDocument,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default AuthProvider;
