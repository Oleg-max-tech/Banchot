import { StatusBarStyle } from "react-native";

type Theme = {
  colors: {
    backgroundColor: string;
    textPrimary: string;
    textSecondary: string;
    sliderBackground: string;
    hintButton: string;
    hintContainer: string;
  };
  header: {
    background: string;
    text: string;
  };
  statusBar: StatusBarStyle;
};

export const lightTheme: Theme = {
  colors: {
    backgroundColor: "#f4f4f4",
    textPrimary: "#000000",
    textSecondary: "grey",
    sliderBackground: "#e0e0e0",
    hintButton: "#4A90E2",
    hintContainer: "#FFFFFF",
  },
  header: {
    background: "#f4f4f4",
    text: "#000000",
  },
  statusBar: "light-content",
};

export const darkTheme: Theme = {
  colors: {
    backgroundColor: "#333333",
    textPrimary: "#ffffff",
    textSecondary: "grey",
    sliderBackground: "#666666",
    hintButton: "#4A90E2",
    hintContainer: "#1F1F1F",
  },
  header: {
    background: "#4f4f4f",
    text: "#ffffff",
  },
  statusBar: "dark-content",
};
