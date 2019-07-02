<template>
    <div class="home">
        <Navbar/>
        <Loader v-if="isLoading"/>
        <div class="container my-5 view" v-else>
            <router-link to="/commit/new" class="btn btn-primary btn-sm add-btn" v-if="role && role.roleName=='User'">Добавить</router-link>
            <CommitsTable :dataSet="searchMode ? searchResults : commits" @showCommit="clickListener"/>
        </div>
        
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CommitsTable from '@/components/CommitsTable.vue'
import Loader from '@/components/Loader.vue'
export default {
    name: 'Home',
    components: {
        Navbar,
        CommitsTable,
        Loader
    },
    data(){
        return{
            isLoading: false
        }
    },
    computed: {
        commits() {
            return this.$store.state.commits.commits;
        },
        role() {
            return this.$store.state.users.user.role;
        },
        searchMode() {
            return this.$store.state.commits.searchMode;
        },
        searchResults() {
            return this.$store.state.commits.searchResults;
        }
    },
    methods:{
        getCommits(){
            this.isLoading = true;
            this.$store.dispatch('commits/getCommits')
            .finally(()=>{
                this.isLoading = false;
            })
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
        if(this.searchMode)
            this.$store.dispatch('commits/clearSearchResults');
        next();
    }
}
</script>
<style>
.add-btn{
    margin-bottom: 20px;
    width: 80px;
}
.home {
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-flow: column;
}
</style>


