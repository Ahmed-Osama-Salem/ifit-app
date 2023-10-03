import React, { useContext, useEffect, useState, ReactNode } from "react";
import { getItem, setItem } from "./storage";
import { useColorScheme } from "react-native";

export type ThemeOptions = "light" | "dark";

export interface ThemeContextInterface {
  theme: ThemeOptions;
  setTheme: React.Dispatch<React.SetStateAction<ThemeOptions>>;
}

export const ThemeContext = React.createContext<ThemeContextInterface | null>(
  null
);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeOptions>(scheme ?? "dark");

  useEffect(() => {
    const fetchTheme = async () => {
      const localTheme = await getItem("theme");
      return localTheme;
    };

    fetchTheme().then((localTheme) => {
      if (localTheme === "dark" || localTheme === "light") {
        setTheme(localTheme);
      }
    });
  }, []);

  useEffect(() => {
    setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
