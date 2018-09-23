<template>
  <section class="feed left">
    <transition-group name="feed-fade" tag="div" class="container feed-grid">
      <div v-for="post in feed" :key="post.id" class="feed-card">
          <router-link :to="`/gallery/${post.uid}`">
            <progressive-background class="feed-card__image" :src="post.images[0]['image']['url']"/>
            <div class="feed-card__title">
              <h4>{{ post.title }}</h4>
            </div>
          </router-link>
      </div>
    </transition-group>
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
      filters () {
        let filters = {}

        if (this.category) {
          filters.tags = this.sorts[this.category] ? this.sorts[this.category].tags : []
        } else {
          filters.main = true
        }

        return filters
      },
      feed () {
        const filterBy = {
          tags: (filter, post) => {
            return post.tags.some(r => filter.includes(r))
          },
          main: (filter, post) => {
            return post.hideFront !== filter
          }
        }

        return this.posts.filter(post => {
          return Object.keys(this.filters).every(filter => {
            return filterBy[filter](this.filters[filter], post)
          })
        })
      },
      ...mapState([
        'sorts',
        'posts'
      ])
    },

    methods: {
      getBgImg (src) {
        return {backgroundImage: `url(${src})`}
      },
      stackPosts (posts) {
        let interval
        const stack = () => {
          this.posts.push(posts.shift())
          if (!posts.length) {
            clearInterval(interval)
          }
        }
        interval = setInterval(stack, 125)
      }
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
