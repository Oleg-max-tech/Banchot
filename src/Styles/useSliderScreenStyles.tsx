import { createStyleSheet } from "react-native-unistyles";

interface SliderScreenStyles {
  container: object;
  ammoHeader: object;
  slider: object;
  valueText: object;
  ammoList: object;
  ammoImage: object;
}

export const useSliderScreenStyles = (): SliderScreenStyles => {
  return createStyleSheet({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      padding: 20,
    },
    ammoHeader: {
      fontSize: 18,
      color: "#000000",
      marginBottom: 10,
    },
    slider: {
      width: "100%",
      height: 40,
      marginBottom: 20,
    },
    valueText: {
      fontSize: 16,
      color: "#000000",
    },
    ammoList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    ammoImage: {
      width: 40,
      height: 40,
      margin: 5,
    },
  });
};
