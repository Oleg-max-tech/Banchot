import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  SliderScreen: { combatAmmo: number; blankAmmo: number };
  GameScreen: {
    combatAmmo: number;
    blankAmmo: number;
    selectedHint: string | null;
  };
  HintsScreen: {
    selectedHint: string | null;
    onUseHint: (hint: string) => void;
  };
};
export type SliderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SliderScreen"
>;

export interface SliderScreenProps {
  navigation: SliderScreenNavigationProp;
}

export type GameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "GameScreen"
>;

export interface GameScreenProps {
  navigation: GameScreenNavigationProp;
  route: RouteProp<RootStackParamList, "GameScreen">;
}

export type HintsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HintsScreen"
>;
export type HintsScreenRouteProp = RouteProp<RootStackParamList, "HintsScreen">;

export interface HintsScreenProps {
  navigation: HintsScreenNavigationProp;
  route: HintsScreenRouteProp;
}
