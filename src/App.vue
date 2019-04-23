<template>
  <v-app id="app">
    <router-view/>
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

#app {
  background-image: radial-gradient(circle, #eeeeee, #efefef, #efefef, #f0f0f0, #f0f0f0);
}

.rgba-grey {
  color: rgba($color: #000000, $alpha: 0.54);
}
</style>
