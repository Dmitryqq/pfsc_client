import axios from 'axios'

const state = {
    marks: []
}

const actions = {
    async getMarks({commit,rootState}){
        if(state.marks.length<1) {
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/mark', 
                    { headers: { 'Authorization': 'Bearer '+ token }}
                )
                commit('setMarks',response.data);
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
    setMarks(state, marks) {
        state.marks = marks;
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}