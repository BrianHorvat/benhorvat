const defaults = {
  tapTimeout: 200,
  maxSwipeDistanceY: 20,
  minSwipeDistance: 32,
  minVelocity: 0.3
}

const directions = Object.freeze({
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
  // TAP
})

function calcVelocity(deltaTime, deltaX, deltaY) {
  return {
    x: deltaX / deltaTime,
    y: deltaY / deltaTime
  }
}

function getDirection(deltaX, deltaY) {
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return deltaX > 0 ? directions.LEFT : directions.RIGHT
  } else {
    return deltaY > 0 ? directions.UP : directions.DOWN
  }
}

export default {
  props: {
    minSwipeDistance: {
      type: Number,
      default: defaults.minSwipeDistance
    },
    minVelocity: {
      type: Number,
      default: defaults.minVelocity
    },
  },

  data() {
    return {
      $_swipable_draggable: true,
      $_swipable_dragging: false,
      $_swipable_dragOffsetX: 0,
      $_swipable_dragOffsetY: 0,
      $_swipable_dragStartX: 0,
      $_swipable_dragStartY: 0,
      $_swipable_dragStartT: 0,
      $_swipable_cancelTouchdown: false,
      $_swipable_cancelTouchup: true,
      $_swipable_cancelTouchmove: false,
    }
  },

  methods: {
    $_swipable_handleMousedown(e) {
      if (!this.$data.$_swipable_draggable) return
      if (e.which !== 1 && !e.touches) return
      if (!e.touches) {
        e.preventDefault()
      }

      this.$emit('swipe-held')
      if (typeof this.swipeHeld === 'function') this.swipeHeld()

      this.$data.$_swipable_dragging = true
      this.$data.$_swipable_dragStartX = e.touches ? e.touches[0].clientX : e.clientX
      this.$data.$_swipable_dragStartY = e.touches ? e.touches[0].clientY : e.clientY
      this.$data.$_swipable_dragStartT = Date.now()
    },
    $_swipable_handleMousemove(e) {
      if (!this.$data.$_swipable_draggable) return
      if (!this.$data.$_swipable_dragging) return

      // Calculate deltas
      const eventX = e.touches ? e.touches[0].clientX : e.clientX
      const eventY = e.touches ? e.touches[0].clientY : e.clientY
      this.$data.$_swipable_dragOffsetX = (this.$data.$_swipable_dragStartX - eventX)
      this.$data.$_swipable_dragOffsetY = (this.$data.$_swipable_dragStartY - eventY)
    },
    $_swipable_handleMouseup(e) {
      if (!this.$data.$_swipable_draggable) return
      if (!this.$data.$_swipable_dragging) return

      const deltaTime = Date.now() - this.$data.$_swipable_dragStartT;
      const deltaX = this.$data.$_swipable_dragOffsetX
      const deltaY = this.$data.$_swipable_dragOffsetY

      const velocity = calcVelocity(deltaTime, deltaX, deltaY)

      if (Math.abs(velocity.x) > this.minVelocity || Math.abs(velocity.y) > this.minVelocity) {
        const direction = getDirection(deltaX, deltaY)

        switch (direction) {
          case directions.UP:
            this.$_swipable_swipeUp()

            break;
          case directions.DOWN:
            this.$_swipable_swipeDown()

            break;
          case directions.LEFT:
            this.$_swipable_swipeLeft()

            break;
          case directions.RIGHT:
            this.$_swipable_swipeRight()

            break;
        }
      } else if ((e.which === 1 || e instanceof TouchEvent) && deltaTime < defaults.tapTimeout) {
        this.$_swipable_swipeTap();
      } else {
        this.$_swipable_swipeTimedout();
      }

      this.$emit('swipe-held-released')
      if (typeof this.swipeHeldReleased === 'function') this.swipeHeldReleased()

      this.$_swipable_reset()
    },
    $_swipable_handleMousecancel(e) {
      if (this.$data.$_swipable_dragging) {
        this.$emit('swipe-cancel')
        if (typeof this.swipeCancel === 'function') this.swipeCancel()

        this.$_swipable_reset()
      }
    },

    $_swipable_reset() {
      this.$data.$_swipable_dragging = false
      this.$data.$_swipable_dragOffsetX = 0
      this.$data.$_swipable_dragOffsetY = 0
      this.$data.$_swipable_dragStartT = 0
    },

    $_swipable_handleTouchdown(e) {
      this.$_swipable_handleMousedown(e)

      if (e.cancelable && this.$data.$_swipable_cancelTouchdown) e.preventDefault()
    },
    $_swipable_handleTouchup(e) {
      this.$_swipable_handleMouseup(e)

      if (e.cancelable && this.$data.$_swipable_cancelTouchup) e.preventDefault()
    },
    $_swipable_handleTouchmove(e) {
      this.$_swipable_handleMousemove(e)

      if (e.cancelable && this.$data.$_swipable_cancelTouchmove) e.preventDefault()
    },

    $_swipable_bindSwipe(elem) {
      elem.addEventListener('mousedown', this.$_swipable_handleMousedown)
      elem.addEventListener('mouseup', this.$_swipable_handleMouseup)
      elem.addEventListener('mousemove', this.$_swipable_handleMousemove)
      elem.addEventListener('mouseleave', this.$_swipable_handleMousecancel)

      // if ('ontouchstart' in window) {
      elem.addEventListener('touchstart', this.$_swipable_handleTouchdown)
      elem.addEventListener('touchend', this.$_swipable_handleTouchup)
      elem.addEventListener('touchmove', this.$_swipable_handleTouchmove)
      // }
    },

    $_swipable_swipeLeft() {
      this.$emit('swipe-left')
      if (typeof this.swipeLeft === 'function') this.swipeLeft()
    },
    $_swipable_swipeRight() {
      this.$emit('swipe-right')
      if (typeof this.swipeRight === 'function') this.swipeRight()
    },
    $_swipable_swipeUp() {
      this.$emit('swipe-up')
      if (typeof this.swipeUp === 'function') this.swipeUp()
    },
    $_swipable_swipeDown() {
      this.$emit('swipe-down')
      if (typeof this.swipeDown === 'function') this.swipeDown()
    },
    $_swipable_swipeTap() {
      this.$emit('swipe-tap')
      if (typeof this.swipeTap === 'function') this.swipeTap()
    },
    $_swipable_swipeTimedout() {
      this.$emit('swipe-timedout')
      if (typeof this.swipeTimedout === 'function') this.swipeTimedout()
    },

  },

  watch: {
    $_swipable_draggable(newValue, oldValue) {
      if (!newValue) this.$_swipable_handleMousecancel()
    }
  }
}