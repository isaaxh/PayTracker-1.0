import { View } from "react-native";
import TotalPayCard from "./TotalPayCard";
import TransactionHistoryFeed from "./TransactionHistoryFeed";
const HomeBody = () => {
  return (
    <View className="w-full flex-1 px-6 py-4">
      <TotalPayCard />
      <TransactionHistoryFeed />
    </View>
  );
};

export default HomeBody;
