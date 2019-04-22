<template>
	<v-flex xs12 md10 lg7 class="mb-3" >
		<v-card >
			<v-expansion-panel inset focusable expand v-model="showPanels">

				<v-expansion-panel-content >
					<template v-slot:header>
						<h1 class="headline ">{{ place.city.split("/")[0]}}</h1>
					</template>

					<v-card >
						<v-layout row wrap>
							<v-flex xs12 sm5>
								<v-card-text>
									<h2 class="subheading mb-3 font-weight-bold">Pollution informations: </h2>
									<p><b>Location ID:</b> {{ place.location }} </p>
									<p><b>Parameter:</b> {{ measurement.parameter }} </p>
									<p><b>Value:</b> {{ measurement.value}} {{ measurement.unit}}</p>
									<p><b>Measurement time:</b> {{ measurement.measurementTime}}</p>
								</v-card-text>
							</v-flex>

							<v-flex xs12 sm7 md5>
								<v-img class="ma-3" :src="thumbnail" contain aspect-ratio="1.4"></v-img>
							</v-flex>

						</v-layout>
					</v-card>
				</v-expansion-panel-content>

				<v-expansion-panel-content lazy>
					<template v-slot:header>
						<h1 class="title">Description</h1>
					</template>
					<v-card>
						<v-card-text>{{ description }}</v-card-text>
					</v-card>
				</v-expansion-panel-content>

			</v-expansion-panel>
		</v-card>
	</v-flex>
</template>

<script>
	import axios from 'axios'
	import latinize from 'latinize'
	
	const WIKIPEDIA_API_URL = process.env.VUE_APP_WIKIPEDIA_API_URL

	export default {
		name: 'SearchItem',
		props: {
			place: Object,
			measurement: Object
		},
		data() {
			return {
				showPanels: [true, false],
				thumbnail: '',
				description: '',
			}
		},
		created() {
			const latinName = this.place.city.split('/')[0]
			const url = encodeURI(`${WIKIPEDIA_API_URL}${latinName}`)  
			axios
			.get(url)
			.then(response => {
				const {thumbnail, extract} = response.data
				this.description = extract
				if(thumbnail){
					this.thumbnail = thumbnail.source
				}else{
					this.thumbnail = require('@/assets/images/city.jpg')
				}
			})
			.catch(error => {
				console.log(url)
			})
		},
	}
</script>

<style lang="scss" scoped>
</style>