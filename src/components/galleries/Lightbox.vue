<template>
	<div
		v-show="open"
		ref="container"
		class="lightbox-container"
		tabindex="0"
		:class="containerClass"
		@keyup.esc.stop="closeOnEsc"
		@keyup.left.stop="pageLeft"
		@keyup.right.stop="pageRight"
	>
		<div
			ref="backdrop"
			class="lightbox-backdrop"
			:style="backdropStyle"
		></div>
		<div ref="dialog" class="lightbox">
			<div
				ref="imagebox"
				class="light-images"
				:style="sliderStyle"
				:class="sliderClass"
			>
				<progressive-image
					v-for="(image, index) in visibleImages"
					:key="image.id"
					ref="image"
					class="light-image"
					:style="imageStyle(index)"
					:src="image.url"
				/>
			</div>
		</div>
		<div ref="controls" class="lightbox-controls" :style="backdropStyle">
			<div id="close" class="action-button" @click.stop="close">
				<icon-base icon-name="Close">
					<icon-back />
				</icon-base>
			</div>
			<template v-if="images.length > 1">
				<div
					id="left"
					class="action-button is-hidden-mobile"
					@click.stop="pageLeft"
				>
					<icon-base icon-name="Previous Image">
						<icon-left />
					</icon-base>
				</div>
				<div
					id="right"
					class="action-button is-hidden-mobile"
					@click.stop="pageRight"
				>
					<icon-base icon-name="Next Image">
						<icon-right />
					</icon-base>
				</div>
				<span id="counter">{{ counterText }}</span>
			</template>
		</div>
	</div>
</template>

<script>
import BezierEasing from "bezier-easing";
import ProgressiveImage from "@/components/ProgressiveImage";
import { mixin as Swipable, types } from "@/components/mixins/Swipable";
import IconBase from "@/components/icons/IconBase";
import IconLeft from "@/components/icons/IconLeft";
import IconRight from "@/components/icons/IconRight";
import IconBack from "@/components/icons/IconBack";

import {
	states,
	durations,
	easing,
	easingPoints,
	animatePromise
} from "./GalleryHelpers.js";

import GalleryMixin from "./GalleryMixin";

const curve = BezierEasing(
	easingPoints[0],
	easingPoints[1],
	easingPoints[2],
	easingPoints[3]
);

function transformDistances(destRect, originRect) {
	return {
		top:
			originRect.top +
			originRect.height / 2 -
			(destRect.top + destRect.height / 2),
		left:
			originRect.left +
			originRect.width / 2 -
			(destRect.left + destRect.width / 2)
	};
}

export default {
	name: "Lightbox",
	components: { ProgressiveImage, IconBase, IconLeft, IconRight, IconBack },
	mixins: [Swipable, GalleryMixin],
	props: {
		escToClose: {
			type: Boolean,
			default: true
		},
		refElem: {
			type: HTMLElement,
			default: null
		},
		images: {
			type: Array,
			required: true
		},
		activeImage: {
			type: Number,
			required: true
		},
		open: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			show: false,
			clientWidth: 0,
			clientHeight: 0,
			resizing: false,

			$_swipable_options: {
				cancelVertical: true
			}
		};
	},
	computed: {
		counterText() {
			return `${this.activeImage + 1} of ${this.images.length}`;
		},
		containerClass() {
			return {
				active: this.show && this.state !== states.LEAVE,
				leaving: this.state === states.LEAVE
			};
		},
		sliderStyle() {
			return {
				transform: `translateX(${this.offset.x}px) translateY(${this.offset.y}px)`
			};
		},
		sliderClass() {
			return {
				draggable: this.$data.$_swipable_data.draggable,
				dragging: this.$data.$_swipable_data.dragging
			};
		},
		backdropStyle() {
			let opacity = 1;

			if (this.$data.$_swipable_data.type === types.VERTICAL) {
				const distance = Math.abs(
					this.$data.$_swipable_data.dragOffsetY
				);

				opacity = curve(
					Math.max(
						0,
						(window.innerHeight / 2 - distance) /
							(window.innerHeight / 2)
					)
				);
			}

			return { opacity };
		}
	},

	watch: {
		open(val) {
			if (val) {
				this.openLightbox();
			} else {
				this.closeLightbox();
			}
		},
		state(val) {
			// Update draggable based on current state
			switch (val) {
				case states.ENTER:
				case states.LEAVE:
					this.$data.$_swipable_data.draggable = false;
					break;
				default:
					this.$data.$_swipable_data.draggable = true;
					break;
			}
		}
	},

	mounted() {
		this.updateDims();

		this.$_swipable_bindSwipe(this.$refs.imagebox);

		window.addEventListener("resize", this.updateDims);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updateDims);
	},

	methods: {
		updateActiveToLeft() {
			this.$emit("lightbox-page-left");
		},
		updateActiveToRight() {
			this.$emit("lightbox-page-right");
		},
		swipeTapHandler() {
			this.closeLightbox();
		},
		swipeUp() {
			this.closeLightbox();
		},
		swipeDown() {
			this.closeLightbox();
		},

		async enter() {
			this.updateDims();

			this.state = states.ENTER;

			this.$refs.container.classList.add("active");
			this.$refs.container.focus();

			const destRect = this.$refs.image[1].$refs.main.getBoundingClientRect();
			const originRect = this.refElem.getBoundingClientRect();
			const transformDist = transformDistances(destRect, originRect);

			animatePromise(
				this.$refs.image[1].$refs.main,
				[
					{
						// From
						width: `${originRect.width}px`,
						height: `${originRect.height}px`,
						transform: `translate(${transformDist.left}px, ${transformDist.top}px)`
					},
					{
						// To
						width: `${destRect.width}px`,
						height: `${destRect.height}px`,
						transform: "none"
					}
				],
				{
					duration: durations.enter,
					fill: "forwards",
					easing
				}
			).promise.then(anim => {
				anim.cancel();
				this.state = states.IDLE;
			});

			const opacityKeyframes = [
				[{ opacity: 0 }, { opacity: 1 }],
				{
					duration: durations.enter,
					fill: "both",
					easing
				}
			];

			animatePromise(
				this.$refs.backdrop,
				...opacityKeyframes
			).promise.then(anim => anim.cancel());

			animatePromise(
				this.$refs.controls,
				...opacityKeyframes
			).promise.then(anim => anim.cancel());
		},
		async leave() {
			// Clear any page transition if applicable
			if (this.animationType !== null) {
				this.resetPageTransition();
			}

			// Manually clear transform property so it isn't applied twice
			this.$refs.imagebox.style.transform = "none";

			// Update state
			this.state = states.LEAVE;

			// Animation properties for fading out background and controls
			const opacityKeyframes = [
				[{ opacity: this.backdropStyle.opacity }, { opacity: 0 }],
				{
					duration: durations.exit,
					fill: "forwards",
					easing
				}
			];

			// Get bounding rectangles for origin and destination
			const originRect = this.$refs.image[1].$refs.main.getBoundingClientRect();
			const destRect = this.refElem.getBoundingClientRect();
			const transformDist = transformDistances(destRect, originRect);

			await Promise.all([
				animatePromise(
					this.$refs.backdrop,
					...opacityKeyframes
				).promise.then(anim => anim.cancel()),
				animatePromise(
					this.$refs.controls,
					...opacityKeyframes
				).promise.then(anim => anim.cancel()),
				animatePromise(
					this.$refs.image[1].$refs.main,
					[
						{
							// From
							width: `${originRect.width}px`,
							height: `${originRect.height}px`,
							transform: this.sliderStyle.transform
						},
						{
							// To
							width: `${destRect.width}px`,
							height: `${destRect.height}px`,
							transform: `translate(${-transformDist.left}px, ${-transformDist.top}px)`
						}
					],
					{
						duration: durations.exit,
						fill: "forwards",
						easing
					}
				).promise.then(anim => {
					this.state = states.IDLE;
					anim.cancel();
				})
			]);
		},

		async openLightbox() {
			this.$emit("lightbox-open");
			this.$emit("lightbox-toggle");

			await this.$nextTick;

			this.enter();
		},
		async closeLightbox() {
			if (this.state !== states.DRAGGING && this.state !== states.IDLE)
				return;

			await this.leave();

			this.$emit("lightbox-close");
			this.$emit("lightbox-toggle");

			await this.$nextTick;

			// anims.forEach(anim => anim.animation.cancel());
		},
		closeOnEsc: function() {
			if (this.escToClose) {
				this.closeLightbox();
			}
		},

		async updateDims() {
			this.resizing = true;

			this.clientWidth =
				this.$refs.dialog.clientWidth || document.body.clientWidth;
			this.clientHeight =
				this.$refs.dialog.clientHeight || document.body.clientHeight;

			this.resizing = false;
		}
	}
};
</script>

<style lang="scss" scoped>
$drop-shadow: drop-shadow(0px 0px 6px black);

.lightbox-container {
	$c: &;

	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;

	outline: none;

	user-select: none;

	.lightbox,
	.lightbox-backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.lightbox {
		width: 100%;
		height: 100%;

		.light-images {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;

			display: flex;

			will-change: transform;

			&.draggable {
				cursor: grab;
			}

			&.dragging {
				cursor: grabbing;
			}

			.light-image {
				display: flex;
				flex: 0 0 100%;
				height: 100%;
				justify-content: center;
				align-items: center;

				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;

				&.active {
					opacity: 1;
				}

				will-change: transform;

				&::v-deep img {
					max-height: 100%;
					max-width: 100%;
					height: auto;
					width: auto;
					// margin: auto;
					// object-fit: contain;
					object-fit: cover;

					// disable right click on image
					pointer-events: none;
				}
			}
		}
	}

	.lightbox-controls {
		#counter {
			position: absolute;
			top: 0;
			right: 0;

			z-index: 3;

			color: white;
			filter: $drop-shadow;
			line-height: 3.25em;
			padding: 0 0.8125rem;
		}

		.action-button {
			position: absolute;

			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 3;
			position: absolute;

			padding: 1em;

			cursor: pointer;

			svg {
				width: 1.25em;
				height: 1.25em;
				fill: white;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			&:hover {
				background-color: rgba(255, 255, 255, 0.12);
			}

			&#close {
				top: 0;
				left: 0;
				z-index: 4;
			}

			&#left,
			&#right {
				top: 10%;
				bottom: 10%;
			}

			&#left {
				left: 0;
			}

			&#right {
				right: 0;
			}
		}
	}

	.lightbox-backdrop {
		background-color: rgba(0, 0, 0, 1);
	}

	.lightbox-controls,
	.lightbox-backdrop {
		will-change: opacity;
	}
}
</style>
