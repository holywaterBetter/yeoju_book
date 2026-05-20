import { describe, expect, it } from "vitest";
import { getInitialTheme, toggleLocale, toggleTheme } from "./preferences";

describe("preferences", () => {
  it("uses stored theme when valid", () => {
    expect(getInitialTheme("dark", false)).toBe("dark");
    expect(getInitialTheme("light", true)).toBe("light");
  });

  it("falls back to media preference without stored theme", () => {
    expect(getInitialTheme(null, true)).toBe("dark");
    expect(getInitialTheme(null, false)).toBe("light");
  });

  it("toggles theme and locale", () => {
    expect(toggleTheme("light")).toBe("dark");
    expect(toggleTheme("dark")).toBe("light");
    expect(toggleLocale("ko")).toBe("en");
    expect(toggleLocale("en")).toBe("ko");
  });
});
