import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import jwtDecode from 'jwt-decode'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {requiresAuth: true}
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('./views/Login.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('./views/RolesShow.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: '/commit/:id',
        name: 'commit',
        component: () => import('./views/Commit.vue'),
        meta: {requiresAuth: true}
      }
    ]
  })

  router.beforeEach(async (to, from, next) => {                //перед каждым переходом страницы
    if(!to.matched.some(record => record.meta.requiresAuth))   //если не требуется аутентификация
      return next();                                           //переход на страницу
    const token = localStorage.getItem('token')
    if ( token == null) {                                     //если нет токена в localStorage
      return next({
        path: '/login',                                       //переадресация на страничку логина
        query: { redirect: to.fullPath }                      //сохранение адреса назначения
      })
    } 
    const dtoken = jwtDecode(localStorage.token);             //декодировка токена
    const expDate = new Date(dtoken.exp * 1000)               //срок актуальности токена
    if(expDate < new Date()) {                                //сравнение срока токена и текушей даты
      return next({                                           //если срок прошел
        path: '/login',                                       //переадресация на страничку логина
        query: { redirect: to.fullPath }                      //сохранение адреса назначения
      })
    }
    if(!to.meta.roles)                                        //если нет ограничения на роль пользователя
      return next()                                           //переход на страницу
    if(to.meta.roles.includes('admin')) {                     //если доступ только для администратора
      if(dtoken.rules == "Admin")                                   //проверка роли
        return next()                                         //переход на страницу
      else                                                    //иначе
        return next({path: '/login'})                         //переадресация на страницу ошибки
    }
    if(to.meta.roles.includes('adminABD')) {                  //если доступ только для загрузчика
      if(dtoken.rules == "Admin ABD" || dtoken.rules ==  "Admin")             //проверка роли
        return next()                                         //переход на страницу
      else                                                    //иначе
        return next({path: '/login'})                         //переадресация на страницу ошибки
    } 
  })

  export default router;