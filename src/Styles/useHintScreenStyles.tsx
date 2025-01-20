import { createStyleSheet } from "react-native-unistyles";

interface HintsScreenStyles {
  container: object;
  title: object;
  hintContainer: object;
  hintName: object;
  hintDescription: object;
  hintButton: object;
  hintButtonText: object;
}

export const useHintsScreenStyles = (theme: Theme): HintsScreenStyles => {
  // Використовуємо createStyleSheet замість звичайного об'єкта стилів
  return createStyleSheet({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 20,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.textColor,
    },
    hintContainer: {
      backgroundColor: theme.cardBackground,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    hintName: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.textColor,
    },
    hintDescription: {
      fontSize: 16,
      marginBottom: 15,
      color: theme.textColor,
    },
    hintButton: {
      backgroundColor: theme.buttonBackground,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    hintButtonText: {
      color: theme.buttonTextColor,
      fontSize: 16,
    },
  });
};

export interface Theme {
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  buttonBackground: string;
  buttonTextColor: string;
}

export const lightTheme: Theme = {
  backgroundColor: "#f5f5f5",
  textColor: "#000",
  cardBackground: "#fff",
  buttonBackground: "#007BFF",
  buttonTextColor: "#fff",
};

export const darkTheme: Theme = {
  backgroundColor: "#333",
  textColor: "#fff",
  cardBackground: "#444",
  buttonBackground: "#1E90FF",
  buttonTextColor: "#fff",
};
