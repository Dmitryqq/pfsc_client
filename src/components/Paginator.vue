<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center mt-4">
            <li class="page-item">
                <button class="page-link" aria-label="Previous" @click="goPrev()">
                    <span aria-hidden="true">&lsaquo;</span>
                </button>
            </li>
            <li v-for="(p,i) in pageNumber" :key="i" :class="activeClass(i)" >
                <button class="page-link" :disabled="currentPage == i" @click="goToPage(i)">{{i+1}}</button>
            </li>
            <li class="page-item">
                <button class="page-link" aria-label="Next" @click="goNext()" :disabled="currentPage == pageNumber">
                    <span aria-hidden="true">&rsaquo;</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Paginator',
    props: {
        pageNumber: Number
    },
    data(){
        return{
            currentPage: 0
        }
    },
    methods:{
        activeClass(i){
            return {
                'page-item':true,
                active: this.currentPage == i
            }
        },
        goToPage(i){
            this.currentPage = i
            this.$emit('switchPage',this.currentPage);
        },
        goNext(){
            if(this.currentPage+1 < this.pageNumber ){
                this.currentPage += 1;
                this.$emit('switchPage',this.currentPage);
            }
        },
        goPrev(){
            if(this.currentPage > 0){
                this.currentPage -= 1;
                this.$emit('switchPage',this.currentPage);
            }
        },
        reload(){
            this.currentPage = 0;
        }
    }
}
</script>

