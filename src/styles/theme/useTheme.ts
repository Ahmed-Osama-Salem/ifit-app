import { Dispatch, SetStateAction, useContext } from "react";
import {
  DARK_THEME_BACKGROUND,
  DARK_THEME_BACKGROUND_VARIANT,
  DARK_THEME_SECONDARY,
  DARK_THEME_SECONDARY_VARIANT,
  DARK_THEME_TEXT,
  DARK_THEME_VARIANT,
  ERROR,
  LIGHT_THEME_BACKGROUND,
  LIGHT_THEME_BACKGROUND_VARIANT,
  LIGHT_THEME_SECONDARY,
  LIGHT_THEME_SECONDARY_VARIANT,
  LIGHT_THEME_TEXT,
  LIGHT_THEME_VARIANT,
  SUCCESS,
  WARNING,
} from "./colors";
import { ThemeContext } from "./ThemeProvider";

export interface Theme {
  background: string;
  backgroundVariant: string;
  text: string;
  variant: string;
  secondary: string;
  secondaryVariant: string;
  // accent?: string;
  success: string;
  warning: string;
  error: string;
}

const lightTheme: Theme = {
  background: LIGHT_THEME_BACKGROUND,
  backgroundVariant: LIGHT_THEME_BACKGROUND_VARIANT,
  text: LIGHT_THEME_TEXT,
  variant: LIGHT_THEME_VARIANT,
  secondary: LIGHT_THEME_SECONDARY,
  secondaryVariant: LIGHT_THEME_SECONDARY_VARIANT,
  // accent: SEMERU_BRAND,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
};

const darkTheme: Theme = {
  background: DARK_THEME_BACKGROUND,
  backgroundVariant: DARK_THEME_BACKGROUND_VARIANT,
  text: DARK_THEME_TEXT,
  variant: DARK_THEME_VARIANT,
  secondary: DARK_THEME_SECONDARY,
  secondaryVariant: DARK_THEME_SECONDARY_VARIANT,
  // accent: SEMERU_BRAND,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
};

interface UseThemeHook {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
}

const useTheme = (): UseThemeHook => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  if (theme === "dark") {
    return {
      theme: darkTheme,
      setTheme,
    };
  }

  return {
    theme: lightTheme,
    setTheme,
  };
};

export default useTheme;
