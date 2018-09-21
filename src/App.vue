<template>
  <div id="app" class="gallery">
    <gallery-nav/>
    <section class="main">
      <transition name="wipe-to">
        <router-view class="page"/>
      </transition>
    </section>
    <gallery-footer/>
  </div>
</template>

<script>
  import GalleryNav from './components/GalleryNav'
  import GalleryFooter from './components/GalleryFooter'

  export default {
    name: 'app',
    components: {
      GalleryNav, GalleryFooter
    },
    resource: 'Gallery',
    metaInfo: {
      title: 'Unknown',
      titleTemplate: '%s | Ben Horvat Photography'
    },
    beforeMount () {
      this.$getResource('gallery').then(gallery => { this.$store.commit('meta', gallery) })
      this.$getResource('sorts').then(sorts => { this.$store.commit('sorts', sorts) })
    }
  }
</script>

<style lang="scss">
  @import './sass/main';
</style>
