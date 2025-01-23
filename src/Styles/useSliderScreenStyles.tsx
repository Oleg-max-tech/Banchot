import { createStyleSheet } from "react-native-unistyles";
import { useAppTheme } from "./ThemeContext";

// Типи для стилів
interface SliderScreenStyles {
  container: object;
  ammoHeader: object;
  slider: object;
  valueText: object;
  ammoList: object;
  ammoImage: object;
}

// Оновлені теми з однаковою структурою
const lightTheme = {
  backgroundColor: "#f4f4f4",
  textColor: "#333333",
  sliderBackground: "#e0e0e0",
  ammoHeaderColor: "#000000",
};

const darkTheme = {
  backgroundColor: "#4f4f4f",
  textColor: "#ffffff",
  sliderBackground: "#666666",
  ammoHeaderColor: "#ffffff",
};

export const useSliderScreenStyles = (): SliderScreenStyles => {
  const { themeStyles } = useAppTheme();

  // Перевірка яка тема активна
  const selectedTheme =
    themeStyles.backgroundColor === lightTheme.backgroundColor
      ? lightTheme
      : darkTheme;

  return createStyleSheet({
    container: {
      flex: 1,
      backgroundColor: selectedTheme.backgroundColor,
      padding: 20,
    },
    ammoHeader: {
      fontSize: 18,
      color: selectedTheme.ammoHeaderColor,
      marginBottom: 10,
    },
    slider: {
      width: "100%",
      height: 40,
      marginBottom: 20,
      backgroundColor: selectedTheme.sliderBackground,
      borderRadius: 10,
    },
    valueText: {
      fontSize: 16,
      color: selectedTheme.textColor,
    },
    ammoList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    ammoImage: {
      width: 30,
      height: 40,
      margin: 5,
    },
  });
};
