import { createStyleSheet } from "react-native-unistyles";

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

export const useGameScreenStyles = (): GameScreenStyles => {
  const stylesheet = createStyleSheet({
    container: {
      padding: 20,
      flexGrow: 1,
      justifyContent: "flex-start",
      backgroundColor: "backgroundColor",
    },
    ammoHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: "textColor",
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
      color: "textColor",
    },
    historyHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: "textColor",
    },
    shotText: {
      fontSize: 14,
      color: "textColor",
    },
    selectedHint: {
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: 10,
      color: "textColor",
    },
  });

  return stylesheet;
};
