import { View, Alert, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import gameStore from "./store/GameStore";
import { RootStackParamList } from "../types";
import { useAppTheme } from "./Styles/ThemeContext";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface CustomHeaderProps<T extends ParamListBase> {
  navigation: StackNavigationProp<RootStackParamList>;
  showReset?: boolean;
}

const CustomHeader = ({
  navigation,
  showReset = true,
}: CustomHeaderProps<any>) => {
  const { switchTheme, currentTheme } = useAppTheme();
  const { styles, theme } = useStyles(stylesheet);

  const confirmReset = (shouldReset: boolean) => {
    if (shouldReset) {
      gameStore.resetGame();
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
    <View style={styles.headerContainer}>
      {showReset && (
        <TouchableOpacity onPress={showResetAlert} style={styles.iconContainer}>
          <Ionicons name="reload" size={24} color={theme.header.text} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={switchTheme} style={styles.iconContainer}>
        <Ionicons
          name={currentTheme === "light" ? "sunny" : "moon"}
          size={24}
          color={theme.header.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const stylesheet = createStyleSheet((theme) => {
  return {
    headerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 15,
      // backgroundColor: theme.header.background,
    },
    iconContainer: {
      marginLeft: 20,
      padding: 8,
      borderRadius: 8,
    },
  };
});
