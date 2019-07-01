<template>
    <div class="dashboard view">
        <Navbar/>
        <div class="my-5 row mx-2">
            <div class="col-lg-2">
                <Menu/>
            </div>
            <div class="col-lg-10 view dashboard-content">
                <router-view></router-view>
            </div> 
        </div>         
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Menu from '@/components/Menu.vue'

export default {
    name: 'Dashboard',
    components: {
        Menu,
        Navbar
    }
}
</script>

<style>
.dashboard .row{
    height: calc(100% - 3rem - 57px);
}
.dashboard-content{
    width: 100%; 
    display: block;
    font-size: 12pt;
}
.dashboard td{
    vertical-align: middle;
}
</style>
