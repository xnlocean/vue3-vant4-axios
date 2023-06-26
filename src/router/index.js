import {
	createRouter,
	createWebHashHistory
} from 'vue-router';

const routerContext =
	import.meta.globEager("./*.js");

const routes = [{
	path: '/',
	name: 'home',
	meta: {
		auth: false,
		title: '主页',
		keepAlive: false
	},
	component: () => import('/src/pages/home/home.vue')
}, {
	path: '/user',
	name: 'user',
	meta: {
		auth: false,
		title: '我的',
		keepAlive: false
	},
	component: () => import('/src/pages/user/user.vue')
}, {
	path: '/:pathMatch(.*)*',
	redirect: '/'
}];
Object.values(routerContext).forEach(itemPath => {
	if (['./index.js'].includes(itemPath)) {
		return
	}
	routes.push(...itemPath.default)
})

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition && to.meta.keepAlive) {
			return savedPosition
		} else {
			return {
				top: 0
			}
		}
	},
});

export default router;
