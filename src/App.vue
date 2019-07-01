<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
:root {
  --pr-color: #007dc6; 
  --sc-color: #98cc0a;
  --pr-bg-color: #fff;
  --sc-bg-color: #f8f9fa;
}

html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  margin:0;
  padding:0;
  background: var(--pr-bg-color);
  height: 100%;
}

.view{
  width: 100%;
  height:100%;
  display: flex;
  flex-flow: column;
  flex-grow: 1;
}

.icon-btn{
    float: right;
    font-size: 1rem;
}
.icon-btn i{
  color: rgba(0, 0, 0, .5);
  cursor: pointer;
}
.icon-btn i:hover{
  color: rgba(0, 0, 0, .8);
}
.icon-btn input[type="file"] {
    display: none;
}
label.icon-btn{
    margin: 0;
}
</style>
