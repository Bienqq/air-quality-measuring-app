<template>
  <v-layout align-center justify-center row fill-height align-baseline wrap>
        <search-item class="animated fadeIn zoomIn faster" v-for="(item, index) in content" :city="item.city" :measurement="item.measurement" :key="index"/>
  </v-layout>
</template>

<script>
import SearchItem from './SearchItem'

export default {
  name: 'SearchResults',
  props: {
    content: Array
  },
  components: {
    'search-item': SearchItem
  }
}
</script>

<style lang="scss" scoped>

</style>
