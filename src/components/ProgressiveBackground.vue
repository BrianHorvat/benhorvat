<template>
	<div class="progressive-background" :class="imageClass">
		<transition name="progressive-image-fade">
			<img v-show="loaded" ref="main" :src="src" />
		</transition>
	</div>
</template>

<script>
import ProgressiveImageLoader from "./mixins/ProgressiveImageLoader.js";

export default {
	name: "ProgressiveBackground",

	mixins: [ProgressiveImageLoader],

	computed: {
		imageClass() {
			return {
				loading: !this.loaded
			};
		},
		imageStyle() {
			return {
				backgroundImage: this.image ? "url(" + this.image + ")" : ""
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.progressive-background {
	position: relative;
	overflow: hidden;

	&.loading {
		animation: pulse 2s infinite $transition;
	}

	img {
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
	}
}

@keyframes pulse {
	0% {
		background-color: #888;
	}
	50% {
		background-color: #555;
	}
	100% {
		background-color: #888;
	}
}

.progressive-image-fade {
	&-enter-active,
	&-leave-active {
		transition: all 200ms $transition;
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}

	&-leave,
	&-enter-to {
		opacity: 1;
	}
}
</style>
