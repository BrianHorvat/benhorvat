<template>
  <section class="testimonials right">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1>Testimonials</h1>
          <div class="testimonials-content" v-html="testimonials.flavorText"></div>
          <div class="testimonials-list">
            <div v-for="testimonial in testimonials.testimonials" :key="testimonial.name" class="testimonial">
              <progressive-image :src="testimonial.picture" class="testimonial-picture"/>
              <div class="testimonial-description">
                <h3>{{ testimonial.name }}</h3>
                <h4>{{ testimonial.service }}</h4>
                <div v-html="testimonial.quote" class="quote"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import ProgressiveImage from '../components/ProgressiveImage.vue'

  export default {
    name: 'gallery-testimonials',
    resource: 'GalleryTestimonials',
    components: {ProgressiveImage},

    computed: {
      ...mapState(['testimonials'])
    },
    metaInfo: {
      title: 'Testimonials'
    },
    beforeMount () {
      this.$getResource('testimonials').then(testimonials => { this.$store.commit('testimonials', testimonials) })
    }
  }
</script>