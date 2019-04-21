<template>
	<v-app id="app">
		<router-view />
	</v-app>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

	}

	body {
		margin: 0;
		padding: 0;
		font-family: "Roboto", sans-serif;
	}

	#app {
background-image: linear-gradient(to bottom, #ffffff, #f8f8f8, #f1f1f1, #eaeaea, #e3e3e3);
	}
</style>