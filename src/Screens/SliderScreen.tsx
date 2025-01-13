import React from "react";
import { View, Text, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { observer } from "mobx-react-lite";
import gameStore from "../store/GameStore";
import { SliderScreenProps } from "../../types";

const SliderScreen: React.FC<SliderScreenProps> = observer(({ navigation }) => {
  // Функція для зміни бойових патронів
  const handleCombatAmmoChange = (value: number) => {
    gameStore.setBattleAmmo(value);
  };

  // Функція для зміни холостих патронів
  const handleBlankAmmoChange = (value: number) => {
    gameStore.setBlankAmmo(value);
  };

  const handleStartGame = () => {
    navigation.navigate("GameScreen", {
      combatAmmo: gameStore.battleAmmo,
      blankAmmo: gameStore.blankAmmo,
    });
  };

  return (
    <View>
      <Text>Виберіть кількість бойових патронів:</Text>
      <Slider
        minimumValue={0}
        maximumValue={8}
        step={1}
        value={gameStore.battleAmmo}
        onValueChange={handleCombatAmmoChange} // функція для зміни бойових патронів
      />
      <Text>Бойові патрони: {gameStore.battleAmmo}</Text>

      <Text>Виберіть кількість холостих патронів:</Text>
      <Slider
        minimumValue={0}
        maximumValue={8}
        step={1}
        value={gameStore.blankAmmo}
        onValueChange={handleBlankAmmoChange} // функція для зміни холостих патронів
      />
      <Text>Холості патрони: {gameStore.blankAmmo}</Text>

      <Button title="Почати гру" onPress={handleStartGame} />
    </View>
  );
});

export default SliderScreen;
