// import helloworldpage from './components/HelloWorld.vue'
import rolespage from './store/views/RolesShow.vue'


const routes = [
    // { path: '/', component: helloworldpage},
    { path: '/roles', component: rolespage, meta: {requiresAuth: false}},
]

export default routes;

