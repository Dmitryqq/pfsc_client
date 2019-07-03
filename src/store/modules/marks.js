import axios from '../../axiosGeneral'

const state = {
    marks: []
}

const actions = {
    async getMarks({state,commit}){
        if(state.marks.length<1) {
            try{
                const response = await axios.get('/mark')
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
        state.marks = marks.sort((a,b)=> a.id-b.id);
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}