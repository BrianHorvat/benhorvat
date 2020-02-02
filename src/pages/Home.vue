<template>
	<section id="home">
		<div class="front-video">
			<video playsinline autoplay loop muted>
				<source
					v-if="front.video.desktop.mp4.url"
					:src="front.video.desktop.mp4.url"
					type="video/mp4"
				/>
				<source
					v-if="front.video.desktop.webm.url"
					:src="front.video.desktop.webm.url"
					type="video/webm"
				/>
			</video>
			<div class="front-video__overlay top"></div>
			<div class="front-video__overlay bottom"></div>
			<SocialIcons class="front-video__social" :light="true" />
		</div>
		<Feed class="container" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import Feed from "@/components/Feed.vue";
import SocialIcons from "@/components/SocialIcons.vue";

export default {
	name: "Home",
	components: {
		Feed,
		SocialIcons
	},

	computed: {
		...mapState({
			front: state => state.gallery.front,
			meta: state => state.gallery.meta
		})
	},

	methods: {},

	metaInfo: {
		title: "Gallery"
	}
};
</script>

<style lang="scss" scoped>
$front-video-shadow: 0 5px 10px rgba(0, 0, 0, 0.05),
	0 15px 40px rgba(0, 0, 0, 0.2);

.front-video {
	width: 100%;
	height: 70vh;
	margin-bottom: 4em;

	overflow: hidden;
	position: relative;

	box-shadow: $front-video-shadow;

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__overlay {
		height: $header-height * 4;
		width: 100%;
		position: absolute;

		&.top {
			top: 0;

			&:before,
			&:after {
				display: block;
				content: "";
				position: absolute;
				width: 100%;
				top: 0;
			}

			&:before {
				height: $header-height * 3;
				background: linear-gradient(
					180deg,
					rgba(0, 0, 0, 0.5) 0%,
					rgba(255, 255, 255, 0) 100%
				);
			}

			&:after {
				height: $header-height * 4;
				background: linear-gradient(
					180deg,
					rgba(0, 0, 0, 0.1) 0%,
					rgba(255, 255, 255, 0) 100%
				);
			}
		}

		&.bottom {
			bottom: 0;

			&:before,
			&:after {
				display: block;
				content: "";
				position: absolute;
				width: 100%;
				bottom: 0;
			}

			&:before {
				height: $header-height * 3;
				background: linear-gradient(
					180deg,
					rgba(255, 255, 255, 0) 0%,
					rgba(0, 0, 0, 0.5) 100%
				);
			}

			&:after {
				height: $header-height * 4;
				background: linear-gradient(
					180deg,
					rgba(255, 255, 255, 0) 0%,
					rgba(0, 0, 0, 0.1) 100%
				);
			}
		}
	}

	&__social {
		position: absolute;
		bottom: 0;
		margin: 2em 0;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		li.social-icon {
			margin: 0 0.5em;
		}
	}
}
</style>
