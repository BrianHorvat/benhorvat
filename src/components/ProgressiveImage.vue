<template>
	<div class="progressive-image">
		<transition name="progressive-image-fade">
			<img v-show="loaded" ref="main" :src="src" />
		</transition>
		<svg
			v-if="!loaded"
			class="spinner"
			viewBox="0 0 66 66"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				class="path"
				fill="none"
				stroke-width="6"
				stroke-linecap="round"
				cx="33"
				cy="33"
				r="30"
			></circle>
		</svg>
	</div>
</template>

<script>
import ProgressiveImageLoader from "@/components/mixins/ProgressiveImageLoader";

export default {
	name: "ProgressiveImage",

	mixins: [ProgressiveImageLoader]
};
</script>
