import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import gameStore from "./store/GameStore";
import { RootStackParamList } from "../types";
import { useTheme } from "./Styles/ThemeContext";

interface CustomHeaderProps<T extends ParamListBase> {
  navigation: StackNavigationProp<RootStackParamList>;
}

const CustomHeader = ({ navigation }: CustomHeaderProps<any>) => {
  const { isDarkMode, toggleTheme } = useTheme();

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

  return (
    <>
      {/* Змінюємо колір статус-бару */}
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#222" : "#fff"}
      />
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: isDarkMode ? "#1f1f1f" : "#f8f9fa" },
        ]}
      >
        {/* Кнопка для ресету */}
        <TouchableOpacity onPress={showResetAlert} style={styles.iconContainer}>
          <Ionicons
            name="reload"
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>

        {/* Кнопка для зміни теми */}
        <TouchableOpacity onPress={toggleTheme} style={styles.iconContainer}>
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 15,
  },
  iconContainer: {
    marginLeft: 20,
    padding: 8,
    borderRadius: 8,
  },
});

export default CustomHeader;
