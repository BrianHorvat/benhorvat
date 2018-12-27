<template>
  <section class="feed left container">
    <div v-for="section in feed" :key="section.category.id" class="feed-category">
      <h2>{{ section.category.title }}</h2>
      <div class="columns is-multiline is-mobile is-centered">
        <div v-for="post in section.posts" :key="post.id" class="column is-one-third-tablet is-half-mobile is-centered">
          <div class="feed-card">
            <router-link :to="`/gallery/${post.uid}`">
              <progressive-background class="feed-card__image" :src="post.images[0]['image']['url']"/>
              <div class="feed-card__title">
                <h4>{{ post.title }}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ProgressiveBackground from '../components/ProgressiveBackground'
  import { mapState } from 'vuex'

  export default {
    name: 'gallery-feed',
    resource: 'GalleryFeed',
    components: {ProgressiveBackground},

    props: {
      category: {
        type: String,
        default: ''
      }
    },

    computed: {
      feed() {
        return this.sorts.map(category => {
          return {
            category,
            posts: this.posts.filter(post => post.tags.some(postTag => category.tags.indexOf(postTag) !== -1))
          }
        })
      },
      ...mapState([
        'sorts',
        'posts'
      ])
    },

    methods: {
    },

    beforeMount () {
      this.$getResource('feed').then(feed => {
        let posts = feed.sort(function (a, b) {
          return b.order - a.order
        })

        this.$store.commit('posts', posts)
      })
    },

    metaInfo: {
      title: 'Gallery'
    }
  }
</script>
