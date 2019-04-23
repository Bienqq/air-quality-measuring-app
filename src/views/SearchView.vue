<template>
  <v-container fluid>
    <v-layout column align-self-baseline fill-height v-bind="inputPositionComputed">
      <v-flex xs3 :class="[!content && loading ? 'slideInUp' : '', 'animated', 'fast']">
        <h1 class="display-1 mb-5 text-xs-center rgba-grey">POLLUTION VIEWER</h1>
        <search-input @startSearch="handleSearch" :search-disabled="loading" />
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
import axios from 'axios'
import SearchInput from '@/components/SearchInput'
import SearchResults from '@/components/SearchResults'

const AIR_QUALITY_API_URL = process.env.VUE_APP_AIR_QUALITY_API_URL
const MOST_POLLUTED_CITIES_LIMIT = process.env.VUE_APP_MOST_POLLUTED_CITIES_LIMIT
const MAX_SEARCH_RESULTS_LIMIT = parseInt(process.env.VUE_APP_MAX_SEARCH_RESULTS_LIMIT)

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
    inputPositionComputed () {
      return !this.content ? { 'justify-space-around': true } : { 'justify-space-between': true }
    }
  },
  methods: {
    handleSearch (searchData) {
      const { code, parameter } = searchData
      this.loading = true
      axios
        .get(AIR_QUALITY_API_URL, {
          params: {
            country: code,
            parameter: parameter.toLowerCase(),
            order_by: ['measurements[0].lastUpdated', 'measurements[0].value'],
            sort: ['desc', 'desc'],
            limit: MAX_SEARCH_RESULTS_LIMIT
          }
        })
        .then(response => {
          this.content = this.getMostPollutedCities(response.data.results)
        })
        .catch(error => {
          console.error(error)
          this.showErrorSnackbar = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    getMostPollutedCities (results) {
      const mostPollutedCities = []
      for (const result of results) {
        if (!mostPollutedCities.some(item => item.city === result.city)) {
          mostPollutedCities.push(result)
        }
        if (mostPollutedCities.length >= MOST_POLLUTED_CITIES_LIMIT) {
          break
        }
      }
      return mostPollutedCities.map(this.mapSearchResults)
    },
    mapSearchResults (item) {
      return {
        place: {
          city: item.city,
          location: item.location
        },
        measurement: {
          parameter: item.measurements[0].parameter,
          value: item.measurements[0].value,
          unit: item.measurements[0].unit,
          measurementTime: item.measurements[0].lastUpdated
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
