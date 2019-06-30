<template>
    <div class="users">
        <Navbar/>
        <Menu/>
        <div class="col-md-7 mx-auto my-5">
            <table class="table table-sm">
                <tr>
                    <td><b>№</b></td>
                    <td><b>Логин</b></td>
                    <td><b>Пароль</b></td>
                    <td><b>Имя</b></td>
                    <td><b>Email</b></td>
                    <td><b>Активен</b></td>
                    <td><b>Роль</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control-sm" type="text" name = "username" v-model="user.username"></td>
                    <td v-else>{{user.username}}</td>
                    <!-- <td>{{user.password}}</td> -->
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control-sm" type="password" v-model="user.password"></td>
                    <td v-else>***</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control-sm" type="text" v-model="user.name"></td>
                    <td v-else>{{user.name}}</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control-sm" type="text" v-model="user.email"></td>
                    <td v-else>{{user.email}}</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control-sm" type="checkbox" v-model="user.enabled"></td>
                    <td v-else>{{user.enabled}}</td>
                    <td v-if="editMode && user.id == selectedUser.id">
                        <div class="form-group">
                        <select class="form-control-sm" v-model="user.roleId">
                            <option disabled value="">Роль</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.roleName }}
                            </option>
                        </select>
                        </div>
                    </td>
                    <td v-else>{{user.role.roleName}}</td>
                    <td v-if="editMode && user.id == selectedUser.id">
                        <span class="icon-btn" >
                            <i style="margin-left: 2px" class="fas fa-save" @click="updateUser(user)"></i>
                            <i style="margin-left: 23px" class="fas fa-times" @click="disableEditMode"></i>
                        </span>
                    </td>
                    <td v-else>
                        <span class="icon-btn" >
                            <i class="fas fa-edit" @click="enableEditMode(user)"></i>
                            <i style="margin-left: 20px" class="fas fa-trash" @click="deleteUser(user)"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input class="form-control-sm" type="text" name = "username" v-model="user.username"></td>
                    <td><input class="form-control-sm" type="password" v-model="user.password">{{defaultPassword}}</td>
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
        <p class="text-center">Если изменение пароля не требуется, то при изменении оставьте поле пустым</p>
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
            error: null,
            editMode: false,
            selectedUser: {}
        }
    },
    computed:{
        users(){
            return this.$store.state.users.users;
        },
        roles(){
            return this.$store.state.roles.roles;
        },
        configs(){
            return this.$store.state.configs.configs;
        },
        defaultPassword(){
            try{
                var list = this.$store.state.configs.configs.filter(item => {
                    return item.name.includes('defaultPassword');
                });
                this.user.password=list[0].value;
            }
            catch(err){
                return;
            }
        }
    },
    created(){
        this.getUsers()
        this.getRoles()
        this.getConfigs()
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
        getConfigs(){
            this.$store.dispatch('configs/getConfigs')
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
        deleteUser(user){
            if(confirm("Подтвердите удаление юзера " + user.username)){
                this.$store.dispatch('users/deleteUser', user.id)
                .then((res)=>{ 
                    this.error = null;
                    this.success =res;
                    setTimeout(()=>{this.success = null},3000);
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
        },
        updateUser(user){
            this.$store.dispatch('users/updateUser', user)
            .then((res)=>{
                this.editMode = false;
                this.success = res;
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
        },
        enableEditMode(user){
            this.editMode = true;
            user.password = '',
            this.selectedUser.id = user.id;
        },
        disableEditMode(){
            this.editMode = false;
        }
    }
}
</script>

<style scoped>
.users{
    width: 100%; 
    height: 500px;
    display: block;
    overflow: auto;
    font-size: 12pt;
}
table{
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
}
thead tr{
    font-weight: bold;
}
td:nth-child(1){
    width: 1%;
}
td:nth-child(2){
    width: 30%;
}
td:nth-child(3){
    width: 30%;
}
td:nth-child(4){
    width: 20%;
}
p {
    padding: 0  0 10px 0.75em;
}
.form-control-sm {
    padding: 0 px;
}
</style>