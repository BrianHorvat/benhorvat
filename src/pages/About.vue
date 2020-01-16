<template>
	<section id="about" class="page">
		<div class="container">
			<div class="about-grid is-two-thirds">
				<div>
					<h1>About Me</h1>
					<div class="about-content" v-html="about.content"></div>
				</div>
				<div>
					<progressive-background
						:src="about.picture"
						class="profile-picture"
					/>
					<h4 class="profile-name">Ben</h4>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import ProgressiveBackground from "@/components/ProgressiveBackground";
import { mapState } from "vuex";

export default {
	components: { ProgressiveBackground },

	computed: {
		...mapState({
			about: state => state.info.about
		})
	},

	created() {
		this.$store.dispatch("info/getAbout");
	},

	metaInfo: {
		title: "About"
	}
};
</script>
