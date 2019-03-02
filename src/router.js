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
      component: GalleryFeed,
      meta: {
        depth: 0
      }
    },
    {
      path: '/sort/:category',
      name: 'category',
      props: true,
      component: GalleryFeed,
      meta: {
        depth: 1
      }
    },
    {
      path: '/gallery/:post',
      name: 'post',
      component: () => import('./pages/GalleryPost'),
      meta: {
        depth: 1.1
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./pages/GalleryAbout'),
      meta: {
        depth: 2
      }
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('./pages/GalleryProcess'),
      meta: {
        depth: 2.1
      }
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: () => import('./pages/GalleryTestimonials'),
      meta: {
        depth: 2.2
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./pages/GalleryContact'),
      meta: {
        depth: 3
      }
    },
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