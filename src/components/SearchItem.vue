<template>
		<v-flex xs1 class="animated fadeIn">
			<h5>{{ city }}</h5>
			<h6>{{ measurement }}</h6>
		</v-flex>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    city: String,
    measurement: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
