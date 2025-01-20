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

export const useHintsScreenStyles = (): HintsScreenStyles => {
  return createStyleSheet({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: "#000000",
      marginBottom: 20,
    },
    hintContainer: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: "#f4f4f4",
      borderRadius: 8,
    },
    hintName: {
      fontSize: 18,
      color: "#333333",
      fontWeight: "bold",
    },
    hintDescription: {
      fontSize: 16,
      color: "#555555",
      marginBottom: 10,
    },
    hintButton: {
      backgroundColor: "#007bff",
      padding: 10,
      borderRadius: 5,
    },
    hintButtonText: {
      color: "#ffffff",
      textAlign: "center",
    },
  });
};
