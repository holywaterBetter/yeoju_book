import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { siteContent } from "./siteContent";

const publicRoot = resolve(process.cwd(), "public");

interface TestMediaAsset {
  src: string;
  alt: string;
  caption?: string;
}

function mediaFileExists(asset: TestMediaAsset) {
  return existsSync(join(publicRoot, asset.src));
}

describe("siteContent", () => {
  it("contains Korean and English locale content", () => {
    expect(siteContent.ko.meta.title).toContain("여주");
    expect(siteContent.en.meta.title).toContain("Yeoju");
  });

  it("keeps reservation and Kakao URLs as pending input", () => {
    expect(siteContent.ko.externalLinks.reservationUrl).toBe("");
    expect(siteContent.ko.externalLinks.kakaoChannelUrl).toBe("");
    expect(siteContent.ko.externalLinks.reservationLabel).toBe("예약 링크 준비 중");
    expect(siteContent.ko.externalLinks.kakaoLabel).toBe("문의 링크 준비 중");
  });

  it("defines Sejong and Ohak courses with route points", () => {
    expect(siteContent.ko.courses).toHaveLength(2);
    expect(siteContent.ko.courses.map((course) => course.id)).toEqual(["sejong", "ohak"]);
    expect(siteContent.ko.courses[0].points.length).toBeGreaterThan(5);
    expect(siteContent.ko.courses[1].points.length).toBeGreaterThan(5);
  });

  it("keeps guide content separate from public navigation", () => {
    expect(siteContent.ko.navigation.some((item) => item.href === "/guide")).toBe(false);
    expect(siteContent.ko.guide.sections.length).toBeGreaterThan(5);
  });

  it("references extracted PDF media with existing files and alt text", () => {
    for (const [locale, content] of Object.entries(siteContent)) {
      const mediaAssets: TestMediaAsset[] = [
        (content.hero as { media?: TestMediaAsset }).media,
        ...content.courses.flatMap((course) => [
          (course as { mapImage?: TestMediaAsset }).mapImage,
          ...((course as { gallery?: TestMediaAsset[] }).gallery ?? [])
        ]),
        ...content.guide.sections.flatMap((section) => (section as { media?: TestMediaAsset[] }).media ?? [])
      ].filter(Boolean) as TestMediaAsset[];

      expect(mediaAssets.length, `${locale} should have PDF media assets`).toBeGreaterThanOrEqual(10);

      for (const asset of mediaAssets) {
        expect(asset.src, `${locale} media src`).toMatch(/^\/assets\/pdf\/.+\.(webp|png)$/);
        expect(asset.alt.trim(), `${locale} alt for ${asset.src}`).not.toBe("");
        expect(mediaFileExists(asset), `${locale} media file exists: ${asset.src}`).toBe(true);
      }
    }
  });
});
