<template>
	<div>
		<van-nav-bar :title="pageTitle" :leftText="leftText" :rightText="rightText" :leftArrow="leftArrow"
			:border="border" :fixed="fixed" :placeholder="placeholder" :safeAreaInsetTop="safeAreaInsetTop"
			:zIndex="zIndex" @click-left="onClickLeft" @click-right="onClickRight">
			<template v-if='leftSlot' #left>
				<slot name="left"></slot>
			</template>
			<template v-if='titleSlot' #title>
				<slot name="title"></slot>
			</template>
			<template v-if='rightSlot' #right>
				<slot name="right"></slot>
			</template>
		</van-nav-bar>
	</div>
</template>

<script>
	import {
		Toast,
		Dialog
	} from "vant";
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
		name: "navBar",
		props: {
			title: {
				type: String,
				default: "",
			},
			// 左侧文案
			leftText: {
				type: String,
				default: "",
			},
			// 右侧文案
			rightText: {
				type: String,
				default: "",
			},

			// 是否显示左侧箭头
			leftArrow: {
				type: Boolean,
				default: true,
			},
			// 是否显示下边框
			border: {
				type: Boolean,
				default: true,
			},

			// 是否固定在顶部
			fixed: {
				type: Boolean,
				default: true,
			},

			// 固定在顶部时，是否在标签位置生成一个等高的占位元素
			placeholder: {
				type: Boolean,
				default: true,
			},

			// 导航栏 z-index
			zIndex: {
				type: [String, Number],
				default: 1,
			},

			//是否开启顶部安全区适配
			safeAreaInsetTop: {
				type: Boolean,
				default: false,
			},
			//是否自定义左边插槽
			leftSlot: {
				type: Boolean,
				default: false,
			},

			//是否自定义title插槽
			titleSlot: {
				type: Boolean,
				default: false,
			},

			//是否自定义右边边插槽
			rightSlot: {
				type: Boolean,
				default: false,
			},

			//点击返回是否提示用户确认离开当前页面 false不提醒
			leavePage: {
				type: Boolean,
				default: false,
			},
		},
		setup(props, {
			emit
		}) {
			const data = reactive({

			});
			console.log(props)
			const route = useRoute();
			const router = useRouter();
			const pageTitle = computed(() => {
				return data.pageTitle = props.title ? props.title : route.meta.title;
			})

			// 点击返回
			function onClickLeft() {
				emit("clickLeft");
				if (props.leavePage) {
					Dialog.confirm({
							title: "提示",
							message: "检测到您填写的数据未提交，确认离开吗？",
							confirmButtonColor: "#15bb5b",
						})
						.then(() => {
							router.go(-1);
						})
						.catch(() => {});
					return;
				}
				router.go(-1);
			}

			// 点击右侧
			function onClickRight() {
				emit("clickRight");
			}
			return {
				...toRefs(data),
				onClickLeft,
				onClickRight,
				pageTitle
			};
		},
	};
</script>
<style lang="scss" scoped>
	:deep(.van-nav-bar .van-icon) {
		color: #000;
	}

	:deep(.van-nav-bar__title) {
		font-size: 17px;
		color: #222;
	}
	
	.bar-box :deep(.van-nav-bar__content) {
		background: #2B6BFE;
	}
</style>
