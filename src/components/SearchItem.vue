<template>
	<v-flex xs12 offset-md1 md10 class="mb-3">

		<v-card>

			<v-expansion-panel inset focusable expand v-model="showPanels">

				<v-expansion-panel-content >
					<template v-slot:header>
						<h1 class="title">{{ place.city}} |||| {{  place.location }}</h1>
				
					</template>
			
					<v-card>
						
						<v-card-text>
							<h2 class="subheading">Pollution informations: </h2>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

						</v-card-text>
					</v-card>
				</v-expansion-panel-content>

				<v-expansion-panel-content lazy>
					<template v-slot:header>
						<h1 class="title">Description</h1>
					</template>
					<v-card>
						<v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
					</v-card>
				</v-expansion-panel-content>

			</v-expansion-panel>

		</v-card>

	</v-flex>
</template>

<script>
	export default {
		name: 'SearchItem',
		props: {
			place: Object,
			measurement: Object
		},
		data() {
			return {
				showPanels: [true, false],
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>