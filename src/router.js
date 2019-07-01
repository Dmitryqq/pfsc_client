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
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./views/Dashboard.vue'),
        redirect: '/dashboard/users',
        meta: {
          requiresAuth: true,
          roles:['admin']
        },
        children:[{
          path: 'users',
          name: 'users',
          component: () => import('./views/UsersShow.vue'),
          meta: {
            requiresAuth: true,
            roles:['admin']
          }
        },
        {
          path: 'configs',
          name: 'configs',
          component: () => import('./views/ConfigsShow.vue'),
          meta: {
            requiresAuth: true,
            roles:['admin']
          }
        },
        {
          path: 'filetypes',
          name: 'filetypes',
          component: () => import('./views/TypeOfFilesShow.vue'),
          meta: {
            requiresAuth: true,
            roles:['admin']
          }
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('./views/RolesShow.vue'),
          meta: {
            requiresAuth: true,
            roles:['admin']
          }
        }
      ]
      },
      {
        path: '/account',
        name: 'account',
        component: () => import('./views/Account.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: '/commit/new',
        name: 'addCommit',
        component: () => import('./views/CommitAdd.vue'),
        meta: {
          requiresAuth: true,
          roles:['user']
        }
      },
      {
        path: '/commit/:id',
        name: 'commit',
        component: () => import('./views/Commit.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: '/help',
        name: 'help',
        component: () => import('./views/HelpPage.vue')
      },
    ]
  })

  router.beforeEach(async (to, from, next) => {                //перед каждым переходом страницы
    if(!to.matched.some(record => record.meta.requiresAuth))   //если не требуется аутентификация
      return next();                                           //переход на страницу
    const token = localStorage.getItem('token')
    if ( token == null) {                                     //если нет токена в localStorage
      return next({
        path: '/login'                                        //переадресация на страничку логина
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
      if(dtoken.role.roleName == "Admin")                                   //проверка роли
        return next()                                         //переход на страницу
      else                                                    //иначе
        return next({path: '/login'})                         //переадресация на страницу ошибки
    }
    if(to.meta.roles.includes('adminABD')) {                  //если доступ только для загрузчика
      if(dtoken.role.roleName == "Admin ABD" )                    //проверка роли
        return next()                                         //переход на страницу
      else                                                    //иначе
        return next({path: '/login'})                         //переадресация на страницу ошибки
    }
    if(to.meta.roles.includes('user')) {                      //если доступ только для загрузчика
      if(dtoken.role.roleName == "User")                          //проверка роли
        return next()                                         //переход на страницу
      else                                                    //иначе
        return next({path: '/login'})                         //переадресация на страницу ошибки
    } 
  })

  export default router;