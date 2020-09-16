import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: home" */ '@/components/HelloWorld.vue')
    },
    {
      path: '/foo',
      name: 'Foo',
      component: () => import(/* webpackChunkName: foo" */ '@/components/Foo.vue')
    },
    {
      path: '/bar',
      name: 'Bar',
      component: () => import(/* webpackChunkName: bar" */ '@/components/Bar.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach: ', to, from, next)
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach: ', to, from)
})

export default router