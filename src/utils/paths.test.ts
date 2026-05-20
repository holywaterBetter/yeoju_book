import { describe, expect, it } from "vitest";
import { stripBasePath, withBasePath } from "./paths";

describe("path helpers", () => {
  it("keeps root paths unchanged when no base path is configured", () => {
    expect(withBasePath("/", "/")).toBe("/");
    expect(withBasePath("/en/", "/")).toBe("/en/");
    expect(stripBasePath("/guide/", "/")).toBe("/guide/");
  });

  it("prefixes routes with the configured base path", () => {
    expect(withBasePath("/", "/yeoju_book/")).toBe("/yeoju_book/");
    expect(withBasePath("/en/", "/yeoju_book/")).toBe("/yeoju_book/en/");
    expect(withBasePath("/og-image.png", "/yeoju_book/")).toBe("/yeoju_book/og-image.png");
    expect(withBasePath("/assets/pdf/hero-riverside-bike-path.webp", "/yeoju_book/")).toBe(
      "/yeoju_book/assets/pdf/hero-riverside-bike-path.webp"
    );
  });

  it("strips the configured base path before route logic runs", () => {
    expect(stripBasePath("/yeoju_book/", "/yeoju_book/")).toBe("/");
    expect(stripBasePath("/yeoju_book/en/", "/yeoju_book/")).toBe("/en/");
    expect(stripBasePath("/yeoju_book/guide/", "/yeoju_book/")).toBe("/guide/");
  });
});
