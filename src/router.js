import Vue from 'vue'
import Router from 'vue-router'
import GalleryFeed from './pages/GalleryFeed'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: GalleryFeed
    },
    {
      path: '/sort/:category',
      name: 'category',
      props: true,
      component: GalleryFeed
    },
    {
      path: '/gallery/:post',
      name: 'post',
      props: true,
      component: () => import('./pages/GalleryPost')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./pages/GalleryAbout')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./pages/GalleryContact')
    }
  ]
})
