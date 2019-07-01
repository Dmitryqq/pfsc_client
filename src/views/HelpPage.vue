<template>
     <div class="configs">
        <Navbar/>
        <div class="col-md-7 mx-auto my-5">
            <h1>Добавление наката</h1>
            <p>Чтобы добавить накат, пользователь должен иметь права "User". Для добавления наката нужно перейти на главную страницу и нажать кнопку "Добавить". 
            В открывшейся форме необходимо указать метку, заполнить описание и добавить файлы, помеченные звездочкой.<br>
            На главной странице хранится список активных накатов пользователя. Пока накат имеет статус "в ожидании" пользователь может редактировать его содержание.</p>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components: {
        Navbar
    },
    data: function(){
        return {        
            isLoading: false,
            success: null,
            error: null
        }
    },
    computed:{
        
    },
    created(){
        
    },
    methods: {
        
        
    }
}
</script>
<style scoped>
table{
    width: 50%;
    border-collapse: collapse;
    overflow-x: auto;
}
.col{
    width: 20%;
}
</style>