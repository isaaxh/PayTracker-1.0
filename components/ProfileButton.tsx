import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import RenderIcon from "./RenderIcon";

const ProfileButton = () => {
  return (
    <Link href='/(protected)/ProfileScreen' asChild>
      <TouchableOpacity className='bg-orange-300 p-2 rounded-full inline-block justify-center items-center'>
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
