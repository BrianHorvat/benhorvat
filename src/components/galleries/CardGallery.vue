<template>
	<div class="card-gallery">
		<div class="card-container">
			<progressive-background
				v-for="(image, index) in images"
				:key="image.id"
				ref="image"
				:src="image.url"
				class="card"
				:style="cardHeight"
				:class="cardVisible(index)"
				tabindex="0"
				@click.native="updateActiveToIndex(index)"
				@keyup.enter="updateActiveToIndex(index)"
			/>
		</div>
		<lightbox
			ref="lightbox"
			:ref-elem="activeElem"
			:images="images"
			:active-image="activeImage"
			@lightbox-open="lightboxShowing = true"
			@lightbox-close="lightboxShowing = false"
			@lightbox-page-left="updateActiveToLeft"
			@lightbox-page-right="updateActiveToRight"
		/>
	</div>
</template>

<script>
import Lightbox from "./Lightbox";
import ProgressiveBackground from "@/components/ProgressiveBackground";

export default {
	name: "CardGallery",
	components: {
		Lightbox,
		ProgressiveBackground
	},
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
			showLightbox: false,
			activeElem: null
		};
	},

	computed: {
		cardHeight() {
			return {
				"padding-top": Math.floor(this.aspectRatio * 100) + "%"
			};
		}
	},

	methods: {
		updateActiveToIndex(index) {
			this.activeImage = index;

			this.updateActiveElem();
			this.$refs.lightbox.openLightbox();
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
		cardVisible(index) {
			return {
				hidden: this.showLightbox && index === this.activeImage
			};
		},
		updateActiveElem() {
			this.activeElem =
				this.$refs?.image?.[this.activeImage].$refs.main ?? null;
		}
	}
};
</script>

<style lang="scss" scoped>
.card-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.5em;

	.card {
		cursor: pointer;

		&.hidden {
			background: black;

			&::v-deep img {
				visibility: hidden;
				opacity: 0;
			}
		}
	}
}
</style>
