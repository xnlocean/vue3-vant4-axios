<template>
	<div>
		<van-uploader class="image" :max-count="limit" v-model="fileList" :before-read="beforeRead"
			:after-read="afterRead" :before-delete="deleteUrl" multiple capture="camera" :accept="accept"
			mutiple="mutiple" :deletable="deletable" :preview-size="preview" :disabled="disabled">

			<template v-if="!defaultSlot">
				<div class="uploader">
					<van-icon name="plus" />
					{{ label+defaultSlot }}
				</div>
			</template>

			<template v-if="defaultSlot">
				<slot name="default"></slot>
			</template>
		</van-uploader>
	</div>
</template>

<script>
	import {
		reactive,
		toRefs,
		watchEffect
	} from "vue";
	// import { unploadFile } from "@/api/commonApi.js";
	import {
		Toast
	} from "vant";
	// import { getFilePath } from "@/utils/east.js";
	export default {
		props: {
			limit: {
				type: Number,
				default: 6,
			},
			label: {
				type: String,
				default: "上传图片",
			},
			// 文件类型格式校验
			fileType: {
				type: Array,
				default: () => ["doc", "xls", "ppt", "txt", "pdf"],
			},
			accept: {
				type: String,
				default: "image/*",
			},
			//是否禁用上传
			disabled: {
				type: Boolean,
				default: false,
			},
			//是否展示删除按钮
			deletable: {
				type: Boolean,
				default: true,
			},
			//是否自定义上传区域
			defaultSlot: {
				type: Boolean,
				default: false,
			},
			// 预览区域大小
			preview: {
				type: Array,
				default: ["90px", "90px"],
			},
			modelValue: [String, Object, Array],
		},
		setup(props, {
			emit
		}) {
			const data = reactive({
				showPreview: false,
				fileList: [],
				urlList: []
			});
			watchEffect(() => {
				if (props.modelValue != "" && props.modelValue) {
					data.fileList = [];
					props.modelValue.split(",").map((item) => {
						data.fileList.push({
							url: item,
						});
					});
				}
			});
			// 返回布尔值  校验文件类型是否正确
			const beforeRead = (file) => {
				let fileExtension = "";
				if (file.name.lastIndexOf(".") > -1) {
					fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
				}
				const isTypeOk = props.fileType.some((type) => {
					if (file.type.indexOf(type) > -1) return true;
					if (fileExtension && fileExtension.indexOf(type) > -1) return true;
					return false;
				});

				if (!isTypeOk) {
					Toast(`文件格式不正确, 请上传${props.fileType.join("/")}格式文件!`);
					return false;
				}
				return true;
			};
			const afterRead = (file, index) => {
				Toast.loading({
					message: "上传中...",
					forbidClick: true,
				});
				if (file.length) {
					file.forEach((item, eq) => {
						setTimeout(() => {
							uploadFileServer(item, eq);
						}, 1000);
					});
				} else {
					uploadFileServer(file);
				}
			};
			//上传方法调用服务
			function uploadFileServer(file) {
				let imgFile = new FormData();
				imgFile.append("file", file.file);
				unploadFile(imgFile).then((res) => {
					Toast.clear();
					if (res.code == 200) {
						data.fileList.push({
							url: res.result[0].objectUrl,
						});
						emit("update:modelValue", urlToString(data.fileList));
					} else {
						file.status = "failed";
						file.message = "上传失败";
					}
				});
			}
			//删除文件
			const deleteUrl = (file, index) => {
				data.fileList.splice(index.index, 1);
				emit("update:modelValue", urlToString(data.fileList));
			};
			//处理文件
			const urlToString = (list) => {
				let urlList = [];
				list.map((item) => {
					if (item.url) {
						urlList.push(item.url);
					}
				});
				return urlList.toString();
			};
			//预览文件  此处采用的是京东的 nutui    本项目中未引入需要的话自己实现一下吧
			function haddelPreview() {
				const videosArr = getFilePath(data.fileList);
				let videosList = [];
				videosArr.forEach((videosItem) => {
					videosList.push({
						source: {
							src: videosItem,
							type: "video/mp4",
						},
						options: {
							muted: true,
							controls: true,
							autoplay: true,
						},
					});
				});
				data.videoData = videosList;
				data.showPreview = true;
			}
			return {
				...toRefs(data),
				haddelPreview,
				afterRead,
				deleteUrl,
				beforeRead,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.image {
		:deep(.van-uploader__preview-image) {
			width: 100%;
			height: 100%;
		}

		.uploader {
			width: 90px;
			height: 90px;
			border: 1px solid #eee;
			border-radius: 6px;
			font-size: 12px;
			color: #999999;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			&-image {
				width: 312px;
				height: 200px;
			}
		}
	}
</style>
