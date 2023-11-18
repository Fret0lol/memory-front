import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }, // Indique que cette route nécessite une authentification
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vérification de l'authentification avant chaque navigation vers une route protégée
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    next('/login');
  } else {
    next();
  }
});

export default router;