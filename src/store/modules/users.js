import axios from 'axios'
import jwtDecode from 'jwt-decode'

const state = {
    user: {},
    users: []
}

const actions ={
    async authUser({rootState, dispatch}, authData){
        try{
            const response = await axios.post(rootState.apiPrefix + `/login`, authData)
            let token = response.headers['authorization'];
            if (token) {
                const dtoken = jwtDecode(token);
                if(dtoken.enabled == true){
                    localStorage.setItem('token', token);    
                    dispatch("decodeUser");
                }
                else{
                    throw new Error("Учетная запись деактивирована")
                }
            } else {
                throw new Error("Неверный логин или пароль")
            }
        }
        catch(err) {
            localStorage.removeItem('token');
            var exists = true;
            try {
                if (err.response.status)
                    exists = true;
            } catch(e) { exists = false; }
            if(exists){
                if(err.response.status == "403")
                    throw new Error("Неверный логин или пароль")
            }
            else
                throw(err);
        }
    },
    async decodeUser({commit}){
        const token = localStorage.getItem('token');
        if(token){
            const dtoken = jwtDecode(token);
            commit("setUser",{sub:dtoken.sub, id:dtoken.id, role: dtoken.role, name: dtoken.name}); 
        } 
    },
    logout(){
         localStorage.removeItem('token');
    },
    Auth(){
        return localStorage.getItem('token')?true:false;
    },
    async getUsers({state,rootState}){
        if(state.users.length<1) {
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/user',
                    { headers: { 'Authorization': token }}
                )
                state.users = response.data;
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    },
    async addUser({commit, rootState}, user){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/user`, user,
                { headers: { 'Authorization': 'Bearer '+ token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else
                commit('addUser',response.data)
        }
        catch(err){
            throw(err);
        }
    },
    async deleteUser({commit, rootState}, id){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.delete(rootState.apiPrefix + `/user/`+ id,
                { headers: { 'Authorization': token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else{
                commit('deleteUser', id)
                return response.data.message
            }
                
        }
        catch(err){
            throw(err);
        }
    },
    async updateUser({commit,rootState}, user){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.put(rootState.apiPrefix + `/user/`, [user.id, user],
                { headers: { 'Authorization': token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else {
                commit('updateUser',response.data.updatedUser)
                return response.data.message
            }
        }
        catch(err){
            throw(err);
        }
    },
}

const mutations = {
    setUser(state, user){
        state.user = user;
    },
    addUser(state, user) {
        state.users.push({
            id: user.id,
            username: user.username,
            password: user.password,
            name: user.name,
            email: user.email,
            role: user.role,
            roleId: user.roleId,
            enabled: user.enabled,
            createDate: user.createDate,
            updateDate: user.updateDate
        });
    },
    deleteUser(state, id){
        const i = state.users.findIndex(b=>{
            return b.id == id
        })
        state.users.splice(i,1)
    },
    updateUser (state, user) {
        const i = state.users.findIndex(b=>{
            return b.id == user.id
        })
        state.users[i].username = user.username,
        state.users[i].password = user.password,
        state.users[i].name = user.name,
        state.users[i].email = user.email,
        state.users[i].role = user.role,
        state.users[i].roleId = user.roleId,
        state.users[i].enabled = user.enabled,
        state.users[i].createDate = user.createDate,
        state.users[i].updateDate = user.updateDate
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}