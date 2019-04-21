<template>
	<v-container fluid >
		
		<v-layout align-space-around column justify-space-around align-self-baseline fill-height>
						
      <v-flex xs3 :class="[!content && loading ? 'slideInUp' : '', 'animated', 'fast']" >
				<h1 class="display-1 mb-5 text-xs-center header-color">POLLUTION VIEWER</h1>
				<search @loading="loading = $event.loading" @error="showErrorSnackbar = true" @contentLoaded="content = $event.content" />
			</v-flex>

			<v-flex xs6 align-self-center v-if="loading" >
				<v-progress-circular :color="'#2196f3'" indeterminate size="80" width="6" />
			</v-flex>

			<v-flex xs6 v-if="content && !loading">
				<search-results :content="content" />
			</v-flex>

		</v-layout>

		<v-snackbar v-model="showErrorSnackbar" absolute :timeout="4000">
			<v-icon large color="error">error</v-icon>
			<span class="subheading mr-4">Connection error</span>
		</v-snackbar>

	</v-container>
</template>

<script>
import Search from '@/components/Search'
import SearchResults from '@/components/SearchResults'

export default {
  name: 'Home',
  components: {
    search: Search,
    'search-results': SearchResults
  },
  data () {
    return {
      loading: false,
      showErrorSnackbar: false,
      content: null
    }
	},
}
</script>

<style scoped lang="scss">
.header-color{
	color: rgba(0, 0, 0, .54)
}
</style>
