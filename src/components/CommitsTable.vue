<template>
    <table class="table table-sm table-hover">
            <thead>
                <tr>
                <th scope="col">Имя пользователя</th>
                <th scope="col">Номер</th>
                <th scope="col">Описание</th>
                <th scope="col">Дата</th>
                <th scope="col">Метка</th>
                <th scope="col">
                    <span @click="showMarks=!showMarks">Статус <i class="fas fa-sort-down"></i></span>
                    <div class="dropdown" v-if="showMarks">
                        <button class="dropdown-item" type="button" @click="dFilter">все</button>
                        <button class="dropdown-item" type="button" v-for="st in statuses" :key="st.name" @click="aFilter(st.name)">{{st.name}}</button>
                    </div>
                </th>
                </tr>
            </thead>
            <th colspan="6" v-if="!commits.length"><p class="text-secondary">Список пуст</p></th>
            <tbody>
                <tr v-for="commit in commits" :key="commit.id" @click="$emit('showCommit',commit.id)">
                    <td>{{commit.userName}}</td>
                    <td>{{commit.number}}</td>
                    <td>{{commit.description}}</td>
                    <td>{{commit.createDate}}</td>
                    <td><span class="badge badge-secondary">{{commit.mark.name}}</span></td>
                    <td><span class="badge" :class="getStatus(commit.status).color">{{getStatus(commit.status).name}}</span></td>
                </tr>
            </tbody>
    </table>
</template>

<script>
export default {
    name: 'CommitsTable',
    props:{
        dataSet: Array
    },
    computed:{
        statuses(){
            return this.$store.state.commits.statuses;
        }
    },
    methods:{
        getStatus(status){
            const i = this.statuses.findIndex(s=>{
                return s.name == status;
            })
            if(i>=0)
                return this.statuses[i];
            else 
                return this.statuses[0];
        },
        aFilter(status){
            this.commits = this.dataSet.filter(c=>c.status==status || status==this.statuses[0].name && c.status == null);
            this.showMarks=false;
        },
        dFilter(){    
            this.commits = this.dataSet;       
            this.showMarks=false;
        }
    },
    data(){
        return{
            commits: [],
            showMarks: false
        }
    },
    watch: {
        dataSet(newDataSet) {
            this.commits = newDataSet;
        }
    },
    mounted(){
        this.commits = this.dataSet;
    }
}
</script>

<style scoped>

i{
    position: relative;
    top:-3px;
    cursor: pointer;
}
.dropdown{
    position: absolute;
    z-index: 1000;
    float: left;
    min-width: 9rem;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    transform: translate3d(-57px, 2px, 0px);
}

p{
    text-align: center;
    padding-top: 100px;
}

tbody td:nth-child(3){
    max-width: 200px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>


