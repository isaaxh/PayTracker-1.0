import { TLoginSchema } from "@/utils/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";

export const logout = async () => {
    await FIREBASE_AUTH.signOut();
};


const auth = FIREBASE_AUTH;

export const loginUser = async ({ email, password }: TLoginSchema) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

// export const signupUser = async (data: TSignupSchema) => {

//     try {
//         const response = await createUserWithEmailAndPassword(
//             auth,
//             data.email,
//             data.password
//         );
//         updateProfile(response.user, {
//             displayName: data.name,
//         });
//         addUserDocument({
//             data,
//             uid: response.user.uid,
//         });
//     } catch (e: any) {
//         console.log(e);
//         alert("Registration failed: " + e.message);
//     }
// }