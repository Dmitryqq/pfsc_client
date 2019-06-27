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
            let token = response.headers.authorization;
            if (token) {
                localStorage.setItem('token', token);    
                dispatch("decodeUser");       
            } else {
                throw new Error("Неверный логин или пароль")
            }
        }
        catch(err) {
            localStorage.removeItem('token');
            if(err.response.status == "403")    //Ругается что не знает что такое статус
                throw new Error("Неверный логин или пароль")
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
    // async Authorization({rootState}, input){
    //     try{
    //         let token = null;
    //         await axios.post(rootState.apiPrefix + '/login', input,{
    //                 headers:{'Content-Type': 'application/json'}})
    //             .then(function (response) {
    //                 token = response.headers.Authorization;
    //                 console.log(token);
    //                 })
    //         if (token) {
    //             localStorage.setItem('token', token);
    //         } else {
    //             localStorage.removeItem('token');  
    //             throw new Error('Неверный логин или пароль!')
    //         }
    //     }
    //     catch(err){
    //         throw(err);
    //     }
    // },
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
    }
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
            role_id: user.role_id,
            enabled: user.enabled,
            create_date: user.create_date,
            update_date: user.update_date
        });
    },
    deleteUser(state, id){
        const i = state.users.findIndex(b=>{
            return b.id == id
        })
        state.users.splice(i,1)
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}