import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/admin',
      component: resolve => require(['../components/Home.vue'], resolve),
      children:[
        {
          path: '/heroes',
          component: resolve => require(['../page/heroes.vue'], resolve)
        },
        {
          path: '/hero/1',
          component: resolve => require(['../page/hero-new.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../page/Login.vue'], resolve)
    },
  ]
})
