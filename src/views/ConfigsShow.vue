<template>
    <div class="configs">
        <Navbar/>
        <Menu/>
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
                    <td v-if="editMode && config.id == seletedConfig.id"><input class="form-control-sm" type="text"  v-model="config.name" required></td>
                    <td v-else>{{config.name}}</td>
                    <td v-if="editMode && config.id == seletedConfig.id"><input class="form-control-sm" type="text"  v-model="config.value" required></td>
                    <td v-else>{{config.value}}</td>
                    <td v-if="editMode && config.id == seletedConfig.id"><textarea class="form-control" type="text" rows="1" v-model="config.description"></textarea></td>
                    <td v-else>{{config.description}}</td>
                    <td v-if="editMode && config.id == seletedConfig.id">
                        <span class="icon-btn" >
                            <i style="margin-left: 2px" class="fas fa-save" @click="updateConfig(config)"></i>
                            <i style="margin-left: 23px" class="fas fa-times" @click="disableEditMode"></i>
                        </span>
                    </td>
                    <td v-else>
                        <span class="icon-btn" >
                            <i class="fas fa-edit" @click="enableEditMode(config)"></i>
                            <i style="margin-left: 20px" class="fas fa-trash" @click="deleteConfig(config)"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input class="form-control-sm" type="text"  v-model="config.name" required></td>
                    <td><input class="form-control-sm col-sm-12" type="text" v-model="config.value"></td>
                    <td><textarea class="form-control" type="text" rows="1" v-model="config.description"></textarea></td>
                    <button type="submit" class="btn btn-primary" @click="addConfig">Добавить</button>
                </tr>
            </table>
            <modal v-if="deleteMode" title="Удаление" message="Вы действительно хотите конфигурацию?"  @response="confirmDelete"/>
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
            config:{
                name: '',
                value: '',
                description: ''
            },    
            isLoading: false,
            success: null,
            deleteMode: false,
            editMode: false,
            error: null,
            seletedConfig: {}
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
        deleteConfig(config){
            if(confirm("Подтвердите удаление элемента "+config.name)){
                this.$store.dispatch('configs/deleteConfig', config.id)
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
        updateConfig(config){
            this.$store.dispatch('configs/updateConfig', config)
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
            this.config.name = '';
            this.config.value = '';
            this.config.description = '';
        },
        enableEditMode(config){
            this.editMode = true;
            this.seletedConfig.id = config.id;
        },
        disableEditMode(){
            this.editMode = false;
        }
    }
}
</script>

<style scoped>

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
    width: 15%;
}
td:nth-child(3){
    width: 30%;
}
td:nth-child(4){
    width: 50%;
}
p {
    padding: 0  0 10px 0.75em;
}
</style>