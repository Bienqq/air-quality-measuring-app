<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-layout align-center justify-center row fill-height align-baseline wrap>
      <v-flex xs12 sm6 offset-md1 md4>
        <v-autocomplete
          class="mr-4"
          label="Country name"
          v-model="selectedCountry"
          clearable
          prepend-icon="gps_fixed"
          hint="Eg. Poland, Germany, Spain or France"
          hide-selected
          persistent-hint
          :items="countries.map(el => el.name)"
          :rules="countryRules"
          :menu-props="{'transition':'slide-y-transition'}"
          :disabled="searchDisabled"
        />
      </v-flex>

      <v-flex xs11 sm3 md2>
        <v-autocomplete
          label="Parameter name"
          v-model="selectedParameter"
          clearable
          prepend-icon="warning"
          hint="Eg. PM25, PM10, SO2, NO2, O3, CO, BC"
          hide-selected
          persistent-hint
          :items="parameters"
          :rules="parameterRules"
          :menu-props="{'transition':'slide-y-transition'}"
          :disabled="searchDisabled"
        />
      </v-flex>

      <v-flex xs1>
        <v-btn
          class="ml-0 mb-3"
          flat
          icon
          :color="'#1976D2'"
          :disabled="!valid || searchDisabled"
          @click="searchClicked"
        >
          <v-icon large>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    searchDisabled: Boolean
  },
  data () {
    return {
      valid: true,
      selectedCountry: '',
      selectedParameter: '',
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
      parameters: ['PM25', 'PM10', 'SO2', 'NO2', 'O3', 'CO', 'BC'],
      countryRules: [v => !!v || 'Country name is required'],
      parameterRules: [v => !!v || 'Parameter name is required']
    }
  },
  methods: {
    searchClicked () {
      if (this.$refs.form.validate()) {
        const { code } = this.countries.find(item => item.name === this.selectedCountry)
        this.$emit('startSearch', { code: code, parameter: this.selectedParameter })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
