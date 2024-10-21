import { TAppSettingsSchema } from "@/constants/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsync = () => {
  const saveSettings = async (appSettings: TAppSettingsSchema) => {
    try {
      await AsyncStorage.setItem("appSettings", JSON.stringify(appSettings));
    } catch (e) {
      console.log("Error saving settings: ", e);
    }
  };

  const loadSettings = async () => {
    try {
      const saveSettings = await AsyncStorage.getItem("appSettings");
      if (saveSettings !== null) {
        return JSON.parse(saveSettings);
      } else {
        return null;
      }
    } catch (e) {
      console.log("Error loading settings: ", e);
    }
  };

  const updateSettings = async (key: string, value: any) => {
    try {
      const currentSettings = await loadSettings();

      if (currentSettings) {
        const updatedSettings = {
          ...currentSettings,
          [key]: value,
        };
        await saveSettings(updatedSettings);
      }
    } catch (e) {
      console.log("Error updating settings: ", e);
    }
  };

  return { saveSettings, loadSettings, updateSettings };
};
