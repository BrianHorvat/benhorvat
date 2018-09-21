<template>
  <section class="post right">
    <div v-if="post" class="container">
        <div class="columns is-centered">
          <div v-if="description" class="column is-one-third">
            <h1>{{ title }}</h1>
            <div class="post-desc" v-html="description"></div>
          </div>
          <div class="column is-two-thirds">
            <h1 v-if="!description">{{ title }}</h1>
            <image-gallery :images="images" :aspectRatio="0.75">asdsad</image-gallery>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
  import {kebabify, prettyDate} from '../helpers'
  import ImageGallery from '../components/ImageGallery.vue'

  function defaultData () {
    return {
      title: '',
      content: '',
      published: '',
      description: ' ',
      images: [],
      order: 0
    }
  }

  export default {
    name: 'gallery-post',
    components: {ImageGallery},
    resource: 'GalleryPost',
    props: {post: String},

    data () {
      return defaultData()
    },

    computed: {},

    watch: {
      post (to, from) {
        if (to === from || !this.post) return

        this.resetData()
        this.$getResource('post', to)
      }
    },

    methods: {
      kebabify,
      prettyDate,
      resetData () {
        Object.assign(this.$data, defaultData())
      }
    },

    beforeMount () {
      if (!this.post) return

      this.$getResource('post', this.post)
    },

    metaInfo () {
      return {
        title: this.title ? this.title : 'Loading'
      }
    }
  }
</script>
