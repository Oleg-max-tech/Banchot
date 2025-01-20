
import { createStyleSheet } from "react-native-unistyles";
import { Theme } from "./ThemeContext";

interface SliderScreenStyles {
  container: object;
  ammoHeader: object;
  slider: object;
  valueText: object;
  ammoList: object;
  ammoImage: object;
}

export const useSliderScreenStyles = (theme: Theme): SliderScreenStyles => {
  // Використовуємо createStyleSheet замість звичайного об'єкта стилів
  return createStyleSheet({
    container: {
      padding: 20,
      backgroundColor: theme.backgroundColor,
    },
    ammoHeader: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    slider: {
      width: "100%",
      height: 40,
      marginBottom: 20,
    },
    valueText: {
      fontSize: 16,
      marginBottom: 20,
      color: theme.textColor,
    },
    ammoList: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      marginBottom: 20,
      backgroundColor: theme.backgroundColor,
    },
    ammoImage: {
      width: 30,
      height: 30,
      margin: 5,
    },
  });
};
