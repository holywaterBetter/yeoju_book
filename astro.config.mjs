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
