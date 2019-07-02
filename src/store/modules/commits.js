import axios from '../../axiosGeneral'
import axiosInstance from '../../axiosInstance'

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
    async getCommits({commit}){
        try{
            const response = await axios.get('/commit')
            commit("setCommits",response.data);
        }
        catch(err) {
            throw(err);
        }
    },
    async getCommit(_,id){
        try{
            const response = await axiosInstance.get(`/commit/${id}`)
            return response.data;
        }
        catch(err) {
            throw(err);
        }
    },
    async searchCommits({commit},param){
        if(param.length>0){
            try{
                const response = await axios.post('/commit/search', {param: param})
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
    async addCommit({commit},payload){
        try{
            const response = await axios.post('/commit/', payload)
            commit("addCommit",response.data);
            return response.data.id;
        }
        catch(err) {
            throw(err)
        }
    },
    async addFiles(_,formData){
        try{
            const response = await axios.post('/file/', formData,
                { headers: { 'Content-Type': 'multipart/form-data' }}
            )
            return response.data.length;

        }
        catch(err) {
            throw(err)
        }
    },
    async deleteCommit(_,id){
        try{
            await axios.delete(`/commit/${id}`)
        }
        catch(err) {
            throw(err)
        }
    },
    async deleteFile(_,id){
        try{
            await axios.delete(`/file/${id}`)
        }
        catch(err) {
            throw(err)
        }
    },
    async updateCommit(_,payload){
        try{
            await axios.put('/commit/'+payload.id, payload)
        }
        catch(err) {
            throw(err)
        }
    },
    async getFile(_,[id,name]){
        try{
            const response = await axios({
                url: '/file/'+ id,
                method: 'GET',
                responseType: 'blob'
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
            throw(err)
        }
    },
    async acceptCommit(_,id){
        try{
            await axios.get(`/commit/${id}/accept`)
        }
        catch(err) {
            throw(err)
        }
    },
    async rejectCommit(_,[id,text]){
        try{
            await axios.post(`/commit/${id}/reject`, {text})
        }
        catch(err) {
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