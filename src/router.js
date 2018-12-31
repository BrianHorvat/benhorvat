import Vue from 'vue'
import Router from 'vue-router'
import GalleryFeed from './pages/GalleryFeed'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
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
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: () => import('./pages/GalleryTestimonials')
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('./pages/GalleryProcess')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})