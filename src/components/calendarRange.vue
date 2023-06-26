<template>
	<div class="main">
		<van-popup @close="dateClose" v-model:show="datePopShow" round position="bottom" :style="{ height: '40%' }">
			<div class="datetime">
				<button class="datetime-submit datetime-reset" @click="restDate">重置</button>
				<input readonly v-model="bgDate" :class="[
                'datetime-input',
                packerIndex == 0 ? 'datetime-input-active' : '',
            ]" placeholder="开始时间" @click="handleDateInput(0)" />
				<span class="datetime-line"></span>
				<input readonly v-model="endDate" :class="[
                    'datetime-input',
                    packerIndex == 1 ? 'datetime-input-active' : '',
                ]" placeholder="结束时间" @click="handleDateInput(1)" />
				<button class="datetime-submit" :style="{'background':confirmBtnBgColor}"
					@click="confirmDate">确定</button>
			</div>

			<van-datetime-picker v-if="packerIndex==0" :max-date="dataPack.start.maxDate"
				:min-date="dataPack.start.minDate" :show-toolbar="false" v-model="currentDate" type="year-month"
				@change="datetimeChange" />

			<van-datetime-picker v-if="packerIndex==1" :max-date="dataPack.end.maxDate" :min-date="dataPack.end.minDate"
				:show-toolbar="false" v-model="currentDate" type="year-month" @change="datetimeChange" />
		</van-popup>
	</div>
</template>

<script>
	import {
		Toast
	} from "vant";
	import DateUtils from "@/utils/dateUtils";
	import {
		toRefs,
		reactive,
		computed,
		onMounted,
		ref
	} from "vue";
	export default {
		name: "datetimePicker",
		props: {
			// 组件主题颜色
			theme: {
				type: String,
				default: "#426CF6",
			},
		},
		setup(props, {
			emit
		}) {
			const data = reactive({
				creatTime: "",
				showPopover: false,
				actionsText: "",
				selectActive: 0,
				activeTime: {},
				// 日期
				dataPack: {
					start: {
						minDate: new Date(2010, 1, 1),
						maxDate: new Date(),
					},
					end: {
						minDate: new Date(2010, 1, 1),
						maxDate: new Date(),
					},
				},

				currentDate: new Date(),
				packerIndex: 0,
				bgDate: "",
				endDate: "",
				datePopShow: false,
				confirmBtnBgColor: props.theme,
			});
			const onSelect = (action) => {
				if (action.type === 4) {
					data.datePopShow = true;
					return;
				}
				data.activeTime = action;
			};

			//点击日期输入框
			function handleDateInput(eq) {
				let nowDate = DateUtils.formatDate(new Date(), "yyyy-MM");
				if (eq == 0) {
					data.currentDate = new Date(data.bgDate);
				}
				if (eq == 1) {
					data.currentDate =
						data.endDate == "" ? new Date() : new Date(data.endDate);
					if (data.endDate == "") {
						data.endDate = nowDate;
					}
				}
				data.packerIndex = eq;
			}
			onMounted(() => {
				initData();
			});

			function initData() {
				// Toast.loading({
				//     message: "加载中...",
				//     forbidClick: true,
				//     duration: 0,
				// });
				// 初始化日期选择组件
				let nowDate = DateUtils.formatDate(new Date(), "yyyy-MM");
				let dataObj = {
					start: {
						minDate: new Date(
							nowDate.split("-")[0] - 6,
							nowDate.split("-")[1] - 1,
							1
						),
						maxDate: new Date(
							nowDate.split("-")[0],
							nowDate.split("-")[1] - 1,
							1
						),
					},
					end: {
						minDate: new Date(
							nowDate.split("-")[0] - 5,
							nowDate.split("-")[1] - 1,
							1
						),
						maxDate: new Date(),
					},
				};
				data.dataPack = dataObj;
				data.currentDate = new Date(
					nowDate.split("-")[0],
					nowDate.split("-")[1] - 2,
					1
				);
				data.bgDate = DateUtils.formatDate(
					new Date(nowDate.split("-")[0], nowDate.split("-")[1] - 2, 1),
					"yyyy-MM"
				);
				// 初始化echarts
				// initChart(document.getElementById("chartMian"));
				// 初始化图表数据请求
				//   priceIndexChart();
			}
			//日期选择点击确定
			function confirmDate() {
				if (data.bgDate == "") {
					Toast("请选择开始日期");
					return;
				}
				if (data.endDate == "") {
					Toast("请选择结束日期");
					return;
				}

				let dataArea =
					data.endDate.replace("-", "") * 1 - data.bgDate.replace("-", "") * 1;
				if (data.packerIndex == 1 && dataArea < 0) {
					Toast("结束日期必须大于等于开始日期，请重新选择");
					return;
				}
				let time = 0;
				let bgDateYear = data.bgDate.split("-")[0];
				let bgDateMonth = data.bgDate.split("-")[1];
				let endDateYear = data.endDate.split("-")[0];
				let endDateMonth = data.endDate.split("-")[1];
				if (dataArea === 0) {
					time = `${bgDateYear}-${bgDateMonth}`;
				} else {
					time = `${bgDateYear}-${bgDateMonth}/${endDateYear}-${endDateMonth}`;
				}
				const activeTime = {
					start: `${bgDateYear}-${data.bgDate.split("-")[1]}-01`,
					end: `${endDateYear}-${endDateMonth}-${DateUtils.getMonthDays(
          endDateYear,
          endDateMonth - 1
        )}`,
					time,
				};
				data.activeTime = `${bgDateYear}年${bgDateMonth}月-${endDateYear}年${endDateMonth}月`;
				emit("confirmDate", activeTime);
				data.datePopShow = false;
			}
			const restDate = () => {
				data.bgDate = "";
				data.endDate = "";
				emit("confirmDate", "");
				data.datePopShow = false;
			};

			//选择时间
			function datetimeChange(val) {
				const formatterVal = DateUtils.formatDate(val, "yyyy-MM");
				if (data.packerIndex == 0) {
					data.bgDate = formatterVal;
				} else {
					data.endDate = formatterVal;
				}
			}
			//日期选择关闭
			function dateClose() {
				if (!data.actionsText) {
					data.selectActive = 0;
				} else {
					data.selectActive = 1;
				}
				emit("close");
			}
			return {
				...toRefs(data),
				onSelect,
				dateClose,
				handleDateInput,
				confirmDate,
				datetimeChange,
				restDate,
			};
		},
	};
</script>


<style lang="scss" scoped>
	.datetime {
		padding: 30px;
		display: flex;
		align-items: center;
		justify-content: space-around;

		&-input {
			width: 170px;
			height: 70px;
			border: 1px solid #dddddd;
			border-radius: 10px;
			padding: 0 30px;
			box-sizing: border-box;
			font-size: 24px;
		}

		&-input-active {
			border: 1px solid rgb(160, 159, 159, 0.8);
		}

		&-line {
			width: 14px;
			height: 2px;
			background-color: #bbbbbb;
		}

		&-submit {
			width: 110px;
			height: 70px;

			border-radius: 10px;
			font-size: 26px;
			color: #fefefe;
			line-height: 40px;
			text-align: center;
			border: none;
		}

		&-reset {
			background: #dddddd;
			color: #222222;
			padding: 0;
			width: 90px;
		}
	}
</style>
