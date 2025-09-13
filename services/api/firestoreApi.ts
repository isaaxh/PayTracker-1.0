import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "firebaseConfig";

export type TGetDocument = {
    collectionName: string;
    id: string;
};

export const getDocument = async <T,>(props: TGetDocument): Promise<T | null> => {
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