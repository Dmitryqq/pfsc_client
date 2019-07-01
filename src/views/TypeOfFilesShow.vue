<template>
    <div class="filetypes view">
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
                        <th>Название</th>
                        <th>Макс.размер</th>
                        <th>Обяз.</th>
                        <th>Типы</th>
                        <th>Макс.к-во</th>
                        <th>EAA*</th>
                        <th>Роль</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tr v-for="typeOfFile in typeOfFiles" :key="typeOfFile.id">
                    <td>{{typeOfFile.id}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control form-control-sm" type="text" v-model="typeOfFile.name"></td>
                    <td v-else>{{typeOfFile.name}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control form-control-sm" type="number" v-model="typeOfFile.maxSize" min="1" max="50"></td>
                    <td v-else>{{typeOfFile.maxSize}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><div class="form-check text-center"><input class="form-check-input position-static" type="checkbox" v-model="typeOfFile.required"></div></td>
                    <td v-else>{{typeOfFile.required}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control form-control-sm" type="text" v-model="typeOfFile.types"></td>
                    <td v-else>{{typeOfFile.types}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control form-control-sm" type="number" v-model="typeOfFile.maxAmount" min="1" max="50"></td>
                    <td v-else>{{typeOfFile.maxAmount}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><div class="form-check text-center"><input class="form-check-input position-static" type="checkbox" v-model="typeOfFile.enableAfterAccept"></div></td>
                    <td v-else>{{typeOfFile.enableAfterAccept}}</td>
                    <!-- <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control form-control-sm" type="checkbox" v-model="typeOfFile.enableAfterAccept"></td> -->
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id">
                        <div class="form-group">
                        <select class="form-control form-control-sm" v-model="typeOfFile.roleId">
                            <option disabled value="">Роль</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.roleName }}
                            </option>
                        </select>
                        </div>
                    </td>
                    <td v-else>{{typeOfFile.role.roleName}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id">
                        <span class="icon-btn" >
                            <i style="margin-left: 2px" class="fas fa-save" @click="updateFiletype(typeOfFile)"></i>
                            <i style="margin-left: 23px" class="fas fa-times" @click="disableEditMode"></i>
                        </span>
                    </td>
                    <td v-else>
                        <span class="icon-btn" >
                            <i class="fas fa-edit" @click="enableEditMode(typeOfFile)"></i>
                            <i style="margin-left: 20px" class="fas fa-trash" @click="deleteFiletype(typeOfFile)"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input class="form-control form-control-sm" type="text" v-model="typeOfFile.name"></td>
                    <td><input class="form-control form-control-sm" type="number" v-model="typeOfFile.maxSize" min="1" max="50"></td>
                    <td><div class="form-check text-center"><input class="form-check-input position-static" type="checkbox" v-model="typeOfFile.required"></div></td>
                    <td><input class="form-control form-control-sm" type="text" v-model="typeOfFile.types"></td>
                    <td><input class="form-control form-control-sm" type="number" v-model="typeOfFile.maxAmount" min="1" max="50"></td>
                    <td><div class="form-check text-center"><input class="form-check-input position-static" type="checkbox" v-model="typeOfFile.enableAfterAccept"></div></td>
                    <td>
                        <div class="form-group">
                        <select class="form-control form-control-sm" v-model="typeOfFile.roleId">
                            <option disabled value="">Роль</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.roleName }}
                            </option>
                        </select>
                        </div>
                    </td>
                    <td>
                        <button type="submit" class="btn btn-sm btn-primary" @click="addFiletype">Добавить</button>
                    </td>
                </tr>
            </table>
            <p class="text-center">*EAA(enableAfterAccept) - поле, отвечающее за возможность добавления файла после подтверждения наката</p>
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
            typeOfFile:{
                name: '',
                maxSize: '',
                required: '',
                types: '',
                maxAmount: '',
                enableAfterAccept: '',
                roleId: ''
            },    
            isLoading: false,
            success: null,
            error: null,
            editMode: false,
            selectedFiletype: {}
        }
    },
    computed:{
        typeOfFiles(){
            return this.$store.state.typeOfFiles.typeOfFiles;
        },
        roles(){
            return this.$store.state.roles.roles;
        }
    },
    created(){
        this.getTypeOfFiles()
        this.getRoles()
    },
    methods: {
        getTypeOfFiles () {
            this.isLoading = true;
            this.$store.dispatch('typeOfFiles/getTypeOfFiles')
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
                this.isLoading = false; 
                this.error = err.message;
            })  
            .finally(()=>{
                this.isLoading = false; 
            })     
        },
        addFiletype(){  
            this.error = null;
            if(this.typeOfFile.name.length>0 && this.typeOfFile.maxSize.length>0 && this.typeOfFile.types.length>0 && this.typeOfFile.maxAmount.length>0
            && this.typeOfFile.roleId!=0 ) {
                this.$store.dispatch('typeOfFiles/addTypeOfFile',  this.typeOfFile)
                .then(()=>{ 
                    this.showSuccess('Тип файлов успешно добавлен');
                    this.clearForm()
                })
                .catch((err)=>{
                    this.error=err.message
                })
            }
        },
        deleteFiletype(typeOfFile){
            if(confirm("Подтвердите удаление типа '" + typeOfFile.name + "'")){
                this.$store.dispatch('typeOfFiles/deleteTypeOfFile', typeOfFile.id)
                .then(()=>{ 
                    this.error = null;
                    this.showSuccess('Тип файлов успешно удален');
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
        },
        updateFiletype(typeOfFile){
            if(confirm("Подтвердите обновление типа '" + typeOfFile.name + "'")){
                this.$store.dispatch('typeOfFiles/updateTypeOfFile', typeOfFile)
                .then(()=>{
                    this.showSuccess('Тип файлов успешно обновлен');
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
            this.editMode = false;
        },
        clearForm(){
            this.typeOfFile.name = '';
            this.typeOfFile.maxSize = '';
            this.typeOfFile.required = false;
            this.typeOfFile.types = '';
            this.typeOfFile.maxAmount = '';
            this.typeOfFile.enableAfterAccept = false;
            this.typeOfFile.roleId = null;
        },
        enableEditMode(typeOfFile){
            this.editMode = true;
            this.selectedFiletype.id = typeOfFile.id;
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
    width: 10%;
}
td:nth-child(4){
    width: 10%;
}
p {
    padding: 0  0 10px 0.75em;
}
.form-group{
    margin: 0 !important;
}
</style>