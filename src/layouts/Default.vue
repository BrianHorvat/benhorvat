<template>
	<div>
		<gallery-header />
		<section class="main" :class="sectionClass">
			<slot />
		</section>
		<gallery-footer />
	</div>
</template>

<script>
import GalleryHeader from "@/components/GalleryHeader";
import GalleryFooter from "@/components/GalleryFooter";

export default {
	components: {
		GalleryHeader,
		GalleryFooter
	},
	computed: {
		sectionClass() {
			return {
				page: this.$route.meta.transparentHeader
			};
		}
	}
};
</script>
