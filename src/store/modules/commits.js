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
    },
    async addCommit({commit,rootState},payload){
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post(rootState.apiPrefix + '/commit/', payload,
                { headers: { 'Authorization': token }}
            )
            commit("addCommit",response.data);
            return response.data.id;
        }
        catch(err) {
            if(err.response.data)
                throw(err.response.data);
            else
                throw(err)
        }
    },
    async addFiles({rootState},formData){
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post(rootState.apiPrefix + '/file/', formData,
                { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': token }}
            )
            return response.data.length;

        }
        catch(err) {
            if(err.response.data)
                throw(err.response.data);
            else
                throw(err)
        }
    },
    async deleteCommit({rootState},id){
        try{
            const token = localStorage.getItem('token');
            await axios.delete(rootState.apiPrefix + '/commit/'+id, 
                { headers: { 'Authorization': token }}
            )
        }
        catch(err) {
            if(err.response.data)
                throw(err.response.data);
            else
                throw(err)
        }
    }
}

const mutations = {
    setCommits(state, commits) {
        state.commits = commits
    },
    clearCommits(state) {
        state.commits = [];
    },
    addCommit(state, commit){
        state.commits.push(commit);
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}