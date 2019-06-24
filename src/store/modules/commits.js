import axios from 'axios'

const state = {
    commits: [],
    statuses: [
        { name : 'В ожидании', value: null, color:"badge-primary" },
        { name : 'Принят', value: true, color:"badge-success" },
        { name : 'Отклонен', value: false, color:"badge-danger" }
    ]
}

const actions = {
    async getCommits({commit,rootState}){
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(rootState.apiPrefix + '/commit', 
                { headers: { 'Authorization': token }}
            )
            commit("setCommits",response.data);
        }
        catch(err) {
            throw(err);
        }
    },
    async getCommit({rootState},id){
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(rootState.apiPrefix + '/commit/' + id, 
                { headers: { 'Authorization': token }}
            )
            return response.data;
        }
        catch(err) {
            throw(err);
        }
    },
    async searchCommits({commit,rootState},param){
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post(rootState.apiPrefix + '/commit/search', {param: param},
                { headers: { 'Authorization': token }}
            )
            commit("setCommits",response.data);
        }
        catch(err) {
            throw(err);
        }
    }
}

const mutations = {
    setCommits(state, commits) {
        state.commits = commits
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}