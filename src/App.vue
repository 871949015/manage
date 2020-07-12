<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

	export default {
		name: 'App',

		components: {

		},

		data: () => ({
			//
		}),
	};
</script>
<style lang="scss">
	@import "../src/assets/css/base";

	.app-box {
		width: 100%;
		height: 100%;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.3s;
		position: relative;
		top: 0;
	}

	.fade-enter-active {
		transition-delay: 0.3s;
	}

	.fade-enter {
		opacity: 0;
		top: 10px;
	}

	.fade-leave-to {
		opacity: 0;
		top: -10px;
	}

	.fade-absolute-enter-active,
	.fade-absolute-leave-active {
		transition: all 0.3s;
		position: absolute;
		top: 10px;
	}

	.fade-absolute-enter-active {
		transition-delay: 0.3s;
	}

	.fade-absolute-enter {
		opacity: 0;
		top: 10px;
	}

	.fade-absolute-leave-to {
		opacity: 0;
		top: -10px;
	}
</style>
