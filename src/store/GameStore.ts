import { action, makeObservable, observable } from "mobx";

class GameStore {
  @observable battleAmmo: number = 1;
  @observable blankAmmo: number = 1;
  @observable shots: string[] = [];
  @observable shotCount: number = 1;

  constructor() {
    makeObservable(this);
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

  @action shootBattle() {
    if (this.battleAmmo > 0) {
      this.battleAmmo--;
      this.shots.push(`${this.shotCount} - Бойовий`);
      this.shotCount++;
    }
  }

  @action shootBlank() {
    if (this.blankAmmo > 0) {
      this.blankAmmo--;
      this.shots.push(`${this.shotCount} - Холостий`);
      this.shotCount++;
    }
  }

  @action resetAmmo(battle: number, blank: number) {
    this.battleAmmo = battle;
    this.blankAmmo = blank;
    this.shots = [];
    this.shotCount = 1;
  }

  // Імовірність наступного бойового пострілу
  get battleChance() {
    const totalAmmo = this.battleAmmo + this.blankAmmo; // загальний залишок патронів
    return totalAmmo > 0 ? (this.battleAmmo / totalAmmo) * 100 : 0;
  }

  // Імовірність наступного холостого пострілу
  get blankChance() {
    const totalAmmo = this.battleAmmo + this.blankAmmo; // загальний залишок патронів
    return totalAmmo > 0 ? (this.blankAmmo / totalAmmo) * 100 : 0;
  }
}

const gameStore = new GameStore();
export default gameStore;
