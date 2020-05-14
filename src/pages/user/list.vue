
<template>
	<div class="main">
		<div>这是用来标记</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "list",
		data() {
			return {};
		},
		created() {
			console.log(this.$getUser)
		},
		watch: {},
		mounted() {

		},
		computed: {
			...mapState({
				$getUser: state => state.user,
			})
		},
		methods: {}
	};
</script>
<style lang="scss" scoped>
</style>
