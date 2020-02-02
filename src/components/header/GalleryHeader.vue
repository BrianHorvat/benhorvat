<template>
	<header
		class="header"
		:class="{ transparent: $route.meta.transparentHeader }"
	>
		<nav class="nav">
			<mq-layout mq="desktop+" class="nav-bar desktop">
				<div class="nav-line"></div>
				<div class="nav-menu left">
					<div class="nav-item">
						<router-link :to="{ name: 'portfolio' }"
							>Portfolio</router-link
						>
					</div>
					<div class="nav-item">
						<router-link :to="{ name: 'services' }"
							>Services</router-link
						>
					</div>
				</div>
				<div class="nav-item site-title">
					<router-link to="/">
						<span>Benjamin Horvat</span>
						<span>Photography</span>
					</router-link>
				</div>
				<div class="nav-menu right">
					<HeaderDropdown label="Information">
						<router-link :to="{ name: 'about' }"
							>About Me</router-link
						>
						<router-link :to="{ name: 'process' }"
							>The Process</router-link
						>
						<router-link :to="{ name: 'testimonials' }"
							>Testimonials</router-link
						>
					</HeaderDropdown>
					<div class="nav-item">
						<router-link :to="{ name: 'contact' }"
							>Contact</router-link
						>
					</div>
				</div>
				<div class="nav-line"></div>
			</mq-layout>

			<mq-layout :mq="['mobile', 'tablet']" class="nav-bar mobile">
				<div class="nav-item site-title">
					<router-link to="/">
						<span>Benjamin Horvat</span>
						<span>Photography</span>
					</router-link>
				</div>
				<div class="nav-menu">
					<div class="nav-item">
						<router-link :to="{ name: 'portfolio' }"
							>Portfolio</router-link
						>
					</div>
					<div class="nav-item">
						<router-link :to="{ name: 'services' }"
							>Services</router-link
						>
					</div>
					<div class="nav-item">
						<router-link :to="{ name: 'about' }"
							>About Me</router-link
						>
					</div>
					<div class="nav-item">
						<router-link :to="{ name: 'process' }"
							>The Process</router-link
						>
					</div>
					<div class="nav-item">
						<router-link :to="{ name: 'testimonials' }"
							>Testimonials</router-link
						>
					</div>
					<div class="nav-item">
						<router-link :to="{ name: 'contact' }"
							>Contact</router-link
						>
					</div>
				</div>
			</mq-layout>
		</nav>
	</header>
</template>

<script>
import { mapState } from "vuex";
import HeaderDropdown from "./HeaderDropdown";

export default {
	name: "GalleryHeader",

	components: { HeaderDropdown },

	computed: {
		...mapState({
			meta: state => state.gallery.meta
		})
	}
};
</script>

<style lang="scss" scoped>
.header {
	background: $header-bg;
	background-size: cover;
	background-position: center;

	transition: 0.2s all;

	height: var(--header-height);

	position: absolute;
	width: 100%;
	z-index: 10;

	--header-title-bg-hover: #{$header-title-bg-hover};
	--header-title-bg-focus: #{$header-title-bg-hover};

	.nav {
		height: 100%;

		.nav-bar.mobile {
			.nav-menu {
				overflow-x: auto;
				white-space: nowrap;
				-webkit-overflow-scrolling: touch;
				-ms-overflow-style: -ms-autohiding-scrollbar;

				&::-webkit-scrollbar {
					display: none;
				}

				.nav-item {
					white-space: nowrap;
					flex-grow: 0;

					&:before,
					&:after {
						display: none;
					}
				}
			}
		}

		.nav-bar.desktop {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			flex: 1;
			height: 100%;
		}

		.nav-item::v-deep {
			display: flex;
			align-items: center;
			flex: 1;
			position: relative;

			a,
			span {
				display: flex;
				align-items: center;
				color: $header-font-color;
				font-variant: small-caps;
				padding: 1em;
				transition: background 0.2s;
			}

			a {
				&:visited,
				&:hover,
				&:focus {
					color: $header-font-color;
				}

				&:hover {
					background: var(--header-title-bg-hover);
				}

				&:focus {
					background: var(--header-title-bg-focus);
				}
			}
		}
		.site-title {
			a {
				border: $header-border-width solid $header-border-color;
				font-size: 1.3em;
				font-family: $accent-font-family;
				text-align: center;
				text-transform: uppercase;
				color: $header-font-color;

				padding: 1em;

				flex-direction: column;

				span {
					padding: 0;
					white-space: nowrap;
				}
			}
		}

		.nav-menu {
			display: flex;
			flex-direction: row;
			flex: 1;
			align-items: center;

			.nav-item:first-child {
				margin-left: auto;
			}

			.nav-item:last-child {
				margin-right: auto;
			}
		}

		#back {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;

			padding: 1em;

			svg {
				height: 1.25em;
				opacity: 0.87;
				fill: $header-font-color;
			}

			&:hover {
				background: $header-title-bg-hover;
			}

			&:focus {
				background: $header-title-bg-focus;
			}

			&.fade-enter-active,
			&.fade-leave-active {
				transition: opacity 0.2s;
			}

			&.fade-enter,
			&.fade-leave-to {
				opacity: 0;
			}
		}

		.nav-line,
		.nav-item:before,
		.nav-item:after {
			height: $header-border-width;
			background-color: $header-border-color;

			width: auto;
			display: block;
			flex: 1;
		}

		.nav-item:before,
		.nav-item:after {
			content: "";
			min-width: 2em;
		}
	}

	&.transparent {
		background: none;

		--header-title-bg-hover: #{$header-title-bg-hover-transparent};
		--header-title-bg-focus: #{$header-title-bg-hover-transparent};
	}
}

/***
 ***/
</style>
