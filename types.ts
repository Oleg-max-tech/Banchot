import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  SliderScreen: { combatAmmo: number; blankAmmo: number };
  GameScreen: { combatAmmo: number; blankAmmo: number };
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
}
