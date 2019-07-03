<template>
    <div class="list-group mb-3">
        <router-link to="/dashboard/users" class="list-group-item list-group-item-action">Пользователи</router-link>
        <router-link to="/dashboard/roles" class="list-group-item list-group-item-action">Роли</router-link>
        <router-link to="/dashboard/marks" class="list-group-item list-group-item-action">Метки</router-link>
        <router-link to="/dashboard/filetypes" class="list-group-item list-group-item-action">Типы файлов</router-link>
        <router-link to="/dashboard/configs" class="list-group-item list-group-item-action">Конфигурация</router-link>
    </div>
</template>

<script>
export default {
    name: 'Menu'
}
</script>



