import { doc, getDoc, updateDoc } from "firebase/firestore";
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


// export type TUpdateFieldInDoc<T, K extends keyof T> = {
//     id: string;
//     collectionName: string;
//     fieldName: K;
//     updateValue: T[K];
// };

// export const updateFieldInDoc = async <T, K extends keyof T>(
//     props: TUpdateFieldInDoc<T, K>,
// ) => {
//     const { collectionName, id, fieldName, updateValue } = props;
//     const docRef = doc(FIREBASE_DB, collectionName, id);
//     try {
//         await updateDoc(docRef, {
//             [fieldName]: updateValue,
//         });
//     } catch (e) {
//         console.error('updateFieldInDoc: Error updating document field', e);
//         throw e;
//     }
// };

export type TUpdateFieldInDoc = {
    id: string;
    collectionName: string;
    fieldName: string;
    updateValue: string | number;
};

export const updateFieldInDoc = async (props: TUpdateFieldInDoc) => {
    const { id, collectionName, fieldName, updateValue } = props;
    const userRef = doc(FIREBASE_DB, collectionName, id);
    try {
        await updateDoc(userRef, {
            [fieldName]: updateValue,
        });
    } catch (e) {
        console.log("updateFieldInDoc: Error updating", e);
    }
};