import { Languages } from "lucide-react";
import type { Locale } from "../content/types";
import { stripBasePath, withBasePath } from "../utils/paths";

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
  const path = normalizePath(stripBasePath(currentPath));
  const targetPath =
    locale === "ko"
      ? path === "/"
        ? "/en/"
        : `/en${path}`
      : path.replace(/^\/en(?=\/|$)/, "") || "/";

  return withBasePath(targetPath);
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
