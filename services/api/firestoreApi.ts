import { TCategoryLabel } from "@/constants/CategoriesTypes";
import { TFirestoreTransaction, TTransaction, TTransactionType } from "@/constants/TransactionsTypes";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { FIREBASE_DB } from "firebaseConfig";
import z, { ZodObject } from "zod";

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


export type TGetAllDocument = {
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

export const getAllDocuments = async <T extends z.ZodRawShape>(
    props: TGetAllDocument,
    schema: ZodObject<T>
): Promise<z.infer<typeof schema>[]> => {
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
    }
};


export type TAddTransactionDocument = {
    transactionData: TFirestoreTransaction;
    uid: string;
};


export const addTransactionDocument = async (props: TAddTransactionDocument) => {
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
                entity: transactionData.entity,
                note: transactionData.note,
            }
        );
    } catch (e) {
        console.log("Error adding transaction", e);
    }
};