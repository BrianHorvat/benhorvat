const defaults = Object.freeze({
	tapTimeout: 200,
	swipeDeadzone: 16,
	minVelocity: 0.3
});

const directions = Object.freeze({
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4
});

const types = Object.freeze({
	NONE: 1,
	HORIZONTAL: 2,
	VERTICAL: 3
});

function calcVelocity(deltaTime, deltaX, deltaY) {
	return {
		x: deltaX / deltaTime,
		y: deltaY / deltaTime
	};
}

function getDirection(deltaX, deltaY, type) {
	if (type === types.HORIZONTAL) {
		return deltaX > 0 ? directions.LEFT : directions.RIGHT;
	} else {
		return deltaY > 0 ? directions.UP : directions.DOWN;
	}
}

function getType(deltaX, deltaY) {
	if (Math.abs(deltaX) > defaults.swipeDeadzone) {
		return types.HORIZONTAL;
	} else if (Math.abs(deltaY) > defaults.swipeDeadzone) {
		return types.VERTICAL;
	}

	return types.NONE;
}

const mixin = {
	props: {
		minVelocity: {
			type: Number,
			default: defaults.minVelocity
		}
	},

	data() {
		return {
			$_swipable_data: {
				draggable: true,
				dragging: false,
				dragOffsetX: 0,
				dragOffsetY: 0,
				dragStartX: 0,
				dragStartY: 0,
				dragStartTrueX: 0,
				dragStartTrueY: 0,
				dragStartT: 0,
				type: types.NONE
			},
			$_swipable_options: {
				cancelVertical: true,
				cancelHorizontal: true
			}
		};
	},

	methods: {
		$_swipable_handleMousedown(e) {
			if (!this.$data.$_swipable_data.draggable) return;
			if (e.which !== 1 && !e.touches) return;
			if (!e.touches) {
				e.preventDefault();
			}

			this.$emit("swipe-held");
			if (typeof this.swipeHeld === "function") this.swipeHeld();

			this.$data.$_swipable_data.dragging = true;
			this.$data.$_swipable_data.dragStartX = e.touches
				? e.touches[0].clientX
				: e.clientX;
			this.$data.$_swipable_data.dragStartTrueX = e.touches
				? e.touches[0].clientX
				: e.clientX;
			this.$data.$_swipable_data.dragStartY = e.touches
				? e.touches[0].clientY
				: e.clientY;
			this.$data.$_swipable_data.dragStartTrueY = e.touches
				? e.touches[0].clientY
				: e.clientY;
			this.$data.$_swipable_data.dragStartT = Date.now();
		},
		$_swipable_handleMousemove(e) {
			if (!this.$data.$_swipable_data.draggable) return;
			if (!this.$data.$_swipable_data.dragging) return;

			// Calculate deltas
			const eventX = e.touches ? e.touches[0].clientX : e.clientX;
			const eventY = e.touches ? e.touches[0].clientY : e.clientY;
			this.$data.$_swipable_data.dragOffsetX =
				this.$data.$_swipable_data.dragStartX - eventX;
			this.$data.$_swipable_data.dragOffsetY =
				this.$data.$_swipable_data.dragStartY - eventY;

			if (this.$data.$_swipable_data.type === types.NONE) {
				const type = getType(
					this.$data.$_swipable_data.dragOffsetX,
					this.$data.$_swipable_data.dragOffsetY
				);

				if (type !== types.NONE) {
					this.$data.$_swipable_data.type = type;
					this.$data.$_swipable_data.dragStartX = eventX;
					this.$data.$_swipable_data.dragStartY = eventY;
					this.$data.$_swipable_data.dragOffsetX = 0;
					this.$data.$_swipable_data.dragOffsetY = 0;
				}
			}
		},
		$_swipable_handleMouseup(e) {
			if (!this.$data.$_swipable_data.draggable) return;
			if (!this.$data.$_swipable_data.dragging) return;

			const deltaTime =
				Date.now() - this.$data.$_swipable_data.dragStartT;
			const deltaX = this.$data.$_swipable_data.dragOffsetX;
			const deltaY = this.$data.$_swipable_data.dragOffsetY;

			const velocity = calcVelocity(deltaTime, deltaX, deltaY);

			if (
				this.type !== types.NONE &&
				(Math.abs(velocity.x) > this.minVelocity ||
					Math.abs(velocity.y) > this.minVelocity)
			) {
				const direction = getDirection(
					deltaX,
					deltaY,
					this.$data.$_swipable_data.type
				);

				switch (direction) {
					case directions.UP:
						this.$_swipable_swipeUp();

						break;
					case directions.DOWN:
						this.$_swipable_swipeDown();

						break;
					case directions.LEFT:
						this.$_swipable_swipeLeft();

						break;
					case directions.RIGHT:
						this.$_swipable_swipeRight();

						break;
				}
			} else if (
				(e.which === 1 || e instanceof TouchEvent) &&
				deltaTime < defaults.tapTimeout &&
				this.$data.$_swipable_data.type === types.NONE
			) {
				this.$_swipable_swipeTap();
			} else {
				this.$_swipable_swipeTimedout();
			}

			this.$emit("swipe-held-released", this.$data.$_swipable_data);
			if (typeof this.swipeHeldReleased === "function")
				this.swipeHeldReleased();

			this.$_swipable_reset();
		},
		$_swipable_handleMousecancel() {
			if (this.$data.$_swipable_data.dragging) {
				this.$emit("swipe-cancel");
				if (typeof this.swipeCancel === "function") this.swipeCancel();

				this.$_swipable_reset();
			}
		},

		$_swipable_reset() {
			this.$data.$_swipable_data.dragging = false;
			this.$data.$_swipable_data.dragOffsetX = 0;
			this.$data.$_swipable_data.dragOffsetY = 0;
			this.$data.$_swipable_data.dragStartT = 0;
			this.$data.$_swipable_data.type = types.NONE;
		},

		$_swipable_handleTouchdown(e) {
			this.$_swipable_handleMousedown(e);

			// if (e.cancelable) e.preventDefault()
		},
		$_swipable_handleTouchup(e) {
			this.$_swipable_handleMouseup(e);

			if (e.cancelable) e.preventDefault();
		},
		$_swipable_handleTouchmove(e) {
			this.$_swipable_handleMousemove(e);

			if (
				e.cancelable &&
				(this.$data.$_swipable_data.type === types.NONE ||
					(this.$data.$_swipable_options.cancelVertical &&
						this.$data.$_swipable_data.type === types.VERTICAL) ||
					(this.$data.$_swipable_options.cancelHorizontal &&
						this.$data.$_swipable_data.type === types.HORIZONTAL))
			) {
				e.preventDefault();
			}
		},

		$_swipable_bindSwipe(elem) {
			elem.addEventListener("mousedown", this.$_swipable_handleMousedown);
			elem.addEventListener("mouseup", this.$_swipable_handleMouseup);
			elem.addEventListener("mousemove", this.$_swipable_handleMousemove);
			elem.addEventListener(
				"mouseleave",
				this.$_swipable_handleMousecancel
			);

			elem.addEventListener(
				"touchstart",
				this.$_swipable_handleTouchdown
			);
			elem.addEventListener("touchend", this.$_swipable_handleTouchup);
			elem.addEventListener("touchmove", this.$_swipable_handleTouchmove);
		},

		$_swipable_swipeLeft() {
			this.$emit("swipe-left");
			if (typeof this.swipeLeft === "function") this.swipeLeft();
		},
		$_swipable_swipeRight() {
			this.$emit("swipe-right");
			if (typeof this.swipeRight === "function") this.swipeRight();
		},
		$_swipable_swipeUp() {
			this.$emit("swipe-up");
			if (typeof this.swipeUp === "function") this.swipeUp();
		},
		$_swipable_swipeDown() {
			this.$emit("swipe-down");
			if (typeof this.swipeDown === "function") this.swipeDown();
		},
		$_swipable_swipeTap() {
			this.$emit("swipe-tap");
			if (typeof this.swipeTap === "function") this.swipeTap();
		},
		$_swipable_swipeTimedout() {
			this.$emit("swipe-timedout");
			if (typeof this.swipeTimedout === "function") this.swipeTimedout();
		}
	},

	watch: {
		$_swipable_draggable(newValue) {
			if (!newValue) this.$_swipable_handleMousecancel();
		}
	}
};

export { defaults, directions, types, mixin };
