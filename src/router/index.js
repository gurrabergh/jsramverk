import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Report from '../views/Report.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import Create from '../views/Create.vue'
import Delete from '../views/Delete.vue'
import Edit from '../views/Edit.vue'
import auth from '../components/token.js'
import Logout from '../views/Logout.vue'

const routes = [
  {
    path: '/',
    name: 'MeS',
    component: Home
  },
  {
    path: '/reports/week/:week',
    name: 'Report 1',
    component: Report
  },
  {
  path: '/login',
  name: 'Login',
  component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresLogout: true
    }
  },
  {
    path: '/admin/create',
    name: 'Create',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/edit/:id',
    name: 'Edit',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/delete/:id',
    name: 'Delete',
    component: Delete,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
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
