<template>
    <table class="table table-sm table-hover">
            <thead>
                <tr>
                <th scope="col">Имя пользователя</th>
                <th scope="col">Описание</th>
                <th scope="col">Дата</th>
                <th scope="col">Метка</th>
                <th scope="col">Статус</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in dataSet" :key="data.id" @click="$emit('showCommit',data.id)">
                    <td>{{data.userName}}</td>
                    <td>{{data.description}}</td>
                    <td>{{data.createDate}}</td>
                    <td><span class="badge badge-secondary">{{data.mark.name}}</span></td>
                    <td><span class="badge" :class="getStatus(data.accepted).color">{{getStatus(data.accepted).name}}</span></td>
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
                return s.value == status;
            })
            if(i>=0)
                return this.statuses[i];
            else 
                return null;
        }
    }
}
</script>

