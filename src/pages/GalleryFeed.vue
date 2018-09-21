<template>
  <section class="feed left">
    <div class="container">
      <transition-group name="feed-fade" tag="div" class="columns is-multiline is-mobile is-centered" v-if="this.feed.length > 0">
        <div v-for="post in feed" class="preview column is-one-third-desktop is-half-mobile"
             :key="post.id">
          <div class="feed-card">
            <router-link class="preview-title" :to="`/gallery/${post.uid}`" @click.native="scrollTo(0, 200, 0)">
              <progressive-background class="preview-figure" :src="post.images[0]['image']['url']"/>
              <div class="feed-card-title">
                <h2>{{ post.title }}</h2>
              </div>
            </router-link>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
  import ProgressiveBackground from '../components/ProgressiveBackground'
  import {scrollTo} from '../helpers'
  import {mapState} from 'vuex'

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
      scrollTo,
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
