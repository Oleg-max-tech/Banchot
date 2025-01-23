import { createStyleSheet } from "react-native-unistyles";
import { useAppTheme } from "./ThemeContext";

// Типи для стилів
interface GameScreenStyles {
  container: object;
  ammoHeader: object;
  ammoList: object;
  ammoImage: object;
  probabilityText: object;
  historyHeader: object;
  shotText: object;
  selectedHint: object;
}

// Оновлені теми з однаковою структурою
const lightTheme = {
  backgroundColor: "#f4f4f4",
  textColor: "#333333",
};

const darkTheme = {
  backgroundColor: "#4f4f4f",
  textColor: "#ffffff",
};

export const useGameScreenStyles = (): GameScreenStyles => {
  const { themeStyles } = useAppTheme();

  // Перевірка яка тема активна
  const selectedTheme =
    themeStyles.backgroundColor === lightTheme.backgroundColor
      ? lightTheme
      : darkTheme;

  return createStyleSheet({
    container: {
      padding: 20,
      flexGrow: 1,
      justifyContent: "flex-start",
      backgroundColor: selectedTheme.backgroundColor,
    },
    ammoHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: selectedTheme.textColor,
    },
    ammoList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    ammoImage: {
      width: 30,
      height: 30,
      margin: 5,
    },
    probabilityText: {
      fontSize: 16,
      marginBottom: 10,
      color: selectedTheme.textColor,
    },
    historyHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: selectedTheme.textColor,
    },
    shotText: {
      fontSize: 14,
      color: selectedTheme.textColor,
    },
    selectedHint: {
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: 10,
      color: selectedTheme.textColor,
    },
  });
};
