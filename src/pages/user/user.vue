<template>
	<div class="main">
		<nav-bar :leftArrow='false' />
		<van-cell is-link title="去测试页面" to="/test"></van-cell>
		<tabBar />
	</div>
</template>

<script>
	import tabBar from '@/components/TabBar/TabBar.vue'
	import {
		Toast
	} from "vant";
	import {
		toRefs,
		reactive,
		computed,
		onBeforeMount,
		onMounted
	} from "vue";
	export default {
		name: "User",
		components: {
			tabBar
		},
		setup() {
			const data = reactive({});
			onBeforeMount(() => {

			});
			return {
				...toRefs(data),
			};
		}
	};
</script>
<style lang="scss" scoped>

</style>
