<template>
	<div class="nav-item has-dropdown">
		<span
			>{{ label }}<IconBase class="light"><IconDropdown /></IconBase
		></span>
		<div class="nav-dropdown">
			<slot />
		</div>
	</div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconDropdown from "@/components/icons/IconDropdown";

export default {
	components: {
		IconBase,
		IconDropdown
	},
	props: {
		label: {
			type: String,
			default: ""
		}
	}
};
</script>

<style lang="scss" scoped>
.nav-item.has-dropdown {
	span {
		cursor: default;

		svg {
			margin-left: 0.25em;
			margin-right: -0.25em;
		}
	}

	&:hover span {
		background: var(--header-title-bg-hover);
	}

	&:hover {
		.nav-dropdown {
			visibility: visible;
			opacity: 1;
		}
	}
}

.nav-dropdown {
	display: flex;
	flex-direction: column;

	position: absolute;
	top: 100%;
	width: 100%;
	z-index: 9999;

	visibility: hidden;
	opacity: 0;

	background: $header-dropdown-bg;
	box-shadow: $header-dropdown-shadow;
	border-radius: $corner-radius;
	transition: all 0.15s;
}
</style>
