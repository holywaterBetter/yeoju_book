import { describe, expect, it } from "vitest";
import { siteContent } from "./siteContent";

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
});
