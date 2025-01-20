// src/screens/SliderScreen.tsx
import React from "react";
import { View, Text, Button, ScrollView, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { observer } from "mobx-react-lite";
import gameStore from "../store/GameStore";
import { SliderScreenProps } from "../../types";
import { useTheme } from "../Styles/ThemeContext";
import { useSliderScreenStyles } from "../Styles/useSliderScreenStyles";

const SliderScreen: React.FC<SliderScreenProps> = observer(({ navigation }) => {
  const { theme } = useTheme();

  // Зміна кількості бойових патронів
  const handleCombatAmmoChange = (value: number) => {
    gameStore.setBattleAmmo(value);
  };

  // Зміна кількості холостих патронів
  const handleBlankAmmoChange = (value: number) => {
    gameStore.setBlankAmmo(value);
  };

  // Почати гру
  const handleStartGame = () => {
    navigation.navigate("GameScreen", {
      combatAmmo: gameStore.battleAmmo,
      blankAmmo: gameStore.blankAmmo,
      selectedHint: null,
    });
  };

  // Використовуємо стилі з нашої функції
  const styles = useSliderScreenStyles(theme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.ammoHeader}>
        Виберіть кількість бойових патронів:
      </Text>
      <Slider
        minimumValue={0}
        maximumValue={8}
        step={1}
        value={gameStore.battleAmmo}
        onValueChange={handleCombatAmmoChange}
        style={styles.slider}
      />
      <Text style={styles.valueText}>
        Бойові патрони: {gameStore.battleAmmo}
      </Text>

      <View style={styles.ammoList}>
        {Array.from({ length: gameStore.battleAmmo }).map((_, index) => (
          <Image
            key={`battle-${index}`}
            source={require("../../assets/battle.png")}
            style={styles.ammoImage}
          />
        ))}
      </View>

      <Text style={styles.ammoHeader}>
        Виберіть кількість холостих патронів:
      </Text>
      <Slider
        minimumValue={0}
        maximumValue={8}
        step={1}
        value={gameStore.blankAmmo}
        onValueChange={handleBlankAmmoChange}
        style={styles.slider}
      />
      <Text style={styles.valueText}>
        Холості патрони: {gameStore.blankAmmo}
      </Text>
      <View style={styles.ammoList}>
        {Array.from({ length: gameStore.blankAmmo }).map((_, index) => (
          <Image
            key={`blank-${index}`}
            source={require("../../assets/blank.png")}
            style={styles.ammoImage}
          />
        ))}
      </View>
      <Button title="Почати гру" onPress={handleStartGame} />
    </ScrollView>
  );
});

export default SliderScreen;
