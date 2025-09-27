import { RootState } from "@/services/state/store";
import { useSelector } from "react-redux";


export const useAppSettings = () => {

    const { settings: appSettings } = useSelector((state: RootState) => state.appSettings)

    return { appSettings }
}