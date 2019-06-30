<template>
    <div class="filetypes">
        <Navbar/>
        <Menu/>
        <div class="col-md-7 mx-auto my-5">
            <table class="table table-sm">
                <tr>
                    <td><b>№</b></td>
                    <td><b>Название</b></td>
                    <td><b>Макс.размер</b></td>
                    <td><b>Обяз.</b></td>
                    <td><b>Типы</b></td>
                    <td><b>Макс.к-во</b></td>
                    <td><b>EAA*</b></td>
                    <td><b>Роль</b></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="typeOfFile in typeOfFiles" :key="typeOfFile.id">
                    <td>{{typeOfFile.id}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control-sm" type="text" v-model="typeOfFile.name"></td>
                    <td v-else>{{typeOfFile.name}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control-sm" type="number" v-model="typeOfFile.maxSize" min="1" max="50"></td>
                    <td v-else>{{typeOfFile.maxSize}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control-sm" type="checkbox" v-model="typeOfFile.required"></td>
                    <td v-else>{{typeOfFile.required}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><textarea class="form-control-sm" type="text" v-model="typeOfFile.types"></textarea></td>
                    <td v-else>{{typeOfFile.types}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control-sm" type="number" v-model="typeOfFile.maxAmount" min="1" max="50"></td>
                    <td v-else>{{typeOfFile.maxAmount}}</td>
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control-sm" type="checkbox" v-model="typeOfFile.enableAfterAccept"></td>
                    <td v-else>{{typeOfFile.enableAfterAccept}}</td>
                    <!-- <td v-if="editMode && typeOfFile.id == selectedFiletype.id"><input class="form-control-sm" type="checkbox" v-model="typeOfFile.enableAfterAccept"></td> -->
                    <td v-if="editMode && typeOfFile.id == selectedFiletype.id">
                        <div class="form-group">
                        <select class="form-control-sm" v-model="typeOfFile.roleId">
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
                    <td><input class="form-control-sm" type="text" v-model="typeOfFile.name"></td>
                    <td><input class="form-control-sm" type="number" v-model="typeOfFile.maxSize" min="1" max="50"></td>
                    <td><input class="form-control-sm" type="checkbox" v-model="typeOfFile.required"></td>
                    <td><textarea class="form-control-sm" type="text" v-model="typeOfFile.types"></textarea></td>
                    <td><input class="form-control-sm" type="number" v-model="typeOfFile.maxAmount" min="1" max="50"></td>
                    <td><input class="form-control-sm" type="checkbox" v-model="typeOfFile.enableAfterAccept"></td>
                    <td>
                        <div class="form-group">
                        <select class="form-control-sm" v-model="typeOfFile.roleId">
                            <option disabled value="">Роль</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.roleName }}
                            </option>
                        </select>
                        </div>
                    </td>
                    <button type="submit" class="btn btn-primary" @click="addFiletype">Добавить</button>
                </tr>
            </table>
        <p class="text-center">*EAA(enableAfterAccept) - поле, отвечающее за возможность добавления файла после подтверждения наката</p>
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
        addFiletype(){  
            this.error = null;
            if(this.typeOfFile.name.length>0 && this.typeOfFile.maxSize.length>0 && this.typeOfFile.types.length>0 && this.typeOfFile.maxAmount.length>0
            && this.typeOfFile.roleId!=0 ) {
                    this.$store.dispatch('typeOfFiles/addTypeOfFile',  this.typeOfFile)
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
        deleteFiletype(typeOfFile){
            if(confirm("Подтвердите удаление типа " + typeOfFile.name)){
                this.$store.dispatch('typeOfFiles/deleteTypeOfFile', typeOfFile.id)
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
        updateFiletype(typeOfFile){
            this.$store.dispatch('typeOfFiles/updateTypeOfFile', typeOfFile)
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
        }
    }
}
</script>

<style scoped>
.filetypes{
    width: 100%; 
    height: 500px;
    display: block;
    overflow: auto;
    font-size: 12pt;
}
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
    width: 10%;
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
.form-control-sm {
    padding: 0 px;
}
</style>