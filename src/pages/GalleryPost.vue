<template>
  <section class="post right">
    <div v-if="!loading" class="container">
      <div class="columns is-centered">
        <div v-if="post.description" class="column is-one-third">
          <h1>{{ post.title }}</h1>
          <div class="post-desc" v-html="post.description"></div>
        </div>
        <div class="column is-two-thirds">
          <h1 v-if="!post.description">{{ post.title }}</h1>
          <image-gallery :images="post.images" :aspectRatio="0.75"></image-gallery>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImageGallery from "../components/ImageGallery.vue"
import { mapGetters } from 'vuex'

export default {
  name: "gallery-post",
  components: { ImageGallery },
  data() {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    post() {
      return this.$store.getters['feed/getPost'](this.$route.params.post)
    }
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

      this.$store.dispatch("feed/getFeed").then(() => this.loading = false)
    }
  },
  metaInfo() {
    return {
      title: this.loading ? "Loading" : this.post.title
    }
  }
}
</script>
