<template>
     <div class="configs view">
        <Loader v-if="isLoading"/>
        <div class="alert alert-danger" role="alert" v-if="error && !isLoading">
            {{error}}
        </div>
        <table class="table table-sm mx-auto" v-if="!isLoading">
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
</template>

<script>
import Loader from '@/components/Loader.vue'
export default {
    components:{
        Loader
    },
    data: function(){
        return {        
            isLoading: false,
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