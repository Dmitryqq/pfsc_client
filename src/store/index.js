import Vue from 'vue'
import Vuex from 'vuex'
import roles from './modules/roles.js'
import users from './modules/users.js'
import commits from './modules/commits.js'
import configs from './modules/configs.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    roles,
    users,
    commits,
    configs
  },
  state:{
      apiPrefix: 'http://localhost:8080'
  }
})