<template>
    <errorpage 
        :code="Number(404)"
        title="Страница не найдена!"
        text="Возможно,введён некорректный адрес или страница была удалена."   
    >
    </errorpage>
</template>

<script>
import errorpage from '@/components/ErrorPage.vue'
export default {
    name: 'NotFound',
    components:{
        errorpage
    }
}
</script>

