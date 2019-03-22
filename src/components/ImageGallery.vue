<template>
  <div class="image-gallery" tabindex="0" @keyup.left="pageLeft" @keyup.right="pageRight">
    <lightbox
      ref="lightbox"
      :refElem="this.$refs.image ? this.$refs.image[active].$refs.main : null"
      :images="images"
      :active="active"
      v-on:open="lightbox = true"
      v-on:close="lightbox = false"
      v-on:page-left="pageLeft"
      v-on:page-right="pageRight"
    />
    <div class="main-container" ref="mainimg">
      <div class="images" id="images" :style="sliderStyle" :class="sliderClass">
        <div class="big-image" v-for="(item, index) in this.images" v-bind:key="item.id">
          <progressive-image ref="image" :src="images[index].url"/>
        </div>
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
    <div class="thumb-container columns is-multiline is-mobile is-variable is-1">
      <div
        v-for="(item, index) in this.images"
        :key="item.id"
        class="thumb-col column is-2"
        @click="activate(index)"
      >
        <progressive-background class="thumb" :class="thumbClass(index)" :src="images[index].url"/>
      </div>
    </div>
  </div>
</template>

<script>
import Lightbox from './Lightbox.vue'
import ProgressiveImage from './ProgressiveImage.vue'
import ProgressiveBackground from './ProgressiveBackground'
import Swipable from './mixins/Swipable'
import IconBase from '../components/icons/IconBase'
import IconLeft from '../components/icons/IconLeft'
import IconRight from '../components/icons/IconRight'
import IconFullscreen from '../components/icons/IconFullscreen'

export default {
  name: 'image-gallery',
  mixins: [Swipable],
  components: { Lightbox, ProgressiveImage, ProgressiveBackground, IconBase, IconLeft, IconRight, IconFullscreen },
  props: {
    images: [Array, Object],
    aspectRatio: Number
  },

  data() {
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
    offset() {
      return (this.active * this.width.elem + this.dragOffsetX) * -1
    },

    sliderStyle() {
      return {
        transform: 'translateX(' + this.offset + 'px)'
      }
    },
    sliderClass() {
      return {
        'hide': this.lightbox,
        'transition-off': this.dragging
      }
    }
  },

  methods: {
    activate(index) {
      this.active = index
    },
    pageLeft() {
      if (this.active === 0) {
        if (!this.dragging) this.active = this.images.length - 1
      } else {
        this.active--
      }
    },
    pageRight() {
      if (this.active === this.images.length - 1) {
        if (!this.dragging) this.active = 0
      } else {
        this.active++
      }
    },
    updateWidth() {
      this.width.elem = this.$refs.mainimg.clientWidth
      this.width.window = window.innerWidth
    },
    thumbClass(index) {
      return {
        active: index === this.active
      }
    },

    swipeLeft() {
      this.pageLeft()
    },
    swipeRight() {
      this.pageRight()
    },
    swipeTap() {
      this.$refs.lightbox.open()
    }
  },

  watch: {
    images: function () {
      this.updateWidth()
    }
  },

  mounted() {
    this.updateWidth()

    this.bindSwipe(this.$refs.mainimg)

    this.$nextTick(function () {
      window.addEventListener('resize', this.updateWidth)
      window.addEventListener('deviceorientation', this.updateWidth)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth)
    window.removeEventListener('deviceorientation', this.updateWidth)
  }
}
</script>
