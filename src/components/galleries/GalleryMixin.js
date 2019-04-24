import {
    states,
    animTypes,
    durations,
    easing,
    matrixToString
} from './GalleryHelpers.js'

export default {
    data() {
        return {
            state: states.IDLE,
            forcedOffset: 0,
            animationType: null,
        }
    },

    computed: {
        offset() {
            return this.forcedOffset - this.$data.$_swipable_dragOffsetX
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
        swipeHeld() {
            if (this.state === states.ANIMATING) {
                this.pauseAnim()
            }
        },
        swipeLeft() {
            if (this.state === states.DRAGGING) {
                if (this.animationType === animTypes.PAGE_RIGHT) {
                    this.pageTransition(animTypes.PAGE_RIGHT)
                } else {
                    this.pageTransition(animTypes.PAGE_RESET)
                }
            } else {
                this.pageTransition(animTypes.PAGE_RIGHT)
            }

        },
        swipeRight() {
            if (this.state === states.DRAGGING) {
                if (this.animationType === animTypes.PAGE_LEFT) {
                    this.pageTransition(animTypes.PAGE_LEFT)
                } else {
                    this.pageTransition(animTypes.PAGE_RESET)
                }
            } else {
                this.pageTransition(animTypes.PAGE_LEFT)
            }
        },
        swipeTap() {
            if (this.state === states.DRAGGING) {
                this.pageTransition(this.animationType)
            } else {
                this.swipeTapHandler()
            }
        },
        swipeTimedout() {
            this.dragReset()
        },
        swipeCancel() {
            this.dragReset()
        },
        dragReset() {
            if (this.state === states.DRAGGING) {
                this.pageTransition(this.animationType)
            } else {
                this.pageTransition(animTypes.PAGE_RESET)
            }
        },
        pageLeft() {
            if (this.state == states.ANIMATING) return

            this.pageTransition(animTypes.PAGE_LEFT)
        },
        pageRight() {
            if (this.state == states.ANIMATING) return

            this.pageTransition(animTypes.PAGE_RIGHT)
        },

        async pauseAnim() {
            this.currentAnimation.pause()

            const computedStyle = window.getComputedStyle(this.$refs.imagebox)
            const transformMatrix = matrixToString(computedStyle.transform)

            this.forcedOffset = transformMatrix.e

            this.state = states.DRAGGING

            this.currentAnimation.cancel()
        },
        imageStyle(index) {
            return {
                transform: `translateX(${(index - 1) * this.clientWidth}px)`
            }
        },
        pageTransition(type) {
            const from = this.offset
            let to = 0

            if (type === animTypes.PAGE_LEFT) {
                to = this.clientWidth
            } else if (type === animTypes.PAGE_RIGHT) {
                to = -this.clientWidth
            }

            this.animationType = type
            this.state = states.ANIMATING

            const duration = durations.page * Math.max(0.5, Math.abs((to - from) / this.clientWidth))

            const anim = this.$refs.imagebox.animate(
                [{ // From
                        transform: `translateX(${from}px)`
                    },
                    { // To
                        transform: `translateX(${to}px)`
                    }
                ], {
                    fill: 'both',
                    duration,
                    easing
                }
            )

            anim.onfinish = async () => {
                this.state = states.IDLE
                anim.cancel()

                if (type === animTypes.PAGE_LEFT) {
                    this.updateActiveToLeft()
                } else if (type === animTypes.PAGE_RIGHT) {
                    this.updateActiveToRight()
                }

                this.forcedOffset = 0
            }

            this.currentAnimation = anim
        },
    },
}