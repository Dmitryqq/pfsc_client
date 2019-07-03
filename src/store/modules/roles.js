import axios from '../../axiosGeneral'

const state = {
    roles: []
}

const actions = {
    async getRoles({state,commit}){
        if(state.roles.length<1) {
            try{
                const response = await axios.get('/role')
                commit('setRoles',response.data);
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    }
}

const mutations = {
    setRoles(state, roles) {
        state.roles = roles.sort((a,b)=> a.id-b.id);
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}