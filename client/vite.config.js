import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Basispfad, der während der Entwicklung und des Builds verwendet wird
  base: "/", // Dies sollte standardmäßig korrekt sein, es sei denn, deine Anwendung befindet sich in einem Unterordner

  // Weitere Konfigurationsoptionen hier
});
