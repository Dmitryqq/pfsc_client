<template>
    <errorpage 
        :code="Number(403)"
        title="Отказано в доступе!"
        text="Вы запросили страницу, доступ к которой ограничен специальными правами."   
    >
    </errorpage>
</template>

<script>
import errorpage from '@/components/ErrorPage.vue'
export default {
    name: 'Forbidden',
    components:{
        errorpage
    }
}
</script>
