<template>
  <header class="header">
    <nav class="nav">
      <transition name="grow">
        <a v-if="this.$route.name !== 'home'" id="back" @click="navBack" tabindex="0">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg>
        </a>
      </transition>
      <mq-layout mq="mobile" class="nav-bar mobile">

      </mq-layout>
      <mq-layout mq="tablet+" class="nav-bar desktop">
        <div class="nav-line"></div>
        <div class="nav-menu left" :class="menuClass">
          <div v-for="sort in sorts" :key="sort.uid" class="nav-item" >
            <router-link :to="{name: 'category', params: { category: sort.uid } }" @click.native="menuClose">
              {{ sort.title }}
            </router-link>
          </div>
        </div>
        <div class="nav-item site-title">
          <router-link to="/" @click.native="menuClose">
            <span>Benjamin Horvat</span>
            <span>Photography</span>
          </router-link>
        </div>
        <div class="nav-menu right" :class="menuClass">
          <div class="nav-item">
            <span>Info</span>
            <div class="nav-dropdown">
              <router-link :to="{name: 'about'}" @click.native="menuClose">About</router-link>
              <router-link :to="{name: 'about'}" @click.native="menuClose">The Process</router-link>
              <router-link :to="{name: 'about'}" @click.native="menuClose">Testimonials</router-link>
            </div>
            
          </div>
          <div class="nav-item">
            <router-link :to="{name: 'contact'}" @click.native="menuClose">Contact</router-link>
          </div>
        </div>
        <div class="nav-line"></div>
      </mq-layout>
    </nav>
  </header>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'gallery-header',

    data () {
      return {
        menuActive: false
      }
    },

    computed: {
      ...mapState([
        'meta',
        'sorts'
      ]),
      menuClass () {
        return {
          'menu-active': this.menuActive
        }
      }
    },

    methods: {
      navBack () {
        this.$router.go(-1)
        this.$emit('back')
        this.menuClose()
      },
      menuClose () {
        this.menuActive = false
      },
      menuToggle () {
        this.menuActive = !this.menuActive
      }
    }
  }
</script>
