export default [{
	path: '/test',
	name: 'test',
	meta: {
		auth: true,
		title: '测试页面',
		keepAlive: true
	},
	component: () => import( /* webpackChunkName: "priceIndex" */ '@/pages/test.vue')
}]
