<template>
    <nav class="navbar navbar-expand-sm navbar-light bd-navbar">
        <div class="container">

            <router-link to="/" class="navbar-brand">
                <img alt="Vue logo" src="../assets/logo.png"  height="30" class="d-inline-block align-top">
                <span>Банк Компаньон</span>
            </router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                 <SearchForm />

                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Павел
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <router-link to="/" class="dropdown-item">Настройки</router-link>
                            <router-link to="/" class="dropdown-item">Выйти</router-link>
                        </div>
                    </li>
                </ul>

            </div>

        </div>
    </nav>
</template>

<script>
import SearchForm from './SearchForm.vue'
export default {
    name: 'Navbar',
    components:{
        SearchForm
    }
}
</script>

<style>
.navbar-brand span{
    color: var(--pr-color) !important;
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: 400;
    margin-left:10px;
}
.form-control{
    margin-right:20px !important;
}
.bd-navbar{
    background: var(--nav-bg-color);
    border-bottom: 1px solid rgba(0,0,0,.1);
}
</style>
