import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Інтерфейс для теми
export interface Theme {
  backgroundColor: string;
  textColor: string;
  headerBackground: string;
  headerText: string;
  cardBackground: string;
  buttonBackground: string;
  buttonTextColor: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setIsDarkMode(storedTheme === "dark");
      }
    };
    fetchTheme();
  }, []);

  const toggleTheme = async () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      AsyncStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Опис тем
export const lightTheme: Theme = {
  backgroundColor: "#fff",
  textColor: "#000",
  headerBackground: "#f8f9fa",
  headerText: "#000",
  cardBackground: "#fff",
  buttonBackground: "#007BFF",
  buttonTextColor: "#fff",
};

export const darkTheme: Theme = {
  backgroundColor: "#333",
  textColor: "#fff",
  headerBackground: "#1F1F1F",
  headerText: "#fff",
  cardBackground: "#444",
  buttonBackground: "#1E90FF",
  buttonTextColor: "#fff",
};
