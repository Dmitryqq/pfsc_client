import axios from '../../axiosGeneral'

const state = {
    configs: []
}

const actions = {
    async getConfigs({state}){
        if(state.configs.length<1) {
            try{
                const response = await axios.get('/config')
                state.configs = response.data;
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    },
    async addConfig({commit}, config){
        try{
            const response = await axios.post(`/config`, config)
            commit('addConfig',response.data)
        }
        catch(err){
            throw(err);
        }
    },
    async deleteConfig({commit}, id){
        try{    
            const response = await axios.delete(`/config/${id}`)
            commit('deleteConfig', id);
            return response.data.message;        
        }
        catch(err){
            throw(err);
        }
    },
    async updateConfig({commit}, config){
        try{
            const response = await axios.put(`/config/${config.id}`, config)
            commit('updateConfig', response.data)
            return true;
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