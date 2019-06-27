import axios from 'axios'

const state = {
    configs: []
}

const actions = {
    async getConfigs({state,rootState}){
        if(state.configs.length<1) {
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/config',
                    { headers: { 'Authorization': token }}
                )
                console.log(response.data);
                state.configs = response.data;
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    },
    async addConfig({commit, rootState}, config){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/config`, config,
                { headers: { 'Authorization': token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else
                commit('addConfig',response.data)
        }
        catch(err){
            throw(err);
        }
    },
    async deleteConfig({commit, rootState}, id){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.delete(rootState.apiPrefix + `/config/`+ id,
                { headers: { 'Authorization': token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else{
                commit('deleteConfig', id)
                return response.data.message
            }
                
        }
        catch(err){
            throw(err);
        }
    },
    async updateConfig({commit,rootState}, config){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.put(rootState.apiPrefix + `/config/`, [config.id, config],
                { headers: { 'Authorization': token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else {
                commit('updateConfig',response.data.updatedconfig)
                return response.data.message
            }
        }
        catch(err){
            throw(err);
        }
    },
}

const mutations = {
    addConfig(state, config) {
        state.configs.push({
            id: config.id,
            name: config.name,
            value: config.value,
            description: config.description
        });
    },
    deleteConfig(state, id){
        const i = state.configs.findIndex(b=>{
            return b.id == id
        })
        state.configs.splice(i,1)
    },
    updateConfig (state, config) {
        const i = state.configs.findIndex(b=>{
            return b.id == config.id
        })
        state.configs[i].id = config.id,
        state.configs[i].name = config.name,
        state.configs[i].value = config.value,
        state.configs[i].description = config.description
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}