import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UnistylesProvider, UnistylesRuntime } from "react-native-unistyles";
import { lightTheme, darkTheme } from "./themes";

// Оголошення типів
interface AppThemeContextProps {
  themeStyles: typeof lightTheme | typeof darkTheme;
  switchTheme: () => void;
  currentTheme: "light" | "dark";
}

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeContext = createContext<AppThemeContextProps | undefined>(
  undefined
);

// Експортуємо useAppTheme
export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error(
      "useAppTheme must be used within an AppThemeProvider. Make sure AppThemeProvider wraps your component."
    );
  }
  return context;
};

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const switchTheme = async () => {
    setCurrentTheme((prevTheme) => {
      const updatedTheme = prevTheme === "light" ? "dark" : "light";
      AsyncStorage.setItem("theme", updatedTheme);
      UnistylesRuntime.setTheme(updatedTheme);

      return updatedTheme;
    });
  };

  return (
    <AppThemeContext.Provider
      value={{
        themeStyles: currentTheme === "light" ? lightTheme : darkTheme,
        switchTheme,
        currentTheme,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};
