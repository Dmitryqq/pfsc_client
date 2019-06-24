<template>
        <table border="1" class="showtable">
            <tr>
                <td><b>№</b></td>
                <td><b>Название</b></td>
            </tr>
            <tr v-for="role in roles" :key="role.id">
                <td>{{ role.id }}</td>
                <td><input type="text" id="textField" v-model="role.roleName"></td>
            </tr>
        </table>
</template>

<script>
export default {
    data: function(){
        return {        
            isLoading: false,
            success: null,
            error: null
        }
    },
    computed:{
        roles(){
            return this.$store.state.roles.roles;
        }
    },
    created(){
        this.getRoles()
    },
    methods: {
        getRoles () {
            this.isLoading = true;
            this.$store.dispatch('roles/getRoles')
            .then(()=>{
                this.isLoading = false; 
            })
            .catch(err=>{
                this.isLoading = false; 
                this.error = err.message;
            })       
        },
        
    }
}
</script>