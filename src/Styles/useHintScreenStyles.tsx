import { createStyleSheet } from "react-native-unistyles";
import { useAppTheme } from "./ThemeContext";

// Типи для стилів
interface HintsScreenStyles {
  container: object;
  title: object;
  hintContainer: object;
  hintName: object;
  hintDescription: object;
  hintButton: object;
  hintButtonText: object;
}

const lightTheme = {
  backgroundColor: "#f4f4f4",
  textColor: "#000000",
  hintContainerBackground: "#f9f9f9",
  buttonBackground: "#007bff",
  buttonTextColor: "#ffffff",
};

const darkTheme = {
  backgroundColor: "#333333",
  textColor: "#ffffff",
  hintContainerBackground: "#4f4f4f",
  buttonBackground: "#1e90ff",
  buttonTextColor: "#ffffff",
};

export const useHintsScreenStyles = (): HintsScreenStyles => {
  const { themeStyles } = useAppTheme();

  const selectedTheme =
    themeStyles?.backgroundColor === lightTheme.backgroundColor ||
    themeStyles?.textColor === lightTheme.textColor
      ? lightTheme
      : darkTheme;

  return createStyleSheet({
    container: {
      flex: 1,
      backgroundColor: selectedTheme.backgroundColor,
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: selectedTheme.textColor,
      marginBottom: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    hintContainer: {
      backgroundColor: selectedTheme.hintContainerBackground,
      padding: 20,
      borderRadius: 12,
      marginBottom: 15,
      width: "100%",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    hintName: {
      fontSize: 18,
      color: selectedTheme.textColor,
      fontWeight: "bold",
      marginBottom: 10,
    },
    hintDescription: {
      fontSize: 16,
      color: selectedTheme.textColor,
      marginBottom: 15,
    },
    hintButton: {
      backgroundColor: selectedTheme.buttonBackground,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
    },
    hintButtonText: {
      color: selectedTheme.buttonTextColor,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};
