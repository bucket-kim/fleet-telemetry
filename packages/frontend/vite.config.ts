import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  // basicSsl serves the dev server over HTTPS with a self-signed cert.
  plugins: [react(), basicSsl()],
});
