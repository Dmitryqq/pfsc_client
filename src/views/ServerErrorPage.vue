<template>
    <errorpage 
        :code="Number(500)"
        title="Ошибка сервера!"
        text="На сервере произошла непредвиденная ошибка. Пожалуйста, повторите попытку позже."   
        @hideNav="$emit('hideNav')"
        @showNav="$emit('showNav')">
    </errorpage>
</template>

<script>
import errorpage from '@/components/ErrorPage.vue'
export default {
    name: 'ServerError',
    components:{
        errorpage
    }
}
</script>
