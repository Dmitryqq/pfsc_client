<template>
     <div class="configs">
        <Navbar/>
        <Menu/>
        <div class="col-md-7 mx-auto my-5">
            <table class="table table-sm">
            <tr>
                <td><b>№</b></td>
                <td><b>Название</b></td>
            </tr>
            <tr v-for="role in roles" :key="role.id">
                <td>{{ role.id }}</td>
                <td>{{role.roleName}}</td>
            </tr>
        </table>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Menu from '../components/Menu.vue'
export default {
    components: {
        Navbar,
        Menu
    },
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
<style scoped>
table{
    width: 50%;
    border-collapse: collapse;
    overflow-x: auto;
}
.col{
    width: 20%;
}
</style>