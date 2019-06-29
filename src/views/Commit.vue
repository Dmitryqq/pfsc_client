<template>
    <div class="commit">
        <Navbar/>
        <div class="col-md-7 mx-auto my-5">

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
                        <select class="form-control form-control-sm col-lg-8" v-model="newCommit.markId" ref="markRef">
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
                <button class="btn btn-primary  my-3" @click="showModal(true)">
                    Обновить
                </button> 
            </div>

            <div class="card my-2" v-for="(fileType,index) in commit.fileTypes" :key="fileType.id">
                <div class="card-header">
                    {{fileType.name}}
                    <span v-if="fileType.required && fileType.roleId == user.role.id" class="text-danger">*</span>
                    <label class="icon-btn" v-if="fileType.files.length < fileType.maxAmount && checkEnabled(fileType)">
                        <input type="file" multiple @change="onFileChanged($event, index)"/>
                        <i class="fas fa-plus"></i>
                    </label>
                    <span class="text-secondary float-right mr-3">maximum {{fileType.maxAmount}} files</span>
                </div>
                <div class="card-body" v-if="fileType.files.length">
                    <table class="table table-sm table-borderless" style="margin-bottom:0">
                        <tr v-for="(file,index) in fileType.files" :key="file.id">
                            <td>{{index+1}}</td>
                            <td @click="getFile(file.id,getFileName(file.path))" class="file-link">{{getFileName(file.path)}}</td>
                            <td class="text-secondary" style="font-size:.8rem;vertical-align:middle">{{file.createDate}}</td>
                            <td v-if="checkEnabled(fileType)">
                                <label class="icon-btn" @click="showModal(false, file)">
                                    <i class="fas fa-trash"></i>
                                </label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" role="dialog" id="myModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{modal.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{modal.body}} {{file.path?getFileName(file.path) : ''}} ?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-primary" @click="confirm(modal.button)">{{modal.button}}</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { Promise } from 'q';

export default {
    name: 'Commit',
    components: {
        Navbar
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
        }
    },
    methods: {
        getCommit() {
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
            const selectedFiles = [];
            for(let i = 0; i < event.target.files.length; i++)
                selectedFiles.push(event.target.files[i]);
            this.sendFiles(this.commit.fileTypes[index].id, selectedFiles)
            .then(()=>{
                this.getCommit();
                this.success= 'Файл(ы) успешно добавлен(ы)'
            })
            .catch(err=>{
                this.error = err.message;
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
                    this.error = err.message;
                });
            })
        },
        showModal(i,file = {}){
            this.error = '';
            this.success = '';
            this.file = file;
            if(i){
                this.modal.title = 'Обновление наката';
                this.modal.body = 'Вы действительно хотите обновить накат';
                this.modal.button = 'Обновить';
            }
            else{
                this.modal.title = 'Удаление файла';
                this.modal.body = 'Вы действительно хотите удалить файл';
                this.modal.button = 'Удалить';
            }
            $('#myModal').modal('show');
        },
        confirm(button){
            if(button == 'Удалить')
                this.deleteFile();
            else if(button == 'Обновить')
                this.updateCommit();
            $('#myModal').modal('hide');
        },
        deleteFile(){
            this.$store.dispatch('commits/deleteFile',this.file.id)
            .then(()=>{
                this.getCommit();
                this.success= 'Файл успешно удален'
            })
            .catch(err=> {
                this.error = err.message;
            });
        },
        updateCommit(){
            if(this.newCommit.description != '') {
                if(this.commit.description!=this.newCommit.description || this.commit.markId!= this.newCommit.markId)
                    this.$store.dispatch('commits/updateCommit',this.newCommit)
                    .then(()=>{
                        this.success= 'Накат успешно обновлен'
                    })
                    .catch(err=> {
                        this.error = err.message;
                    });
            }
            else
                this.error = 'Заполните поле описание!';
        },
        checkEnabled(fileType){
            if(this.roles){
                const i = this.roles.findIndex(r=> r.id == fileType.roleId);
                const j = this.roles.findIndex(r=> r.id == this.user.role.id);
                if(fileType.roleId != this.user.role.id && (this.roles[j] && this.roles[i] && (this.roles[j].roleName != 'Admin' || this.roles[i].roleName == 'User')))
                    return false;
                if(this.commit.status!=null && !fileType.enableAfterAccept)
                    return false;
                return true; 
            }
        },
        getFile(id,name){
            this.$store.dispatch('commits/getFile',[id,name]);
        }
    },
    data(){
        return{
            commit:{},
            error: '',
            success: '',
            file: {},
            modal: {
                title: '',
                body: '',
                button: ''
            },
            editMode: false,
            newCommit: {}
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