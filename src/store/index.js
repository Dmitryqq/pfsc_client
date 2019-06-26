import Vue from 'vue'
import Vuex from 'vuex'
import roles from './modules/roles.js'
import users from './modules/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    roles,
    users
  },
  state:{
      apiPrefix: 'http://localhost:8080'
  }
})