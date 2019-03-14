<template>
  <transition-group tag="section" class="feed container" name="feed">
    <div v-for="section in feed" :key="section.category.uid" class="feed-category">
      <h2>{{ section.category.title }}</h2>
      <div class="feed-grid">
        <div v-for="post in section.posts" :key="post.id" class>
          <div class="feed-card">
            <router-link :to="{name: 'post', params: {post: post.uid}}">
              <progressive-background
                class="feed-card__image"
                :src="post.images[0]['url']"
              />
              <div class="feed-card__title">
                <h4>{{ post.title }}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import ProgressiveBackground from '../components/ProgressiveBackground'
import { mapState } from 'vuex'

export default {
  name: 'gallery-feed',
  resource: 'GalleryFeed',
  components: { ProgressiveBackground },

  computed: {
    feed() {
      return this.sorts.filter(sort => {
        if (this.$route.params.category) {
          return this.$route.params.category === sort.uid
        } else {
          return true
        }
      }).map(category => {
        return {
          category,
          posts: this.posts.filter(post =>
            post.tags.some(postTag => category.tags.indexOf(postTag) !== -1)
          )
        }
      })
    },
    ...mapState({
      posts: state => state.feed.posts,
      sorts: state => state.gallery.sorts
    })
  },

  methods: {},

  created() {
    this.$store.dispatch('feed/getFeed')
  },

  metaInfo: {
    title: 'Gallery'
  }
}
</script>
