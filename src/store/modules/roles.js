import axios from 'axios'

const state = {
    roles: []
}

const actions = {
    async getroles({state,rootState}){
        if(state.roles.length<1) {
            try{
                // const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/role', 
                    // { headers: { 'Authorization': 'Bearer '+ token }}
                )
                state.roles = response.data;
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    },
    async addrole({commit,rootState}, role){
        try{
            const response = await axios.post(rootState.apiPrefix + `/role-add`, role)
            if(response.data.error)
                throw new Error(response.data.error) 
            else {
                commit('addrole',response.data.createdrole)
                return response.data.message
            }
        }
        catch(err){
            throw(err);
        }
    },
    async deleterole({commit,rootState}, id_role){
        try{
            const response = await axios.delete(rootState.apiPrefix + `/role-delete/`+id_role)
            if(response.data.error)
                throw new Error(response.data.error)
            else {
                commit('deleterole',id_role)
                return response.data.message
            }
        }
        catch(err){
            throw(err);
        }
    },
    async updaterole({commit,rootState}, role){
        try{
            const response = await axios.patch(rootState.apiPrefix + `/role-update/`+ role.id_role, role)
            if(response.data.error)
                throw new Error(response.data.error)
            else {
                commit('updaterole',response.data.updatedrole)
                return response.data.message
            }
        }
        catch(err){
            throw(err);
        }
    },
}

const mutations = {
    addrole(state, role) {
        state.roles.push({
            id_role: role.id_role,
            role_name: role.role_name
        });
    },
    updaterole (state, role) {
        const i = state.roles.findIndex(b=>{
            return b.id_role == role.id_role
        })
        state.roles[i].role_name = role.role_name
    },
    deleterole(state, id){
        const i = state.roles.findIndex(b=>{
            return b.id_role == id
        })
        state.roles.splice(i,1)
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}