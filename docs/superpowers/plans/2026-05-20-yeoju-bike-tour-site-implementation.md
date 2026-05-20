# Yeoju Bike Tour Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, SEO-friendly, bilingual, animated website for the Yeoju bike tour, including a public marketing site and a hidden `/guide` operator guide.

**Architecture:** Use Astro for static HTML generation and GitHub Pages deployment, with React islands only where interaction is needed. Keep content, design tokens, UI components, and pages separated so the PDF-derived content and later reservation/contact links can change without rewriting layout code.

**Tech Stack:** Astro, React, TypeScript, Vitest, Testing Library, CSS custom properties, lucide-react, GitHub Pages, GitHub Actions.

---

## Source Documents

- Product/design spec: `docs/superpowers/specs/2026-05-20-yeoju-bike-tour-site-design.md`
- Source PDF: `yeoju_book_v1-수정요청.pdf`
- Existing README: `README.md`

## File Structure

Create this structure from the repository root:

```text
package.json
astro.config.mjs
tsconfig.json
vitest.config.ts
src/
  env.d.ts
  components/
    AppHeader.astro
    AppFooter.astro
    CourseTabs.tsx
    EmergencyContacts.astro
    ExternalCta.astro
    FaqAccordion.tsx
    GuideChecklist.tsx
    LanguageToggle.tsx
    ThemeToggle.tsx
  content/
    siteContent.test.ts
    siteContent.ts
    types.ts
  layouts/
    BaseLayout.astro
  pages/
    guide.astro
    index.astro
  scripts/
    preferences.ts
  styles/
    global.css
    motion.css
    tokens.css
scripts/
  extract_pdf_content.py
content-source/
  pdf-extract.md
  pdf-annotations.md
public/
  CNAME
  robots.txt
  sitemap.xml
  og-image.svg
.github/
  workflows/
    deploy.yml
```

Ownership boundaries:

- `src/content/*`: all Korean/English copy, course data, FAQ, guide content, contact/link state.
- `src/styles/*`: design system tokens, global layout rules, motion utilities.
- `src/components/*`: reusable UI primitives and interactive islands.
- `src/pages/*`: route composition only; page files should not contain long content objects.
- `scripts/extract_pdf_content.py`: one-off/local repeatable PDF text and annotation extraction.
- `public/*`: static SEO and share assets.

## Implementation Rules

- Do not commit generated `node_modules`, build output, or local browser screenshots.
- Keep `yeoju_book_v1-수정요청.pdf` uncommitted unless the user explicitly asks to version it.
- Reservation and Kakao links remain pending input. Represent them as empty strings in content data and render disabled CTA states with clear labels.
- `/guide` must not appear in the public header navigation.
- Public pages must be static HTML at build time for SEO.
- Interactive UI must still expose content in accessible HTML.

---

## Execution Status

Last updated: 2026-05-20 21:10 KST

- [x] Task 1: Astro + React static site scaffolded and committed (`6ab292e`).
- [x] Task 2: PDF text and annotation source extracted and committed (`a38900f`).
- [x] Task 3: Typed bilingual site content added; content test and full build pass.
- [ ] Task 4: Build layout, preferences, and shared CTA components.
- [ ] Task 5: Build public homepage.
- [ ] Task 6: Build hidden `/guide` operator page.
- [ ] Task 7: Add SEO assets and GitHub Pages workflow.
- [ ] Task 8: Run final QA and browser verification.

Latest verification:

- `npm test -- src/content/siteContent.test.ts`: 4 tests passed.
- `npm run build`: 0 Astro check errors, 0 warnings, static build passed.

---

### Task 1: Scaffold Astro + React Static Site

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/motion.css`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "yeoju-bike-tour-site",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "build": "astro check && astro build",
    "preview": "astro preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@astrojs/react": "latest",
    "astro": "latest",
    "lucide-react": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@astrojs/check": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "jsdom": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  output: "static",
  site: "https://yeojubiketour.kr",
  vite: {
    server: {
      host: "127.0.0.1"
    }
  }
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"]
  }
});
```

- [ ] **Step 5: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 6: Create minimal CSS entry files**

`src/styles/tokens.css`

```css
:root {
  --color-bg: #f7faf8;
  --color-surface: #ffffff;
  --color-surface-alt: #edf5f1;
  --color-text: #13201b;
  --color-text-muted: #5e6f68;
  --color-border: #d7e4de;
  --color-river: #167c80;
  --color-ride: #f26b3a;
  --color-hangul: #3046a6;
  --color-rice: #c99a2e;
  --color-safety: #2f8f5b;
  --color-danger: #c94132;
}

:root[data-theme="dark"] {
  --color-bg: #0d1412;
  --color-surface: #14201d;
  --color-surface-alt: #1b2a26;
  --color-text: #eff7f3;
  --color-text-muted: #a9bbb4;
  --color-border: #2c403a;
  --color-river: #4fc3c7;
  --color-ride: #ff936b;
  --color-hangul: #8ea2ff;
  --color-rice: #e7c66a;
  --color-safety: #67d49a;
  --color-danger: #ff7a70;
}
```

`src/styles/global.css`

```css
@import "./tokens.css";
@import "./motion.css";

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  color-scheme: light;
}

html[data-theme="dark"] {
  color-scheme: dark;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: Pretendard, "Noto Sans KR", system-ui, sans-serif;
  line-height: 1.7;
}

a {
  color: inherit;
}

button,
input,
textarea,
select {
  font: inherit;
}

.container {
  width: min(100% - 32px, 1180px);
  margin-inline: auto;
}

.section {
  padding-block: clamp(72px, 9vw, 112px);
}
```

`src/styles/motion.css`

```css
:root {
  --motion-quick: 160ms ease-out;
  --motion-standard: 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
  --motion-story: 900ms cubic-bezier(0.16, 1, 0.3, 1);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}
```

- [ ] **Step 7: Create `src/pages/index.astro` smoke page**

```astro
---
import "../styles/global.css";
---

<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>여주 자전거 시티투어</title>
    <meta name="description" content="따르릉 여주 한글길 자전거 시티투어 안내" />
  </head>
  <body>
    <main class="container section">
      <h1>여주 자전거 시티투어</h1>
      <p>따르릉 여주 한글길 사이트를 준비하고 있습니다.</p>
    </main>
  </body>
</html>
```

- [ ] **Step 8: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and install exits with code 0.

- [ ] **Step 9: Verify scaffold**

Run:

```bash
npm run build
```

Expected: Astro check and build complete successfully, with `dist/` generated.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src/env.d.ts src/pages/index.astro src/styles/tokens.css src/styles/global.css src/styles/motion.css
git commit -m "chore: scaffold astro site"
```

---

### Task 2: Extract PDF Text and Annotation Source

**Files:**
- Create: `scripts/extract_pdf_content.py`
- Create by running script: `content-source/pdf-extract.md`
- Create by running script: `content-source/pdf-annotations.md`

- [ ] **Step 1: Create extraction script**

```python
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "yeoju_book_v1-수정요청.pdf"
OUT_DIR = ROOT / "content-source"
TEXT_OUT = OUT_DIR / "pdf-extract.md"
ANNOTATION_OUT = OUT_DIR / "pdf-annotations.md"


def normalized_lines(text: str) -> list[str]:
    return [" ".join(line.split()) for line in text.splitlines() if line.strip()]


def extract_annotations(page) -> list[str]:
    annotations_ref = page.get("/Annots")
    if not annotations_ref:
        return []

    annotations = annotations_ref.get_object() if hasattr(annotations_ref, "get_object") else annotations_ref
    results: list[str] = []
    for annotation in annotations:
        obj = annotation.get_object()
        if obj.get("/Subtype") == "/FreeText" and obj.get("/Contents"):
            results.append(" ".join(str(obj.get("/Contents")).split()))
    return results


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"Missing source PDF: {PDF_PATH}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(PDF_PATH))

    text_parts = [f"# PDF Text Extract\n\nSource: `{PDF_PATH.name}`\n\nPages: {len(reader.pages)}\n"]
    annotation_parts = [f"# PDF Annotation Extract\n\nSource: `{PDF_PATH.name}`\n\n"]

    for index, page in enumerate(reader.pages, start=1):
        lines = normalized_lines(page.extract_text() or "")
        annotations = extract_annotations(page)

        text_parts.append(f"\n## Page {index}\n\n")
        text_parts.append("\n".join(lines) if lines else "_No extractable text._")
        text_parts.append("\n")

        if annotations:
            annotation_parts.append(f"\n## Page {index}\n\n")
            for item in annotations:
                annotation_parts.append(f"- {item}\n")

    TEXT_OUT.write_text("".join(text_parts), encoding="utf-8")
    ANNOTATION_OUT.write_text("".join(annotation_parts), encoding="utf-8")
    print(f"Wrote {TEXT_OUT.relative_to(ROOT)}")
    print(f"Wrote {ANNOTATION_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run extraction**

Run:

```powershell
& "C:\Users\pss18\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" scripts/extract_pdf_content.py
```

Expected:

```text
Wrote content-source/pdf-extract.md
Wrote content-source/pdf-annotations.md
```

- [ ] **Step 3: Verify key annotations are captured**

Run:

```bash
rg -n "전망타워|권장속도|여주여행자센터|별점" content-source/pdf-annotations.md
```

Expected: matches include `전망타워 -> 전망대`, `권장속도`, `여주여행자센터 바이크텔`, and `별점 형태로 변경`.

- [ ] **Step 4: Commit**

```bash
git add scripts/extract_pdf_content.py content-source/pdf-extract.md content-source/pdf-annotations.md
git commit -m "docs: extract pdf source content"
```

---

### Task 3: Define Typed Site Content

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/siteContent.ts`
- Create: `src/content/siteContent.test.ts`

- [ ] **Step 1: Write failing content tests**

```ts
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
```

- [ ] **Step 2: Run test to verify failure**

Run:

```bash
npm test -- src/content/siteContent.test.ts
```

Expected: FAIL because `src/content/siteContent.ts` does not exist.

- [ ] **Step 3: Create content types**

```ts
export type Locale = "ko" | "en";
export type CourseId = "sejong" | "ohak";

export interface MetaContent {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ExternalLinks {
  reservationUrl: string;
  kakaoChannelUrl: string;
  reservationLabel: string;
  kakaoLabel: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface CoursePoint {
  marker: string;
  title: string;
  description: string;
  safetyNote: string;
}

export interface CourseContent {
  id: CourseId;
  name: string;
  distance: string;
  duration: string;
  rideTime: string;
  difficulty: string;
  highlights: string[];
  cautions: string[];
  points: CoursePoint[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EmergencyContact {
  label: string;
  value: string;
  description: string;
  href: string;
}

export interface GuideSection {
  id: string;
  title: string;
  summary: string;
  items: string[];
}

export interface LocalizedContent {
  meta: MetaContent;
  navigation: NavItem[];
  externalLinks: ExternalLinks;
  hero: HeroContent;
  intro: {
    title: string;
    body: string;
  };
  courses: CourseContent[];
  faq: FaqItem[];
  emergencyContacts: EmergencyContact[];
  guide: {
    title: string;
    sections: GuideSection[];
  };
}

export type SiteContent = Record<Locale, LocalizedContent>;
```

- [ ] **Step 4: Create typed content**

```ts
import type { SiteContent } from "./types";

export const siteContent: SiteContent = {
  ko: {
    meta: {
      title: "여주 자전거 시티투어 | 따르릉 여주 한글길",
      description: "남한강 자전거길을 따라 한글 자음 스토리텔링으로 만나는 여주 전기자전거 투어"
    },
    navigation: [
      { label: "투어 소개", href: "#intro" },
      { label: "코스", href: "#courses" },
      { label: "안전", href: "#safety" },
      { label: "FAQ", href: "#faq" },
      { label: "오시는 길", href: "#access" }
    ],
    externalLinks: {
      reservationUrl: "",
      kakaoChannelUrl: "",
      reservationLabel: "예약 링크 준비 중",
      kakaoLabel: "문의 링크 준비 중"
    },
    hero: {
      title: "따르릉 여주 한글길",
      subtitle: "여주 자전거 시티투어",
      body: "전기자전거를 타고 남한강과 세종의 도시 여주를 한글 자음 스토리텔링으로 만나는 가이드 투어입니다.",
      primaryCta: "예약하기",
      secondaryCta: "카카오톡 문의"
    },
    intro: {
      title: "강과 역사, 한글을 따라 달리는 여주",
      body: "여주는 남한강의 자연환경, 여주 쌀과 도자 문화, 세종대왕릉과 신륵사로 대표되는 역사 자원을 함께 품은 도시입니다."
    },
    courses: [
      {
        id: "sejong",
        name: "ㄱ부터 ㅎ까지: 세종편",
        distance: "약 19km",
        duration: "약 5시간",
        rideTime: "자전거 주행 약 110분",
        difficulty: "5점 중 2점",
        highlights: ["영월루", "여주보 전망대", "세종대왕릉"],
        cautions: [
          "자전거·보행자 겸용 도로에서 우측 주행",
          "다리 통과 시 중앙 볼라드 충돌 주의",
          "여주대교 아래 데크길과 영릉 진입로는 하차 후 이동"
        ],
        points: [
          { marker: "ㄱ", title: "금은모래강변공원", description: "남한강변의 탁 트인 풍경에서 시작하는 집결·연습 구간", safetyNote: "캠핑장 내 보행자와 어린이 통행 주의" },
          { marker: "ㄴ", title: "남한강자전거길", description: "여강 풍경을 따라 이어지는 평탄한 주행 구간", safetyNote: "자전거와 보행자 통행 간격 유지" },
          { marker: "ㄷ", title: "도자기", description: "여주의 생활 도자 문화와 지역 산업을 소개하는 해설 포인트", safetyNote: "정차 시 우측 가장자리 정렬" },
          { marker: "ㄹ", title: "영월루", description: "남한강과 여주 시가지를 조망하는 대표 문화유산", safetyNote: "언덕길과 주차장 차량 통행 주의" },
          { marker: "ㅁ", title: "마암", description: "여주 지명과 연결된 말 바위 전설을 소개하는 구간", safetyNote: "데크길 하차 이동" },
          { marker: "ㅂ", title: "보물", description: "신륵사와 여주의 문화유산을 연결하는 이야기", safetyNote: "강변 합류 지점 감속" },
          { marker: "ㅅ", title: "쌀", description: "대왕님표 여주쌀과 3,000년 벼 재배 역사를 소개", safetyNote: "식당 진입로 숙지" },
          { marker: "ㅇ", title: "양섬", description: "수려한 자연경관과 생태 이야기를 만나는 지점", safetyNote: "공원 진출입로 차량 확인" },
          { marker: "ㅈ", title: "자격루", description: "세종대왕의 과학 정신과 여주보 디자인을 연결", safetyNote: "볼라드와 공사 구간 주의" },
          { marker: "ㅊ", title: "측우기", description: "세종의 과학 유산을 코스 이야기로 확장", safetyNote: "여주보 진입 교차로 감속" },
          { marker: "ㅋ", title: "콜마무궁화역사문화관", description: "세종대왕면 일대의 문화 거점을 연결", safetyNote: "차도 이용 구간 대열 유지" },
          { marker: "ㅌ", title: "터", description: "세종대왕릉이 여주에 자리 잡은 이야기를 전하는 구간", safetyNote: "영릉 진입 시 하차 후 이동" },
          { marker: "ㅍ", title: "파리올림픽", description: "여주 양궁과 남한강 바람 이야기를 연결", safetyNote: "언덕 끝 합류 지점 통행 주의" },
          { marker: "ㅎ", title: "한글시장", description: "한글과 여주의 생활 문화가 만나는 마무리 이야기", safetyNote: "복귀 구간 보행자 통행 주의" }
        ]
      },
      {
        id: "ohak",
        name: "ㄱ부터 ㅎ까지: 오학편",
        distance: "약 19.6km",
        duration: "약 5시간",
        rideTime: "자전거 주행 약 110분",
        difficulty: "5점 중 3점",
        highlights: ["영월루", "여주보 전망대", "신륵사"],
        cautions: [
          "차도 옆 통행 시 우측 주행과 대열 유지",
          "다리 통과 시 중앙 볼라드 충돌 주의",
          "신륵사 관광지 내 보행자 통행 주의"
        ],
        points: [
          { marker: "ㄱ", title: "금은모래강변공원", description: "남한강변에서 시작하는 공통 출발 구간", safetyNote: "출발 전 대열 연습" },
          { marker: "ㄴ", title: "남한강자전거길", description: "여강을 따라 여주의 풍경을 소개", safetyNote: "우측 주행 유지" },
          { marker: "ㄷ", title: "도자기", description: "여주 도자 문화의 실용성과 전통을 소개", safetyNote: "정차 시 통행 방해 금지" },
          { marker: "ㄹ", title: "영월루", description: "남한강을 내려다보는 여주의 상징적 누각", safetyNote: "언덕길 감속" },
          { marker: "ㅁ", title: "마암", description: "여주 지명에 담긴 말 바위 이야기를 연결", safetyNote: "데크길 하차 이동" },
          { marker: "ㅂ", title: "보물", description: "여주의 역사 자원을 한글길 해설로 연결", safetyNote: "합류 지점 확인" },
          { marker: "ㅅ", title: "쌀", description: "여주 평야와 여주쌀의 역사성을 소개", safetyNote: "식사·휴식 후 장비 확인" },
          { marker: "ㅇ", title: "양섬", description: "남한강 생태와 현대사를 함께 담은 구간", safetyNote: "공원 진출입로 확인" },
          { marker: "ㅈ", title: "자격루", description: "세종의 과학 기술과 여주보를 연결", safetyNote: "볼라드 주의" },
          { marker: "ㅊ", title: "철새", description: "남한강의 민물가마우지와 백로 이야기를 소개", safetyNote: "천남리·오학동 구간 대열 유지" },
          { marker: "ㅋ", title: "코카콜라", description: "여주공장과 남한강 수자원 이야기를 연결", safetyNote: "차도 옆 통행 주의" },
          { marker: "ㅌ", title: "탑", description: "신륵사 다층전탑과 여주의 불교 문화유산을 소개", safetyNote: "관광지 내 보행자 통행 주의" },
          { marker: "ㅍ", title: "평야", description: "여주 평야와 재두루미 생태 이야기를 전하는 구간", safetyNote: "복귀 전 장비 상태 확인" },
          { marker: "ㅎ", title: "황포돛배", description: "남한강 수운과 여주 관광 콘텐츠를 연결", safetyNote: "강변유원지 주변 감속" }
        ]
      }
    ],
    faq: [
      { question: "전기자전거가 처음이어도 참여할 수 있나요?", answer: "기존에 자전거를 안정적으로 탈 수 있다면 참여할 수 있습니다. 출발 전 기본 조작법과 주행 연습을 진행하며, 현장 기준을 통과하지 못하면 안전을 위해 참여가 제한될 수 있습니다." },
      { question: "투어 소요 시간은 어느 정도인가요?", answer: "오리엔테이션부터 마무리까지 약 5-6시간이며, 실제 자전거 주행은 약 2시간입니다." },
      { question: "비가 와도 투어가 진행되나요?", answer: "약한 비에는 우비 착용 후 진행할 수 있으나, 호우와 강풍 등 안전상 위험이 있으면 취소 또는 코스 단축이 이뤄질 수 있습니다." }
    ],
    emergencyContacts: [
      { label: "경찰", value: "112", description: "긴급 상황 발생 시", href: "tel:112" },
      { label: "소방/응급", value: "119", description: "구급차 요청 및 화재 신고 시", href: "tel:119" },
      { label: "여주시 택시 통합 콜", value: "1600-7101", description: "여주 지역 택시 통합 호출", href: "tel:16007101" },
      { label: "세종여주병원", value: "031-880-7700", description: "응급실, 외과, 정형외과, 신경외과 진료 가능", href: "tel:0318807700" },
      { label: "여주시 보건소", value: "031-887-3601", description: "일반 진료 및 공공 보건 업무", href: "tel:0318873601" }
    ],
    guide: {
      title: "가이드/운영자 자료",
      sections: [
        { id: "roles", title: "가이드 역할", summary: "콘텐츠 전달자, 안전관리 책임자, 고객 경험 관리자의 역할을 수행합니다.", items: ["세나 인터콤으로 명확하게 해설합니다.", "그룹 속도와 대열을 관리합니다.", "참가자 만족도와 불편 사항을 수시로 확인합니다."] },
        { id: "orientation", title: "오리엔테이션", summary: "투어 전 가이드 소개, 참가자 인사, 장비 안내, 주행 연습을 진행합니다.", items: ["선두·후미 가이드를 소개합니다.", "참가자가 이름, 출발지, 기대 요소를 공유하게 합니다.", "PAS 조작과 브레이크 사용법을 확인합니다."] },
        { id: "equipment", title: "장비 안내", summary: "전기자전거, 안전 장비, 세나 인터콤 사용법을 설명합니다.", items: ["PAS 0-1단으로 출발합니다.", "브레이크는 양쪽을 함께 잡되 급제동을 피합니다.", "(+) 버튼과 가운데 버튼을 동시에 3초 이상 눌러 세나 전원을 조작합니다."] },
        { id: "safety", title: "주행 안전", summary: "일렬 주행, 안전거리, 수신호, 낙하물 대처 원칙을 지킵니다.", items: ["자전거 2-3대 거리의 안전거리를 유지합니다.", "옆으로 나란히 달리거나 추월하지 않습니다.", "소지품 낙하 시 후미 가이드가 수거합니다."] },
        { id: "course-notes", title: "코스별 운영 노트", summary: "세종편과 오학편의 권장속도, PAS 단계, 위험 구간을 코스별로 확인합니다.", items: ["금은모래캠핑장 구간은 15km/h, PAS 3단을 기준으로 안내합니다.", "양섬-여주보 구간은 20-25km/h, PAS 3-5단을 기준으로 안내합니다.", "신륵사 관광지 내에서는 보행자 통행을 우선 확인합니다."] },
        { id: "scenarios", title: "상황별 대응", summary: "낙차, PAS 비작동, 해설 이의제기 상황에 침착하게 대응합니다.", items: ["낙차 발생 시 그룹을 안전한 곳에 멈추고 신체 상태를 확인합니다.", "PAS 비작동 시 가이드 자전거 교환 또는 사무국 지원을 요청합니다.", "해설 이의제기 시 참가자 의견을 존중하고 공식 자료 기준을 설명합니다."] }
      ]
    }
  },
  en: {
    meta: {
      title: "Yeoju Bike City Tour | Hangul Road",
      description: "A guided e-bike tour along the Namhangang River with Hangul storytelling in Yeoju"
    },
    navigation: [
      { label: "Tour", href: "#intro" },
      { label: "Courses", href: "#courses" },
      { label: "Safety", href: "#safety" },
      { label: "FAQ", href: "#faq" },
      { label: "Access", href: "#access" }
    ],
    externalLinks: {
      reservationUrl: "",
      kakaoChannelUrl: "",
      reservationLabel: "Reservation link coming soon",
      kakaoLabel: "Contact link coming soon"
    },
    hero: {
      title: "Yeoju Hangul Road",
      subtitle: "Yeoju Bike City Tour",
      body: "A guided e-bike tour that connects the Namhangang River, King Sejong's city, and Hangul consonant storytelling.",
      primaryCta: "Reserve",
      secondaryCta: "KakaoTalk Contact"
    },
    intro: {
      title: "Ride through river scenery, history, and Hangul",
      body: "Yeoju brings together the Namhangang River, rice fields, ceramic culture, royal tombs, and riverside heritage."
    },
    courses: [
      {
        id: "sejong",
        name: "Sejong Course",
        distance: "About 19 km",
        duration: "About 5 hours",
        rideTime: "About 110 minutes riding",
        difficulty: "2 out of 5",
        highlights: ["Yeongwolru", "Yeoju Weir Observatory", "King Sejong's Tomb"],
        cautions: ["Keep right on shared paths", "Watch for bollards on bridges", "Walk bikes on deck paths and tomb entry paths"],
        points: [
          { marker: "ㄱ", title: "Geumeunmorae Riverside Park", description: "The gathering and practice area by the river.", safetyNote: "Watch pedestrians and children inside the camping area." },
          { marker: "ㄴ", title: "Namhangang Bike Path", description: "A relaxed riverside riding section.", safetyNote: "Keep distance from walkers and cyclists." },
          { marker: "ㄷ", title: "Ceramics", description: "A story point about Yeoju's ceramic culture.", safetyNote: "Stop on the right edge." },
          { marker: "ㄹ", title: "Yeongwolru", description: "A scenic pavilion overlooking the river and city.", safetyNote: "Slow down on the hill and near parked cars." },
          { marker: "ㅁ", title: "Maam Rock", description: "A local legend connected to Yeoju's name.", safetyNote: "Walk bikes on the deck path." },
          { marker: "ㅂ", title: "Treasure", description: "A heritage story connected to Silleuksa.", safetyNote: "Slow down at merge points." }
        ]
      },
      {
        id: "ohak",
        name: "Ohak Course",
        distance: "About 19.6 km",
        duration: "About 5 hours",
        rideTime: "About 110 minutes riding",
        difficulty: "3 out of 5",
        highlights: ["Yeongwolru", "Yeoju Weir Observatory", "Silleuksa Temple"],
        cautions: ["Keep right near roads", "Watch for bridge bollards", "Yield to pedestrians near Silleuksa"],
        points: [
          { marker: "ㄱ", title: "Geumeunmorae Riverside Park", description: "The shared starting point.", safetyNote: "Practice formation before departure." },
          { marker: "ㄴ", title: "Namhangang Bike Path", description: "A riverside introduction to Yeoju.", safetyNote: "Keep right." },
          { marker: "ㄷ", title: "Ceramics", description: "A short story about practical ceramic culture.", safetyNote: "Stop without blocking traffic." },
          { marker: "ㄹ", title: "Yeongwolru", description: "A major viewpoint over the Namhangang River.", safetyNote: "Slow down on slopes." },
          { marker: "ㅊ", title: "Migratory Birds", description: "A nature story about cormorants and egrets.", safetyNote: "Keep formation near O hak-dong." },
          { marker: "ㅎ", title: "Hwangpo Sailboat", description: "A story about historic river transport.", safetyNote: "Slow down near riverside visitor areas." }
        ]
      }
    ],
    faq: [
      { question: "Can beginners join the e-bike tour?", answer: "Participants should already be able to ride a bicycle safely. The guide provides practice before departure." },
      { question: "How long does the tour take?", answer: "The full program takes about 5-6 hours, with about 2 hours of riding." },
      { question: "Does the tour run in rain?", answer: "Light rain may be possible with rain gear, but heavy rain or strong wind can cause cancellation or course changes." }
    ],
    emergencyContacts: [
      { label: "Police", value: "112", description: "Emergency police contact", href: "tel:112" },
      { label: "Fire / EMS", value: "119", description: "Ambulance and fire emergency", href: "tel:119" },
      { label: "Yeoju Taxi Call", value: "1600-7101", description: "Integrated local taxi call number", href: "tel:16007101" },
      { label: "Sejong Yeoju Hospital", value: "031-880-7700", description: "Emergency and major clinical departments", href: "tel:0318807700" },
      { label: "Yeoju Public Health Center", value: "031-887-3601", description: "Public health service", href: "tel:0318873601" }
    ],
    guide: {
      title: "Guide and Operator Notes",
      sections: [
        { id: "roles", title: "Guide Roles", summary: "Guide as storyteller, safety lead, and customer experience manager.", items: ["Use the intercom clearly.", "Manage group speed and formation.", "Check participant comfort regularly."] },
        { id: "orientation", title: "Orientation", summary: "Introduce guides, participants, equipment, and practice riding.", items: ["Introduce lead and rear guides.", "Let participants share name, origin, and expectation.", "Check PAS and braking basics."] },
        { id: "equipment", title: "Equipment", summary: "Explain e-bikes, protective equipment, and intercoms.", items: ["Start at PAS level 0 or 1.", "Use both brakes gradually.", "Hold the plus and center buttons together for 3 seconds for Sena power."] },
        { id: "safety", title: "Riding Safety", summary: "Keep single-file riding, safe distance, hand signals, and dropped-item rules.", items: ["Keep 2-3 bike lengths.", "Do not overtake.", "Rear guide retrieves dropped items."] },
        { id: "course-notes", title: "Course Notes", summary: "Review speed, PAS level, and risk points per course.", items: ["Use 15 km/h and PAS 3 near the starting area.", "Use 20-25 km/h and PAS 3-5 around Yangseom to Yeoju Weir.", "Yield to pedestrians around Silleuksa."] },
        { id: "scenarios", title: "Scenarios", summary: "Respond to falls, PAS malfunction, and content questions calmly.", items: ["Stop the group safely after a fall.", "Swap bikes or call office support for PAS malfunction.", "Respect participant input and refer to official guide material."] }
      ]
    }
  }
};
```

- [ ] **Step 5: Run test to verify pass**

Run:

```bash
npm test -- src/content/siteContent.test.ts
```

Expected: PASS with 4 tests.

- [ ] **Step 6: Commit**

```bash
git add src/content/types.ts src/content/siteContent.ts src/content/siteContent.test.ts
git commit -m "feat: add typed bilingual site content"
```

---

### Task 4: Build Layout, Preferences, and Shared CTA Components

**Files:**
- Create: `src/scripts/preferences.ts`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/AppHeader.astro`
- Create: `src/components/AppFooter.astro`
- Create: `src/components/ExternalCta.astro`
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/LanguageToggle.tsx`

- [ ] **Step 1: Create preference helper**

```ts
export type ThemePreference = "light" | "dark";
export type LocalePreference = "ko" | "en";

export function getInitialTheme(storageValue: string | null, prefersDark: boolean): ThemePreference {
  if (storageValue === "light" || storageValue === "dark") {
    return storageValue;
  }
  return prefersDark ? "dark" : "light";
}

export function toggleTheme(current: ThemePreference): ThemePreference {
  return current === "dark" ? "light" : "dark";
}

export function toggleLocale(current: LocalePreference): LocalePreference {
  return current === "ko" ? "en" : "ko";
}
```

- [ ] **Step 2: Create `src/scripts/preferences.test.ts`**

```ts
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
```

- [ ] **Step 3: Run preference tests to verify pass**

Run:

```bash
npm test -- src/scripts/preferences.test.ts
```

Expected: PASS with 3 tests.

- [ ] **Step 4: Create `BaseLayout.astro`**

```astro
---
import "../styles/global.css";
import AppHeader from "../components/AppHeader.astro";
import AppFooter from "../components/AppFooter.astro";
import type { LocalizedContent, Locale } from "../content/types";

interface Props {
  locale: Locale;
  content: LocalizedContent;
  title?: string;
  description?: string;
}

const { locale, content, title = content.meta.title, description = content.meta.description } = Astro.props;
---

<!doctype html>
<html lang={locale} data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.svg" />
    <script is:inline>
      const savedTheme = localStorage.getItem("yeoju-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : prefersDark ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
    </script>
  </head>
  <body>
    <AppHeader content={content} locale={locale} />
    <slot />
    <AppFooter content={content} />
  </body>
</html>
```

- [ ] **Step 5: Create header/footer/CTA components**

`src/components/AppHeader.astro`

```astro
---
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import ExternalCta from "./ExternalCta.astro";
import type { LocalizedContent, Locale } from "../content/types";

interface Props {
  content: LocalizedContent;
  locale: Locale;
}

const { content, locale } = Astro.props;
const currentPath = Astro.url.pathname;
---

<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/">따르릉 여주 한글길</a>
    <nav class="public-nav" aria-label="주요 메뉴">
      {content.navigation.map((item) => <a href={item.href}>{item.label}</a>)}
    </nav>
    <div class="header-actions">
      <LanguageToggle client:load locale={locale} currentPath={currentPath} />
      <ThemeToggle client:load />
      <ExternalCta links={content.externalLinks} kind="reservation" compact />
    </div>
  </div>
</header>
```

`src/components/AppFooter.astro`

```astro
---
import type { LocalizedContent } from "../content/types";

interface Props {
  content: LocalizedContent;
}

const { content } = Astro.props;
---

<footer class="site-footer">
  <div class="container footer-inner">
    <strong>따르릉 여주 한글길</strong>
    <p>{content.meta.description}</p>
    <p class="muted">예약과 문의는 외부 서비스로 연결됩니다.</p>
  </div>
</footer>
```

`src/components/ExternalCta.astro`

```astro
---
import type { ExternalLinks } from "../content/types";

interface Props {
  links: ExternalLinks;
  kind: "reservation" | "kakao";
  compact?: boolean;
}

const { links, kind, compact = false } = Astro.props;
const href = kind === "reservation" ? links.reservationUrl : links.kakaoChannelUrl;
const readyLabel = kind === "reservation" ? "예약하기" : "카카오톡 문의";
const pendingLabel = kind === "reservation" ? links.reservationLabel : links.kakaoLabel;
const className = ["external-cta", `external-cta-${kind}`, compact ? "external-cta-compact" : ""].filter(Boolean).join(" ");
---

{
  href ? (
    <a class={className} href={href} target="_blank" rel="noreferrer">
      {readyLabel}
    </a>
  ) : (
    <span class={`${className} is-disabled`} aria-disabled="true">
      {pendingLabel}
    </span>
  )
}
```

`src/components/ThemeToggle.tsx`

```tsx
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getInitialTheme, toggleTheme, type ThemePreference } from "../scripts/preferences";

export default function ThemeToggle() {
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
    <button className="icon-button" type="button" onClick={onToggle} aria-label="테마 전환">
      {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
```

`src/components/LanguageToggle.tsx`

```tsx
import type { Locale } from "../content/types";

interface Props {
  locale: Locale;
  currentPath: string;
}

export default function LanguageToggle({ locale, currentPath }: Props) {
  const nextLocale = locale === "ko" ? "en" : "ko";
  const normalizedPath = currentPath || "/";
  const href = nextLocale === "ko" ? normalizedPath : `${normalizedPath}?lang=en`;

  return (
    <a className="language-toggle" href={href} aria-label="언어 전환">
      {nextLocale.toUpperCase()}
    </a>
  );
}
```

- [ ] **Step 6: Extend CSS for shell components**

Append to `src/styles/global.css`:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border), transparent 20%);
  background: color-mix(in srgb, var(--color-bg), transparent 8%);
  backdrop-filter: blur(18px);
}

.header-inner,
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.header-inner {
  min-height: 72px;
}

.brand {
  font-weight: 800;
  text-decoration: none;
}

.public-nav {
  display: flex;
  gap: 20px;
  font-size: 15px;
  font-weight: 700;
}

.public-nav a {
  color: var(--color-text-muted);
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-button,
.language-toggle,
.external-cta {
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform var(--motion-quick), border-color var(--motion-quick), background var(--motion-quick);
}

.external-cta-reservation {
  border-color: var(--color-ride);
  background: var(--color-ride);
  color: #ffffff;
}

.external-cta-kakao {
  border-color: #f6d84a;
  background: #f6d84a;
  color: #1f1f1f;
}

.external-cta.is-disabled {
  border-color: var(--color-border);
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.site-footer {
  border-top: 1px solid var(--color-border);
  padding-block: 40px;
}

.muted {
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .public-nav {
    display: none;
  }

  .header-inner {
    min-height: 64px;
  }
}
```

- [ ] **Step 7: Verify build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/scripts/preferences.ts src/scripts/preferences.test.ts src/layouts/BaseLayout.astro src/components/AppHeader.astro src/components/AppFooter.astro src/components/ExternalCta.astro src/components/ThemeToggle.tsx src/components/LanguageToggle.tsx src/styles/global.css
git commit -m "feat: add layout and preference controls"
```

---

### Task 5: Build Public Home Page Sections

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/CourseTabs.tsx`
- Create: `src/components/FaqAccordion.tsx`
- Create: `src/components/EmergencyContacts.astro`

- [ ] **Step 1: Create `CourseTabs.tsx`**

```tsx
import { useState } from "react";
import type { CourseContent } from "../content/types";

interface Props {
  courses: CourseContent[];
}

export default function CourseTabs({ courses }: Props) {
  const [activeId, setActiveId] = useState(courses[0].id);
  const activeCourse = courses.find((course) => course.id === activeId) ?? courses[0];

  return (
    <div className="course-tabs">
      <div className="tab-list" role="tablist" aria-label="코스 선택">
        {courses.map((course) => (
          <button
            key={course.id}
            id={`course-tab-${course.id}`}
            type="button"
            role="tab"
            aria-selected={course.id === activeId}
            aria-controls={`course-panel-${course.id}`}
            className={course.id === activeId ? "is-active" : ""}
            onClick={() => setActiveId(course.id)}
          >
            {course.name}
          </button>
        ))}
      </div>

      <section
        id={`course-panel-${activeCourse.id}`}
        role="tabpanel"
        aria-labelledby={`course-tab-${activeCourse.id}`}
        className="course-panel"
      >
        <div className="course-stats" aria-label={`${activeCourse.name} 요약`}>
          <span>{activeCourse.distance}</span>
          <span>{activeCourse.duration}</span>
          <span>{activeCourse.rideTime}</span>
          <span>{activeCourse.difficulty}</span>
        </div>
        <ul className="course-highlights">
          {activeCourse.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <ol className="course-timeline">
          {activeCourse.points.map((point) => (
            <li key={`${activeCourse.id}-${point.marker}-${point.title}`}>
              <span className="hangul-marker">{point.marker}</span>
              <div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
                <small>{point.safetyNote}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create `FaqAccordion.tsx`**

```tsx
import { useState } from "react";
import type { FaqItem } from "../content/types";

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article className="faq-item" key={item.question}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <span>{item.question}</span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <p>{item.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Create `EmergencyContacts.astro`**

```astro
---
import type { EmergencyContact } from "../content/types";

interface Props {
  contacts: EmergencyContact[];
}

const { contacts } = Astro.props;
---

<div class="emergency-grid">
  {contacts.map((contact) => (
    <a class="emergency-card" href={contact.href}>
      <strong>{contact.label}</strong>
      <span>{contact.value}</span>
      <small>{contact.description}</small>
    </a>
  ))}
</div>
```

- [ ] **Step 4: Replace `src/pages/index.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import CourseTabs from "../components/CourseTabs";
import EmergencyContacts from "../components/EmergencyContacts.astro";
import ExternalCta from "../components/ExternalCta.astro";
import FaqAccordion from "../components/FaqAccordion";
import { siteContent } from "../content/siteContent";

const locale = Astro.url.searchParams.get("lang") === "en" ? "en" : "ko";
const content = siteContent[locale];
---

<BaseLayout locale={locale} content={content}>
  <main>
    <section class="hero section">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="hero-subtitle">{content.hero.subtitle}</p>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.body}</p>
          <div class="cta-row">
            <ExternalCta links={content.externalLinks} kind="reservation" />
            <ExternalCta links={content.externalLinks} kind="kakao" />
          </div>
        </div>
        <div class="hero-visual" aria-label="남한강 자전거길을 달리는 투어 이미지 영역">
          <div class="route-line"></div>
          <span class="hangul-marker">ㅎ</span>
        </div>
      </div>
    </section>

    <section id="intro" class="section">
      <div class="container split-section">
        <div>
          <p class="section-kicker">Yeoju Ride</p>
          <h2>{content.intro.title}</h2>
        </div>
        <p>{content.intro.body}</p>
      </div>
    </section>

    <section id="courses" class="section surface-band">
      <div class="container">
        <p class="section-kicker">Course</p>
        <h2>세종편과 오학편을 선택해 살펴보세요</h2>
        <CourseTabs client:load courses={content.courses} />
      </div>
    </section>

    <section id="safety" class="section">
      <div class="container split-section">
        <div>
          <p class="section-kicker">Safety</p>
          <h2>가이드가 함께하는 안전한 전기자전거 투어</h2>
        </div>
        <ul class="safety-list">
          <li>출발 전 오리엔테이션과 주행 연습</li>
          <li>PAS 조작법과 브레이크 사용법 안내</li>
          <li>세나 인터콤을 통한 주행 중 안내</li>
          <li>선두·후미 가이드의 대열 관리</li>
        </ul>
      </div>
    </section>

    <section id="faq" class="section surface-band">
      <div class="container">
        <p class="section-kicker">FAQ</p>
        <h2>자주 묻는 질문</h2>
        <FaqAccordion client:load items={content.faq} />
      </div>
    </section>

    <section id="access" class="section">
      <div class="container">
        <p class="section-kicker">Emergency</p>
        <h2>비상 연락망</h2>
        <EmergencyContacts contacts={content.emergencyContacts} />
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Append page CSS**

Append to `src/styles/global.css`:

```css
.hero {
  min-height: calc(100vh - 72px);
  display: grid;
  align-items: center;
}

.hero-grid,
.split-section {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(32px, 6vw, 80px);
  align-items: center;
}

.hero-subtitle,
.section-kicker {
  margin: 0 0 12px;
  color: var(--color-river);
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 720px;
  margin: 0;
  font-size: clamp(40px, 7vw, 64px);
  line-height: 1.05;
}

.hero p {
  max-width: 620px;
  color: var(--color-text-muted);
  font-size: 18px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-visual {
  position: relative;
  min-height: 420px;
  border-radius: 12px;
  overflow: hidden;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--color-river), transparent 20%), transparent 55%),
    linear-gradient(180deg, color-mix(in srgb, var(--color-rice), transparent 36%), var(--color-surface-alt));
  box-shadow: 0 24px 80px color-mix(in srgb, var(--color-river), transparent 70%);
}

.route-line {
  position: absolute;
  inset: 20% 12%;
  border-bottom: 5px solid var(--color-ride);
  border-left: 5px solid var(--color-river);
  border-radius: 0 0 0 80px;
}

.hangul-marker {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-hangul);
  color: #ffffff;
  font-weight: 800;
}

.hero-visual .hangul-marker {
  position: absolute;
  right: 14%;
  bottom: 18%;
}

.surface-band {
  background: var(--color-surface-alt);
}

.course-tabs {
  margin-top: 32px;
}

.tab-list {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.tab-list button {
  min-height: 44px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0 18px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-weight: 800;
}

.tab-list button.is-active {
  border-color: var(--color-river);
  background: var(--color-river);
  color: #ffffff;
}

.course-panel {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: clamp(20px, 4vw, 32px);
  background: var(--color-surface);
}

.course-stats,
.course-highlights,
.emergency-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.course-stats span,
.course-highlights li,
.emergency-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--color-surface-alt);
}

.course-timeline {
  list-style: none;
  padding: 0;
  margin: 32px 0 0;
  display: grid;
  gap: 18px;
}

.course-timeline li {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 16px;
}

.course-timeline h3 {
  margin: 0 0 6px;
}

.course-timeline p,
.course-timeline small {
  margin: 0;
  color: var(--color-text-muted);
}

.safety-list {
  display: grid;
  gap: 12px;
  margin: 0;
}

.faq-list {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.faq-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
}

.faq-item button {
  width: 100%;
  min-height: 56px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background: transparent;
  color: var(--color-text);
  font-weight: 800;
  text-align: left;
}

.faq-item p {
  margin: 0;
  padding: 0 18px 18px;
  color: var(--color-text-muted);
}

.emergency-card {
  display: grid;
  gap: 4px;
  text-decoration: none;
}

.emergency-card span {
  color: var(--color-danger);
  font-size: 22px;
  font-weight: 800;
}

@media (max-width: 767px) {
  .hero-grid,
  .split-section {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
  }

  .hero-visual {
    min-height: 300px;
  }

  .tab-list {
    overflow-x: auto;
  }
}
```

- [ ] **Step 6: Verify page build**

Run:

```bash
npm run build
```

Expected: PASS and `dist/index.html` contains `따르릉 여주 한글길`.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/components/CourseTabs.tsx src/components/FaqAccordion.tsx src/components/EmergencyContacts.astro src/styles/global.css
git commit -m "feat: build public tour homepage"
```

---

### Task 6: Build Hidden `/guide` Operator Page

**Files:**
- Create: `src/pages/guide.astro`
- Create: `src/components/GuideChecklist.tsx`

- [ ] **Step 1: Create `GuideChecklist.tsx`**

```tsx
import { useState } from "react";
import type { GuideSection } from "../content/types";

interface Props {
  sections: GuideSection[];
}

export default function GuideChecklist({ sections }: Props) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  function toggle(key: string) {
    setCheckedItems((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="guide-checklist">
      {sections.map((section) => (
        <section className="guide-card" id={section.id} key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.summary}</p>
          <ul>
            {section.items.map((item, index) => {
              const key = `${section.id}-${index}`;
              return (
                <li key={key}>
                  <label>
                    <input type="checkbox" checked={Boolean(checkedItems[key])} onChange={() => toggle(key)} />
                    <span>{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/guide.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import GuideChecklist from "../components/GuideChecklist";
import { siteContent } from "../content/siteContent";

const locale = Astro.url.searchParams.get("lang") === "en" ? "en" : "ko";
const content = siteContent[locale];
---

<BaseLayout
  locale={locale}
  content={content}
  title={`${content.guide.title} | ${content.meta.title}`}
  description="여주 자전거 시티투어 가이드와 운영자를 위한 숨김 자료 페이지"
>
  <main class="guide-page">
    <section class="section guide-hero">
      <div class="container">
        <p class="section-kicker">Hidden Guide</p>
        <h1>{content.guide.title}</h1>
        <p>이 페이지는 공개 메뉴에 노출되지 않는 운영자용 정적 자료입니다.</p>
      </div>
    </section>

    <section class="section">
      <div class="container guide-layout">
        <aside class="guide-toc" aria-label="운영자 자료 목차">
          {content.guide.sections.map((section) => (
            <a href={`#${section.id}`}>{section.title}</a>
          ))}
        </aside>
        <GuideChecklist client:load sections={content.guide.sections} />
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 3: Append guide CSS**

Append to `src/styles/global.css`:

```css
.guide-page {
  background: var(--color-bg);
}

.guide-hero {
  background: var(--color-surface-alt);
}

.guide-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}

.guide-toc {
  position: sticky;
  top: 96px;
  display: grid;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--color-surface);
}

.guide-toc a {
  color: var(--color-text-muted);
  font-weight: 700;
  text-decoration: none;
}

.guide-checklist {
  display: grid;
  gap: 18px;
  max-width: 860px;
}

.guide-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
  background: var(--color-surface);
}

.guide-card h2 {
  margin: 0 0 8px;
}

.guide-card p {
  margin: 0 0 18px;
  color: var(--color-text-muted);
}

.guide-card ul {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.guide-card label {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
}

.guide-card input {
  width: 20px;
  height: 20px;
  accent-color: var(--color-safety);
}

@media (max-width: 900px) {
  .guide-layout {
    grid-template-columns: 1fr;
  }

  .guide-toc {
    position: static;
  }
}
```

- [ ] **Step 4: Verify `/guide` exists but is not in public nav**

Run:

```bash
npm run build
rg -n "/guide" dist/index.html
rg -n "가이드/운영자 자료" dist/guide/index.html
```

Expected:

- First `rg` returns no `/guide` matches from public navigation.
- Second `rg` finds guide page content in `dist/guide/index.html`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/guide.astro src/components/GuideChecklist.tsx src/styles/global.css
git commit -m "feat: add hidden guide page"
```

---

### Task 7: Add SEO Assets and GitHub Pages Deployment

**Files:**
- Create: `public/CNAME`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/og-image.svg`
- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Create `public/CNAME`**

Use the first-choice custom domain from the design spec:

```txt
yeojubiketour.kr
```

- [ ] **Step 2: Create `public/robots.txt`**

```txt
User-agent: *
Allow: /
Disallow: /guide/

Sitemap: https://yeojubiketour.kr/sitemap.xml
```

- [ ] **Step 3: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yeojubiketour.kr/</loc>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Create `public/og-image.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">여주 자전거 시티투어</title>
  <desc id="desc">따르릉 여주 한글길 공유 이미지</desc>
  <rect width="1200" height="630" fill="#F7FAF8"/>
  <path d="M120 420 C 280 260, 460 510, 620 350 S 920 220, 1080 320" fill="none" stroke="#167C80" stroke-width="18" stroke-linecap="round"/>
  <circle cx="860" cy="260" r="82" fill="#3046A6"/>
  <text x="860" y="292" text-anchor="middle" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="82" font-weight="800" fill="#FFFFFF">ㅎ</text>
  <text x="120" y="170" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="64" font-weight="800" fill="#13201B">따르릉 여주 한글길</text>
  <text x="120" y="240" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="34" font-weight="700" fill="#5E6F68">여주 자전거 시티투어</text>
  <rect x="120" y="470" width="290" height="70" rx="8" fill="#F26B3A"/>
  <text x="265" y="516" text-anchor="middle" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF">Yeoju Bike Tour</text>
</svg>
```

- [ ] **Step 5: Create GitHub Actions workflow**

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 6: Configure repository Pages source**

In GitHub repository settings, set Pages deployment source to GitHub Actions.

Expected settings:

```text
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

This is a repository setting, not a local file change.

- [ ] **Step 7: Verify build and static SEO files**

Run:

```bash
npm run build
Test-Path dist/CNAME
Test-Path dist/robots.txt
Test-Path dist/sitemap.xml
Test-Path dist/og-image.svg
```

Expected: build passes and each `Test-Path` returns `True`.

- [ ] **Step 8: Commit**

```bash
git add public/CNAME public/robots.txt public/sitemap.xml public/og-image.svg .github/workflows/deploy.yml astro.config.mjs
git commit -m "chore: add seo assets and pages deployment"
```

---

### Task 8: Verification and Browser QA

**Files:**
- Modify only if verification finds defects in files created by Tasks 1-7.

- [ ] **Step 1: Run automated checks**

Run:

```bash
npm test
npm run build
```

Expected: all tests pass and Astro build succeeds.

- [ ] **Step 2: Start local dev server**

Run:

```bash
npm run dev -- --port 4321
```

Expected: server is available at `http://127.0.0.1:4321/`.

- [ ] **Step 3: Browser QA for public page**

Use Browser plugin to open:

```text
http://127.0.0.1:4321/
```

Check:

- Header public navigation does not include `/guide`.
- Hero title is visible without overlap at desktop width.
- Reservation and Kakao CTAs show pending-link labels and do not navigate.
- Course tabs switch between Sejong and Ohak.
- FAQ expands and collapses.
- Theme toggle switches light/dark without losing contrast.
- Language toggle opens English content using `?lang=en`.

- [ ] **Step 4: Browser QA for hidden guide**

Use Browser plugin to open:

```text
http://127.0.0.1:4321/guide
```

Check:

- Guide page loads directly.
- Guide table of contents links scroll to sections.
- Checklist items can be checked and unchecked.
- Mobile viewport keeps touch targets at least 44px high.

- [ ] **Step 5: Responsive screenshots**

Use Browser plugin at these viewport sizes:

```text
1440x1000
390x844
```

Check:

- No horizontal overflow.
- Header controls do not overlap.
- Course timeline converts cleanly on mobile.
- Guide TOC stacks above checklist on mobile.

- [ ] **Step 6: Stop dev server**

Stop the terminal process running `npm run dev`.

- [ ] **Step 7: Commit verification fixes**

If verification required code changes:

```bash
git add src public .github package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts
git commit -m "fix: polish responsive site qa"
```

If verification required no code changes, do not create an empty commit.

---

## Self-Review Checklist

- Spec coverage:
  - Static public site: Tasks 1, 4, 5.
  - Hidden `/guide`: Task 6.
  - Design system first: Tasks 1, 4, 5 use CSS tokens from the plan before page-specific styling.
  - Light/dark mode: Tasks 1 and 4.
  - Korean/English: Tasks 3, 4, 5, 6.
  - SEO/GitHub Pages: Task 7.
  - Animation-heavy direction: Tasks 1, 5, 6 include motion tokens and animated interaction foundations.
  - PDF content and annotations: Task 2.
  - Reservation/Kakao pending links: Tasks 3, 4, 5.

- Type consistency:
  - `Locale`, `LocalizedContent`, `CourseContent`, `GuideSection`, and `ExternalLinks` are defined in `src/content/types.ts`.
  - Components import these types directly from `src/content/types.ts`.
  - Course IDs are `sejong` and `ohak` consistently across tests and content.

- Remaining external input:
  - 네이버스토어 예약 링크.
  - 카카오톡채널 문의 링크.
  - 실제 구매 도메인.
