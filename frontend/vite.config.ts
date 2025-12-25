import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { join } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  envDir: join(__dirname, "..", ".."),
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});
