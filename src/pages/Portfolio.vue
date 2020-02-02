<template>
	<section id="portfolio" class="page">
		<section id="portfolio-container" class="container">
			<figure
				v-for="(post, index) in posts.filter(post =>
					post.tags.some(tag => tag === 'portfolio')
				)"
				:key="post.id"
				class="post"
			>
				<router-link :to="{ name: 'post', params: { post: post.uid } }">
					<ProgressiveBackground
						:src="post.images[0]['url']"
						class="post_image"
					/>
					<figcaption class="post_caption">
						<h2 v-if="index === 0" class="post_title">
							{{ post.title }}
						</h2>
						<h3 v-else>{{ post.title }}</h3>
						<button v-if="index === 0">
							<span>View Collection</span>
							<IconBase class="light"><IconForward /></IconBase>
						</button>
					</figcaption>
				</router-link>
			</figure>
		</section>
	</section>
</template>

<script>
import { mapState } from "vuex";
import ProgressiveBackground from "@/components/ProgressiveBackground";

import IconBase from "@/components/icons/IconBase";
import IconForward from "@/components/icons/IconForward";

export default {
	name: "Portfolio",

	components: { ProgressiveBackground, IconBase, IconForward },

	computed: {
		...mapState({
			posts: state => state.feed.posts,
			front: state => state.gallery.front,
			meta: state => state.gallery.meta
		})
	},

	created() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.$store.dispatch("feed/getFeed");
		}
	},

	metaInfo: {
		title: "Portfolio"
	}
};
</script>

<style lang="scss" scoped>
#portfolio-container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1em;

	figure.post {
		position: relative;

		a {
			height: 100%;
		}

		div.post_image {
			padding-bottom: 125%;
		}

		figcaption.post_caption {
			padding: 0.75em;
			color: black;

			button {
				border-radius: 5px;
				background: rgba(255, 255, 255, 0.4);
				color: white;
				text-transform: uppercase;
				margin-top: 0.5em;
			}
		}

		&:first-child {
			grid-column: 1 / span 3;
			height: 750px;

			div.post_image {
				height: 100%;
				padding-bottom: 0%;
			}

			figcaption.post_caption {
				padding: 2em;
				color: white;
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 1;
			}

			h2 {
				filter: drop-shadow(0px 2px 6px black);
			}
		}
	}
}
</style>
