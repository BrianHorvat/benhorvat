<template>
	<footer class="footer">
		<SocialIcons />
		<span class="copyright"
			>&copy; 2017-{{ currentYear }}, {{ meta.title }}</span
		>
	</footer>
</template>

<script>
import { mapState } from "vuex";
import SocialIcons from "@/components/SocialIcons";

export default {
	name: "GalleryFooter",
	components: {
		SocialIcons
	},

	computed: {
		...mapState({
			meta: state => state.gallery.meta
		}),
		currentYear() {
			return new Date().getFullYear();
		}
	}
};
</script>

<style lang="scss" scoped>
footer.footer {
	display: flex;
	flex-direction: column;

	background: $footer-bg;
	padding: 1em 0;
	margin-top: 1em;

	position: relative;
	align-items: center;
	justify-content: center;

	ul.social-media {
		display: flex;
		justify-content: center;
		margin: 1em 0;

		li.social-icon {
			margin: 0 0.5em;
		}
	}

	span.copyright {
		color: $footer-copy-color;
		text-align: center;

		display: block;
		margin: 1em 0;
	}
}
</style>
