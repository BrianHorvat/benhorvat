<template>
	<section id="error-not-found">
		<div id="message">
			<h1>Page not found</h1>
			<p>Sorry, that page couldn't be found.</p>
			<router-link id="home" :to="{ name: 'home' }">
				<icon-base icon-name="Home"><icon-home /></icon-base
				>Home</router-link
			>
		</div>
	</section>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconHome from "@/components/icons/IconHome";

export default {
	name: "404",
	components: {
		IconBase,
		IconHome
	},

	metaInfo: {
		title: "Page not found"
	}
};
</script>

<style lang="scss" scoped>
#error-not-found {
	#message {
		max-width: 30em;
		text-align: center;
	}

	#home {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
