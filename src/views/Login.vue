<template>
    <div class="login">
        <Loader v-if="isLoading"/>
        <div class="col-md-3 mx-auto" style="margin-top: -5%" v-else>
            <div class="brand" style="margin-bottom: 13%">
                <img alt="Vue logo" src="../assets/logo.png"  height="47" class="d-inline-block align-top">
                <span>Банк Компаньон</span>
            </div>
            <div class="alert alert-danger" role="alert" v-if="error">
                {{error}}
            </div>
            <div class="form-group">
                <label >Логин</label>
                <input type="text" class="form-control" placeholder="Логин" v-model="user.username">
            </div>
            <div class="form-group">
                <label>Пароль</label>
                <input type="password" class="form-control" placeholder="Пароль" v-model="user.password">
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary" @click="auth" style="margin-top: 10%">Войти</button>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
export default {
    name: 'login',
    components: {
        Loader
    },
    data(){
        return{
            user: {
                username: '',
                password: ''
            },
            error: '',
            isLoading: false
        }
    },
    methods:{
        auth(){
            this.$store.dispatch('users/authUser',this.user)
            .then(()=>{
                this.$router.replace({path: this.$route.query.redirect || '/'})
            })
            .catch(err=>{
                this.error = err.message;
                this.user.username = '';
                this.user.password = '';
            })
        }
    }
}
</script>

<style>
.brand span{
    color: var(--pr-color) !important;
    text-transform: uppercase;
    font-size: 1.7em;
    font-weight: 400;
    margin-left:10px;
    vertical-align: bottom;
}

.login button{
    color: #fff;
    background-color: var(--pr-color);
}
.login{
    background: var(--sc-bg-color);
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

