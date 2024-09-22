import Vue from 'vue';
import Router from 'vue-router';
import WeatherComponent from '@/views/WeatherComponent.vue'; // Caminho para o WeatherComponent

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'weather',
      component: WeatherComponent
    }
  ]
});
