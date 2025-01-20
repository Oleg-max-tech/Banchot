import React from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { observer } from "mobx-react-lite";
import { HintsScreenProps } from "../../types";
import { useHintsScreenStyles } from "../Styles/useHintScreenStyles";

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

  const handleUseHint = (hintName: string) => {
    if (onUseHint) {
      onUseHint(hintName);
    }
    navigation.goBack();
  };

  const styles = useHintsScreenStyles();

  return (
    <ScrollView>
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
