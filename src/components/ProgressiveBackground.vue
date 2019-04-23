<template>
  <div class="progressive-background" :class="imageClass">
    <transition name="progressive-image-fade">
      <img v-show="loaded" :src="src" ref="main">
    </transition>
  </div>
</template>

<script>
import ProgressiveImageLoader from './mixins/ProgressiveImageLoader.js'

export default {
  name: 'progressive-background',

  mixins: [ProgressiveImageLoader],

  computed: {
    imageClass() {
      return {
        loading: !this.loaded
      }
    },
    imageStyle() {
      return {
        backgroundImage: this.image ? 'url(' + this.image + ')' : ''
      }
    }
  },
}
</script>
