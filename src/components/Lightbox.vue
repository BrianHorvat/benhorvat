<template>
  <transition
    name="light-transition"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <div class="lightbox-container" tabindex="0" v-show="show" @keyup.esc.stop="closeOnEsc">
      <div class="lightbox" ref="dialog">
        <div class="light-images" ref="imagebox" :style="sliderStyle" :class="sliderClass">
          <div class="light-image" v-for="item in this.images" v-bind:key="item.id">
            <img :src="item.image.url" ref="image">
          </div>
        </div>
      </div>
      <div id="close" @click.stop="close" class="action-button">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
      </div>
      <div id="left" @click.stop="$emit('pageLeft')" class="action-button is-hidden-mobile">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
        </svg>
      </div>
      <div id="right" @click.stop="$emit('pageRight')" class="action-button is-hidden-mobile">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
        </svg>
      </div>
      <span id="counter">{{ counterText }}</span>
      <div class="backdrop" ref="backdrop"></div>
    </div>
  </transition>
</template>

<script>
  import Swipable from './mixins/Swipable'

  export default {
    name: 'lightbox',
    mixins: [Swipable],
    props: {
      escToClose: {
        type: Boolean,
        default: true
      },
      refElem: null,
      images: Array,
      active: Number,
      width: Object
    },
    data () {
      return {
        show: false,
        clientWidth: 0
      }
    },
    computed: {
      counterText () {
        return (this.active + 1) + ' / ' + this.images.length
      },
      offset () {
        return (this.active * this.clientWidth + this.dragOffsetX) * -1
      },
      sliderStyle () {
        return {
          transform: 'translateX(' + this.offset + 'px)'
        }
      },
      sliderClass () {
        return {
          'transition-off': this.dragging
        }
      }
    },
    methods: {
      enter: function (el, done) {
        const enterAnim = this.$refs.image[this.active].animate(
          [
            { // From
              transform: this.calculateDialogPos(this.refElem)
            },
            { // To
              transform: 'none'
            }
          ],
          {
            duration: 300,
            fill: 'both',
            easing: 'ease-in-out'
          }
        )
        enterAnim.onfinish = () => {
          this.$refs.imagebox.classList.remove('transition-off')
          done()
        }

        el.focus()
        el.classList.add('active')
        this.$refs.imagebox.classList.add('transition-off')
        document.documentElement.classList.add('dialog-active')
      },
      leave: function (el, done) {
        document.documentElement.classList.remove('dialog-active')
        el.classList.remove('active')

        const leaveAnim = this.$refs.image[this.active].animate(
          [
            { // From
              transform: 'none'
            },
            { // To
              transform: this.calculateDialogPos(this.refElem)
            }
          ],
          {
            duration: 300,
            fill: 'both',
            easing: 'ease-in-out'
          }
        )
        leaveAnim.onfinish = () => {
          this.$emit('close')
          this.$emit('toggle')
          done()
          leaveAnim.cancel()
        }
      },
      calculateDialogPos (ref) {
        if (ref) {
          const originRect = ref.getBoundingClientRect()
          const destRect = this.$refs.image[this.active].getBoundingClientRect()
          const widthInScale = (originRect.width / (destRect.width ? destRect.width : 1))
          const heightInScale = (originRect.height / (destRect.height ? destRect.height : 1))

          let distance = {
            top: (originRect.top + (originRect.height / 2)) - (destRect.top + (destRect.height / 2)),
            left: (originRect.left + (originRect.width / 2)) - (destRect.left + (destRect.width / 2))
          }

          return `translate(${distance.left}px, ${distance.top}px) scale(${widthInScale}, ${heightInScale})`
        } else {
          return 'none'
        }
      },

      open: function () {
        this.show = true

        this.$emit('open')
        this.$emit('toggle')
      },
      close: function () {
        this.show = false
      // Close and toggle are emitted in leave
      },
      closeOnEsc: function () {
        if (this.escToClose) {
          this.close()
        }
      },

      swipeLeft () {
        if (this.dragging && this.active === 0) return

        this.$emit('pageLeft')
      },
      swipeRight () {
        if (this.dragging && this.active === this.images.length - 1) return

        this.$emit('pageRight')
      },
      swipeTap () {
        this.close()
      },

      updateWidth () {
        this.clientWidth = this.$refs.dialog.clientWidth
      }
    },
    mounted () {
      this.updateWidth()

      this.bindSwipe(this.$refs.imagebox)

      this.$nextTick(function () {
        window.addEventListener('resize', this.updateWidth)
      })
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.updateWidth)
    },
    watch: {
      show: function () {
        this.$nextTick(() => {
          this.updateWidth()
        })
      }
    }
  }
</script>
