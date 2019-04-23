<template>
  <v-container fluid>

    <v-layout column align-self-baseline fill-height v-bind="searchInputPosition">
      <v-flex xs3 :class="[!content && loading ? 'slideInUp' : '', 'animated', 'fast']">
        <h1 class="display-1 mb-5 text-xs-center rgba-grey">POLLUTION VIEWER</h1>
        <search-input
          @loading="loading = $event.loading"
          @error="showErrorSnackbar = true"
          @contentLoaded="content = $event.content"
        />
      </v-flex>

      <v-flex xs4 sm6 align-self-center v-if="loading">
        <v-progress-circular :color="'#2196f3'" indeterminate size="80" width="6"/>
      </v-flex>

      <v-flex xs6 v-if="content && !loading" class="mt-5">
        <search-results :content="content"/>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="showErrorSnackbar" absolute :timeout="4000">
      <v-icon large color="error">error</v-icon>
      <span class="subheading mr-4">Connection error</span>
    </v-snackbar>

  </v-container>
</template>

<script>
import SearchInput from '@/components/SearchInput'
import SearchResults from '@/components/SearchResults'

export default {
  name: 'SearchView',
  components: {
    'search-input': SearchInput,
    'search-results': SearchResults
  },
  data () {
    return {
      loading: false,
      showErrorSnackbar: false,
      content: null
    }
  },
  computed: {
    searchInputPosition () {
      return !this.content ? { 'justify-space-around': true } : { 'justify-space-between': true }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
