<template>
  <section id="testimonials">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <h1>Testimonials</h1>
          <div
            class="testimonials-content"
            v-html="testimonials.flavorText"
          ></div>
          <div class="testimonials-list">
            <div
              v-for="testimonial in testimonials.listings"
              :key="testimonial.name"
              class="testimonial"
            >
              <div class="testimonial-picture">
                <progressive-background :src="testimonial.image.url" />
              </div>
              <div class="testimonial-description">
                <h3>{{ testimonial.name }}</h3>
                <h5>{{ testimonial.service }}</h5>
                <div class="quote" v-html="testimonial.quote"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import ProgressiveBackground from "@/components/ProgressiveBackground";

export default {
  name: "GalleryTestimonials",
  resource: "GalleryTestimonials",
  components: { ProgressiveBackground },

  computed: {
    ...mapState({
      testimonials: state => state.info.testimonials
    })
  },

  created() {
    this.$store.dispatch("info/getTestimonials");
  },

  metaInfo: {
    title: "Testimonials"
  }
};
</script>
