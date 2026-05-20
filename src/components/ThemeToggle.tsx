import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getInitialTheme, toggleTheme, type ThemePreference } from "../scripts/preferences";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>("light");

  useEffect(() => {
    const initial = getInitialTheme(
      localStorage.getItem("yeoju-theme"),
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function onToggle() {
    const next = toggleTheme(theme);
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("yeoju-theme", next);
  }

  return (
    <button className="icon-button" type="button" onClick={onToggle} aria-label="테마 전환">
      {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
