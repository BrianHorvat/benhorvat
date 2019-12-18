<template>
	<div id="app" class="gallery">
		<transition :name="pageTransition">
			<component :is="currentLayout">
				<router-view />
			</component>
		</transition>
	</div>
</template>

<script>
import GalleryHeader from "./components/GalleryHeader";
import GalleryFooter from "./components/GalleryFooter";

export default {
	name: "App",
	components: {
		GalleryHeader,
		GalleryFooter
	},
	metaInfo: {
		title: "Unknown",
		titleTemplate: "%s | Benjamin Horvat Photography"
	},
	data() {
		return {
			pageTransition: ""
		};
	},
	computed: {
		currentLayout() {
			return this.$route.meta.layout ?? "DefaultLayout";
		}
	},
	watch: {
		$route(to, from) {
			const toDepth = to.meta.depth;
			const fromDepth = from.meta.depth;
			this.pageTransition =
				toDepth < fromDepth ? "wipe-left" : "wipe-right";
		}
	},
	beforeMount() {
		this.$store.dispatch("gallery/getMeta");
		this.$store.dispatch("gallery/getSorts");
	}
};
</script>

<style lang="scss">
@import "./assets/sass/main.scss";
</style>
