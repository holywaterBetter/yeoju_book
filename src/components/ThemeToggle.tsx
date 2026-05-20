import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getInitialTheme, toggleTheme, type ThemePreference } from "../scripts/preferences";

interface Props {
  label?: string;
}

export default function ThemeToggle({ label = "테마 전환" }: Props) {
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
    <button className="icon-button" type="button" onClick={onToggle} aria-label={label}>
      {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
