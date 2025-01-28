import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useStyles } from "react-native-unistyles";
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

  useEffect(() => {
    if (isVisible) {
      setSliderValue(selectedAmmo);
    }
  }, [isVisible, selectedAmmo]);

  const handleConfirm = () => {
    gameStore.setBattleAmmoChoice(sliderValue, ammoType);
    onClose();
  };

  const handleAmmoTypeChange = (type: "battle" | "blank") => {
    setAmmoType(type);
    setSliderValue(1);
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
          <View style={styles.ammoTypeContainer}>
            <TouchableOpacity
              onPress={() => handleAmmoTypeChange("battle")}
              style={[
                styles.ammoButton,
                ammoType === "battle" && styles.selectedButton,
              ]}
            >
              <Text style={styles.ammoButtonText}>Бойовий</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAmmoTypeChange("blank")}
              style={[
                styles.ammoButton,
                ammoType === "blank" && styles.selectedButton,
              ]}
            >
              <Text style={styles.ammoButtonText}>Холостий</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>
            Вибір {ammoType === "battle" ? "бойового" : "холостого"} патрона
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={totalAmmo}
            step={1}
            value={sliderValue}
            onValueChange={(value) => {
              setSliderValue(value);
              onSliderChange(value);
            }}
            style={styles.slider}
          />
          <Text style={styles.modalText}>Патрон № {sliderValue}</Text>
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

const stylesheet = (theme: any) =>
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
  });
