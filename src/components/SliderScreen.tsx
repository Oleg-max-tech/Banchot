import React from "react";
import { View, Text, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import ammoStore from "../store/AmmoStore";
import { RootStackParamList } from "../../types";

const SliderScreen: React.FC = observer(() => {
  const navigation = useNavigation<{
    navigate: (
      screen: keyof RootStackParamList,
      params: { combatAmmo: number; blankAmmo: number }
    ) => void;
  }>();

  // Функція для зміни бойових патронів
  const handleCombatAmmoChange = (value: number) => {
    ammoStore.setBattleAmmo(value);
    ammoStore.setBlankAmmo(8 - value);
  };

  // Функція для зміни холостих патронів
  const handleBlankAmmoChange = (value: number) => {
    ammoStore.setBlankAmmo(value);
    ammoStore.setBattleAmmo(8 - value);
  };

  const handleStartGame = () => {
    navigation.navigate("GameScreen", {
      combatAmmo: ammoStore.battleAmmo,
      blankAmmo: ammoStore.blankAmmo,
    });
  };

  return (
    <View>
      <Text>Виберіть кількість бойових патронів:</Text>
      <Slider
        minimumValue={0}
        maximumValue={8}
        step={1}
        value={ammoStore.battleAmmo}
        onValueChange={handleCombatAmmoChange} // функці для зміни бойових патронів
      />
      <Text>Бойові патрони: {ammoStore.battleAmmo}</Text>

      <Text>Виберіть кількість холостих патронів:</Text>
      <Slider
        minimumValue={0}
        maximumValue={8}
        step={1}
        value={ammoStore.blankAmmo}
        onValueChange={handleBlankAmmoChange} // функція для зміни холостих патронів
      />
      <Text>Холості патрони: {ammoStore.blankAmmo}</Text>

      <Button title="Почати гру" onPress={handleStartGame} />
    </View>
  );
});

export default SliderScreen;
