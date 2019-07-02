<template>
    <errorpage 
        :code="Number(400)"
        title="Неверный запрос!"
        text="Сервер не в состоянии обработать данный запрос."   
    >
    </errorpage>
</template>

<script>
import errorpage from '@/components/ErrorPage.vue'
export default {
    name: 'BadRequest',
    components:{
        errorpage
    }
}
</script>

