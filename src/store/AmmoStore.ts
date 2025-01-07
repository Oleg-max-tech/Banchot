import { makeAutoObservable, action } from "mobx";

class AmmoStore {
  battleAmmo: number = 1;
  blankAmmo: number = 1;
  shots: string[] = [];
  shotCount: number = 1;

  constructor() {
    makeAutoObservable(this, {
      setBattleAmmo: action,
      setBlankAmmo: action,
      shootBattle: action,
      shootBlank: action,
      resetAmmo: action,
    });
  }

  setBattleAmmo(value: number) {
    const totalAmmo = value + this.blankAmmo;
    if (totalAmmo <= 9) {
      this.battleAmmo = value;
    } else {
      this.battleAmmo = 9 - this.blankAmmo;
    }
  }

  setBlankAmmo(value: number) {
    const totalAmmo = value + this.battleAmmo;
    if (totalAmmo <= 9) {
      this.blankAmmo = value;
    } else {
      this.blankAmmo = 9 - this.battleAmmo;
    }
  }

  shootBattle() {
    if (this.battleAmmo > 0) {
      this.battleAmmo--;
      this.shots.push(`${this.shotCount} - Бойовий`);
      this.shotCount++;
    }
  }

  shootBlank() {
    if (this.blankAmmo > 0) {
      this.blankAmmo--;
      this.shots.push(`${this.shotCount} - Холостий`);
      this.shotCount++;
    }
  }

  resetAmmo(battle: number, blank: number) {
    this.battleAmmo = battle;
    this.blankAmmo = blank;
    this.shots = [];
    this.shotCount = 1;
  }

  // імовірність наступного пострілу
  get battleChance() {
    const totalShots = this.shots.length;
    const battleShots = this.shots.filter((shot) =>
      shot.includes("Бойовий")
    ).length;
    return totalShots > 0 ? (battleShots / totalShots) * 100 : 50;
  }

  // імовірність наступного пострілу
  get blankChance() {
    const totalShots = this.shots.length;
    const blankShots = this.shots.filter((shot) =>
      shot.includes("Холостий")
    ).length;
    return totalShots > 0 ? (blankShots / totalShots) * 100 : 50;
  }
}

const ammoStore = new AmmoStore();
export default ammoStore;
