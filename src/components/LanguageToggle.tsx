import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "../content/types";
import { getInitialLocale, toggleLocale, type LocalePreference } from "../scripts/preferences";

interface Props {
  locale: Locale;
}

export default function LanguageToggle({ locale }: Props) {
  const [currentLocale, setCurrentLocale] = useState<LocalePreference>(locale);
  const nextLocale = toggleLocale(currentLocale);

  useEffect(() => {
    const urlLocale = new URLSearchParams(window.location.search).get("lang");
    const initial = getInitialLocale(urlLocale, getInitialLocale(localStorage.getItem("yeoju-locale"), locale));

    setCurrentLocale(initial);
    document.documentElement.dataset.locale = initial;
    document.documentElement.lang = initial;
  }, [locale]);

  function onToggle() {
    const next = toggleLocale(currentLocale);
    const url = new URL(window.location.href);

    if (next === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }

    setCurrentLocale(next);
    document.documentElement.dataset.locale = next;
    document.documentElement.lang = next;
    localStorage.setItem("yeoju-locale", next);
    window.history.replaceState({}, "", url);
  }

  return (
    <button className="language-toggle" type="button" onClick={onToggle} aria-label="언어 전환">
      <Languages aria-hidden="true" size={17} />
      <span>{nextLocale.toUpperCase()}</span>
    </button>
  );
}
