import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UnistylesProvider } from "react-native-unistyles";

// Визначення тем
export const lightTheme = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
};

export const darkTheme = {
  backgroundColor: "#333333",
  textColor: "#ffffff",
};

interface ThemeContextProps {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

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

  const theme = isDarkMode ? darkTheme : lightTheme; // Вибір теми

  return (
    <UnistylesProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </UnistylesProvider>
  );
};
