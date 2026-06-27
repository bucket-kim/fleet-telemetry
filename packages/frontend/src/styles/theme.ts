import { useCallback, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "fleet-theme";
const CHANGE_EVENT = "fleet-theme-change";

export const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getCurrentTheme = (): ThemeMode =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

export const applyTheme = (mode: ThemeMode) => {
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem(STORAGE_KEY, mode);
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
};

export const useThemeValue = (): ThemeMode =>
  useSyncExternalStore(subscribe, getCurrentTheme, getInitialTheme);

export const useTheme = () => {
  const theme = useThemeValue();
  const setTheme = useCallback((mode: ThemeMode) => applyTheme(mode), []);
  const toggleTheme = useCallback(
    () => applyTheme(theme === "dark" ? "light" : "dark"),
    [theme],
  );
  return { theme, setTheme, toggleTheme };
};
