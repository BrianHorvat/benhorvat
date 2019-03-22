const tapTimeout = 200 // Max length taps can be held before no longer being considered a tap
const maxSwipeDistanceY = 20 // Max vertical travel for a swipe to no longer be considered horizontal

export default {
  props: {
    minSwipeDistance: {
      type: Number,
      default: 64
    }
  },

  data() {
    return {
      $_swipable_draggable: true,
      $_swipable_dragging: false,
      $_swipable_dragOffsetX: 0,
      $_swipable_dragOffsetY: 0,
      $_swipable_dragStartX: 0,
      $_swipable_dragStartY: 0,
      $_swipable_dragStartT: 0
    }
  },

  methods: {
    $_swipable_handleMousedown(e) {
      if (!this.draggable) return
      if (e.which !== 1 && !e.touches) return
      if (!e.touches) {
        e.preventDefault()
      }

      this.$emit('swipe-held')
      if (typeof this.swipeHeld === 'function') this.swipeHeld()

      this.dragging = true
      this.dragStartX = e.touches ? e.touches[0].clientX : e.clientX
      this.dragStartY = e.touches ? e.touches[0].clientY : e.clientY
      this.dragStartT = Date.now()
    },
    $_swipable_handleMousemove(e) {
      if (!this.draggable) return
      if (!this.dragging) return

      // Calculate deltas
      const eventX = e.touches ? e.touches[0].clientX : e.clientX
      const eventY = e.touches ? e.touches[0].clientY : e.clientY
      this.dragOffsetX = (this.dragStartX - eventX)
      this.dragOffsetY = (this.dragStartY - eventY)
    },
    $_swipable_handleMouseup(e) {
      if (!this.draggable) return
      if (!this.dragging) return

      if (this.dragOffsetX > this.minSwipeDistance) {
        this.$emit('swipe-right')
        if (typeof this.swipeRight === 'function') this.swipeRight()
      } else if (this.dragOffsetX < -this.minSwipeDistance) {
        this.$emit('swipe-left')
        if (typeof this.swipeLeft === 'function') this.swipeLeft()
      } else if (
        (e.which === 1 || e instanceof TouchEvent) &&
        (Math.abs(this.dragOffsetY) < this.minSwipeDistance) &&
        (Math.abs(this.dragOffsetX) < maxSwipeDistanceY) &&
        (Date.now() - this.dragStartT < tapTimeout)
      ) {
        this.$emit('swipe-tap')
        if (typeof this.swipeTap === 'function') this.swipeTap()
      }

      this.$emit('swipe-held-released')
      if (typeof this.swipeHeldReleased === 'function') this.swipeHeldReleased()

      this.$_swipable_reset()
    },
    $_swipable_handleMousecancel(e) {
      this.$_swipable_reset()

      this.$emit('swipe-cancel')
      if (typeof this.swipeCancel === 'function') this.swipeCancel()
    },

    $_swipable_reset() {
      this.dragging = false
      this.dragOffsetX = 0
      this.dragOffsetY = 0
      this.dragStartT = 0
    },

    $_swipable_handleTouchdown(e) {
      this.$_swipable_handleMousedown(e)
      e.preventDefault()
    },
    $_swipable_handleTouchup(e) {
      this.$_swipable_handleMouseup(e)
      e.preventDefault()
    },
    $_swipable_handleTouchmove(e) {
      this.$_swipable_handleMousemove(e)
      e.preventDefault()
    },

    $_swipable_bindSwipe(elem) {
      elem.addEventListener('mousedown', this.$_swipable_handleMousedown)
      elem.addEventListener('mouseup', this.$_swipable_handleMouseup)
      elem.addEventListener('mousemove', this.$_swipable_handleMousemove)
      elem.addEventListener('mouseleave', this.$_swipable_handleMousecancel)

      if ('ontouchstart' in window) {
        elem.addEventListener('touchstart', this.$_swipable_handleTouchdown)
        elem.addEventListener('touchend', this.$_swipable_handleTouchup)
        elem.addEventListener('touchmove', this.$_swipable_handleTouchmove)
      }
    }
  },

  watch: {
    draggable(newValue, oldValue) {
      if (!newValue) this.$_swipable_handleMousecancel()
    }
  }
}