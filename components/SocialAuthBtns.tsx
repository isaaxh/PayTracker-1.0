import { View } from "react-native";
import IconCard from "./IconCard";

const SocialAuthBtns = () => {
  return (
    <View className='flex-row items-center justify-center mx-4 mb-10'>
      <IconCard iconName='google' />
      <IconCard iconName='apple' />
      <IconCard iconName='facebook' />
    </View>
  );
};

export default SocialAuthBtns;
