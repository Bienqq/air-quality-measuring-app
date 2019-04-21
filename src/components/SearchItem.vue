<template>
	<v-flex xs5 md3 class="pa-3">

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
        show: false,
      }
    },
	}
</script>

<style lang="scss" scoped>
</style>