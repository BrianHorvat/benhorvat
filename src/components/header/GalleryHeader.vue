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
