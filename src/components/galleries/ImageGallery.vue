<template>
	<div
		class="image-gallery"
		tabindex="0"
		@keyup.left="pageLeft"
		@keyup.right="pageRight"
	>
		<lightbox
			ref="lightbox"
			:ref-elem="this.$refs.image ? this.$refs.image[1].$refs.main : null"
			:images="images"
			:active-image="activeImage"
			@lightbox-open="showLightbox = true"
			@lightbox-close="showLightbox = false"
			@lightbox-page-left="updateActiveToLeft"
			@lightbox-page-right="updateActiveToRight"
		/>
		<div ref="container" class="main-container" :style="containerHeight">
			<div
				ref="imagebox"
				class="images"
				:style="sliderStyle"
				:class="sliderClass"
			>
				<progressive-image
					v-for="(image, index) in visibleImages"
					:key="image.id"
					ref="image"
					class="big-image"
					:style="imageStyle(index)"
					:src="image.url"
				/>
			</div>

			<div
				id="fullscreen"
				class="action-button is-hidden-mobile"
				@click.stop="swipeTap"
				@mousedown.stop
			>
				<icon-base icon-name="Expand Images">
					<icon-fullscreen />
				</icon-base>
			</div>

			<div
				id="left"
				class="action-button is-hidden-mobile"
				@click.stop="pageLeft"
				@mousedown.stop
			>
				<icon-base icon-name="Previous Image">
					<icon-left />
				</icon-base>
			</div>

			<div
				id="right"
				class="action-button is-hidden-mobile"
				@click.stop="pageRight"
				@mousedown.stop
			>
				<icon-base icon-name="Next Image">
					<icon-right />
				</icon-base>
			</div>

			<div class="bg"></div>
		</div>
		<div class="thumb-container">
			<progressive-background
				v-for="(image, index) in images"
				:key="image.id"
				:src="image.url"
				:class="thumbClass(index)"
				class="thumb"
				tabindex="0"
				@click.native="updateActiveToIndex(index)"
			/>
		</div>
	</div>
</template>

<script>
import Lightbox from "./Lightbox";
import ProgressiveImage from "@/components/ProgressiveImage";
import ProgressiveBackground from "@/components/ProgressiveBackground";
import { mixin as Swipable } from "@/components/mixins/Swipable";
import IconBase from "@/components/icons/IconBase";
import IconLeft from "@/components/icons/IconLeft";
import IconRight from "@/components/icons/IconRight";
import IconFullscreen from "@/components/icons/IconFullscreen";

import GalleryMixin from "./GalleryMixin";

export default {
	name: "ImageGallery",
	components: {
		Lightbox,
		ProgressiveImage,
		ProgressiveBackground,
		IconBase,
		IconLeft,
		IconRight,
		IconFullscreen
	},
	mixins: [Swipable, GalleryMixin],
	props: {
		images: {
			type: Array,
			required: true
		},
		aspectRatio: {
			type: Number,
			default: 5 / 4
		}
	},

	data() {
		return {
			activeImage: 0,
			clientWidth: 0,
			clientHeight: 0,
			resizing: false,
			showLightbox: false,

			$_swipable_options: {
				cancelVertical: false
			}
		};
	},

	computed: {
		sliderStyle() {
			return {
				transform: `translateX(${this.offset.x}px)`
			};
		},
		sliderClass() {
			return {
				draggable: this.$data.$_swipable_data.draggable,
				dragging: this.$data.$_swipable_data.dragging,
				hide: this.showLightbox
			};
		},

		containerHeight() {
			return {
				height: `${this.clientWidth * (1 / this.aspectRatio)}px`
			};
		},

		visibleImages() {
			return [
				this.images[
					this.activeImage - 1 === -1
						? this.images.length - 1
						: this.activeImage - 1
				],
				this.images[this.activeImage],
				this.images[
					this.activeImage + 1 === this.images.length
						? 0
						: this.activeImage + 1
				]
			];
		}
	},

	watch: {
		images: function() {
			this.updateDims();
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
		updateActiveToIndex(index) {
			this.activeImage = index;
		},
		updateActiveToLeft() {
			if (this.activeImage === 0) {
				this.activeImage = this.images.length - 1;
			} else {
				this.activeImage--;
			}
		},
		updateActiveToRight() {
			if (this.activeImage === this.images.length - 1) {
				this.activeImage = 0;
			} else {
				this.activeImage++;
			}
		},
		swipeTapHandler() {
			this.$refs.lightbox.openLightbox();
		},

		updateDims() {
			this.resizing = true;

			this.clientWidth = this.$refs.container.clientWidth;

			this.resizing = false;
		},
		thumbClass(index) {
			return {
				active: index === this.activeImage
			};
		}
	}
};
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins.sass";

.image-gallery {
	outline: none;
	margin-bottom: 1em;

	user-select: none;

	.main-container {
		border-radius: $corner-radius;

		filter: $card-shadow;

		position: relative;
		display: flex;
		justify-content: center;
		overflow: hidden;

		max-height: 75vh;

		.bg {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			background: black;
		}

		.images {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1;

			will-change: transform;

			.big-image::v-deep {
				display: flex;

				position: absolute;
				top: 0;
				bottom: 0;
				left: -1px;
				right: -1px;
				width: auto;

				align-items: center;
				justify-content: center;

				img {
					max-height: 100%;
					max-width: 100%;
					height: auto;
					width: auto;
					margin: auto;
					object-fit: contain;

					// disable right click on image
					pointer-events: none;
				}
			}

			&.hide .big-image {
				opacity: 0;
				transition: opacity 0ms 1ms;
			}
		}

		.action-button {
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 3;
			position: absolute;

			padding: 1em;

			transition: all 0.15s $transition;

			cursor: pointer;

			top: 0;
			height: 100%;

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

			&#left {
				left: 0;
			}

			&#right {
				right: 0;
			}

			&#fullscreen {
				left: 0;
				width: 3.25em;
				height: 3.25em;
				z-index: 4;
			}
		}
	}

	.thumb-container {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.5em;

		margin-top: 0.5em;

		.thumb {
			padding-top: 75%;
			border-radius: $corner-radius;

			filter: $card-shadow;

			transition: opacity 0.2s;
			cursor: pointer;

			&.active {
				opacity: 0.7;
			}

			img {
				object-position: 50% 30%;
			}
		}
	}

	@include tablet {
		&.grid {
			display: grid;
			grid-template-columns: repeat(8, 1fr);
			grid-template-rows: repeat(7, 1fr);
			gap: 0.5em;

			.main-container {
				grid-row: 1 / span 6;
				grid-column: 1 / span 7;
				// height: auto !important;
			}

			.thumb-container {
				display: contents;
				margin-top: 0;
			}
		}
	}
}
</style>
