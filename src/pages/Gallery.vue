<template>
	<section class="page post">
		<div v-if="post" class="post-container container">
			<h1 class="post-title">{{ post.title }}</h1>
			<CardGallery :images="post.images" />
			<!-- <div class="image-gallery">
				<div class="thumb-container">
					<progressive-background
						v-for="image in post.images"
						:key="image.id"
						:src="image.url"
						class="thumb"
						tabindex="0"
					/>
				</div>
			</div> -->
			<div v-if="post.description" class="post-de">
				<div class="post-desc" v-html="post.description"></div>
				<div class="booking-reminder">
					<a><button>Contact me</button></a>
					<a><button>Email me</button></a>
				</div>
			</div>
		</div>
		<div v-else class="post-container container"></div>
	</section>
</template>

<script>
// import ImageGallery from "@/components/galleries/ImageGallery";
// import ProgressiveBackground from "@/components/ProgressiveBackground";
import CardGallery from "@/components/galleries/CardGallery";
import { mapState, mapGetters } from "vuex";

export default {
	name: "Gallery",
	// components: { ImageGallery },
	components: { CardGallery },
	computed: {
		...mapState({
			meta: state => state.gallery.meta
		}),
		...mapGetters({
			post: "feed/getPost"
		}),
		post() {
			return this.$store.getters["feed/getPost"](this.$route.params.post);
		}
	},
	watch: {
		$route: "fetchData"
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.$store.dispatch("feed/getFeed");
		}
	},
	metaInfo() {
		const title = this?.post?.title ?? "Loading";

		return {
			title
		};
	}
};
</script>

<style lang="scss" scoped>
.post {
	.post-container {
		display: grid;
		grid-template-columns: 10fr 4fr;
		gap: 0 2em;

		.post-title {
			grid-column: 1 / span 2;
			margin-bottom: 0.25em;
			// margin-bottom: 0.5em;
		}

		.post-desc::v-deep p {
			line-height: 1.75;
			font-size: 1.1em;
		}

		// @include mobile {
		// 	grid-template-columns: none;

		// 	.post-title {
		// 		order: 1;
		// 	}

		// 	.post-description {
		// 		order: 3;
		// 	}

		// 	.post-gallery {
		// 		grid-column-start: 1;
		// 		grid-row: unset;
		// 		order: 2;
		// 	}
		// }
	}

	.booking-reminder {
		margin-top: 1em;

		button {
			width: 100%;
			margin-bottom: 1em;

			border: 1px solid lightgray;
		}
	}
}
</style>
