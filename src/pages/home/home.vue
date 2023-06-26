<template>
	<div>
		<nav-bar :leftArrow='false' />
		<van-cell is-link title="已按需引入vant3 UI组件库">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="已引入flex布局公共样式封装">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="支持rem适配,375和750设计稿">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="支持多环境(开发测试生产环境)">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="已完成axios封装">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="已完成API请求统一管理">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="已实现keep-alive列表状态缓存">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="开发环境自动引入vconsole调试器">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="已实现路由自动注册">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="已实现vuex状态管理模块化">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="顶部导航栏二次封装">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<van-cell is-link title="文件上传组件二次封装">
			<van-icon name="checked" color="#07c160" size="20" />
		</van-cell>
		<tabBar />
	</div>
</template>
<script>
	import tabBar from '@/components/TabBar/TabBar.vue'
	import { showToast } from 'vant';
	import {
		ref
	} from "vue";
	export default {
		name: "Home",
		components: {
			tabBar
		},
		setup() {
			showToast("哈喽，你好！")
			return {

			};
		},
	};
</script>
<style lang="scss" scoped>
	.test {
		color: $main-color;
	}

	div {
		font-size: 12px;
	}
</style>


