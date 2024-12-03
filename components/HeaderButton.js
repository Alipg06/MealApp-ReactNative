import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import * as Colors from "../constants/Colors";
import { Platform } from "react-native";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={
        Platform.OS === "android" ? "white" : Colors.primaryColor
      }></HeaderButton>
  );
};

export default CustomHeaderButton;
