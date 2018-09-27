<template>
  <div id="app" class="gallery">
    <gallery-header/>
    <section class="main">
      <transition name="wipe-to">
        <router-view class="page"/>
      </transition>
    </section>
    <gallery-footer/>
  </div>
</template>

<script>
  import GalleryHeader from './components/GalleryHeader'
  import GalleryFooter from './components/GalleryFooter'

  export default {
    name: 'app',
    components: {
      GalleryHeader, GalleryFooter
    },
    resource: 'Gallery',
    metaInfo: {
      title: 'Unknown',
      titleTemplate: '%s | Benjamin Horvat Photography'
    },
    beforeMount () {
      this.$getResource('gallery').then(gallery => { this.$store.commit('meta', gallery) })
      this.$getResource('sorts').then(sorts => { this.$store.commit('sorts', sorts) })
    }
  }
</script>

<style lang="scss">
  @import './assets/sass/main.scss';
</style>
