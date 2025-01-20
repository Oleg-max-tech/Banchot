import React, { useState } from "react";
import { View, Text, Button, Alert, ScrollView, Image } from "react-native";
import { observer } from "mobx-react-lite";
import gameStore from "../store/GameStore";
import { GameScreenProps } from "../../types";
import { useAppTheme } from "../Styles/ThemeContext"; // Замінили на правильний хук
import { useGameScreenStyles } from "../Styles/useGameScreenStyles";

const GameScreen: React.FC<GameScreenProps> = observer(
  ({ navigation, route }) => {
    const { themeStyles } = useAppTheme(); // Отримуємо стиль теми з правильного хука
    const [selectedHint, setSelectedHint] = useState<string | null>(
      route.params?.selectedHint || null
    );
    const [usedHints, setUsedHints] = useState<string[]>([]);

    const addHint = (hint: string) => {
      if (!usedHints.includes(hint)) {
        setUsedHints((prevHints) => [...prevHints, hint]);
        Alert.alert("Підказка", `Ви використали: ${hint}`);
      } else {
        Alert.alert("Увага", `Ви вже використали підказку: ${hint}`);
      }
      setSelectedHint(null);
    };

    // Отримуємо стилі за допомогою useGameScreenStyles
    const styles = useGameScreenStyles();

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Відображення бойових патронів */}
        <Text style={styles.ammoHeader}>Бойові патрони:</Text>
        <View style={styles.ammoList}>
          {Array.from({ length: gameStore.battleAmmo }).map((_, index) => (
            <Image
              key={`battle-${index}`}
              source={require("../../assets/battle.png")}
              style={styles.ammoImage}
            />
          ))}
        </View>

        {/* Відображення холостих патронів */}
        <Text style={styles.ammoHeader}>Холості патрони:</Text>
        <View style={styles.ammoList}>
          {Array.from({ length: gameStore.blankAmmo }).map((_, index) => (
            <Image
              key={`blank-${index}`}
              source={require("../../assets/blank.png")}
              style={styles.ammoImage}
            />
          ))}
        </View>

        <Button
          title="Стріляти бойовим"
          onPress={() => gameStore.shootBattle()}
        />
        <Button
          title="Стріляти холостим"
          onPress={() => gameStore.shootBlank()}
        />

        <Text style={styles.probabilityText}>
          Ймовірність бойового: {gameStore.battleChance.toFixed(2)}%
        </Text>
        <Text style={styles.probabilityText}>
          Ймовірність холостого: {gameStore.blankChance.toFixed(2)}%
        </Text>

        <Text style={styles.historyHeader}>Історія пострілів:</Text>
        {gameStore.shots.map((shot, index) => (
          <Text key={index} style={styles.shotText}>
            {shot}
          </Text>
        ))}

        {/* Відображення вибраної підказки */}
        {selectedHint && (
          <Text style={styles.selectedHint}>
            Вибрана підказка: {selectedHint}
          </Text>
        )}

        {/* Історія використаних підказок */}
        <Text style={styles.historyHeader}>Історія підказок:</Text>
        {usedHints.map((hint, index) => (
          <Text key={index} style={styles.shotText}>
            {hint}
          </Text>
        ))}

        <Button
          title="Показати підказки"
          onPress={() =>
            navigation.navigate("HintsScreen", {
              selectedHint: selectedHint,
              onUseHint: addHint,
            })
          }
        />
      </ScrollView>
    );
  }
);

export default GameScreen;
