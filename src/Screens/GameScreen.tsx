import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import gameStore from "../store/GameStore";
import ModalWindow from "../ModalWindow/ModalWindow";
import { GameScreenProps } from "../../types";

const GameScreen: React.FC<GameScreenProps> = observer(({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHint, setSelectedHint] = useState<string | null>(null);
  const [usedHints, setUsedHints] = useState<string[]>([]);

  const confirmReset = (confirmation: boolean) => {
    if (confirmation) {
      gameStore.resetAmmo(1, 1);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "SliderScreen",
            params: {
              combatAmmo: gameStore.battleAmmo,
              blankAmmo: gameStore.blankAmmo,
            },
          },
        ],
      });
    }
    setIsModalVisible(false);
  };

  const showResetAlert = () => {
    Alert.alert(
      "Підтвердження",
      "Ви справді хочете завершити гру?",
      [
        {
          text: "Ні",
          onPress: () => confirmReset(false),
          style: "cancel",
        },
        {
          text: "Так",
          onPress: () => confirmReset(true),
        },
      ],
      { cancelable: true }
    );
  };

  const addHint = (hint: string) => {
    setUsedHints((prevHints) => [...prevHints, hint]);
    Alert.alert("Підказка", `Ви використали: ${hint}`);
    setSelectedHint(null);
  };

  return (
    <View>
      <Text>Бойові патрони: {gameStore.battleAmmo}</Text>
      <Text>Холості патрони: {gameStore.blankAmmo}</Text>

      <Button
        title="Стріляти бойовим"
        onPress={() => gameStore.shootBattle()}
      />
      <Button
        title="Стріляти холостим"
        onPress={() => gameStore.shootBlank()}
      />

      <Text>Ймовірність бойового: {gameStore.battleChance.toFixed(2)}%</Text>
      <Text>Ймовірність холостого: {gameStore.blankChance.toFixed(2)}%</Text>

      <Text>Історія пострілів:</Text>
      {gameStore.shots.map((shot, index) => (
        <Text key={index}>{shot}</Text>
      ))}

      <Button title="Скинути гру" onPress={showResetAlert} />

      <Button
        title="Показати підказки"
        onPress={() => setIsModalVisible(true)}
      />

      <ModalWindow
        isVisible={isModalVisible}
        selectedHint={selectedHint}
        onClose={() => setIsModalVisible(false)}
        onUseHint={addHint}
        onSelectHint={setSelectedHint}
      />

      <Text>Використані підказки:</Text>
      {usedHints.map((hint, index) => (
        <Text key={index}>{hint}</Text>
      ))}
    </View>
  );
});

export default GameScreen;
