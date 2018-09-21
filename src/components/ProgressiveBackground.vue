<template>
  <div class="progressive-background" :class="imageClass">
    <transition name="progressive-image-fade">
      <img v-if="loaded" :src="src" ref="main">
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'progressive-background',
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
    computed: {
      imageClass () {
        return {
          loading: !this.loaded
        }
      },
      imageStyle () {
        return {
          backgroundImage: this.image ? 'url(' + this.image + ')' : ''
        }
      }
    },
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
