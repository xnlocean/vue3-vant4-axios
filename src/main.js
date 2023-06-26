import {
	createApp
} from 'vue'

import App from './App.vue'
import Router from './router/index';
import 'amfe-flexible';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
// Toast，Dialog，Notify ，ImagePreview ，在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式
import { Locale } from 'vant';
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';
Locale.use('en-US', enUS);

import VConsole from 'vconsole';
import NavBar from '@/components/NavBar/NavBar.vue'
if (
	import.meta.env.MODE === 'development') {
	new VConsole()
}


const app = createApp(App);
app.use(Router).mount('#app')
app.component('NavBar', NavBar); //顶部导航栏
