import { UnistylesRegistry } from "react-native-unistyles";
import { lightTheme, darkTheme } from "./themes";

// Визначення типів для брейкпоінтів та тем
type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

// Визначення брейкпоінтів для адаптивності
export const breakpoints = {
  small: 0,
  medium: 768,
  large: 1024,
};

// Декларація модулів для типів в `react-native-unistyles`
declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true,
  });
