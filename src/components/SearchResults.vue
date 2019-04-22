<template>
  <v-layout justify-center row wrap>
        <search-item class="animated fadeIn faster" v-for="(item, index) in content" :place="item.place"  :measurement="item.measurement" :key="index"/>
        <h1 v-if="!content.length" class="animated fadeIn faster rgba-gray headline">No search results</h1>
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
