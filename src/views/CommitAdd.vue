<template>
    <div class="commitAdd">
        <Navbar/>
        <div class="col-md-7 mx-auto my-5">
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
                        <select class="form-control form-control-sm col-lg-6" v-model="commit.markId" ref="markRef">
                            <option v-for="mark in marks" :key="mark.id" :value="mark.id">{{mark.name}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Описание <span class="text-danger">*</span></th>
                    <td>
                        <textarea class="form-control" cols="" rows="7" v-model="commit.description" ref="descRef"></textarea>
                    </td>
                </tr>               
            </table>
            <div class="card my-2" v-for="fileType in fileTypes" :key="fileType.id">
                <div class="card-header">
                    {{fileType.name}}
                    <span v-if="fileType.required" class="text-danger">*</span>
                    <label class="icon-btn" v-if="(!selectedFiles[fileType.id] || selectedFiles[fileType.id].length < fileType.maxAmount) && !validFiles[fileType.id]">
                        <input type="file" multiple @change="onFileChanged($event, fileType.id)"/>
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
                                <label class="icon-btn" v-else>
                                    загружено
                                </label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <button class="btn btn-primary my-3" @click="send">
                Отправить
            </button>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
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
        Navbar
    },
    computed:{
        marks(){
            return this.$store.state.marks.marks;
        },
        sortedFileTypes(){
            return this.fileTypes.sort((a,b)=>{
                if(a.required)
                    return 1;
                if(!b.required)
                    return -1;
                return 0;
            })
        },
        ...mapGetters('fileTypes',{
            fileTypes: 'getUserFileTypes',
        })
    },
    methods:{
        getMarks(){
            this.$store.dispatch('marks/getMarks')
            .then(()=>{
                this.commit.markId = this.marks[0].id;
            })
        },
        getFileTypes(){
            this.$store.dispatch('fileTypes/getFileTypes');
        },
        onFileChanged (event, id) {
            this.errors = [];
            this.success = '';
            this.showFileNames = false;
            if(!this.selectedFiles[id])
                this.selectedFiles[id] = [];
            const j = this.getFileTypeIndex(id);
            for (var i = 0; i < event.target.files.length; i++) {
                if(this.selectedFiles[id].length >= this.fileTypes[j].maxAmount)   
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
        getFileTypeIndex(id){
            return this.fileTypes.findIndex(f=>f.id==id);
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
            this.errors = [];
            this.success = '';
            this.showFileNames = false;
            if(!this.validate()){
                this.errors.push("Заполните все обязательные поля!");
                return;
            }
            this.sendCommit()
            .then(async res=>{
                await asyncForEach(this.sortedFileTypes, async (f) => { 
                    if(this.selectedFiles[f.id] && this.selectedFiles[f.id].length>0 && !this.validFiles[f.id] && !this.toDeleteCommit){
                        this.sendFile(res, f.id)
                        .then(()=>{
                            this.validFiles[f.id] = true;                           
                        })               
                        .catch(err=>{
                            this.showFileNames = false;
                            this.validFiles[f.id] = false;
                            this.errors.push(err.message);
                            this.$refs.markRef.disabled = true;
                            this.$refs.descRef.disabled = true;
                            if(f.required)
                                this.toDeleteCommit = true;                        
                        })
                    }
                    await waitFor(500);
                })
                if(this.toDeleteCommit){
                    this.deleteCommit();
                    this.validFiles = {};
                    this.commit.id=null;
                    this.toDeleteCommit = false;
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
            this.$refs.markRef.disabled = false;
            this.$refs.descRef.disabled = false;
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
            toDeleteCommit: false
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

</style>