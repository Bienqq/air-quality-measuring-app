<template>
	<v-form v-model="valid" ref="form" lazy-validation>
		<v-layout align-center justify-center row fill-height align-baseline wrap>

			<v-flex xs12 sm6 md4>
				<v-autocomplete class="mr-4" label="Country name" v-model="selectedCountry" clearable prepend-icon="gps_fixed" hint="Eg. Poland, Germany, Spain or France" hide-selected persistent-hint :items="countries.map(el => el.name)" :rules="countryRules" :menu-props="{'transition':'slide-y-transition'}" />
			</v-flex>

			<v-flex xs11 sm3 md2>
				<v-autocomplete label="Parameter name" v-model="selectedParameter" clearable prepend-icon="warning" hint="Eg. PM25, PM10, SO2, NO2, O3, CO, BC" hide-selected persistent-hint :items="parameters" :rules="parameterRules" :menu-props="{'transition':'slide-y-transition'}" />
			</v-flex>

			<v-flex xs1>
				<v-btn class="ml-0 mb-3" flat icon :color="'#1976D2'" :disabled="!valid" @click="handleSearch">
					<v-icon large>search</v-icon>
				</v-btn>
			</v-flex>

		</v-layout>
	</v-form>
</template>

<script>
	import axios from 'axios'

	const AIR_QUALITY_API_URL = process.env.VUE_APP_AIR_QUALITY_API_URL
	const MOST_POLLUTED_CITIES_LIMIT = process.env.VUE_APP_MOST_POLLUTED_CITIES_LIMIT
	const MAX_SEARCH_RESULTS_LIMIT = parseInt(process.env.VUE_APP_MAX_SEARCH_RESULTS_LIMIT)

	export default {
		name: 'Search',
		data() {
			return {
				valid: true,
				selectedCountry: '',
				selectedParameter: '',
				countries: [{
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
			handleSearch() {
				if (this.$refs.form.validate()) {
					this.$emit('loading', { loading: true })

					const { code } = this.countries.find(
						item => item.name === this.selectedCountry
					)
					axios
						.get(AIR_QUALITY_API_URL, {
							params: {
								country: code,
								parameter: this.selectedParameter.toLowerCase(),
								order_by: ['measurements[0].lastUpdated', 'measurements[0].value'],
								sort: ['desc', 'desc'],
								limit: MAX_SEARCH_RESULTS_LIMIT
							},
						})
						.then(response => {
							const mostPollutedCities = this.getMostPollutedCities(response.data.results)
							this.$emit('contentLoaded', { content: mostPollutedCities })
						})
						.catch(() => this.$emit('error'))
						.finally(() => this.$emit('loading', { loading: false }))
				}
			},
			getMostPollutedCities(results){
				const mostPollutedCities = []
				for(const result of results){
					const mostPollutedCitiesNames = mostPollutedCities.map(el => el.city)
					if(!mostPollutedCitiesNames.includes(result.city)){
						mostPollutedCities.push(result)
					}
					if(mostPollutedCities.length >= MOST_POLLUTED_CITIES_LIMIT){
						break
					}
				}
				return mostPollutedCities.map(this.mapSearchResults)
			},
			mapSearchResults(item) {
				return {
					place: {
						city: item.city,
						location: item.location,
					},
					measurement: {
						parameter: item.measurements[0].parameter,
						value: item.measurements[0].value,
						unit: item.measurements[0].unit,
						measurementTime: item.measurements[0].lastUpdated,
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>