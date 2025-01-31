import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('./views/Editor.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeResolve((to, from, next) => {
  const no_transition_routes = [
    '/watch/',
    '/live/',
  ];
  if (document.startViewTransition && !no_transition_routes.some((route) => to.path.startsWith(route) && from.path.startsWith(route))) {
    document.startViewTransition(() => {
      next();
    });
  } else {
    next();
  }
});


export default router;
