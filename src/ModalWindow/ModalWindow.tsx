import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface ModalWindowProps {
  isVisible: boolean;
  selectedHint: string | null;
  onClose: () => void;
  onUseHint: (hint: string) => void;
  onSelectHint: (hint: string | null) => void;
}

const hints = [
  {
    name: "Cigarettes",
    description:
      "+1 life: Використання цієї підказки додає одне додаткове життя.",
  },
  {
    name: "Magnifying Glass",
    description:
      "Перегляд предметів ворога: Використовується для огляду ворожих предметів.",
  },
  {
    name: "Handcuffs",
    description: "Блокування ворога: Блокує можливість ворога діяти на 1 хід.",
  },
  { name: "Beer", description: "-1 патрон ворога: Забирає 1 патрон у ворога." },
  {
    name: "Knife",
    description: "Подвоїти шкоду ворогу: Подвоює шкоду від атаки на ворога.",
  },
  {
    name: "Pills",
    description:
      "+2 або -1 життя: Випиваючи таблетки, можна додати або забрати життя.",
  },
  {
    name: "Adrenaline",
    description:
      "Вкрасти предмет: Використовує адреналін для крадіжки предмету у ворога.",
  },
];

const ModalWindow: React.FC<ModalWindowProps> = ({
  isVisible,
  selectedHint,
  onClose,
  onUseHint,
  onSelectHint,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedHint ? (
            <View>
              {/* Знаходимо опис для вибраної підказки */}
              {hints
                .filter((hint) => hint.name === selectedHint)
                .map((hint) => (
                  <View key={hint.name}>
                    <Text style={styles.modalTitle}>{hint.name}</Text>
                    <Text style={styles.modalDescription}>
                      {hint.description}
                    </Text>
                    <Button
                      title="Використати"
                      onPress={() => {
                        onUseHint(hint.name);
                        onClose();
                      }}
                    />
                    <Button title="Назад" onPress={() => onSelectHint(null)} />
                  </View>
                ))}
            </View>
          ) : (
            <View>
              <Text style={styles.modalTitle}>Підказки</Text>
              {hints.map((hint) => (
                <TouchableOpacity
                  key={hint.name}
                  style={styles.hintButton}
                  onPress={() => onSelectHint(hint.name)}
                >
                  <Text style={styles.hintText}>{hint.name}</Text>
                </TouchableOpacity>
              ))}
              <Button title="Закрити" onPress={onClose} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  hintButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  hintText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ModalWindow;
