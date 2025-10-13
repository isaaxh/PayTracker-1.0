import { TouchableOpacity } from "react-native";
import React from "react";

import RenderIcon from "./RenderIcon";

const FilterButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      className='p-3 ml-1 rounded-xl bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'
      onPress={onPress}
    >
      <RenderIcon
        iconLibrary='iconsax'
        iconProps={{
          name: "setting4",
        }}
      />
    </TouchableOpacity>
  );
};

export default FilterButton;
