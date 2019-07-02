import axios from 'axios'

const state = {
    commits: [],
    statuses: [
        { name : 'в ожидании', value: null, color:"badge-primary" },
        { name : 'принят', value: 'принят', color:"badge-success" },
        { name : 'отклонен', value: 'отклонен', color:"badge-danger" }
    ],
    searchResults: [],
    searchMode : false
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
        if(param.length>0){
            try{
                const token = localStorage.getItem('token');
                const response = await axios.post(rootState.apiPrefix + '/commit/search', {param: param},
                    { headers: { 'Authorization': token }}
                )
                commit("setSearchResults",response.data);
            }
            catch(err) {
                throw(err);
            }
        }else{
            commit('clearSearchResults');
        }
    },
    async clearSearchResults({commit}){
        commit('clearSearchResults');
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
    },
    async deleteFile({rootState},id){
        try{
            const token = localStorage.getItem('token');
            await axios.delete(rootState.apiPrefix + '/file/'+id, 
                { headers: { 'Authorization': token }}
            )
        }
        catch(err) {
            if(err.response.data)
                throw(err.response.data);
            else
                throw(err)
        }
    },
    async updateCommit({rootState},payload){
        try{
            const token = localStorage.getItem('token');
            await axios.put(rootState.apiPrefix + '/commit/'+payload.id, payload,
                { headers: { 'Authorization': token }}
            )
        }
        catch(err) {
            if(err.response.data)
                throw(err.response.data);
            else
                throw(err)
        }
    },
    async getFile({rootState},[id,name]){
        try{
            const token = localStorage.getItem('token')
            const response = await axios({
                url: rootState.apiPrefix + '/file/'+ id,
                method: 'GET',
                responseType: 'blob', // important
                headers: { 'Authorization': token }
            })
            const ext = name.split('.');
            if(ext[1] == 'pdf'){
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                window.open(url)
            }
            else {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            }
        }
        catch(err) {
            throw(err);
        }
    },
    async acceptCommit({rootState},id){
        try{
            const token = localStorage.getItem('token');
            await axios.get(rootState.apiPrefix + `/commit/${id}/accept`,
                { headers: { 'Authorization': token }}
            )
        }
        catch(err) {
            if(err.response.data)
                throw(err.response.data);
            else
                throw(err)
        }
    },
    async rejectCommit({rootState},[id,text]){
        try{
            const token = localStorage.getItem('token');
            await axios.post(rootState.apiPrefix + `/commit/${id}/reject`, {text},
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
    setSearchResults(state, commits){
        state.searchResults = commits
        state.searchMode = true;
    },
    clearSearchResults(state) {
        state.searchMode = false;
        state.searchResults = [];
    },
    addCommit(state, commit){
        if(state.commits.length > 0)
            state.commits.unshift(commit);
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}