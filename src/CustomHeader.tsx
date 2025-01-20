import React from "react";
import { View, Alert, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import gameStore from "./store/GameStore";
import { RootStackParamList } from "../types";
import { useTheme } from "./Styles/ThemeContext";
import { createStyleSheet } from "react-native-unistyles";

interface CustomHeaderProps<T extends ParamListBase> {
  navigation: StackNavigationProp<RootStackParamList>;
}

const CustomHeader = ({ navigation }: CustomHeaderProps<any>) => {
  const { theme, toggleTheme } = useTheme();
  const { backgroundColor, textColor } = theme;

  const confirmReset = (shouldReset: boolean) => {
    if (shouldReset) {
      gameStore.resetAmmo(1, 1);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "SliderScreen",
            params: {
              combatAmmo: gameStore.battleAmmo,
              blankAmmo: gameStore.blankAmmo,
            },
          },
        ],
      });
    }
  };

  const showResetAlert = () => {
    Alert.alert(
      "Підтвердження",
      "Ви справді хочете завершити гру?",
      [
        {
          text: "Ні",
          onPress: () => confirmReset(false),
          style: "cancel",
        },
        {
          text: "Так",
          onPress: () => confirmReset(true),
        },
      ],
      { cancelable: true }
    );
  };

  const styles = createStyleSheet({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      height: 40,
      paddingHorizontal: 15,
      backgroundColor: backgroundColor,
    },
    iconContainer: {
      marginLeft: 20,
      padding: 8,
      borderRadius: 8,
    },
  });

  return (
    <>
      <StatusBar
        barStyle={textColor === "#ffffff" ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={showResetAlert} style={styles.iconContainer}>
          <Ionicons name="reload" size={24} color={textColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme} style={styles.iconContainer}>
          <Ionicons
            name={textColor === "#ffffff" ? "sunny" : "moon"}
            size={24}
            color={textColor}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CustomHeader;
