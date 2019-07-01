<template>
     <div class="account view">
        <Navbar />
        <Loader v-if="isLoading" />
        <div v-else class="col-sm-6 col-md-4 mx-auto my-5">
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">id:</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" type="text" v-model="user.id" disabled>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Username:</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" type="text" v-model="user.username">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Password:</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" type="password" v-model="user.password">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Name:</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" type="text" v-model="user.name">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Email:</label>
                <div class="col-sm-8">
                    <input class="form-control form-control-sm" type="email" v-model="user.email">
                </div>
            </div>
            <div class="text-center my-5">
                <button type="submit" class="btn btn-sm btn-primary" @click="saveUser(user)">Сохранить</button>
            </div>
            <p class="text-center">Если изменение пароля не требуется, то оставьте поле пустым</p>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Loader from '@/components/Loader.vue'
export default {
    name: 'Account',
    components: {
        Navbar,
        Loader
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
        }
    },
    created(){
        this.$store.dispatch('users/decodeUser');
        this.getUser();
    },
    methods: {
        getUser() {
            this.isLoading = true;
            this.$store.dispatch('users/getUser', this.userId)
            .then((res)=>{
                this.user = res;
                this.user.password = ''
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