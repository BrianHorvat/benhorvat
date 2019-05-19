import { states, animTypes, durations, easing } from "./GalleryHelpers.js";

import { types } from "@/components/mixins/Swipable.js";

export default {
  data() {
    return {
      state: states.IDLE,
      forcedOffset: {
        x: 0,
        y: 0
      },
      animationType: null
    };
  },

  computed: {
    offset() {
      return {
        x:
          this.forcedOffset.x -
          (this.$data.$_swipable_data.type === types.HORIZONTAL
            ? this.$data.$_swipable_data.dragOffsetX
            : 0),
        y:
          this.forcedOffset.y -
          (this.$data.$_swipable_data.type === types.VERTICAL
            ? this.$data.$_swipable_data.dragOffsetY
            : 0)
      };
    },
    visibleImages() {
      if (this.images.length === 1) {
        return [];
      }

      return [
        this.images[
          this.activeImage - 1 === -1
            ? this.images.length - 1
            : this.activeImage - 1
        ],
        this.images[this.activeImage],
        this.images[
          this.activeImage + 1 === this.images.length ? 0 : this.activeImage + 1
        ]
      ];
    }
  },

  methods: {
    swipeHeld() {
      if (this.state === states.ANIMATING) {
        this.pauseAnim();
      }

      this.state = states.DRAGGING;
    },
    swipeLeft() {
      if (
        this.animationType === animTypes.PAGE_RIGHT ||
        this.animationType === null
      ) {
        this.pageTransition(animTypes.PAGE_RIGHT);
      } else {
        this.pageTransition(animTypes.PAGE_RESET);
      }
    },
    swipeRight() {
      if (
        this.animationType === animTypes.PAGE_LEFT ||
        this.animationType === null
      ) {
        this.pageTransition(animTypes.PAGE_LEFT);
      } else {
        this.pageTransition(animTypes.PAGE_RESET);
      }
    },
    swipeTap() {
      if (this.animationType !== null) {
        this.pageTransition(this.animationType);
      } else {
        this.swipeTapHandler();
      }
    },
    swipeTimedout() {
      this.dragReset();
    },
    swipeCancel() {
      this.dragReset();
    },
    swipeUp() {
      this.dragReset();
    },
    swipeDown() {
      this.dragReset();
    },
    dragReset() {
      if (this.state === states.DRAGGING) {
        this.pageTransition(this.animationType);
      } else {
        this.pageTransition(animTypes.PAGE_RESET);
      }
    },
    pageLeft() {
      if (this.state == states.ANIMATING) return;
      if (this.$data.$_swipable_data.type === types.HORIZONTAL) return;

      this.pageTransition(animTypes.PAGE_LEFT);
    },
    pageRight() {
      if (this.state == states.ANIMATING) return;
      if (this.$data.$_swipable_data.type === types.HORIZONTAL) return;

      this.pageTransition(animTypes.PAGE_RIGHT);
    },

    async pauseAnim() {
      this.currentAnimation.pause();

      const computedStyle = window.getComputedStyle(this.$refs.imagebox);
      const transformMatrix = new DOMMatrix(computedStyle.transform);

      this.forcedOffset.x = transformMatrix.e;
      this.forcedOffset.y = transformMatrix.f;

      this.currentAnimation.cancel();
    },
    imageStyle(index) {
      return {
        transform: `translateX(${(index - 1) * this.clientWidth}px)`
      };
    },
    pageTransition(type) {
      const computedStyle = window.getComputedStyle(this.$refs.imagebox);
      const transformMatrix = new DOMMatrix(computedStyle.transform);

      const fromX = transformMatrix.e;
      const fromY = transformMatrix.f;
      const distance = Math.hypot(fromX, fromY);
      const maxDim = Math.max(this.clientWidth, this.clientHeight);

      let to = 0;

      if (type === animTypes.PAGE_LEFT) {
        to = this.clientWidth;
      } else if (type === animTypes.PAGE_RIGHT) {
        to = -this.clientWidth;
      }

      this.animationType = type;
      this.state = states.ANIMATING;

      const duration =
        durations.page * Math.max(0.5, Math.abs((to - distance) / maxDim));

      const anim = this.$refs.imagebox.animate(
        [
          {
            // From
            transform: `translateX(${fromX}px) translateY(${fromY}px)`
          },
          {
            // To
            transform: `translateX(${to}px)`
          }
        ],
        {
          fill: "both",
          duration,
          easing
        }
      );

      anim.onfinish = async () => {
        this.resetPageTransition();
        anim.cancel();

        if (type === animTypes.PAGE_LEFT) {
          this.updateActiveToLeft();
        } else if (type === animTypes.PAGE_RIGHT) {
          this.updateActiveToRight();
        }
      };

      this.currentAnimation = anim;
    },
    resetPageTransition() {
      this.animationType = null;
      this.state = states.idle;

      this.forcedOffset = {
        x: 0,
        y: 0
      };
    }
  }
};
