<template>
	<div>
		<gallery-header />
		<section class="main">
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
	}
};
</script>
