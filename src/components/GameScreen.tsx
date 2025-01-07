import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import ammoStore from "../store/AmmoStore";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import ModalWindow from "../Modal Window/ModalWindow";

const GameScreen: React.FC = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHint, setSelectedHint] = useState<string | null>(null);
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const confirmReset = (confirmation: boolean) => {
    if (confirmation) {
      ammoStore.resetAmmo(1, 1);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "SliderScreen",
            params: {
              combatAmmo: ammoStore.battleAmmo,
              blankAmmo: ammoStore.blankAmmo,
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
      <Text>Бойові патрони: {ammoStore.battleAmmo}</Text>
      <Text>Холості патрони: {ammoStore.blankAmmo}</Text>

      <Button
        title="Стріляти бойовим"
        onPress={() => ammoStore.shootBattle()}
      />
      <Button
        title="Стріляти холостим"
        onPress={() => ammoStore.shootBlank()}
      />

      <Text>Ймовірність бойового: {ammoStore.battleChance.toFixed(2)}%</Text>
      <Text>Ймовірність холостого: {ammoStore.blankChance.toFixed(2)}%</Text>

      <Text>Історія пострілів:</Text>
      {ammoStore.shots.map((shot, index) => (
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
