<template>
	<section class="post">
		<div v-if="post" class="post-container container">
			<h1 class="post-title">{{ post.title }}</h1>
			<div v-if="post.description" class="post-description">
				<div class="post-desc" v-html="post.description"></div>
				<div class="booking-reminder">
					<h4>Don't let the moments slip away</h4>
					<p>
						Don't hestitate to reach out; help me make a moment last
						a lifetime.
					</p>
					<p>
						<router-link :to="{ name: 'contact' }"
							>Get in touch</router-link
						>
						or send me an email at
						<a :href="'mailto:' + meta.social.email">{{
							meta.social.email
						}}</a
						>.
					</p>
				</div>
			</div>
			<div class="post-gallery">
				<image-gallery :images="post.images" />
			</div>
		</div>
		<div v-else class="post-container container"></div>
	</section>
</template>

<script>
import ImageGallery from "@/components/galleries/ImageGallery";
import { mapState, mapGetters } from "vuex";

export default {
	name: "Gallery",
	components: { ImageGallery },
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
