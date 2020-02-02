<template>
	<ul class="social-media" :class="listClass">
		<li class="social-icon">
			<a :href="instagramLink">
				<icon-base :class="iconClass" icon-name="Instagram">
					<icon-instagram />
				</icon-base>
				<span class="is-hidden-mobile">{{
					meta.social.instagram
				}}</span>
			</a>
		</li>
		<li class="social-icon">
			<a :href="facebookLink">
				<icon-base :class="iconClass" icon-name="Facebook">
					<icon-facebook />
				</icon-base>
				<span class="is-hidden-mobile">{{ meta.social.facebook }}</span>
			</a>
		</li>

		<li class="social-icon">
			<a :href="emailLink">
				<icon-base :class="iconClass" icon-name="Email">
					<icon-email />
				</icon-base>
				<span class="is-hidden-mobile">{{ meta.social.email }}</span>
			</a>
		</li>

		<li class="social-icon">
			<a :href="phoneLink">
				<icon-base :class="iconClass" icon-name="Phone">
					<icon-phone />
				</icon-base>
				<span class="is-hidden-mobile">{{ prettyPhone }}</span>
			</a>
		</li>
	</ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import IconBase from "@/components/icons/IconBase";
import IconFacebook from "@/components/icons/IconFacebook";
import IconEmail from "@/components/icons/IconEmail";
import IconInstagram from "@/components/icons/IconInstagram";
import IconPhone from "@/components/icons/IconPhone";

export default {
	name: "Home",
	components: {
		IconBase,
		IconFacebook,
		IconEmail,
		IconInstagram,
		IconPhone
	},

	props: {
		light: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		...mapState({
			meta: state => state.gallery.meta
		}),
		...mapGetters({
			instagramLink: "gallery/emailLink",
			facebookLink: "gallery/facebookLink",
			emailLink: "gallery/emailLink",
			phoneLink: "gallery/phoneLink",
			prettyPhone: "gallery/prettyPhone"
		}),
		listClass() {
			return {
				light: this.light
			};
		},
		iconClass() {
			return {
				light: this.light
			};
		}
	}
};
</script>

<style lang="scss" scoped>
ul.social-media {
	li.social-icon {
		display: flex;
		align-items: center;
		margin: 0 1em;

		a {
			display: flex;
			align-items: center;

			span {
				transition: color 0.2s;

				&:hover {
					color: $highlight-primary;
				}
			}
		}

		span {
			margin-left: 0.5em;
			color: $font-grey;
		}
	}

	&.light {
		li.social-icon {
			a span {
				color: $font-light;

				&:hover {
					color: $highlight-light;
				}
			}
		}
	}
}
</style>
