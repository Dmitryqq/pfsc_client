<template>
    <div class="users">
        <Navbar/>
        <div class="col-md-7 mx-auto my-5">
            <table class="table table-sm">
                <tr>
                    <td><b>№</b></td>
                    <td><b>Название</b></td>
                    <td><b>Макс.размер</b></td>
                    <td><b>Обяз.</b></td>
                    <td><b>Типы</b></td>
                    <td><b>Макс.кол-во</b></td>
                    <td><b>EAA</b></td>  <!-- Не знаю как назвать -->
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.username}}</td>
                    <!-- <td>{{user.password}}</td> -->
                    <td>***</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.enabled}}</td>
                    <td>{{user.role.roleName}}</td>
                    <!-- <td></td> -->
                    <td>
                        <!-- <i class="fas fa-trash"></i> -->
                        <span class="icon-btn" >
                            <i class="fas fa-user-edit" ></i>
                            <i style="margin-left: 20px" class="fas fa-trash" @click="deleteUser(user.id)"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input class="form-control-sm" type="text" name = "username" v-model="user.username" required></td>
                    <td><input class="form-control-sm" type="password" v-model="user.password"></td>
                    <td><input class="form-control-sm" type="text" name="Name" v-model="user.name"></td>
                    <td><input class="form-control-sm" type="text" name="Email" v-model="user.email"></td>
                    <td><input class="form-control-sm" type="checkbox" name="Enabled" v-model="user.enabled"></td>
                    <td>
                        <div class="form-group">
                        <select class="form-control-sm" v-model="user.roleId">
                            <option disabled value="">Роль</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.roleName }}
                            </option>
                        </select>
                        </div>
                    </td>
                    <button type="submit" class="btn btn-primary" @click="addUser">Добавить</button>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components: {
        Navbar
    },
    data: function(){
        return {
            user:{
                username: '',
                password: '',
                name: '',
                email: '',
                enabled: '',
                roleId: ''
            },    
            isLoading: false,
            success: null,
            error: null
        }
    },
    computed:{
        users(){
            return this.$store.state.users.users;
        },
        roles(){
            return this.$store.state.roles.roles;
        },
    },
    created(){
        this.getUsers()
        this.getRoles()
    },
    methods: {
        getUsers () {
            this.isLoading = true;
            this.$store.dispatch('users/getUsers')
            .then(()=>{
                this.isLoading = false; 
            })
            .catch(err=>{
                this.isLoading = false; 
                this.error = err.message;
            })       
        },
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
        addUser(){  
            this.error = null;
            if(this.user.username.length>0 && this.user.password.length>0 && this.user.name.length>0 && this.user.email.length>0
            && this.user.roleId!=0 ) {
                    this.$store.dispatch('users/addUser',  this.user)
                    .then(()=>{ 
                    this.success = true;
                    setTimeout(()=>{this.success = false},3000);
                    this.clearForm()
                })
                .catch((err)=>{
                    this.error=err.message
                })
            }
        },
        deleteUser(id){
            this.$store.dispatch('users/deleteUser', id)
            .then((res)=>{ 
                this.error = null;
                this.success =res;
                setTimeout(()=>{this.success = null},3000);
            })
            .catch(err=>{
                this.error = err.message;
            })
        },
        clearForm(){
            this.user.username = '';
            this.user.password = '';
            this.user.name = '';
            this.user.email = '';
            this.user.roleId = null;
            this.user.enabled = false;
        }
    }
}
</script>

<style scoped>

</style>