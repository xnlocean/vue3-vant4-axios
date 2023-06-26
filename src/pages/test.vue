<template>
	<div class="box">
		<nav-bar />
		<div class="item">
			<van-cell title="只支持上传jpg/png格式的文件" />
			<upload-image :fileType="['jpg','png']" />
		</div>
		<div class="item">
			<van-cell title="只支持上传word/txt格式的文件" />
			<upload-image :fileType="['word','txt']" />
		</div>

		<div class="item">
			<van-cell title="自定义上传区域" />
			<upload-image :fileType="['jpg','png']" :defaultSlot="true" :limit='1'>
				<van-button icon="plus" type="primary">上传文件</van-button>
			</upload-image>
		</div>

		<div class="item">
			<van-cell title="自定义预览区域大小区域" />
			<upload-image :fileType="['png','jpg']" :defaultSlot="true" :preview="['200px','100px']">
				<van-button icon="plus" type="primary">上传文件</van-button>
			</upload-image>
		</div>


		<div class="item">
			<van-cell title="日期范围筛选组件" />
			 <van-field readonly v-model="selectDate"  placeholder="请选择时间" @click="clickCalendar" />
			<calendar-range ref="calendarRangeRef" @close="datetimeShow = false" @confirmDate="confirmDate" />
		</div>
		
		<div class="jshdj">日期范围筛选组件</div>
	</div>
</template>


<script>
	import uploadImage from '@/components/uploadImage/index.vue'
	import calendarRange from '@/components/calendarRange.vue'
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
		name: "Test",
		components: {
			uploadImage,
			calendarRange
		},
		setup() {
			const data = reactive({
				calendarRangeRef: null,
				datetimeShow: true, //是否显示日期范围筛选组件
				selectDate: ''
			});
			onBeforeMount(() => {

			});
			//日期范围筛选组件确认时间选择
			const confirmDate = (date) => {
				console.log("日期范围筛选组件确认时间选择:", date);
			};
			//点击选择时间
			const clickCalendar = () => {
				data.datetimeShow = true;
				data.calendarRangeRef.datePopShow = true;
			};
			return {
				...toRefs(data),
				confirmDate,
				clickCalendar
			};
		}
	};
</script>
<style lang="scss" scoped>
	.van-cell {
		padding: 0;
	}

	.item {
		margin-bottom: 30px;
	}

	.box {
		padding: 10px 10px;
	}
	.jshdj{
		font-size: 28px;
	}
</style>
