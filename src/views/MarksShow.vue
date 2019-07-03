<template>
    <div class="marks view">
        <Loader v-if="isLoading"/>
        <div v-else>
            <div class="alert alert-danger" role="alert" v-if="error">
                {{error}}
            </div>
            <div class="alert alert-success" v-if="success">
                {{success}}
            </div>
            <table class="table table-sm mx-auto">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th></th>
                </tr>
                </thead>
                <tr v-for="mark in marks" :key="mark.id">
                    <td>{{mark.id}}</td>
                    <td>{{mark.name}}</td>
                    <td>
                        <span class="icon-btn" style="float: left">
                            <i style="margin-left: 20px" class="fas fa-trash" @click="deleteMark(mark)"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input class="form-control form-control-sm" type="text"  v-model="mark.name" required></td>
                    <td><button type="submit" class="btn btn-sm btn-primary" @click="addMark">Добавить</button></td>
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
            mark:{
                name: ''
            },    
            isLoading: false,
            success: null,
            deleteMode: false,
            editMode: false,
            error: null,
        }
    },
    computed:{
        marks(){
            return this.$store.state.marks.marks;
        }
    },
    created(){
        this.getMarks()
    },
    methods: {
        getMarks () {
            this.isLoading = true;
            this.$store.dispatch('marks/getMarks')
            .catch(err=>{
                this.error = err.message;
            })  
            .finally(()=>{
                this.isLoading = false; 
            })     
        },
        addMark(){  
            this.error = null;
            if(this.mark.name.length>0) {
                    this.$store.dispatch('marks/addMark',  this.mark)
                    .then(()=>{ 
                    this.showSuccess('Метка успешно добавлена');
                    this.clearForm()
                })
                .catch((err)=>{
                    this.error=err.message
                })
            }
        },
        deleteMark(mark){
            if(confirm("Подтвердите удаление элемента '"+mark.name+"'")){
                this.$store.dispatch('marks/deleteMark', mark.id)
                .then(()=>{ 
                    this.error = null;
                    this.showSuccess('Метка успешно удалена');
                })
                .catch(err=>{
                    this.error = err.message;
                })
            }
        },
        clearForm(){
            this.mark.name = '';
            this.mark.value = '';
            this.mark.description = '';
        },
        showSuccess(message){
            this.success =  message;
            setTimeout(()=>{this.success = null},3000);
        }
    }
}
</script>

<style scoped>
table{
    width: 30%;
    border-collapse: collapse;
    overflow-x: auto;
}
.col{
    width: 20%;
}
td:nth-child(1){
    width: 1%;
}
td:nth-child(2){
    width: 20%;
}
td:nth-child(3){
    width: 1%;
}
</style>