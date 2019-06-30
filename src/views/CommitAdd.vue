<template>
    <div class="commitAdd">
        <Navbar/>
        <Loader  v-if="isLoading"/>
        <div class="col-md-7 mx-auto my-5" v-else>
            <div class="alert alert-danger" role="alert" v-for="error in errors" :key="error">
                {{error}}
            </div>
            <div class="alert alert-success" v-if="success">
                {{success}}
            </div>
            <table class="table table-sm table-borderless">
                <tr>
                    <th>Метка <span class="text-danger">*</span></th>
                    <td>
                        <select class="form-control form-control-sm col-lg-6" v-model="commit.markId" :disabled="errors.length>0 && !toDeleteCommit">
                            <option v-for="mark in marks" :key="mark.id" :value="mark.id">{{mark.name}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Описание <span class="text-danger">*</span></th>
                    <td>
                        <textarea class="form-control" cols="" rows="7" v-model="commit.description" :disabled="errors.length>0 && !toDeleteCommit"></textarea>
                    </td>
                </tr>               
            </table>
            <div class="card my-2" v-for="(fileType,index) in fileTypes" :key="fileType.id">
                <div class="card-header">
                    {{fileType.name}}
                    <span v-if="fileType.required" class="text-danger">*</span>
                    <label class="icon-btn" v-if="(!selectedFiles[fileType.id] || selectedFiles[fileType.id].length < fileType.maxAmount) && !validFiles[fileType.id]">
                        <input type="file" multiple @change="onFileChanged($event, index)"/>
                        <i class="fas fa-plus"></i>
                    </label>
                    <span class="text-secondary float-right mr-3">maximum {{fileType.maxAmount}} files</span>
                </div>
                <div class="card-body" v-if="showFileNames && selectedFiles[fileType.id] && selectedFiles[fileType.id].length">
                    <table class="table table-sm table-borderless" style="margin-bottom:0">
                        <tr v-for="(file,index) in selectedFiles[fileType.id]" :key="file.name">
                            <td>{{index+1}}</td>
                            <td>{{file.name}}</td>
                            <td>
                                <label class="icon-btn" @click="deleteFile(fileType.id,index)" v-if="!validFiles[fileType.id]">
                                    <i class="fas fa-trash"></i>
                                </label>
                                <label class="icon-btn text-secondary" v-else>
                                    загружено
                                </label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="text-center">
                <button class="btn btn-primary my-3" @click="send">
                    Отправить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Loader from '@/components/Loader.vue'
import { mapGetters } from 'vuex'
import { Promise } from 'q';
import { setTimeout } from 'timers';

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

export default {
    name: 'Commit',
    components: {
        Navbar,
        Loader
    },
    computed:{
        marks(){
            return this.$store.state.marks.marks;
        },
        ...mapGetters('filetypes',{
            fileTypes: 'getUserFileTypes',
        })
    },
    methods:{
        getMarks(){
            this.isLoading = true;
            this.$store.dispatch('marks/getMarks')
            .then(()=>{
                this.commit.markId = this.marks[0].id;
            })
            .finally(()=>{
                this.isLoading = false;
            })
        },
        getFileTypes(){
            this.isLoading = true;
            this.$store.dispatch('filetypes/getTypeOfFiles')
            .finally(()=>{
                this.isLoading = false;
            })
        },
        onFileChanged (event, index) {
            this.errors = [];
            this.success = '';
            this.showFileNames = false;
            const id = this.fileTypes[index].id;
            if(!this.selectedFiles[id])
                this.selectedFiles[id] = [];
            for (var i = 0; i < event.target.files.length; i++) {
                if(this.selectedFiles[id].length >= this.fileTypes[index].maxAmount)   
                    break;
                if(this.selectedFiles[id].find(f=>f.name==event.target.files[i].name)){ 
                    this.errors.push(event.target.files[i].name + ' уже добавлен'); 
                    continue;
                }
                this.selectedFiles[id].push(event.target.files[i]);
            } 
            this.showFileNames = true;       
        },
        deleteFile(id, index){
            this.showFileNames = false;
            this.selectedFiles[id].splice(index,1);
            this.showFileNames = true;    
        },
        validate(){
            if(this.commit.description == "" || this.commit.markId == null)
                return false;
            let flag=true;
            for(let i=0;i<this.fileTypes.length;i++)
                if(this.fileTypes[i].required && (this.selectedFiles[this.fileTypes[i].id]==null || this.selectedFiles[this.fileTypes[i].id].length<1)) {
                    flag=false;
                    break;
                }  
            return flag;            
        },
        sendCommit(){
            return new Promise((resolve,reject)=>{
                if(this.commit.id != null)
                    resolve(this.commit.id);
                else {
                    this.$store.dispatch('commits/addCommit', this.commit)
                    .then(res=>{
                        this.commit.id = res;
                        resolve(res);
                    })
                    .catch(err=> {
                        reject(err);
                    });
                }
            })
        },
        sendFile(commitId,fileTypeId){
            return new Promise((resolve,reject)=>{
                const formData = new FormData();
                formData.append('commitId', commitId);
                formData.append('fileTypeId', fileTypeId);
                this.selectedFiles[fileTypeId].map(f=>{
                    formData.append('file', f); 
                })
                this.$store.dispatch('commits/addFiles',formData)
                .then(()=>{
                    resolve();
                })
                .catch(err=> {
                    reject(err);
                });
            })
        },
        async send(){
            this.isLoading = true;
            this.toDeleteCommit = false;
            this.errors = [];
            this.success = '';
            if(!this.validate()){
                this.errors.push("Заполните все обязательные поля!");
                return;
            }
            this.showFileNames = false;
            this.sendCommit()
            .then(async res=>{
                await asyncForEach(this.fileTypes, async (f) => { 
                    if(this.selectedFiles[f.id] && this.selectedFiles[f.id].length>0 && !this.validFiles[f.id] && !this.toDeleteCommit){
                        this.sendFile(res, f.id)
                        .then(()=>{
                            this.validFiles[f.id] = true;                           
                        })               
                        .catch(err=>{
                            this.showFileNames = false;
                            this.validFiles[f.id] = false;
                            this.errors.push(err.message);
                            if(f.required)
                                this.toDeleteCommit = true;                        
                        })
                    }
                    await waitFor(500);
                })
                this.isLoading = false;
                if(this.toDeleteCommit){
                    this.deleteCommit();
                    this.validFiles = {};
                    this.commit.id=null;
                }
                else if(this.errors.length < 1){
                    this.clearData();
                    this.success="Накат успешно добавлен";
                }
                this.showFileNames = true;
                
            })          
            .catch(err=>{
                this.errors.push(err.message);
            })     
            .finally(()=>{
                this.isLoading = false;
            })   
        },
        deleteCommit(){
            this.$store.dispatch('commits/deleteCommit',this.commit.id)
            .catch(err=> {
                console.log(err);
            });
        },
        clearData(){
            this.commit = {
                id: null,
                description: '',
                markId: this.marks[0].id
            };
            this.showFileNames = null
            this.selectedFiles = {};
            this.errors = [];
            this.success = '';
            this.validFiles = {};
        }
    },
    data(){
        return{
            commit:{
                id: null,
                description: '',
                markId: null
            },
            selectedFiles:{},
            showFileNames: null,
            errors: [],
            success: '',
            validFiles: {},
            toDeleteCommit: false,
            isLoading: false
        }
    },
    mounted(){
        this.getMarks();
        this.getFileTypes();
    }
}
</script>
<style>
.commitAdd th{
    width: 150px;
}
.commitAdd{
    width: 100%;
    height:100%;
    display: flex;
    flex-flow: column;
}
</style>