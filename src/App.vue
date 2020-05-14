<template>
	<transition name="fade">
		<router-view></router-view>
	</transition>
</template>

<script>
	// 日期格式化
	Date.prototype.format = function (fmt) {
		let o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if (/(Y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
	export default {
		name: "app"
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
