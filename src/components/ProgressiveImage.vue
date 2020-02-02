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

<style lang="scss" scoped>
.progressive-image {
	width: 100%;
	height: 100%;
	display: flex;
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

$offset: 187;
$duration: 1.4s;

.spinner {
	margin: auto;
	width: 4em;

	animation: rotator $duration linear infinite;
}

@keyframes rotator {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(270deg);
	}
}

.path {
	stroke-dasharray: $offset;
	stroke-dashoffset: 0;
	transform-origin: center;
	animation: dash $duration ease-in-out infinite,
		colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
	0% {
		stroke: #999;
	}
	25% {
		stroke: #555;
	}
	50% {
		stroke: #999;
	}
	75% {
		stroke: #555;
	}
	100% {
		stroke: #999;
	}
}

@keyframes dash {
	0% {
		stroke-dashoffset: $offset;
	}
	50% {
		stroke-dashoffset: $offset/4;
		transform: rotate(135deg);
	}
	100% {
		stroke-dashoffset: $offset;
		transform: rotate(450deg);
	}
}
</style>
