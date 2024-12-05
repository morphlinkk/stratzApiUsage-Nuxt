// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt','@primevue/nuxt-module'],
  primevue: {
    options: {
        theme: 'none'
    }
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/primevue/tailwind.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
