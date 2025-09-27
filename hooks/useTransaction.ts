import { TTransaction } from "@/constants/TransactionsTypes";
import { getDocument } from "@/services/api/firestoreApi";
import { useEffect, useState } from "react";

export const useTransaction = (uid: string | undefined, id: string) => {
    const [transaction, setTransaction] = useState<TTransaction | null>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getTransactionDoc = async () => {
            setLoading(true)
            try {
                const transaction = await getDocument<TTransaction>({
                    collectionName: `users/${uid}/transactions`,
                    id: id,
                });

                if (transaction !== null) {
                    setTransaction(transaction);
                }
            } catch (e) {
                console.log("error loading transaction details: ", e);
            } finally {
                setLoading(false)
            }
        };
        getTransactionDoc();
    }, []);

    return { transaction, loading }
}