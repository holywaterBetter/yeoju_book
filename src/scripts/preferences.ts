export type ThemePreference = "light" | "dark";
export type LocalePreference = "ko" | "en";

export function getInitialTheme(storageValue: string | null, prefersDark: boolean): ThemePreference {
  if (storageValue === "light" || storageValue === "dark") {
    return storageValue;
  }

  return prefersDark ? "dark" : "light";
}

export function getInitialLocale(storageValue: string | null, fallback: LocalePreference): LocalePreference {
  if (storageValue === "ko" || storageValue === "en") {
    return storageValue;
  }

  return fallback;
}

export function toggleTheme(current: ThemePreference): ThemePreference {
  return current === "dark" ? "light" : "dark";
}

export function toggleLocale(current: LocalePreference): LocalePreference {
  return current === "ko" ? "en" : "ko";
}
