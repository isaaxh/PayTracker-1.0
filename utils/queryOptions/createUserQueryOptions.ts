import { TUserData } from "./../types";
import { getDocument } from "@/services/api/firestoreApi";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const createUserQueryOptions = <
    TData extends TUserData | null = TUserData | null, // 👈 ensures compatibility with getDocument return type
    TError = Error
>(
    uid: string,
    options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
) => {
    return queryOptions<TData, TError>({
        ...options,
        queryKey: ["user", uid],
        queryFn: async (): Promise<TData> => {
            return getDocument<TUserData>({ collectionName: "users", id: uid }) as Promise<TData>;
        },
    });
};