import { createRouter, createWebHashHistory } from 'vue-router'
import auth from '../components/token.js'
import Chatt from '../views/Chatt.vue'

const routes = [
  {
    path: '/',
    name: 'Chatt',
    component: Chatt,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authenticatedUser = auth.token;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && ! authenticatedUser) next('/login')
    else next();
});

export default router
