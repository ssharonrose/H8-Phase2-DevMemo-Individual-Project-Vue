import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import UserHomePage from '../views/UserHomePage.vue'
import FormNote from "../components/Note.vue"
import DetailNote from '../views/DetailNotePage.vue'
import NewsPage from '../views/NewsPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UserHomePage',
      component: UserHomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/note',
      name: 'formNote',
      component: FormNote
    },
    {
      path: '/notes/user/:id',
      name: 'DetailNote',
      component: DetailNote
    },
    {
      path: '/note/edit/:id',
      name: 'editForm',
      component: FormNote
    },
    {
      path: '/public',
      name: 'public',
      component: UserHomePage
    },
    {
      path: '/news',
      name: 'news',
      component: NewsPage
    },

  ]
})

router.beforeEach((to, from, next) => {
  console.log("to", to);
  console.log("from", from);

  if ((to.name === "login" || to.name === "register") && localStorage.getItem("access_token")) {
    next({ name: "UserHomePage" })
  } else if (to.name === "UserHomePage" && !localStorage.getItem("access_token")) {
    next({ name: "login" })
  } else {
    next()
  }
})

export default router
