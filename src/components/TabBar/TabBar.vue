<template>
	<div>
		<van-tabbar v-model="active" route>
			<van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
			<van-tabbar-item icon="search" to="/user">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import {
		useRoute,
		useRouter
	} from "vue-router";
	import {
		toRefs,
		reactive,
		computed
	} from "vue";
	export default {
		name: "TbaBar",
		props: {},
		setup(props, {
			emit
		}) {
			const data = reactive({
				active: 0,
			});

			const route = useRoute();
			const router = useRouter();

			return {
				...toRefs(data)
			};
		},
	};
</script>
<style lang="scss" scoped>

</style>
