function normalizeBasePath(base: string) {
  if (!base || base === "/") {
    return "";
  }

  const withLeadingSlash = base.startsWith("/") ? base : `/${base}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

function normalizeRoutePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function withBasePath(path: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = normalizeBasePath(base);
  const normalizedPath = normalizeRoutePath(path);

  if (!normalizedBase) {
    return normalizedPath;
  }

  if (normalizedPath === "/") {
    return `${normalizedBase}/`;
  }

  return `${normalizedBase}${normalizedPath}`;
}

export function stripBasePath(path: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = normalizeBasePath(base);
  const normalizedPath = normalizeRoutePath(path);

  if (!normalizedBase) {
    return normalizedPath;
  }

  if (normalizedPath === normalizedBase) {
    return "/";
  }

  if (normalizedPath.startsWith(`${normalizedBase}/`)) {
    return normalizedPath.slice(normalizedBase.length) || "/";
  }

  return normalizedPath;
}
