import Vue from 'vue'
import Vuex from 'vuex'
import roles from './modules/roles.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    roles,
  },
  state:{
      apiPrefix: 'http://localhost:8080'
  }
})