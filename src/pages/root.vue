<template>
	<div></div>
</template>
<script>
	export default {
		created() {
			// 空白页，判断cookie是否存在

			const token = this.$util.getCookie('token');
			if (token) {
				this.$router.push({ name: 'vmain' })
			} else {
				this.$router.push({ name: 'login' })
			}
		}
	};
</script>