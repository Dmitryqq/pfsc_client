<template>
    <div class="panel">
        <div class="panel-header" v-if="header">
            {{header}}
        </div>
        <div class="panel-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'panel',
    props: {
        header: String
    }
}
</script>

<style scoped>
.panel-header{
    padding:10px;
    background:rgb(44,152,240);
    color:#fff;
    font-size: var(--sc-txt-size);
}
.panel-body{
    width:100%;
    display: inline-block;
}
.panel{
    box-shadow: 0 0px 3px #ccc;
}
</style>

