<template>
    <div class="home">
        <Navbar/>
        <div class="container my-5">
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
    }
}
</script>
<style>

</style>


