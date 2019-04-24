<template>
  <section id="process">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1>The Process</h1>
          <div class="process-content">
            <div v-for="(part, key) in process" :key="key">
              <template v-if="part.text">
                <div v-for="(textPart, textKey) in part.text" :key="textKey" v-html="textPart"></div>
              </template>
              <div v-if="part.images">
                <image-gallery :images="part.images"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImageGallery from "@/components/galleries/ImageGallery"
import { mapState } from 'vuex'

export default {
  name: 'gallery-process',
  components: { ImageGallery },

  computed: {
    ...mapState({
      process: state => state.info.process
    })
  },

  created() {
    this.$store.dispatch("info/getProcess")
  },

  metaInfo: {
    title: 'The Process'
  }
}
</script>
