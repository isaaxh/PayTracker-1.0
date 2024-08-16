import GlobalContext from "@/contexts/GlobalContext";
import { TSignupSchema, Ttransaction } from "@/utils/types";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { ReactNode, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";

interface GlobalProviderProps {
  children: ReactNode;
}

export type GlobalContextProps = {
  userData: TUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<DocumentData | null>>;
  addUserDocument: (props: addUserDocumentType) => void;
  retrieveDocument: (props: retrieveDocumentType) => void;
  retrieveAllDocuments: () => void;
};

export type TUserData = {
  uid: string;
  displayName: string;
  email: string;
  date: string;
  grandTotal: number;
  totalMonthly: number;
  transactions: Ttransaction[] | [];
};

type addUserDocumentType = {
  data: TSignupSchema;
  uid: string;
  date: string;
};

type retrieveDocumentType = {
  collectionName: string;
  id: string;
};

const AuthProvider = ({ children }: GlobalProviderProps) => {
  const [userData, setUserData] = useState<TUserData | null>(null);

  const addUserDocument = async (props: addUserDocumentType) => {
    const { uid, data, date } = props;
    try {
      await setDoc(doc(FIREBASE_DB, "users", uid), {
        uid: uid,
        displayName: data.name,
        email: data.email,
        date: date,
        grandTotal: 0,
        totalMonthly: 0,
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
    addUserDocument,
    retrieveAllDocuments,
    retrieveDocument,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default AuthProvider;
