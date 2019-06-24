<template>
        <table border="1" class="showtable">
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
                <td>{{user.username}}</td>
                <td>{{user.password}}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.enabled}}</td>
                <td>{{user.role.roleName}}</td>
                <td></td>
                <td><i class="material-icons">edit</i></td>
                <td><i class="material-icons" @click="deleteUser(user.id)">delete</i></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="text" v-model="user.username"></td>
                <td><input type="password" v-model="user.password"></td>
                <td><input type="text" name="Name" v-model="user.name"></td>
                <td><input type="text" name="Email" v-model="user.email"></td>
                <td><input type="checkbox" name="Enabled" v-model="user.enabled"></td>
                <td><select class="form" v-model="user.role_id">
                        <option disabled value="">Роль</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.roleName }}
                        </option>
                    </select>
                    </td>
                <button type="button" @click="addUser">Добавить</button>
            </tr>
        </table>
</template>

<script>
export default {
    data: function(){
        return {
            user:{
                username: '',
                password: '',
                name: '',
                email: '',
                enabled: '',
                role_id: ''
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
            // console.log(this.user);
            if(this.user.username.length>0 && this.user.password.length>0 && this.user.name.length>0 && this.user.email.length>0
            && this.user.role_id!=0 ) {
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
            else console.log('Заполните пустые поля!');
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
            this.user.role_id = null;
            this.user.enabled = false;
        }
    }
}
</script>

<style scoped>

</style>