<template>
  <v-app id="app">
    <search/>
  </v-app>
</template>

<script>
import Search from './components/Search'

export default {
  components: {
    search: Search
  }
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
</style>
