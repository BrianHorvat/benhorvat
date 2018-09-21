<template>
  <div class="image-gallery" tabindex="0" @keyup.left="pageLeft" @keyup.right="pageRight">
    <lightbox ref="lightbox" :refElem="this.$refs.image ? this.$refs.image[active].$refs.main : null" :images="images"
              :active="active" :width="width"
              v-on:open="lightbox = true" v-on:close="lightbox = false" v-on:pageLeft="pageLeft"
              v-on:pageRight="pageRight"/>
    <div class="main-container" ref="mainimg">
      <div class="images" id="images" :style="sliderStyle" :class="sliderClass">
        <div class="big-image" v-for="(item, index) in this.images" v-bind:key="item.id">
          <progressive-image ref="image" :src="images[index].image.url"/>
        </div>
      </div>
      <div class="controls" :class="sliderClass">
        <svg class="is-hidden-mobile" id="left" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click.stop="pageLeft" @mousedown.stop>
          <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
        </svg>
        <svg class="is-hidden-mobile" id="right" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click.stop="pageRight" @mousedown.stop>
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
        </svg>
      </div>
      <div class="bg"></div>
    </div>
    <div class="thumb-container columns is-multiline is-mobile is-variable is-1">
      <div v-for="(item, index) in this.images" :key="item.id" class="thumb-col column is-2" @click="activate(index)">
        <progressive-background class="thumb" :class="thumbClass(index)"
                                :src="images[index].image.url"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Lightbox from './Lightbox.vue'
  import ProgressiveImage from './ProgressiveImage.vue'
  import ProgressiveBackground from './ProgressiveBackground'
  import Swipable from './mixins/Swipable'

  export default {
    name: 'image-gallery',
    mixins: [Swipable],
    components: {Lightbox, ProgressiveImage, ProgressiveBackground},
    props: {
      images: [Array, Object],
      aspectRatio: Number
    },

    data () {
      return {
        active: 0,
        lightbox: false,
        width: {
          elem: 0,
          window: 0
        }
      }
    },

    computed: {
      offset () {
        return (this.active * this.width.elem + this.dragOffsetX) * -1
      },

      sliderStyle () {
        return {
          transform: 'translateX(' + this.offset + 'px)'
        }
      },
      sliderClass () {
        return {
          'hide': this.lightbox,
          'transition-off': this.dragging
        }
      }
    },

    methods: {
      activate (index) {
        this.active = index
      },
      pageLeft () {
        if (this.active === 0) {
          if (!this.dragging) this.active = this.images.length - 1
        } else {
          this.active--
        }
      },
      pageRight () {
        if (this.active === this.images.length - 1) {
          if (!this.dragging) this.active = 0
        } else {
          this.active++
        }
      },
      updateWidth () {
        this.width.elem = this.$refs.mainimg.clientWidth
        this.width.window = window.innerWidth
      },
      thumbClass (index) {
        return {
          active: index === this.active
        }
      },

      swipeLeft () {
        this.pageLeft()
      },
      swipeRight () {
        this.pageRight()
      },
      swipeTap () {
        this.$refs.lightbox.open()
      }
    },

    watch: {
      images: function () {
        this.updateWidth()
      }
    },

    mounted () {
      this.updateWidth()

      this.bindSwipe(this.$refs.mainimg)

      this.$nextTick(function () {
        window.addEventListener('resize', this.updateWidth)
        window.addEventListener('deviceorientation', this.updateWidth)
      })
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.updateWidth)
      window.removeEventListener('deviceorientation', this.updateWidth)
    }
  }
</script>
