import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UnistylesProvider } from "react-native-unistyles";

// Визначення тем
export const lightTheme = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  headerBackground: "#f4f4f4",
  headerText: "#000000",
};

export const darkTheme = {
  backgroundColor: "#333333",
  textColor: "#ffffff",
  headerBackground: "#444444",
  headerText: "#ffffff",
};

// Оголошення типів
interface AppThemeContextProps {
  themeStyles: typeof lightTheme | typeof darkTheme;
  switchTheme: () => void;
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
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }
  return context;
};

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const fetchSavedTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setCurrentTheme(savedTheme);
      }
    };
    fetchSavedTheme();
  }, []);

  const switchTheme = async () => {
    setCurrentTheme((prevTheme) => {
      const updatedTheme = prevTheme === "light" ? "dark" : "light";
      AsyncStorage.setItem("theme", updatedTheme);
      return updatedTheme;
    });
  };

  return (
    <UnistylesProvider>
      <AppThemeContext.Provider
        value={{
          themeStyles: currentTheme === "light" ? lightTheme : darkTheme,
          switchTheme,
        }}
      >
        {children}
      </AppThemeContext.Provider>
    </UnistylesProvider>
  );
};
