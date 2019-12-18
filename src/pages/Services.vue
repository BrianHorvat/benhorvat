<template>
	<section id="services">
		<div>Services</div>
	</section>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			posts: state => state.feed.posts,
			sorts: state => state.gallery.sorts,
			front: state => state.gallery.front,
			meta: state => state.gallery.meta
		})
	},

	methods: {},

	metaInfo: {
		title: "Services"
	}
};
</script>
