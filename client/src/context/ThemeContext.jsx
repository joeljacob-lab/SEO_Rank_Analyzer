/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// 1. Initial default state
const initialState = {
  theme: "system",
  setTheme: () => null,
};


// 2. Create the Context (the Theme Wi-Fi channel)
const ThemeProviderContext = createContext(initialState);


// 3. The Provider Component
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "rankpilot-theme",
  ...props
}) {
  // Remember user's saved choice from the browser, or fall back to defaultTheme
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  
  // Apply the theme to the actual website HTML whenever 'theme' changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Clean up any previous theme classes
    root.classList.remove("light", "dark");

    // If set to "system", check the computer/phone's OS preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      (() => setTheme(systemTheme))();
      return;
    }

    // Otherwise, apply "light" or "dark"
    root.classList.add(theme);
  }, [theme]);

  // The bundle of data shared with other components
  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// 4. Custom Hook for easy access in any component
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};