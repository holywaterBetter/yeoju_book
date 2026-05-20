import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const site = process.env.SITE_URL ?? "https://yeojubiketour.kr";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  integrations: [react()],
  output: "static",
  site,
  base,
  vite: {
    server: {
      host: "127.0.0.1"
    }
  }
});
