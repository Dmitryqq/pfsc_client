import axios from '../../axiosGeneral'

const state = {
    typeOfFiles: []
}

const actions ={
    async getTypeOfFiles({state,commit}){
        if(state.typeOfFiles.length<1) {
            try{
                const response = await axios.get('/typeOfFile')
                commit('setTypeOfFiles',response.data);
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    },
    async addTypeOfFile({commit}, typeOfFile){
        try{
            const response = await axios.post(`/typeOfFile`, typeOfFile)
            commit('addTypeOfFile', response.data)
        }
        catch(err){
            throw(err);
        }
    },
    async deleteTypeOfFile({commit}, id){
        try{
            const response = await axios.delete(`/typeOfFile/${id}`)
            commit('deleteTypeOfFile', id)
            return response.data.message         
        }
        catch(err){
            throw(err);
        }
    },
    async updateTypeOfFile({commit}, typeOfFile){
        try{
            const response = await axios.put(`/typeOfFile/${typeOfFile.id}`, typeOfFile)
            commit('updateTypeOfFile',response.data)
            return true
        }
        catch(err){
            throw(err);
        }
    },
}

const mutations = {
    setTypeOfFiles(state, typeOfFiles){
        state.typeOfFiles = typeOfFiles.sort((a,b)=>a.id - b.id)
    },
    addTypeOfFile(state, typeOfFile) {
        state.typeOfFiles.push({
            id: typeOfFile.id,
            name: typeOfFile.name,
            maxSize: typeOfFile.maxSize,
            required: typeOfFile.required,
            types: typeOfFile.types,
            maxAmount: typeOfFile.maxAmount,
            enableAfterAccept: typeOfFile.enableAfterAccept,
            role: typeOfFile.role,
            roleId: typeOfFile.roleId,
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
        state.typeOfFiles[i].roleId = typeOfFile.roleId,
        state.typeOfFiles[i].role = typeOfFile.role,
        state.typeOfFiles[i].createDate = typeOfFile.createDate,
        state.typeOfFiles[i].updateDate = typeOfFile.updateDate
    }
}

const getters = {
    getUserFileTypes: state => {
        return state.typeOfFiles.filter(f=>f.role.roleName == 'User');
    }
}
export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}