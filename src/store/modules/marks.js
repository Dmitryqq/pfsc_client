import axios from '../../axios'

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
    },
    async addMark({commit}, mark){
        try{
            const response = await axios.post(`/mark`, mark)
            commit('addMark',response.data)
        }
        catch(err){
            throw(err);
        }
    },
    async deleteMark({commit}, id){
        try{    
            const response = await axios.delete(`/mark/${id}`)
            commit('deleteMark', id);
            return response.data.message;        
        }
        catch(err){
            throw(err);
        }
    }
}

const mutations = {
    setMarks(state, marks) {
        state.marks = marks.sort((a,b)=> a.id-b.id);
    },
    addMark(state, mark) {
        state.marks.push({
            id: mark.id,
            name: mark.name
        });
    },
    deleteMark(state, id){
        const i = state.marks.findIndex(b=>{
            return b.id == id
        })
        state.marks.splice(i,1)
    },
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}