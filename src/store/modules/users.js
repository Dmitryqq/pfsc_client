import axios from '../../axiosGeneral'
import axiosInstance from '../../axiosInstance'
import jwtDecode from 'jwt-decode'

const state = {
    user: {},
    users: []
}

const actions ={
    async authUser({dispatch}, authData){
        try{
            const response = await axiosInstance.post(`/login`, authData)
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
            if(err.status == "403"){
                throw new Error("Неверный логин или пароль")
            }
            else
                throw(err)
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
    async getUsers({state,commit}){
        if(state.users.length<1) {
            try{ 
                const response = await axios.get('/user')
                commit('setUsers',response.data);
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    },
    async getUser(_,id){
        try{ 
            const response = await axios.get(`/user/${id}`)
            return response.data;
        }
        catch(err) {
            throw(err);
        }
    },
    async addUser({commit}, user){
        try{
            const response = await axios.post(`/user`, user)
            commit('addUser',response.data)
        }
        catch(err){
            throw(err);
        }
    },
    async deleteUser({commit}, id){
        try{
            const response = await axios.delete(`/user/`+ id)
            commit('deleteUser', id)
            return response.data.message
                
        }
        catch(err){
            throw(err);
        }
    },
    async updateUser({commit}, user){
        try{
            await axios.put(`/user/` + user.id, user)
            if(this.state.users.user.role.roleName == "Admin"){
                const users = await axios.get('/user')
                commit('setUsers', users.data);
            }
            return true;
        }
        catch(err){
            throw(err);
        }
    },
}

const mutations = {
    setUsers(state, users){
        state.users = users.sort((a,b)=> a.id-b.id);
    },
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