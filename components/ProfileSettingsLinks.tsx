import React from "react";
import { Link } from "expo-router";
import UIButton from "./ui/UIButton";

const ProfileSettingsLinks = () => {
  return (
    <>
      <Link href='/(protected)/PersonalInfoScreen' asChild>
        <UIButton
          variant={"iconText"}
          iconLibrary='iconsax'
          iconProps={{ name: "profile" }}
          size={"large"}
          buttonStyles='mb-3'
        >
          Personal Information
        </UIButton>
      </Link>
      <Link href='/(protected)/ChangePassScreen' asChild>
        <UIButton
          variant={"iconText"}
          iconLibrary='iconsax'
          iconProps={{ name: "lock" }}
          size={"large"}
          buttonStyles='mb-3'
        >
          Change password
        </UIButton>
      </Link>
    </>
  );
};

export default ProfileSettingsLinks;
