<template>
	<div
		v-show="show"
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

function destinationRectTransform(dest, origin) {
	if (origin) {
		const originRect = origin.getBoundingClientRect();
		const destRect = dest.getBoundingClientRect();

		const widthInScale = originRect.width / destRect.width;
		const heightInScale = originRect.height / destRect.height;

		const distanceTop =
			originRect.top +
			originRect.height / 2 -
			(destRect.top + destRect.height / 2);
		const distanceLeft =
			originRect.left +
			originRect.width / 2 -
			(destRect.left + destRect.width / 2);

		return `translate(${distanceLeft}px, ${distanceTop}px) scale(${widthInScale}, ${heightInScale})`;
	} else {
		return "none";
	}
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
				transform: `translateX(${this.offset.x}px) translateY(${
					this.offset.y
				}px)`
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
			this.close();
		},
		swipeUp() {
			this.close();
		},
		swipeDown() {
			this.close();
		},

		async enter() {
			this.updateDims();

			this.$data.$_swipable_data.draggable = false;
			this.state = states.ENTER;

			const imageAnim = animatePromise(
				this.$refs.image[1].$refs.main,
				[
					{
						// From
						transform: destinationRectTransform(
							this.$refs.image[1].$refs.main,
							this.refElem
						)
					},
					{
						// To
						transform: "none"
					}
				],
				{
					duration: durations.enter,
					fill: "both",
					easing
				}
			);

			imageAnim.promise.then(() => {
				imageAnim.animation.cancel();
				this.state = states.IDLE;

				this.$data.$_swipable_data.draggable = true;
			});

			const backdropKeyframes = [
				[{ opacity: 0 }, { opacity: 1 }],
				{
					duration: durations.enter,
					fill: "both",
					easing
				}
			];

			const backdropAnim = animatePromise(
				this.$refs.backdrop,
				...backdropKeyframes
			);
			backdropAnim.promise.then(() => backdropAnim.animation.cancel());

			const controlsAnim = animatePromise(
				this.$refs.controls,
				...backdropKeyframes
			);
			controlsAnim.promise.then(() => controlsAnim.animation.cancel());

			this.$refs.container.classList.add("active");
			this.$refs.container.focus();
		},
		async leave() {
			const from = this.sliderStyle.transform;

			if (this.animationType !== null) {
				this.resetPageTransition();
			}

			this.$refs.imagebox.style.transform = "none"; // Manually clear transform property so

			this.$data.$_swipable_data.draggable = false;
			this.state = states.LEAVE;

			const backdropKeyframes = [
				[{ opacity: this.backdropStyle.opacity }, { opacity: 0 }],
				{
					duration: durations.exit,
					fill: "forwards",
					easing
				}
			];

			const backdropAnim = animatePromise(
				this.$refs.backdrop,
				...backdropKeyframes
			);
			const controlsAnim = animatePromise(
				this.$refs.controls,
				...backdropKeyframes
			);

			const imageAnim = animatePromise(
				this.$refs.image[1].$refs.main,
				[
					{
						// From
						transform: from
					},
					{
						// To
						transform: destinationRectTransform(
							this.$refs.image[1].$refs.main,
							this.refElem
						)
					}
				],
				{
					duration: durations.exit,
					easing,
					fill: "forwards"
				}
			);

			await imageAnim.promise.then(() => {
				this.state = states.IDLE;
				this.$data.$_swipable_data.draggable = true;
			});

			return [backdropAnim, controlsAnim, imageAnim];
		},

		async open() {
			this.show = true;

			this.$emit("lightbox-open");
			this.$emit("lightbox-toggle");

			await this.$nextTick;

			this.enter();
		},
		async close() {
			if (this.state !== states.DRAGGING && this.state !== states.IDLE)
				return;

			const anims = await this.leave();

			this.$emit("lightbox-close");
			this.$emit("lightbox-toggle");

			this.show = false;

			await this.$nextTick;

			anims.forEach(anim => anim.animation.cancel());
		},
		closeOnEsc: function() {
			if (this.escToClose) {
				this.close();
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
