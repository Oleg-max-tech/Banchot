import { action, makeObservable, observable } from "mobx";
import * as Haptics from "expo-haptics";

class GameStore {
  @observable battleAmmo: number = 0;
  @observable blankAmmo: number = 0;
  @observable battleAmmoChoice: number = 0;
  @observable shots: string[] = [];
  @observable shotCount: number = 0;
  @observable shotWith100Chance: number | null = null;

  constructor() {
    makeObservable(this);
  }

  @action setBattleAmmoChoice(value: number) {
    this.battleAmmoChoice = value;
  }

  @action setShotWith100Chance(shotNumber: number) {
    this.shotWith100Chance = shotNumber;
  }

  // Обчислення ймовірності бойового патрона
  get battleProbability(): number {
    if (this.shotWith100Chance === this.shotCount) {
      return 100;
    }
    const totalAmmo = this.battleAmmo + this.blankAmmo;
    return totalAmmo > 0 ? (this.battleAmmo / totalAmmo) * 100 : 0;
  }

  // Обчислення ймовірності холостого патрона
  get blankProbability(): number {
    if (this.shotWith100Chance === this.shotCount) {
      return 100;
    }
    const totalAmmo = this.battleAmmo + this.blankAmmo;
    return totalAmmo > 0 ? (this.blankAmmo / totalAmmo) * 100 : 0;
  }

  @action shootBattle() {
    if (this.battleAmmo <= 0) return;

    this.battleAmmo--;
    this.shotCount++;
    const isBattle = this.shotWith100Chance === this.shotCount;
    const shotType = isBattle ? "Бойовий" : "Холостий";
    this.shots.push(`${this.shotCount} - ${shotType}`);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Після пострілу повертаємо звичайну ймовірність
    if (this.shotWith100Chance === this.shotCount) {
      this.shotWith100Chance = null;
    }
  }

  @action shootBlank() {
    if (this.blankAmmo <= 0) return;

    this.blankAmmo--;
    this.shotCount++;
    const shotType =
      this.shotWith100Chance === this.shotCount ? "Бойовий" : "Холостий";
    this.shots.push(`${this.shotCount} - ${shotType}`);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Після пострілу повертаємо звичайну ймовірність
    if (this.shotWith100Chance === this.shotCount) {
      this.shotWith100Chance = null;
    }
  }

  @action resetGame() {
    this.battleAmmo = 1;
    this.blankAmmo = 1;
    this.shotCount = 0;
    this.shots = [];
    this.shotWith100Chance = null;
    this.battleAmmoChoice = 0;
  }

  @action setBattleAmmo(value: number) {
    const totalAmmo = value + this.blankAmmo;
    if (totalAmmo <= 16) {
      // Максимальна кількість патронів
      this.battleAmmo = value;
    }
  }

  @action setBlankAmmo(value: number) {
    const totalAmmo = value + this.battleAmmo;
    if (totalAmmo <= 16) {
      this.blankAmmo = value;
    }
  }

  // Можливість вибору патрона з 100% ймовірністю
  @action setAmmoWith100Chance(value: number) {
    this.setBattleAmmoChoice(value);
    this.setShotWith100Chance(value);
  }
}

const gameStore = new GameStore();
export default gameStore;
