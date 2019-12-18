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
			this.$refs.lightbox.open();
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
