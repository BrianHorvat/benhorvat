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
