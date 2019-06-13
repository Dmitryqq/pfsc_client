<template>
        <table border="1" class="showtable">
            <tr>
                <td><b>№</b></td>
                <td><b>Название</b></td>
            </tr>
            <tr v-for="role in roles" :key="role.id">
                <td>{{ role.id }}</td>
                <td><input type="text" id="textField" v-model="role.role_name"></td>
            </tr>
        </table>
</template>

<script>
export default {
    data: function(){
        return {        
            isLoading: false,
            success: null,
            error: null,
            delMode: false,
            editMode: false,
            role:{
                id: '',
                name: ''
            }
        }
    },
    computed:{
        roles(){
            return this.$store.state.roles.roles;
        }
    },
    created(){
        this.getroles()
    },
    methods: {
        getroles () {
            this.isLoading = true;
            this.$store.dispatch('roles/getroles')
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