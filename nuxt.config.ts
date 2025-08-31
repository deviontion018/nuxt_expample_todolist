// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/icon'],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['@/assets/css/main.css'],
  ui: {
    colorMode: false
  }
})