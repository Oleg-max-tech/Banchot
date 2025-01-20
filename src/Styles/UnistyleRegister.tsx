import { UnistylesRegistry } from "react-native-unistyles";
import { lightTheme, darkTheme } from "./ThemeContext";

// Визначення типів для брейкпоінтів та тем
type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

// Визначення брейкпоінтів для адаптивності
export const breakpoints = {
  small: { minWidth: 0 },
  medium: { minWidth: 768 },
  large: { minWidth: 1024 },
};

// Декларація модулів для типів в `react-native-unistyles`
declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

// Реєстрація брейкпоінтів та тем за допомогою об'єкта UnistylesRegistry
export const unistyleRegistry = UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true,
  });
