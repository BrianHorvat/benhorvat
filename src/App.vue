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
  beforeMount() {
    this.$store.dispatch('gallery/getMeta')
    this.$store.dispatch('gallery/getSorts')
  }
}
</script>

<style lang="scss">
@import "./assets/sass/main.scss";
</style>
