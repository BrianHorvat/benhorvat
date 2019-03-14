export default {
  props: {
    minSwipeDistance: {
      type: Number,
      default: 64
    },
    tapTimeout: {
      type: Number,
      default: 200
    }
  },

  data() {
    return {
      draggable: true,
      dragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      dragStartX: 0,
      dragStartY: 0,
      dragStartT: 0
    }
  },

  methods: {
    handleMousedown(e) {
      if (!this.draggable) return
      if (e.which !== 1 && !e.touches) return
      if (!e.touches) {
        e.preventDefault()
      }

      this.dragging = true
      this.dragStartX = e.touches ? e.touches[0].clientX : e.clientX
      this.dragStartY = e.touches ? e.touches[0].clientY : e.clientY
      this.dragStartT = Date.now()
    },
    handleMousemove(e) {
      if (!this.dragging) return

      // Calculate deltas
      const eventX = e.touches ? e.touches[0].clientX : e.clientX
      const eventY = e.touches ? e.touches[0].clientY : e.clientY
      this.dragOffsetX = (this.dragStartX - eventX)
      this.dragOffsetY = (this.dragStartY - eventY)
    },
    handleMouseup(e) {
      if (!this.dragging) return

      if (this.dragOffsetX > this.minSwipeDistance) {
        this.$emit('swipeRight')
        if (typeof this.swipeRight === 'function') this.swipeRight()
      } else if (this.dragOffsetX < -this.minSwipeDistance) {
        this.$emit('swipeLeft')
        if (typeof this.swipeLeft === 'function') this.swipeLeft()
      } else if (
        (e.which === 1 || e instanceof TouchEvent) &&
        (Math.abs(this.dragOffsetY) < this.minSwipeDistance) &&
        (Math.abs(this.dragOffsetX) < 20) &&
        (Date.now() - this.dragStartT < this.tapTimeout)
      ) {
        this.$emit('swipeTap')
        if (typeof this.swipeTap === 'function') this.swipeTap()
      }

      this.handleMousecancel()
    },
    handleMousecancel(e) {
      this.dragging = false
      this.dragOffsetX = 0
      this.dragOffsetY = 0
      this.dragStartT = 0
    },

    handleTouchdown(e) {
      this.handleMousedown(e)
      e.preventDefault()
    },
    handleTouchup(e) {
      this.handleMouseup(e)
      e.preventDefault()
    },
    handleTouchmove(e) {
      this.handleMousemove(e)
      e.preventDefault()
    },

    bindSwipe(elem) {
      elem.addEventListener('mousedown', this.handleMousedown)
      elem.addEventListener('mouseup', this.handleMouseup)
      elem.addEventListener('mousemove', this.handleMousemove)
      elem.addEventListener('mouseleave', this.handleMousecancel)

      if ('ontouchstart' in window) {
        elem.addEventListener('touchstart', this.handleTouchdown)
        elem.addEventListener('touchend', this.handleTouchup)
        elem.addEventListener('touchmove', this.handleTouchmove)
      }
    }
  }
}