import { action, computed, makeObservable, observable } from "mobx";
import * as Haptics from "expo-haptics";

interface FutureShot {
  index: number;
  type: "battle" | "blank";
}

interface AmmoProbability {
  battle: number;
  blank: number;
}

class GameStore {
  @observable battleAmmo: number = 1; // Кількість бойових патронів
  @observable blankAmmo: number = 1; // Кількість холостих патронів
  @observable shotCount: number = 1; // Лічильник пострілів
  @observable shots: string[] = []; // Список пострілів
  @observable knownFutureShots: FutureShot[] = [];

  constructor() {
    makeObservable(this);
  }

  @action addKnownFutureShot(shot: FutureShot) {
    this.knownFutureShots.push(shot);
  }

  @computed get ammoProbanility(): AmmoProbability {
    const totalAmmo = this.battleAmmo + this.blankAmmo;

    const knownFutureShot = this.knownFutureShots.find(
      (shot) => shot.index - 1 === this.shotCount
    );

    if (knownFutureShot) {
      return {
        battle: knownFutureShot.type === "battle" ? 100 : 0,
        blank: knownFutureShot.type === "blank" ? 100 : 0,
      };
    }

    return {
      battle: totalAmmo > 0 ? (this.battleAmmo / totalAmmo) * 100 : 0,
      blank: totalAmmo > 0 ? (this.blankAmmo / totalAmmo) * 100 : 0,
    };
  }

  @action shoot(type: "battle" | "blank") {
    if (this.battleAmmo <= 0 && this.blankAmmo <= 0) return;

    if (type === "battle") {
      this.battleAmmo--;
    } else {
      this.blankAmmo--;
    }

    const shotType = type === "battle" ? "Бойовий" : "Холостий";
    this.shots.push(`${this.shotCount} - ${shotType}`);
    this.shotCount++;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  @action resetGame() {
    this.battleAmmo = 1;
    this.blankAmmo = 1;
    this.shotCount = 0;
    this.shots = [];
  }

  // Можливість вибору патрона з 100% ймовірністю
  @action setAmmo(value: number, type: "battle" | "blank") {
    switch (type) {
      case "battle": {
        this.battleAmmo = value;
        return;
      }
      case "blank": {
        this.blankAmmo = value;
        return;
      }
    }
  }
}

const gameStore = new GameStore();
export default gameStore;
