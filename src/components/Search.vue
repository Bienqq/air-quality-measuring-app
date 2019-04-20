<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container fluid>
      <v-layout align-center justify-center row fill-height align-baseline>
        <v-flex xs11 sm6 md4>
          <v-autocomplete
            label="Type country name"
            v-model="selectedCountry"
            clearable
            prepend-icon="location_searching"
            hint="Eg. Poland, Germany, Spain or France"
            hide-selected
            persistent-hint
            :items="countries.map(el => el.name)"
            :rules="countryRules"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs1 sm4 md2>
          <v-btn class="ml-0 mb-3" flat icon color="info" :disabled="!valid" @click="handleSearch">
            <v-icon large>search</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

const AIR_QUALITY_API_URL = process.env.VUE_APP_AIR_QUALITY_API_URL
const MOST_POLLUTED_CITIES_LIMIT =
  process.env.VUE_APP_MOST_POLLUTED_CITIES_LIMIT

export default {
  data () {
    return {
      valid: true,
      selectedCountry: '',
      countries: [
        {
          name: 'Poland',
          code: 'PL'
        },
        {
          name: 'Germany',
          code: 'DE'
        },
        {
          name: 'Spain',
          code: 'ES'
        },
        {
          name: 'France',
          code: 'FR'
        }
      ],
      countryRules: [v => !!v || 'Country name is required']
    }
  },
  methods: {
    handleSearch () {
      if (this.$refs.form.validate()) {
        const { code } = this.countries.find(item => item.name === this.selectedCountry)
        console.log('user selected: ' + code)
        axios.get(AIR_QUALITY_API_URL, {
          params: {
            country: code,
            order_by: 'count',
            sort: 'desc',
            limit: MOST_POLLUTED_CITIES_LIMIT
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => console.log('stop loading'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
