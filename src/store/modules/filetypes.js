import axios from 'axios'

const state = {
    typeOfFiles: []
}

const actions ={
    async getTypeOfFiles({state,rootState}){
        if(state.typeOfFiles.length<1) {
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/typeOfFile',
                    { headers: { 'Authorization': token }}
                )
                state.typeOfFiles = response.data;
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    },
    async addTypeOfFile({commit, rootState}, typeOfFile){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/typeOfFile`, typeOfFile,
                { headers: { 'Authorization': 'Bearer '+ token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else
                commit('addTypeOfFile',response.data)
        }
        catch(err){
            throw(err);
        }
    },
    async deleteTypeOfFile({commit, rootState}, id){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.delete(rootState.apiPrefix + `/typeOfFile/`+ id,
                { headers: { 'Authorization': token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else{
                commit('deleteTypeOfFile', id)
                return response.data.message
            }
                
        }
        catch(err){
            throw(err);
        }
    },
    async updateTypeOfFile({commit,rootState}, typeOfFile){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.put(rootState.apiPrefix + `/typeOfFile/`, [typeOfFile.id, typeOfFile],
                { headers: { 'Authorization': token }}
            )
            if(response.data.error)
                throw new Error(response.data.error)
            else {
                commit('updateTypeOfFile',response.data.updatedTypeOfFile)
                return response.data.message
            }
        }
        catch(err){
            throw(err);
        }
    },
}

const mutations = {
    addTypeOfFile(state, typeOfFile) {
        state.typeOfFiles.push({
            id: typeOfFile.id,
            typeOfFilename: typeOfFile.typeOfFilename,
            password: typeOfFile.password,
            name: typeOfFile.name,
            email: typeOfFile.email,
            role: typeOfFile.role,
            roleId: typeOfFile.roleId,
            enabled: typeOfFile.enabled,
            createDate: typeOfFile.createDate,
            updateDate: typeOfFile.updateDate
        });
    },
    deleteTypeOfFile(state, id){
        const i = state.typeOfFiles.findIndex(b=>{
            return b.id == id
        })
        state.typeOfFiles.splice(i,1)
    },
    updateTypeOfFile (state, typeOfFile) {
        const i = state.typeOfFiles.findIndex(b=>{
            return b.id == typeOfFile.id
        })
        state.typeOfFiles[i].name = typeOfFile.name,
        state.typeOfFiles[i].maxSize = typeOfFile.maxSize,
        state.typeOfFiles[i].required = typeOfFile.required,
        state.typeOfFiles[i].types = typeOfFile.types,
        state.typeOfFiles[i].maxAmount = typeOfFile.maxAmount,
        state.typeOfFiles[i].enableAfterAccept = typeOfFile.enableAfterAccept,
        state.typeOfFiles[i].createDate = typeOfFile.createDate,
        state.typeOfFiles[i].updateDate = typeOfFile.updateDate
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}