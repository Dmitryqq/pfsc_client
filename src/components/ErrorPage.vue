<template>
    <div class="errorpage">
            <h1>{{code}}</h1>
            <h2>{{title}}</h2>
            <p>{{text}}</p>
            <div class="text-center">
                <router-link to="/" class="btn btn-primary" role="button">На главную</router-link>
            </div>
        </div>
</template>

<script>
export default {
    name: 'errorpage',
    props:{
        code: Number,
        title: String,
        text: String
    }
}
</script>

<style scoped>
.errorpage{
    background: var(--sc-bg-color);
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
}
h1{
    margin-top: -.5em;
    font-size: 10em;
    color:  var(--sc-color);
}
h2{
    font-weight: normal;
    color:  rgba(0,0,0,.7);
}
p{
    margin: 20px auto 30px auto;
    color:  rgba(0,0,0,.9);
}
a{
    background: var(--pr-color);
    width: 120px;
}
</style>


