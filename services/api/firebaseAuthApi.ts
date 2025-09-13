import { FIREBASE_AUTH } from "firebaseConfig";

export const logout = async () => {
    await FIREBASE_AUTH.signOut();
};