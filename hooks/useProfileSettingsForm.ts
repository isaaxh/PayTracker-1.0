import { useDispatch } from "react-redux";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

import { currencyList, languageList, themeList, TSettingsSchema } from "@/constants/Settings";

import { logout } from "@/services/api/firebaseAuthApi";

import { updateSettings } from "@/services/state/appSettings/appSettingSlice";
import { AppDispatch } from "@/services/state/store";
import { clearTransactions } from "@/services/state/transactions/transactionSlice";
import { clearUserData } from "@/services/state/user/userSlice";
import { clearAuthUser } from "@/services/state/auth/authSlice";



export const useProfileSettingsForm = () => {

    const { setColorScheme } = useColorScheme();
    const dispatch = useDispatch<AppDispatch>();

    const onPressLogout = async () => {
        try {
            await logout();
            dispatch(clearAuthUser());
            dispatch(clearUserData());
            dispatch(clearTransactions());
            router.replace("/");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    const handleOnSubmit = async (data: TSettingsSchema) => {
        const selectedLanguage = languageList.find(
            (lang) => lang.value === data.language
        );

        const selectedCurrency = currencyList.find(
            (curr) => curr.value === data.currency
        );

        const selectedTheme = themeList.find((theme) => theme.value === data.theme);

        if (selectedLanguage) {
            dispatch(
                updateSettings({
                    key: "language",
                    value: selectedLanguage,
                })
            );
        }

        if (selectedCurrency) {
            dispatch(
                updateSettings({
                    key: "currency",
                    value: selectedCurrency,
                })
            );
        }

        if (selectedTheme) {
            dispatch(
                updateSettings({
                    key: "theme",
                    value: selectedTheme,
                })
            );

            setColorScheme(selectedTheme.value);
        }

        router.back();
    }

    return { onPressLogout, handleOnSubmit }
}
