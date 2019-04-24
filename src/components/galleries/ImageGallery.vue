<template>
  <div class="image-gallery" tabindex="0" @keyup.left="pageLeft" @keyup.right="pageRight">
    <lightbox
      ref="lightbox"
      :refElem="this.$refs.image ? this.$refs.image[1].$refs.main : null"
      :images="images"
      :activeImage="activeImage"
      v-on:lightbox-open="showLightbox = true"
      v-on:lightbox-close="showLightbox = false"
      v-on:lightbox-page-left="updateActiveToLeft"
      v-on:lightbox-page-right="updateActiveToRight"
    />
    <div class="main-container" ref="container" :style="containerHeight">
      <div class="images" ref="imagebox" :style="sliderStyle" :class="sliderClass">
        <div
          class="big-image"
          v-for="(image, index) in this.visibleImages"
          :key="image.id"
          :style="imageStyle(index)"
        >
          <progressive-image ref="image" :src="image.url"/>
        </div>
      </div>

      <div
        id="fullscreen"
        @click.stop="swipeTap"
        @mousedown.stop
        class="action-button is-hidden-mobile"
      >
        <icon-base icon-name="Expand Images">
          <icon-fullscreen/>
        </icon-base>
      </div>

      <div id="left" @click.stop="pageLeft" @mousedown.stop class="action-button is-hidden-mobile">
        <icon-base icon-name="Previous Image">
          <icon-left/>
        </icon-base>
      </div>

      <div
        id="right"
        @click.stop="pageRight"
        @mousedown.stop
        class="action-button is-hidden-mobile"
      >
        <icon-base icon-name="Next Image">
          <icon-right/>
        </icon-base>
      </div>

      <div class="bg"></div>
    </div>
    <div class="thumb-container">
      <progressive-background
        v-for="(image, index) in this.images"
        :key="image.id"
        @click.native="updateActiveToIndex(index)"
        :src="image.url"
        :class="thumbClass(index)"
        class="thumb"
      />
    </div>
  </div>
</template>

<script>
import Lightbox from './Lightbox'
import ProgressiveImage from '@/components/ProgressiveImage'
import ProgressiveBackground from '@/components/ProgressiveBackground'
import Swipable from '@/components/mixins/Swipable'
import IconBase from '@/components/icons/IconBase'
import IconLeft from '@/components/icons/IconLeft'
import IconRight from '@/components/icons/IconRight'
import IconFullscreen from '@/components/icons/IconFullscreen'

import GalleryMixin from './GalleryMixin'

import { states, animTypes, durations, easing, matrixToString } from './GalleryHelpers.js'

export default {
  name: 'image-gallery',
  mixins: [Swipable, GalleryMixin],
  components: { Lightbox, ProgressiveImage, ProgressiveBackground, IconBase, IconLeft, IconRight, IconFullscreen },
  props: {
    images: {
      type: Array,
      required: true
    },
    aspectRatio: {
      type: Number,
      default: 5 / 4,
    },
  },

  data() {
    return {
      activeImage: 0,
      clientWidth: 0,
      resizing: false,
      showLightbox: false,
    }
  },

  computed: {
    offset() {
      return this.forcedOffset - this.$data.$_swipable_dragOffsetX
    },

    sliderStyle() {
      return {
        transform: `translateX(${this.offset}px)`,
      }
    },
    sliderClass() {
      return {
        'draggable': this.$data.$_swipable_draggable,
        'dragging': this.$data.$_swipable_dragging,
        'hide': this.showLightbox,
      }
    },

    containerHeight() {
      return {
        height: `${this.clientWidth * (1 / this.aspectRatio)}px`
      }
    },

    visibleImages() {
      return [
        this.images[this.activeImage - 1 === -1 ? this.images.length - 1 : this.activeImage - 1],
        this.images[this.activeImage],
        this.images[this.activeImage + 1 === this.images.length ? 0 : this.activeImage + 1],
      ]
    },
  },

  methods: {
    updateActiveToIndex(index) {
      this.activeImage = index
    },
    updateActiveToLeft() {
      if (this.activeImage === 0) {
        this.activeImage = this.images.length - 1
      } else {
        this.activeImage--
      }
    },
    updateActiveToRight() {
      if (this.activeImage === this.images.length - 1) {
        this.activeImage = 0
      } else {
        this.activeImage++
      }
    },
    swipeTapHandler() {
      this.$refs.lightbox.open()
    },

    updateWidth() {
      this.resizing = true
      this.clientWidth = this.$refs.container.getBoundingClientRect().width
      this.resizing = false
    },
    thumbClass(index) {
      return {
        active: index === this.activeImage
      }
    },

  },

  watch: {
    images: function () {
      this.updateWidth()
    }
  },

  mounted() {
    this.updateWidth()

    this.$_swipable_bindSwipe(this.$refs.imagebox)

    this.$nextTick(function () {
      window.addEventListener('resize', this.updateWidth)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth)
  },
}
</script>
