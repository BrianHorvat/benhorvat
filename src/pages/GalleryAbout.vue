<template>
  <section class="about right">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1>About Me</h1>
          <div class="about-content" v-html="about.content"></div>
        </div>
        <div class="column is-2 profile-pic">
          <img :src="about.picture"/>
          <h4>Ben</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'gallery-about',
    resource: 'GalleryAbout',

    computed: {
      ...mapState(['about'])
    },
    metaInfo: {
      title: 'About'
    },
    beforeMount () {
      this.$getResource('about').then(about => { this.$store.commit('about', about) })
    }
  }
</script>
