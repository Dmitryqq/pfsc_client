<template>
    <div class="commit">
        <Navbar/>
        <div class="col-md-7 mx-auto my-5">
            <table class="table table-sm ">
                <tr>
                    <th>Имя пользователя</th>
                    <td>{{commit.userName}}</td>
                </tr>
                <tr>
                    <th>Описание</th>
                    <td>{{commit.description}}</td>
                </tr>
                <tr>
                    <th>Дата</th>
                    <td>{{commit.createDate}}</td>
                </tr>
                <tr>
                    <th>Метка</th>
                    <td>
                        <!-- <select class="form-control form-control-sm col-6">
                            <option>1</option>
                        </select> -->
                        <span class="badge badge-secondary">{{commit.mark.name}}</span>
                    </td>
                </tr>
                <tr>
                    <th>Статус</th>
                    <td><span class="badge" :class="getStatus(commit.accepted).color">{{getStatus(commit.accepted).name}}</span></td>
                </tr>
            </table>
            <div class="card my-2" v-for="fileType in commit.fileTypes" :key="fileType.id">
                <div class="card-header">
                    {{fileType.name}}
                    <span class="icon-btn" >
                        <i class="fas fa-plus"></i>
                    </span>
                </div>
                <div class="card-body">
                    <table class="table table-sm table-borderless" style="margin-bottom:0">
                        <tr v-for="file in fileType.files" :key="file.id">
                            <td>{{getFileName(file.path)}}</td>
                            <td>
                                <span class="icon-btn">
                                    <i class="fas fa-trash"></i>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    name: 'Commit',
    components: {
        Navbar
    },
    computed:{
        statuses(){
            return this.$store.state.commits.statuses;
        }
    },
    methods: {
        getCommit() {
            this.$store.dispatch('commits/getCommit', this.$route.params.id)
                .then(res=>{
                    this.commit = res;
                })
        },
        getStatus(status){
            const i = this.statuses.findIndex(s=>{
                return s.value == status;
            })
            if(i>=0)
                return this.statuses[i];
            else 
                return null;
        },
        getFileName(path){
            var name = path.split('\\');
            return name[name.length-1];
        }
    },
    data(){
        return{
            commit:{}
        }
    },
    mounted(){
        this.getCommit()
    }
}
</script>
<style>
.icon-btn{
    float: right;
    opacity: .5;
    font-size: 1rem;
    cursor: pointer;
}
</style>