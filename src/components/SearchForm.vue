<template>
    <div class="form-inline my-2 my-lg-0 ml-auto">
        <input class="form-control form-control-sm mr-sm-2" type="text" placeholder="Search" 
            aria-label="Search" @keyup="keyEnter($event)" v-model="param">    
    </div>
</template>

<script>
export default {
    name: 'SearchForm',
    data(){
        return{
            param: ''
        }
    },
    methods: {
        keyEnter(e){
            if (e.keyCode == 13) {
                this.search()
            }
        },
        search(){
            this.$store.dispatch('commits/searchCommits',this.param)
                .then(()=>{
                    this.$router.replace(`/`);
                })
        }
    }
}
</script>
