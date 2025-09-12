import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import RenderIcon from "./RenderIcon";

const ProfileButton = () => {
  return (
    <Link href='/(protected)/ProfileScreen' asChild>
      <TouchableOpacity className='items-center justify-center inline-block p-2 bg-orange-400 rounded-full'>
        <RenderIcon
          iconLibrary='iconsax'
          iconProps={{
            name: "profile",
            color: "#ffffff",
          }}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default ProfileButton;
