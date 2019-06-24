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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  margin:0;
  padding:0;
  background: var(--pr-bg-color);
}
</style>
