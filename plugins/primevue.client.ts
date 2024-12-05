import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    theme: 'none', 
  });

  nuxtApp.vueApp.component('InputText', InputText);
});
