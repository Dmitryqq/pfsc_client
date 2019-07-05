<template>
    <div class="commit view">
        <Navbar/>
        <Loader v-if="isLoading"/>
        <div class="col-md-7 mx-auto my-5" v-else>

            <div class="alert alert-danger" role="alert" v-if="error">
                {{error}}
            </div>
            <div class="alert alert-success" v-if="success">
                {{success}}
            </div>

            <table class="table table-sm" :class="{editMode : editMode}">
                <tr>
                    <th>Имя пользователя</th>
                    <td>{{commit.userName}}</td>
                </tr>
                <tr>
                    <th>Дата</th>
                    <td>{{commit.createDate}}</td>
                </tr>
                <tr>
                    <th>Статус</th>
                    <td><span class="badge" :class="getStatus(commit.status).color">{{getStatus(commit.status).name}}</span></td>
                </tr>
                <tr v-if="commit.mark">
                    <th>Метка</th>
                    <td v-if="editMode">
                        <select class="form-control form-control-sm col-lg-8" v-model="newCommit.markId">
                            <option v-for="mark in marks" :key="mark.id" :value="mark.id">{{mark.name}}</option>
                        </select>
                    </td>
                    <td v-else>
                        <span class="badge badge-secondary">{{commit.mark.name}}</span>
                    </td>
                </tr>
                <tr>
                    <th>Описание</th>
                    <td v-if="editMode">
                        <textarea class="form-control" cols="" rows="7" v-model="newCommit.description"></textarea>
                    </td>
                    <td v-else>
                        {{commit.description}}
                    </td>
                </tr>
            </table>        
            
            <div class="text-center" v-if="editMode">
                <button class="btn btn-primary  my-3" @click="updateCommit">
                    Обновить
                </button> 
            </div>

            <div class="card my-2" v-for="(fileType,index) in commit.fileTypes" :key="fileType.id">
                <div class="card-header">
                    {{fileType.name}}
                    <span v-if="fileType.required && fileType.roleId == user.role.id" class="text-danger">*</span>
                    <label class="icon-btn ml-3" v-if="fileType.files.length < fileType.maxAmount && checkEnabled(fileType)">
                        <input type="file" multiple @change="onFileChanged($event, index)"/>
                        <i class="fas fa-plus"></i>
                    </label>
                    <Popover v-if="checkEnabled(fileType)">
                        maximum: {{fileType.maxAmount}} file(s) <br>
                        extensions: {{fileType.types}}
                    </Popover>
                </div>
                <div class="card-body" v-if="fileType.files.length">
                    <table class="table table-sm table-borderless" style="margin-bottom:0">
                        <tr v-for="(file,i) in fileType.files" :key="file.id">
                            <td>{{i+1}}</td>
                            <td @click="getFile(file.id,getFileName(file.path))" class="file-link">{{getFileName(file.path)}}</td>
                            <td class="text-secondary" style="font-size:.8rem;vertical-align:middle">{{file.createDate}}</td>
                            <td v-if="checkEnabled(fileType)">
                                <label class="icon-btn" @click="deleteFile(file,i,index)">
                                    <i class="fas fa-trash"></i>
                                </label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="text-center my-4" v-if="isAdmin && commit.status==null">
                <button type="button" class="btn btn-primary mx-3" @click="acceptCommit">Принять</button>
                <button type="button" class="btn btn-danger mx-3" @click="showModal">Отклонить</button>
            </div>

        </div>
        <Modal title="Причина отклонения" button="Отклонить" ref="myModal" @clickHandler="confirm()">
            <div class="form-group">
                <textarea class="form-control" cols="" rows="7" v-model="rejectMessage"></textarea>
            </div>
        </Modal>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'
import Loader from '@/components/Loader.vue'
import Popover from '@/components/Popover.vue'
import { Promise } from 'q';
import { setTimeout } from 'timers';

export default {
    name: 'Commit',
    components: {
        Navbar,
        Modal,
        Loader,
        Popover
    },
    computed:{
        statuses(){
            return this.$store.state.commits.statuses;
        },
        user() {
            return this.$store.state.users.user;
        },
        roles() {
            return this.$store.state.roles.roles;
        },
        marks(){
            return this.$store.state.marks.marks;
        },
        isAdmin(){
            return this.user.role && this.user.role.roleName == 'Admin'
        }
    },
    methods: {
        getCommit() {
            this.isLoading = true;
            this.$store.dispatch('commits/getCommit', this.$route.params.id)
                .then(res=>{
                    this.commit = res;
                    if(this.commit.userId == this.user.id && this.commit.status == null){
                        this.editMode = true;
                        this.getMarks();
                        this.newCommit.id = this.commit.id;
                        this.newCommit.description = this.commit.description;
                        this.newCommit.markId = this.commit.markId;
                    }
                    this.$store.dispatch('commits/changeStatus', [this.commit.id, this.commit.status]);
                })
                .catch(err => {
                    this.error = err.message;
                })
                .finally(()=>{
                    this.isLoading = false;
                })
        },
        getRoles(){
            this.$store.dispatch('roles/getRoles');
        },
        getMarks(){
            this.$store.dispatch('marks/getMarks');
        },
        getStatus(status){
            const i = this.statuses.findIndex(s=>{
                return s.value == status;
            })
            if(i>=0)
                return this.statuses[i];
            else 
                return '';
        },
        getFileName(path){
            var name = path.split('\\');
            return name[name.length-1];
        },
        onFileChanged (event, index) {
            this.error = '';
            this.success = '';
            if(event.target.files.length > this.commit.fileTypes[index].maxAmount - this.commit.fileTypes[index].files.length){
                this.error = 'Количество файлов превышает допустимое число'
                return;
            }
            this.isLoading = true;
            const selectedFiles = [];
            for(let i = 0; i < event.target.files.length; i++)
                selectedFiles.push(event.target.files[i]);
            this.sendFiles(this.commit.fileTypes[index].id, selectedFiles)
            .then(()=>{
                this.showSuccess('Файл(ы) успешно добавлен(ы)');
            })
            .catch(err=>{              
                this.error = err.message;
            }) 
            .finally(()=>{
                this.getCommit();
                this.isLoading = false;
            })         
        },
        sendFiles(fileTypeId, files){
            return new Promise((resolve,reject)=>{
                const formData = new FormData();
                formData.append('commitId', this.commit.id);
                formData.append('fileTypeId', fileTypeId);
                files.map(f=>{
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
        showModal(){
            this.error = '';
            this.success = '';
            this.$refs['myModal'].show();
        },
        confirm(){
            this.rejectCommit();
        },
        deleteFile(file,fileInd,fileTypeInd){
            if(confirm("Подтвердите удаление файла '" + this.getFileName(file.path) + "'")){
                this.isLoading = true;
                this.$store.dispatch('commits/deleteFile',file.id)
                .then(()=>{
                    this.commit.fileTypes[fileTypeInd].files.splice(fileInd,1);
                    this.showSuccess('Файл успешно удален');
                })
                .catch(err=> {
                    this.getCommit();                   
                    this.error = err.message;
                })
                .finally(()=>{
                    this.isLoading = false;
                })
            }
        },
        updateCommit(){
            if(this.newCommit.description != '') {
                if(this.commit.description!=this.newCommit.description || this.commit.markId!= this.newCommit.markId)
                    if(confirm("Подтвердите обновление наката")){
                        this.isLoading = true;
                        this.$store.dispatch('commits/updateCommit',this.newCommit)
                        .then(()=>{
                            this.showSuccess('Накат успешно обновлен');
                        })
                        .catch(err=> {
                            this.getCommit();
                            this.error = err.message;
                        })
                        .finally(()=>{
                            this.isLoading = false;
                        })
                    }
            }
            else
                this.error = 'Заполните поле описание!';
        },
        acceptCommit(){
            if(confirm("Подтвердите принятие наката")){
                this.isLoading = true;
                this.$store.dispatch('commits/acceptCommit',this.commit.id)
                .then(()=>{
                    this.getCommit();
                    this.showSuccess('Накат успешно принят');
                })
                .catch(err=>{
                    this.error = err.message;
                })
                .finally(()=>{
                    this.isLoading = false;
                })
            }
        },
        rejectCommit(){
            if(this.rejectMessage != ''){
                this.isLoading = true;
                this.$store.dispatch('commits/rejectCommit',[this.commit.id,this.rejectMessage])
                .then(()=>{
                    this.getCommit();
                    this.showSuccess('Накат успешно отклонен');
                })
                .catch(err=>{
                    this.error = err.message;
                })
                .finally(()=>{
                    this.isLoading = false;
                })
                this.rejectMessage = ''
            }
            else
                this.error = 'Причина отказа не указана'
        },
        checkEnabled(fileType){
            if(this.roles){
                const i = this.roles.findIndex(r=> r.id == fileType.roleId);
                if(fileType.roleId != this.user.role.id && (this.roles[i] && (this.user.role.roleName != 'Admin' || this.roles[i].roleName == 'User')))
                    return false;
                if(this.commit.status!=null && !fileType.enableAfterAccept)
                    return false;
                return true; 
            }
        },
        getFile(id,name){
            this.$store.dispatch('commits/getFile',[id,name]);
        },
        showSuccess(message){
            this.success = message;
            setTimeout(()=>{this.success = null},3000);
        }
    },
    data(){
        return{
            commit:{},
            error: '',
            success: '',
            editMode: false,
            newCommit: {},
            rejectMessage: '',
            isLoading: false
        }
    },
    mounted(){
        this.getCommit();
        this.getRoles();       
    }
}
</script>
<style>
.commit th{
    min-width: 180px;
}
.commit .editMode th{
    width: 100px;
}
.modal{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
.commit .file-link{
    cursor: pointer;
}
.commit .file-link:hover{
    text-decoration: underline;
}
</style>