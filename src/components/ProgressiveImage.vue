<template>
  <div class="progressive-image">
    <transition name="progressive-image-fade">
      <img v-if="loaded" :src="src" ref="main">
    </transition>
    <svg v-if="!loaded" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'progressive-image',
    props: {
      src: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        loaded: false,
        image: null
      }
    },
    computed: {},
    watch: {
      src () {
        this.loadImage()
      }
    },
    mounted () {
      this.loadImage()
    },
    methods: {
      loadImage: function () {
        const image = new Image()
        this.image = null

        image.onload = () => {
          this.image = this.src
          this.loaded = true
          this.$emit('onLoad', image.src)
        }

        image.src = this.src
      }
    }
  }
</script>
