<template>
  <section class="about">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1>About Me</h1>
          <div class="about-content" v-html="about.content"></div>
        </div>
        <div class="column is-2">
          <progressive-background :src="about.picture" class="profile-picture"/>
          <h4 class="profile-name">Ben</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressiveBackground from '../components/ProgressiveBackground.vue'
import { mapState } from 'vuex'

export default {
  name: 'gallery-about',
  resource: 'GalleryAbout',
  components: { ProgressiveBackground },

  computed: {
    ...mapState({
      about: state => state.about.data
    })
  },

  created() {
    this.$store.dispatch("info/getAbout")
  },

  metaInfo: {
    title: 'About'
  }
}
</script>
