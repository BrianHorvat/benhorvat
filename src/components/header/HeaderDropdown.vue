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
