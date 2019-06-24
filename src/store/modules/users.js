import axios from 'axios'
import jwtDecode from 'jwt-decode'

const state = {
    user:{}
}

const actions = {
    async authUser({rootState, dispatch}, authData){
        try{
            const response = await axios.post(rootState.apiPrefix + `/login`, authData)
            let token = response.headers['authorization'];
            if (token) {
                localStorage.setItem('token', token);    
                dispatch("decodeUser");       
            } else {
                throw new Error("Неверный логин или пароль")
            }
        }
        catch(err) {
            localStorage.removeItem('token');
            if(err.response.status == "403")
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
    }
}

const mutations = {
    setUser(state, user){
        state.user = user;
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}