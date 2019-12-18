<template>
	<div class="feed">
		<div v-if="feed.length > 0">
			<section
				v-for="section in feed"
				:key="section.category.uid"
				class="feed-category"
			>
				<h2 class="feed-category-title">
					{{ section.category.title }}
				</h2>
				<div class="feed-grid">
					<div
						v-for="post in section.posts"
						:key="post.id"
						class="feed-card"
					>
						<router-link
							:to="{ name: 'post', params: { post: post.uid } }"
						>
							<ProgressiveBackground
								class="feed-card__image"
								:src="post.images[0]['url']"
							/>
							<div class="feed-card__title">
								<h4>{{ post.title }}</h4>
							</div>
						</router-link>
					</div>
				</div>
			</section>
		</div>
		<div v-else></div>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ProgressiveBackground from "@/components/ProgressiveBackground";

export default {
	components: { ProgressiveBackground },

	props: {
		sort: {
			type: String,
			default: null
		}
	},

	computed: {
		...mapState({
			posts: state => state.feed.posts
		}),

		...mapGetters({
			feed: "feed/feed"
		})
	},

	created() {
		this.$store.dispatch("feed/getFeed");
	}
};
</script>

<style></style>
