import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import gameStore from "../store/GameStore";

interface PhoneWindowProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (ammo: number, ammoType: "battle" | "blank") => void;
  totalAmmo: number;
  selectedAmmo: number;
  onSliderChange: (value: number) => void;
}

const PhoneWindow: React.FC<PhoneWindowProps> = ({
  isVisible,
  onClose,
  onConfirm,
  totalAmmo,
  selectedAmmo,
  onSliderChange,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [sliderValue, setSliderValue] = useState(selectedAmmo);
  const [ammoType, setAmmoType] = useState<"battle" | "blank">("battle");
  const [selectedShot, setSelectedShot] = useState<number | null>(null);
  const [is100Chance, setIs100Chance] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setSliderValue(selectedAmmo);
    }
  }, [isVisible, selectedAmmo]);

  const handleConfirm = () => {
    if (selectedShot !== null) {
      // Якщо вибрано постріл з 100% ймовірністю
      if (ammoType === "battle") {
        gameStore.setBattleAmmoChoice(sliderValue);
      } else {
        gameStore.setBattleAmmoChoice(0);
      }

      if (is100Chance) {
        gameStore.setShotWith100Chance(sliderValue); // Встановлюємо ймовірність на 100%
      }
    }

    onClose();
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    onSliderChange(value);
    // Якщо це вибраний постріл, встановлюємо ймовірність на 100%
    if (selectedShot === value) {
      setIs100Chance(true);
    } else {
      setIs100Chance(false);
    }
  };

  const handleSelectShot = (value: number) => {
    setSelectedShot(value);
    // Після вибору пострілу, встановлюємо ймовірність на 100%
    setIs100Chance(true);
  };

  // Обчислюємо загальну кількість патронів
  const totalAmmoCount = gameStore.battleAmmo + gameStore.blankAmmo;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Виберіть тип патрона:</Text>

          <Slider
            minimumValue={1}
            maximumValue={totalAmmoCount}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
            style={styles.slider}
          />
          <Text style={styles.modalText}>
            Постріл № {sliderValue} -{" "}
            {ammoType === "battle" ? "Бойовий" : "Холостий"}
          </Text>

          {is100Chance && (
            <Text style={styles.modalText}>Ймовірність 100%</Text>
          )}

          <View style={styles.ammoTypeContainer}>
            <TouchableOpacity
              onPress={() => setAmmoType("battle")}
              style={[
                styles.ammoButton,
                ammoType === "battle" && styles.selectedButton,
              ]}
            >
              <Text style={styles.ammoButtonText}>Бойовий</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmmoType("blank")}
              style={[
                styles.ammoButton,
                ammoType === "blank" && styles.selectedButton,
              ]}
            >
              <Text style={styles.ammoButtonText}>Холостий</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.selectShotContainer}>
            <TouchableOpacity
              onPress={() => handleSelectShot(sliderValue)} // Вибір поточного пострілу
              style={[
                styles.selectShotButton,
                selectedShot === sliderValue && styles.selectedButton,
              ]}
            >
              <Text style={styles.selectShotButtonText}>
                Вибрати цей постріл
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Підтвердити</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PhoneWindow;

const stylesheet = createStyleSheet((theme: any) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: theme.colors.textPrimary,
    },
    slider: {
      width: "100%",
      marginBottom: 20,
    },
    modalText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    confirmButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    confirmButtonText: {
      color: theme.colors.textPrimary,
      textAlign: "center",
      fontSize: 16,
    },
    cancelButton: {
      backgroundColor: theme.colors.textSecondary,
      padding: 10,
      borderRadius: 8,
    },
    cancelButtonText: {
      color: theme.colors.textPrimary,
      textAlign: "center",
      fontSize: 16,
    },
    ammoTypeContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
    },
    ammoButton: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.buttonBackground,
    },
    selectedButton: {
      backgroundColor: theme.colors.selectedButtonBackground,
    },
    ammoButtonText: {
      color: theme.colors.textPrimary,
      fontSize: 16,
    },
    selectShotContainer: {
      marginBottom: 20,
      alignItems: "center",
    },
    selectShotButton: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.buttonBackground,
    },
    selectShotButtonText: {
      color: theme.colors.textPrimary,
      fontSize: 16,
    },
  })
);
