import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store'
import jwtDecode from 'jwt-decode'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

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
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
