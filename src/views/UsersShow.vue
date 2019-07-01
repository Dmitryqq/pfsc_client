<template>
    <div class="users view">
        <Loader v-if="isLoading"/>
        <div v-else>
            <div class="alert alert-danger" role="alert" v-if="error">
                {{error}}
            </div>
            <div class="alert alert-success" v-if="success">
                {{success}}
            </div>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Активен</th>
                        <th>Роль</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control form-control-sm" type="text" name = "username" v-model="user.username"></td>
                    <td v-else>{{user.username}}</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control form-control-sm" type="password" v-model="user.password"></td>
                    <td v-else>***</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control form-control-sm" type="text" v-model="user.name"></td>
                    <td v-else>{{user.name}}</td>
                    <td v-if="editMode && user.id == selectedUser.id"><input class="form-control form-control-sm" type="text" v-model="user.email"></td>
                    <td v-else>{{user.email}}</td>
                    <td v-if="editMode && user.id == selectedUser.id"><div class="form-check text-center"><input class="form-check-input position-static" type="checkbox" v-model="user.enabled"></div></td>
                    <td v-else>{{user.enabled}}</td>
                    <td v-if="editMode && user.id == selectedUser.id">
                        <div class="form-group">
                        <select class="form-control form-control-sm" v-model="user.roleId">
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
                    <td><input class="form-control form-control-sm" type="text" name = "username" v-model="user.username"></td>
                    <td><input class="form-control form-control-sm" type="password" v-model="user.password"></td>
                    <td><input class="form-control form-control-sm" type="text" name="Name" v-model="user.name"></td>
                    <td><input class="form-control form-control-sm" type="text" name="Email" v-model="user.email"></td>
                    <td><div class="form-check text-center"><input class="form-check-input position-static" type="checkbox" name="Enabled" v-model="user.enabled"></div></td>
                    <td>
                        <div class="form-group">
                        <select class="form-control form-control-sm" v-model="user.roleId">
                            <option disabled value="">Роль</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.roleName }}
                            </option>
                        </select>
                        </div>
                    </td>
                    <td>
                        <button type="submit" class="btn btn-primary btn-sm" @click="addUser">Добавить</button>
                    </td>   
                </tr>
            </table>
            <p class="text-center">Если изменение пароля не требуется, то при изменении оставьте поле пустым</p>
        </div>
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
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getRoles () {
            this.isLoading = true;
            this.$store.dispatch('roles/getRoles')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getConfigs(){
            this.$store.dispatch('configs/getConfigs')
            .then(()=>{
                this.setDefaultPassword();
            })
            .catch(err=>{
                this.error = err.message;
            })
            .finally(()=>{
                this.isLoading = false; 
            })
        },
        setDefaultPassword(){
            var list = this.$store.state.configs.configs.filter(item => {
                return item.name.includes('defaultPassword');
            });
            if(list[0])
                this.user.password = list[0].value;
        },
        addUser(){  
            this.error = null;
            if(this.user.username.length>0 && this.user.password.length>0 && this.user.name.length>0 && this.user.email.length>0
            && this.user.roleId!=0 ) {
                    this.$store.dispatch('users/addUser',  this.user)
                    .then(()=>{ 
                    this.showSuccess('Пользователь успешно добавлен');
                    this.clearForm()
                })
                .catch((err)=>{
                    this.error=err.message
                })
            }
        },
        deleteUser(user){
            if(confirm("Подтвердите удаление пользователя '" + user.username+"'")){
                this.$store.dispatch('users/deleteUser', user.id)
                .then(()=>{ 
                    this.error = null;
                    this.showSuccess('Пользователь успешно удален');
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
        },
        updateUser(user){
            if(confirm("Подтвердите обновление пользователя '" + user.username + "'")){
                this.$store.dispatch('users/updateUser', user)
                .then(()=>{
                    this.showSuccess('Пользователь успешно обновлен');
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
            this.editMode = false;
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
        },
        showSuccess(message){
            this.success =  message;
            setTimeout(()=>{this.success = null},3000);
        }
    }
}
</script>

<style scoped>
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
td:nth-child(7){
    min-width: 122px;
}
.form-group{
    margin: 0 !important;
}
p {
    padding: 0  0 10px 0.75em;
}
</style>