<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

#app{
   //background: linear-gradient(to bottom, #2196f3, #1a86e6, #1677d8, #1567ca, #1758bb);
}
</style>
