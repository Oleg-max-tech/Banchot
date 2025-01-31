import React from "react";
import { View, Text, Button, ScrollView, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { observer } from "mobx-react-lite";
import gameStore from "../store/GameStore";
import { SliderScreenProps } from "../../types";
import { useStyles } from "react-native-unistyles";
import { createStyleSheet } from "react-native-unistyles";

const SliderScreen: React.FC<SliderScreenProps> = observer(({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet);

  // Зміна кількості бойових патронів
  const handleCombatAmmoChange = (value: number) => {
    gameStore.setAmmo(value, "battle");
  };

  // Зміна кількості холостих патронів
  const handleBlankAmmoChange = (value: number) => {
    gameStore.setAmmo(value, "blank");
  };

  // Почати гру
  const handleStartGame = () => {
    navigation.replace("GameScreen", {
      combatAmmo: gameStore.battleAmmo,
      blankAmmo: gameStore.blankAmmo,
      selectedHint: null,
    });
  };

  // Використовуємо стилі без теми

  return (
    <View style={styles.container}>
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
    </View>
  );
});

export default SliderScreen;

const stylesheet = createStyleSheet((theme) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      padding: 20,
    },
    ammoHeader: {
      fontSize: 18,
      color: theme.colors.textPrimary,
      marginBottom: 10,
    },
    slider: {
      width: "100%",
      height: 40,
      marginBottom: 20,
      backgroundColor: theme.colors.sliderBackground,
      borderRadius: 10,
    },
    valueText: {
      fontSize: 16,
      color: theme.colors.textPrimary,
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
  };
});
