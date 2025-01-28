import { action, makeObservable, observable } from "mobx";
import * as Haptics from "expo-haptics";

class GameStore {
  @observable battleAmmo: number = 5;
  @observable blankAmmo: number = 3;
  @observable shots: string[] = [];
  @observable shotCount: number = 0;
  @observable customBattleChance: number | null = null;
  @observable battleAmmoChoice: number | null = null;

  constructor() {
    makeObservable(this);
  }

  get battleChance() {
    const totalAmmo = this.battleAmmo + this.blankAmmo;
    return totalAmmo > 0 ? (this.battleAmmo / totalAmmo) * 100 : 0;
  }

  // Функція для вибору патрона (бойовий або холостий)
  @action setBattleAmmoChoice(choice: number, ammoType: "battle" | "blank") {
    this.battleAmmoChoice = choice;
    this.shots = this.shots.map((shot, index) => {
      if (index + 1 === choice) {
        return ammoType === "battle"
          ? `${index + 1} - Бойовий`
          : `${index + 1} - Холостий`;
      }
      return shot;
    });
  }

  // Функція для бойового пострілу
  @action shootBattle() {
    if (this.battleAmmo <= 0) return;

    this.battleAmmo--;
    this.shots.push(`${this.shotCount + 1} - Бойовий`);
    this.shotCount++;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  // Функція для холостого пострілу
  @action shootBlank() {
    if (this.blankAmmo <= 0) return;

    this.blankAmmo--;
    this.shots.push(`${this.shotCount + 1} - Холостий`);
    this.shotCount++;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  @action resetGame() {
    this.battleAmmo = 1;
    this.blankAmmo = 1;
    this.shotCount = 0;
    this.shots = [];
    this.battleAmmoChoice = null;
  }

  @action setBattleAmmo(value: number) {
    const totalAmmo = value + this.blankAmmo;
    if (totalAmmo <= 16) {
      this.battleAmmo = value;
    }
  }

  @action setBlankAmmo(value: number) {
    const totalAmmo = value + this.battleAmmo;
    if (totalAmmo <= 16) {
      this.blankAmmo = value;
    }
  }

  @action setBattleChance(chance: number) {
    this.customBattleChance = chance;
  }
}

const gameStore = new GameStore();
export default gameStore;
