<template>
     <div class="account">
        <Navbar/>
        <div class="container">
            <div class="row">
                <div class="col-2">
                <Menu/>
                </div>
                <div v-if="currentUser" class="col-8">
                    <!-- <div>
                        <legend>About You</legend>
                        <input class="form-control-sm" type="text" placeholder="First Name" />
                    </div> -->
                    <div>
                        <label>id:</label><br>
                        <input class="form-control-sm" type="text" v-model="user.id" disabled>
                    </div>
                    <div>
                        <label>Username:</label><br>
                        <input class="form-control-sm" type="text" v-model="user.username">
                    </div>
                    <div>
                        <label>Password:</label><br>
                        <input class="form-control-sm" type="password" v-model="user.password"><br>
                    </div>
                    <div>
                        <label>Name:</label><br>
                        <input class="form-control-sm" type="text" v-model="user.name"><br>
                    </div>
                    <div>
                        <label>Email:</label><br>
                        <input class="form-control-sm" type="email" v-model="user.email"><br>
                    </div>
                    <div>
                        <label>Роль:</label><br>
                        <input class="form-control-sm" type="text" v-model="user.role.roleName" disabled>
                    </div>
                    <button type="submit" class="btn btn-primary" @click="saveUser(user)">Сохранить</button>
                    <p class="text-center">Если изменение пароля не требуется, то оставьте поле пустым</p>
                </div>
            </div>
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
                email: ''
            },     
            isLoading: false,
            success: null,
            error: null
        }
    },
    computed:{
        userId() {
            return this.$store.state.users.user.id;
        },
        users(){
            return this.$store.state.users.users;
        },
        currentUser(){
            try{
                var list = this.users.filter(item => {
                    return item.id == this.userId;
                });
                this.user=list[0];
                this.user.password = '';
                return this.user;
            }
            catch(err){
                return;
            }
        }
    },
    created(){
        this.$store.dispatch('users/decodeUser');
        this.getUsers();
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
        saveUser(user){
            this.$store.dispatch('users/updateUser', user)
            .then((res)=>{
                this.editMode = false;
                this.success = res;
                setTimeout(()=>{this.success = null},3000);
            })
            .catch(err=>{
                this.error = err.message;
            })
        }
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