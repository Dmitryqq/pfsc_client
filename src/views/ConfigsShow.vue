<template>
    <div class="configs">
        <Navbar/>
        <div class="col-md-7 mx-auto my-5">
            <table class="table table-sm">
                <tr>
                    <td><b>№</b></td>
                    <td><b>Имя</b></td>
                    <td><b>Значение</b></td>
                    <td><b>Описание</b></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="config in configs" :key="config.id">
                    <td>{{config.id}}</td>
                    <td>{{config.name}}</td>
                    <td>{{config.value}}</td>
                    <td>{{config.description}}</td>
                    <td>
                        <span class="icon-btn" >
                            <i class="fas fa-edit"></i>
                            <i style="margin-left: 20px" class="fas fa-trash" @click="deleteConfig(config.id)"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input class="form-control-sm" type="text"  v-model="config.name" required></td>
                    <td><input class="form-control-sm" type="password" v-model="config.value"></td>
                    <td><input class="form-control-sm" type="text" name="Name" v-model="config.description"></td>
                    <button type="submit" class="btn btn-primary" @click="addConfig">Добавить</button>
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
            config:{
                name: '',
                value: '',
                description: ''
            },    
            isLoading: false,
            success: null,
            error: null
        }
    },
    computed:{
        configs(){
            return this.$store.state.configs.configs;
        }
    },
    created(){
        this.getConfigs()
    },
    methods: {
        getConfigs () {
            this.isLoading = true;
            this.$store.dispatch('configs/getConfigs')
            .then(()=>{
                this.isLoading = false; 
            })
            .catch(err=>{
                this.isLoading = false; 
                this.error = err.message;
            })       
        },
        addConfig(){  
            this.error = null;
            if(this.config.name.length>0 && this.config.value.length>0) {
                    this.$store.dispatch('configs/addConfig',  this.config)
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
        deleteConfig(id){
            this.$store.dispatch('configs/deleteConfig', id)
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
            this.config.name = '';
            this.config.value = '';
            this.config.description = '';
        }
    }
}
</script>

<style scoped>

</style>