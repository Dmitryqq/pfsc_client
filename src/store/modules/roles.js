import axios from 'axios'

const state = {
    roles: []
}

const actions = {
    async getRoles({state,rootState}){
        if(state.roles.length<1) {
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/role', 
                    { headers: { 'Pragma': token }}
                )
                state.roles = response.data;
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
    
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}