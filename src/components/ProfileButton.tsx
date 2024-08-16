import { TouchableOpacity } from "react-native";
import IconComponent from "./IconComponent";
import { Link } from "expo-router";

const ProfileButton = () => {
  return (
    <Link href="/(protected)/ProfileScreen" asChild>
      <TouchableOpacity className="bg-orange-300 p-2 rounded-full inline-block justify-center items-center">
        <IconComponent name="profile" color={"#ffffff"} />
      </TouchableOpacity>
    </Link>
  );
};

export default ProfileButton;
