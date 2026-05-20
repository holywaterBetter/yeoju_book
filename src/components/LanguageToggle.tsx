import { Languages } from "lucide-react";
import type { Locale } from "../content/types";

interface Props {
  locale: Locale;
  currentPath: string;
}

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function getTargetHref(locale: Locale, currentPath: string) {
  const path = normalizePath(currentPath);

  if (locale === "ko") {
    return path === "/" ? "/en/" : `/en${path}`;
  }

  const withoutEnglishPrefix = path.replace(/^\/en(?=\/|$)/, "") || "/";
  return withoutEnglishPrefix;
}

export default function LanguageToggle({ locale, currentPath }: Props) {
  const nextLocale = locale === "ko" ? "EN" : "KO";
  const href = getTargetHref(locale, currentPath);
  const ariaLabel = locale === "ko" ? "언어 전환" : "Switch language";

  return (
    <a className="language-toggle" href={href} aria-label={ariaLabel}>
      <Languages aria-hidden="true" size={17} />
      <span>{nextLocale.toUpperCase()}</span>
    </a>
  );
}
