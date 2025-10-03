import { TLoginSchema, TSignupSchema } from "@/utils/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";

export const logout = async () => {
    await FIREBASE_AUTH.signOut();
};

export const loginUser = async ({ email, password }: TLoginSchema) => {
    return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
}

export const signupUser = async ({ email, password }: TSignupSchema) => {
    return await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
    );

}