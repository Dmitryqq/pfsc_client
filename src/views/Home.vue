<template>
    <div class="home">
        <Navbar/>
        <div class="container my-5">
            <router-link to="/commit/new" class="btn btn-primary btn-sm add-btn">Добавить</router-link>
            <CommitsTable :dataSet="commits" @showCommit="clickListener"/>
        </div>
        
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CommitsTable from '@/components/CommitsTable.vue'
export default {
    name: 'Home',
    components: {
        Navbar,
        CommitsTable
    },
    computed: {
        commits() {
            return this.$store.state.commits.commits;
        }
    },
    methods:{
        getCommits(){
            this.$store.dispatch('commits/getCommits');
        },
        clickListener(id){
            this.$router.replace(`/commit/${id}`);
        }
    },
    mounted(){
        if(this.commits.length<1)
            this.getCommits();
    },
    beforeRouteLeave (to, from, next) {
        this.$store.dispatch('commits/clearCommits');
        next();
    }
}
</script>
<style>
.add-btn{
    margin-bottom: 20px;
}
</style>


