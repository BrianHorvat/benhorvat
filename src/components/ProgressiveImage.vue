<template>
  <div class="progressive-image">
    <transition name="progressive-image-fade">
      <img v-show="loaded" :src="src" ref="main">
    </transition>
    <svg v-if="!loaded" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  </div>
</template>

<script>
import ProgressiveImageLoader from './mixins/ProgressiveImageLoader.js'

export default {
  name: 'progressive-image',

  mixins: [ProgressiveImageLoader],
}
</script>
