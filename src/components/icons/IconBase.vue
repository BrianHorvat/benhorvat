<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:aria-labelledby="iconName"
		class="icon"
		role="presentation"
		viewBox="0 0 24 24"
	>
		<title :id="iconName" lang="en">{{ iconName }}</title>
		<slot />
	</svg>
</template>

<script>
export default {
	props: {
		iconName: {
			type: String,
			default: ""
		},
		width: {
			type: [Number, String],
			default: 24
		},
		height: {
			type: [Number, String],
			default: 24
		}
	}
};
</script>

<style lang="scss" scoped>
svg.icon {
	display: block;
	width: 1.25em;
	height: 1.25em;

	transition: fill 0.2s;

	border-radius: $corner-radius;

	fill: $font-grey;

	&:hover {
		fill: $highlight-primary;
	}

	&.light {
		fill: $font-light;

		&:hover {
			fill: $highlight-light;
		}
	}

	button & {
		&:first-child {
			margin-right: 0.5em;
		}

		&:last-child {
			margin-left: 0.5em;
		}
	}
}
</style>
