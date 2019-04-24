<template>
  <div
    class="lightbox-container"
    tabindex="0"
    @keyup.esc.stop="closeOnEsc"
    @keyup.left.stop="pageLeft"
    @keyup.right.stop="pageRight"
    :style="containerStyle"
    :class="containerClass"
    ref="container"
  >
    <div class="lightbox-backdrop" ref="backdrop"></div>
    <div class="lightbox" ref="dialog">
      <div class="light-images" ref="imagebox" :style="sliderStyle" :class="sliderClass">
        <div
          class="light-image"
          v-for="(image, index) in this.visibleImages"
          :key="image.id"
          :style="imageStyle(index)"
        >
          <!-- <img :src="image.url" ref="image"> -->
          <progressive-image ref="image" :src="image.url"/>
        </div>
      </div>
    </div>
    <div class="lightbox-controls">
      <div id="close" @click.stop="close" class="action-button">
        <icon-base icon-name="Close">
          <icon-back/>
        </icon-base>
      </div>
      <div id="left" @click.stop="pageLeft" class="action-button is-hidden-mobile">
        <icon-base icon-name="Previous Image">
          <icon-left/>
        </icon-base>
      </div>
      <div id="right" @click.stop="pageRight" class="action-button is-hidden-mobile">
        <icon-base icon-name="Next Image">
          <icon-right/>
        </icon-base>
      </div>
      <span id="counter">{{ counterText }}</span>
    </div>
  </div>
</template>

<script>
import ProgressiveImage from '@/components/ProgressiveImage'
import Swipable from '@/components/mixins/Swipable'
import IconBase from '@/components/icons/IconBase'
import IconLeft from '@/components/icons/IconLeft'
import IconRight from '@/components/icons/IconRight'
import IconBack from '@/components/icons/IconBack'


import { states, animTypes, durations, easing, matrixToString } from './GalleryHelpers.js'

import GalleryMixin from './GalleryMixin'

export default {
  name: 'lightbox',
  mixins: [Swipable, GalleryMixin],
  components: { ProgressiveImage, IconBase, IconLeft, IconRight, IconBack, },
  props: {
    escToClose: {
      type: Boolean,
      default: true
    },
    refElem: null,
    images: {
      type: Array,
      required: true,
    },
    activeImage: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      show: false,
      clientWidth: 0,
      resizing: false,

      $_swipable_cancelTouchdown: true,
      $_swipable_cancelTouchup: true,
      $_swipable_cancelTouchmove: true,
    }
  },
  computed: {
    counterText() {
      return `${this.activeImage + 1} of ${this.images.length}`
    },

    containerStyle() {
      return {
        visibility: this.show ? 'visible' : 'hidden'
      }
    },
    containerClass() {
      return {
        active: this.show && this.state !== states.LEAVE
      }
    },
    sliderStyle() {
      return {
        transform: `translateX(${this.offset}px)`,
      }
    },
    sliderClass() {
      return {
        'draggable': this.$data.$_swipable_draggable,
        'dragging': this.$data.$_swipable_dragging
      }
    },
  },

  methods: {
    updateActiveToLeft() {
      this.$emit('lightbox-page-left')
    },
    updateActiveToRight() {
      this.$emit('lightbox-page-right')
    },
    swipeTapHandler() {
      this.close()
    },

    async enter() {
      this.updateWidth()
      this.$data.$_swipable_draggable = false

      this.state = states.ENTER

      const enterAnim = this.$refs.image[1].$refs.main.animate(
        [
          { // From
            transform: this.calculateDialogPos(this.refElem)
          },
          { // To
            transform: 'none'
          }
        ],
        {
          duration: durations.enter,
          fill: 'both',
          easing
        }
      )
      enterAnim.onfinish = () => {
        enterAnim.cancel()
        this.state = states.IDLE

        this.$data.$_swipable_draggable = true
      }

      this.$refs.container.classList.add('active')

      await this.$nextTick

      this.$refs.container.focus()
    },
    leave() {
      this.$data.$_swipable_draggable = false

      this.state = states.LEAVE

      const leaveAnim = this.$refs.image[1].$refs.main.animate(
        [
          { // From
            transform: 'none'
          },
          { // To
            transform: this.calculateDialogPos(this.refElem)
          }
        ],
        {
          duration: durations.exit,
          fill: 'both',
          easing
        }
      )
      leaveAnim.onfinish = () => {
        leaveAnim.cancel()
        this.state = states.IDLE

        this.$data.$_swipable_draggable = true
      }
    },
    calculateDialogPos(ref) {
      if (ref) {
        const originRect = ref.getBoundingClientRect()
        const destRect = this.$refs.image[1].$refs.main.getBoundingClientRect()

        const widthInScale = (originRect.width / (destRect.width ? destRect.width : 1))
        const heightInScale = (originRect.height / (destRect.height ? destRect.height : 1))

        const distanceTop = (originRect.top + (originRect.height / 2)) - (destRect.top + (destRect.height / 2))
        const distanceLeft = (originRect.left + (originRect.width / 2)) - (destRect.left + (destRect.width / 2))

        return `translate(${distanceLeft}px, ${distanceTop}px) scale(${widthInScale}, ${heightInScale})`
      } else {
        return 'none'
      }
    },

    open() {
      this.show = true

      this.$emit('lightbox-open')
      this.$emit('lightbox-toggle')

      this.enter()
    },
    close: function () {
      if (this.state !== states.IDLE) return

      this.leave()

      this.$emit('lightbox-close')
      this.$emit('lightbox-toggle')

      this.show = false
    },
    closeOnEsc: function () {
      if (this.escToClose) {
        this.close()
      }
    },

    async updateWidth() {
      this.resizing = true

      await this.$nextTick()

      this.clientWidth = this.$refs.dialog.clientWidth || document.body.clientWidth
      this.resizing = false
    },
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
