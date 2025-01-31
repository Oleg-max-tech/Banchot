import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import gameStore from "../store/GameStore";

interface PhoneWindowProps {
  isVisible: boolean;
  onClose: () => void;
}

const PhoneWindow: React.FC<PhoneWindowProps> = ({ isVisible, onClose }) => {
  const { styles, theme } = useStyles(stylesheet);

  const selectedAmmo = gameStore.battleAmmoChoice || 0;

  const [sliderValue, setSliderValue] = useState(selectedAmmo);
  const [ammoType, setAmmoType] = useState<"battle" | "blank">("battle");

  const handleConfirm = () => {
    onClose();
    gameStore.addKnownFutureShot({
      type: ammoType,
      index: gameStore.shotCount + sliderValue,
    });
  };

  const totalAmmoCount = gameStore.battleAmmo + gameStore.blankAmmo;

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

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
