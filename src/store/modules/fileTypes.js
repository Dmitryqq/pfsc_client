import axios from 'axios'

const state = {
    fileTypes: []
}

const actions = {
    async getFileTypes({commit,rootState}){
        if(state.fileTypes.length<1) {
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/typeOfFile', 
                    { headers: { 'Authorization': 'Bearer '+ token }}
                )
                commit('setFileTypes',response.data);
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
    setFileTypes(state, fileTypes) {
        state.fileTypes = fileTypes;
    }
}

const getters = {
    getUserFileTypes: state => {
        return state.fileTypes.filter(f=>f.role.roleName == 'User');
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}