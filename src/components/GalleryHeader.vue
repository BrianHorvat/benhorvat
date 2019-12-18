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
					<div class="nav-item has-dropdown">
						<span
							>Information<IconBase class="light"
								><IconDropdown /></IconBase
						></span>
						<div class="nav-dropdown">
							<router-link :to="{ name: 'about' }"
								>About Me</router-link
							>
							<router-link :to="{ name: 'process' }"
								>The Process</router-link
							>
							<router-link :to="{ name: 'testimonials' }"
								>Testimonials</router-link
							>
						</div>
					</div>
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
import IconBase from "../components/icons/IconBase";
import IconDropdown from "../components/icons/IconDropdown";

export default {
	name: "GalleryHeader",

	components: { IconBase, IconDropdown },

	computed: {
		...mapState({
			meta: state => state.gallery.meta
		})
	}
};
</script>
