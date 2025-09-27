import { useEffect } from "react";
import { I18nManager } from "react-native";
import * as Updates from "expo-updates";

type Language = {
    value: string;
    label: string;
};

export function useDirection(selectedLanguage?: Language) {
    useEffect(() => {
        const applyDirection = async () => {
            const shouldForceRTL =
                selectedLanguage?.value === "ar" && !I18nManager.isRTL;
            const shouldForceLTR =
                selectedLanguage?.value === "en" && I18nManager.isRTL;

            if (shouldForceRTL || shouldForceLTR) {
                try {
                    I18nManager.forceRTL(shouldForceRTL);
                    await Updates.reloadAsync();
                } catch (error) {
                    console.error("Failed to reload the app", error);
                }
            }
        };

        applyDirection();
    }, [selectedLanguage]);
}