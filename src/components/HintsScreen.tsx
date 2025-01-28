import React from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { observer } from "mobx-react-lite";
import { HintsScreenProps } from "../../types";

import { useAppTheme } from "../Styles/ThemeContext";
import { useStyles } from "react-native-unistyles";
import { createStyleSheet } from "react-native-unistyles";

const hints = [
  {
    name: "Cigarettes",
    description:
      "+1 life: Використання цієї підказки додає одне додаткове життя.",
  },
  {
    name: "Magnifying Glass",
    description:
      "Перегляд предметів ворога: Використовується для огляду ворожих предметів.",
  },
  {
    name: "Handcuffs",
    description: "Блокування ворога: Блокує можливість ворога діяти на 1 хід.",
  },
  { name: "Beer", description: "-1 патрон ворога: Забирає 1 патрон у ворога." },
  {
    name: "Knife",
    description: "Подвоїти шкоду ворогу: Подвоює шкоду від атаки на ворога.",
  },
  {
    name: "Pills",
    description:
      "+2 або -1 життя: Випиваючи таблетки, можна додати або забрати життя.",
  },
  {
    name: "Adrenaline",
    description:
      "Вкрасти предмет: Використовує адреналін для крадіжки предмету у ворога.",
  },
];

const HintsScreen: React.FC<HintsScreenProps> = ({ navigation, route }) => {
  const { onUseHint } = route.params;

  const { styles, theme } = useStyles(stylesheet);

  const handleUseHint = (hintName: string) => {
    if (onUseHint) {
      onUseHint(hintName);
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Підказки:</Text>
        {hints.map((hint) => (
          <View key={hint.name} style={styles.hintContainer}>
            <Text style={styles.hintName}>{hint.name}</Text>
            <Text style={styles.hintDescription}>{hint.description}</Text>
            <TouchableOpacity
              style={styles.hintButton}
              onPress={() => handleUseHint(hint.name)}
            >
              <Text style={styles.hintButtonText}>Використати</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default observer(HintsScreen);

const stylesheet = createStyleSheet((theme) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: theme.colors.textPrimary,
      marginBottom: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    hintContainer: {
      backgroundColor: theme.colors.hintContainer,
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
      color: theme.colors.textPrimary,
      fontWeight: "bold",
      marginBottom: 10,
    },
    hintDescription: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 15,
    },
    hintButton: {
      backgroundColor: theme.colors.hintButton,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
    },
    hintButtonText: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: "bold",
    },
  };
});
