<template>
    <div id="login">
        <h1>Login</h1>
        <input type="username" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" @click="login()">Login</button>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                input: {
                    username: '',
                    password: ''
                },
                error: null
            }
        },
        methods: {
            login() {
                this.error=null;
                if(this.validateForm()){
                    console.log(this.input)
                    this.$store.dispatch('users/Authorization',this.input)
                    .then(()=>{ 
                        this.$router.replace({path: this.$route.query.redirect || '/'})
                    })
                    .catch((err)=>{
                        this.error=err.message
                        console.log(err)
                        this.input.username=''
                        this.input.password=''
                    })
                }
            },
            validateForm(){
            if(this.input.username.length<1 || this.input.password.length<1){
                this.error='Заполните пустые поля!'
                return false
            } else return true
        }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>