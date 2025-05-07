import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  components: true,
  imports: {
    autoImport: true,
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: ["nuxt-vuefire", "shadcn-nuxt", "nuxt-lucide-icons"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  css: ["~/assets/css/tailwind.css"],
  app: {
    head: {
      title: "My Nuxt App",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "description", content: "My Nuxt App" },
        { name: "author", content: "Matheus" },
      ],
    },
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: false,
    },
    config: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,

    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
