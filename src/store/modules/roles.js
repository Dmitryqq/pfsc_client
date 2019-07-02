import axios from '../../axiosGeneral'

const state = {
    roles: []
}

const actions = {
    async getRoles({state}){
        if(state.roles.length<1) {
            try{
                const response = await axios.get('/role')
                state.roles = response.data;
            }
            catch(err) {
                throw(err);
            }
        } 
        else
            return; 
    }
}


export default{
    namespaced: true,
    state,
    actions
}