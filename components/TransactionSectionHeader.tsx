import { View } from "react-native";
import UIText from "./ui/UIText";

const TransactionSectionHeader = ({ title }: { title: string }) => (
  <View className='fixed inset-0 flex px-4 py-2 bg-bgColor/90 dark:bg-darkBgColor/95 blur-xl'>
    <UIText variant={"labelLg"} textStyles='text-tintLight dark:text-tintDark'>
      {title}
    </UIText>
  </View>
);

export default TransactionSectionHeader;
