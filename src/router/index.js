import Vue from 'vue'
import Router from 'vue-router'
import GalleryFeed from '../pages/GalleryFeed'
import GalleryPost from '../pages/GalleryPost'
import GalleryContact from '../pages/GalleryContact'
import GalleryAbout from '../pages/GalleryAbout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
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
      component: GalleryPost
    },
    {
      path: '/about',
      name: 'about',
      component: GalleryAbout
    },
    {
      path: '/contact',
      name: 'contact',
      component: GalleryContact
    }
  ]
})
