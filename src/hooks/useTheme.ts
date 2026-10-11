import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme(storageKey: string) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(storageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
