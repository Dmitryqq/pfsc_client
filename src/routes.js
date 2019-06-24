// import helloworldpage from './components/HelloWorld.vue'
import rolespage from './store/views/RolesShow.vue'
import userspage from './store/views/UsersShow.vue'
import loginpage from './store/views/LoginPage.vue'


const routes = [
    // { path: '/', component: helloworldpage},
    { path: '/login', component: loginpage, meta: {requiresAuth: false}},
    { path: '/roles', component: rolespage, meta: {requiresAuth: false}},
    { path: '/users', component: userspage, meta: {requiresAuth: false}},
]

export default routes;

