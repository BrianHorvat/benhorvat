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

<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins.sass";

.feed {
	.feed-category {
		margin-top: 2em;
	}

	.feed-category-title {
		margin-left: 0.5rem;
		margin-bottom: 0.5em;
		font-size: 1.8rem;
		text-transform: uppercase;
	}

	.feed-grid {
		display: grid;
		--feed-grid-width: #{$feed-grid-width-desktop};
		grid-template-columns: repeat(var(--feed-grid-width), 1fr);
		grid-gap: 1em;

		@include mobile {
			--feed-grid-width: #{$feed-grid-width-mobile};
		}

		&__category {
			display: contents;
		}
	}

	.feed-card {
		// transition: 0.2s all;

		// &:hover {
		// 	filter: $feed-card-shadow-hover
		// }

		&__image {
			filter: $feed-card-shadow;

			background-size: cover;
			background-position: center;
			border-radius: $corner-radius;

			height: 0;
			padding-bottom: 100%;

			img {
				object-position: 50% 30%;
			}
		}

		&__title {
			color: $highlight-primary;
			padding: 0.75rem;
		}
	}
}
</style>
