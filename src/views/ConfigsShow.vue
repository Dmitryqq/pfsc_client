<template>
    <div class="configs view">
        <Loader v-if="isLoading"/>
        <div v-else>
            <div class="alert alert-danger" role="alert" v-if="error">
                {{error}}
            </div>
            <div class="alert alert-success" v-if="success">
                {{success}}
            </div>
            <table class="table table-sm table-responsive">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Значение</th>
                    <th>Описание</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tr v-for="config in configs" :key="config.id">
                    <td>{{config.id}}</td>
                    <td v-if="editMode && config.id == seletedConfig.id"><input class="form-control form-control-sm" type="text"  v-model="config.name" required></td>
                    <td v-else>{{config.name}}</td>
                    <td v-if="editMode && config.id == seletedConfig.id"><input class="form-control form-control-sm" type="text"  v-model="config.value" required></td>
                    <td v-else>{{config.value}}</td>
                    <td v-if="editMode && config.id == seletedConfig.id"><input class="form-control form-control-sm" type="text" rows="1" v-model="config.description"></td>
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
                    <td><input class="form-control form-control-sm" type="text"  v-model="config.name" required></td>
                    <td><input class="form-control form-control-sm col-sm-12" type="text" v-model="config.value"></td>
                    <td><input class="form-control form-control-sm" type="text" rows="1" v-model="config.description"></td>
                    <td><button type="submit" class="btn btn-sm btn-primary" @click="addConfig">Добавить</button></td>
                </tr>
            </table>
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
            .catch(err=>{
                this.error = err.message;
            })  
            .finally(()=>{
                this.isLoading = false; 
            })     
        },
        addConfig(){  
            this.error = null;
            if(this.config.name.length>0 && this.config.value.length>0) {
                    this.$store.dispatch('configs/addConfig',  this.config)
                    .then(()=>{ 
                    this.showSuccess('Конфигурация успешно добавлена');
                    this.clearForm()
                })
                .catch((err)=>{
                    this.error=err.message
                })
            }
        },
        deleteConfig(config){
            if(confirm("Подтвердите удаление элемента '"+config.name+"'")){
                this.$store.dispatch('configs/deleteConfig', config.id)
                .then(()=>{ 
                    this.error = null;
                    this.showSuccess('Конфигурация успешно удалена');
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
        },
        updateConfig(config){
            if(confirm("Подтвердите обновление элемента '"+config.name+"'")){
                this.$store.dispatch('configs/updateConfig', config)
                .then(()=>{
                    this.showSuccess('Конфигурация успешно обновлена');
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
             this.editMode = false;
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
    width: 15%;
}
td:nth-child(3){
    width: 30%;
}
td:nth-child(4){
    width: 50%;
}
.form-group{
    margin: 0 !important;
}
p {
    padding: 0  0 10px 0.75em;
}
</style>