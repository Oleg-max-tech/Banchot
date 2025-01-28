import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react-lite";
import gameStore from "../store/GameStore";
import { GameScreenProps } from "../../types";
import { useStyles } from "react-native-unistyles";
import { createStyleSheet } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";
import PhoneWindow from "./PhoneWindow";

const GameScreen: React.FC<GameScreenProps> = observer(
  ({ navigation, route }) => {
    const [selectedHint, setSelectedHint] = useState<string | null>(
      route.params?.selectedHint || null
    );
    const [usedHints, setUsedHints] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ammoType, setAmmoType] = useState<"battle" | "blank">("battle");
    const [sliderValue, setSliderValue] = useState<number>(0);

    const addHint = (hint: string) => {
      if (!usedHints.includes(hint)) {
        setUsedHints((prevHints) => [...prevHints, hint]);
        Alert.alert("Підказка", `Ви використали: ${hint}`);
      } else {
        Alert.alert("Увага", `Ви вже використали підказку: ${hint}`);
      }
      setSelectedHint(null);
    };

    const handlePhoneButton = () => {
      setIsModalVisible(true);
    };

    const handleSliderChange = (value: number) => {
      if (ammoType === "battle" && value > gameStore.battleAmmo) {
        value = gameStore.battleAmmo;
      }
      if (ammoType === "blank" && value > gameStore.blankAmmo) {
        value = gameStore.blankAmmo;
      }

      setSliderValue(value);
      onSliderChange(value);
    };

    const onSliderChange = (value: number) => {
      console.log("Значення слайдера: ", value);
    };

    const handleConfirmSelection = () => {
      gameStore.setShotWith100Chance(gameStore.shotCount);
      Alert.alert("Телефон", `Патрон ${gameStore.battleAmmo} буде бойовим!`);
      setIsModalVisible(false);
    };

    const { styles, theme } = useStyles(stylesheet);

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
          Ймовірність бойового: {gameStore.battleProbability.toFixed(2)}%
        </Text>
        <Text style={styles.probabilityText}>
          Ймовірність холостого: {gameStore.blankProbability.toFixed(2)}%
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

        {/* Кнопка Телефон */}
        <TouchableOpacity
          onPress={handlePhoneButton}
          style={styles.phoneButton}
        >
          <Ionicons name="call" size={30} color={theme.colors.textPrimary} />
          <Text style={styles.phoneButtonText}>Телефон</Text>
        </TouchableOpacity>

        <PhoneWindow
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onConfirm={handleConfirmSelection}
          totalAmmo={gameStore.battleAmmo}
          selectedAmmo={gameStore.battleAmmoChoice || 0}
          onSliderChange={handleSliderChange}
        />
      </ScrollView>
    );
  }
);

export default GameScreen;

const stylesheet = createStyleSheet((theme) => {
  return {
    container: {
      padding: 20,
      flexGrow: 1,
      justifyContent: "flex-start",
      backgroundColor: theme.colors.backgroundColor,
    },
    ammoHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: theme.colors.textPrimary,
    },
    ammoList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    ammoImage: {
      width: 30,
      height: 30,
      margin: 5,
    },
    probabilityText: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.colors.textSecondary,
    },
    historyHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: theme.colors.textPrimary,
    },
    shotText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    selectedHint: {
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: 10,
      color: theme.colors.textSecondary,
    },
    phoneButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: theme.colors.hintButton,
      borderRadius: 8,
      marginTop: 20,
    },
    phoneButtonText: {
      marginLeft: 10,
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
  };
});
