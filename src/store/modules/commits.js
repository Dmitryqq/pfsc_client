import axios from 'axios'

const state = {
    commits: [],
    statuses: [
        { name : 'в ожидании', color:"badge-primary" },
        { name : 'принят', color:"badge-success" },
        { name : 'отклонен', color:"badge-danger" }
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
    },
    async clearCommits({commit}){
        commit('clearCommits');
    }
}

const mutations = {
    setCommits(state, commits) {
        state.commits = commits
    },
    clearCommits(state) {
        state.commits = [];
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}