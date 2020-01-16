<template>
	<section id="portfolio" class="page">
		<Feed />
	</section>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Portfolio",
	computed: {
		...mapState({
			posts: state => state.feed.posts,
			front: state => state.gallery.front,
			meta: state => state.gallery.meta
		})
	},

	methods: {},

	metaInfo: {
		title: "Portfolio"
	}
};
</script>
