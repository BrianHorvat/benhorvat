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
			<ul class="front-video__social social-media light">
				<li class="social-icon">
					<a :href="this.$store.getters['gallery/instagramLink']">
						<icon-base class="light" icon-name="Instagram">
							<icon-instagram />
						</icon-base>
						<span class="is-hidden-mobile">{{
							meta.social.instagram
						}}</span>
					</a>
				</li>
				<li class="social-icon">
					<a :href="this.$store.getters['gallery/facebookLink']">
						<icon-base class="light" icon-name="Facebook">
							<icon-facebook />
						</icon-base>
						<span class="is-hidden-mobile">{{
							meta.social.facebook
						}}</span>
					</a>
				</li>

				<li class="social-icon">
					<a :href="this.$store.getters['gallery/emailLink']">
						<icon-base class="light" icon-name="Email">
							<icon-email />
						</icon-base>
						<span class="is-hidden-mobile">{{
							meta.social.email
						}}</span>
					</a>
				</li>

				<li class="social-icon">
					<a :href="this.$store.getters['gallery/phoneLink']">
						<icon-base class="light" icon-name="Phone">
							<icon-phone />
						</icon-base>
						<span class="is-hidden-mobile">{{
							this.$store.getters["gallery/prettyPhone"]
						}}</span>
					</a>
				</li>
			</ul>
		</div>
		<Feed class="container" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import IconBase from "@/components/icons/IconBase";
import IconFacebook from "@/components/icons/IconFacebook";
import IconEmail from "@/components/icons/IconEmail";
import IconInstagram from "@/components/icons/IconInstagram";
import IconPhone from "@/components/icons/IconPhone";
import Feed from "@/components/Feed.vue";

export default {
	name: "Home",
	components: {
		IconBase,
		IconFacebook,
		IconEmail,
		IconInstagram,
		IconPhone,
		Feed
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
