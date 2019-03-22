<template>
  <header class="header">
    <nav class="nav">
      <transition name="grow">
        <a v-if="this.$route.name !== 'home'" id="back" @click="navBack" tabindex="0">
          <icon-base name="Go Back">
            <icon-back/>
          </icon-base>
        </a>
      </transition>

      <mq-layout mq="desktop+" class="nav-bar desktop">
        <div class="nav-line"></div>
        <div class="nav-menu left" :class="menuClass">
          <div v-for="sort in sorts" :key="sort.uid" class="nav-item">
            <router-link
              :to="{name: 'category', params: { category: sort.uid } }"
              @click.native="menuClose"
            >{{ sort.title }}</router-link>
          </div>
        </div>
        <div class="nav-item site-title">
          <router-link to="/" @click.native="menuClose">
            <span>Benjamin Horvat</span>
            <span>Photography</span>
          </router-link>
        </div>
        <div class="nav-menu right" :class="menuClass">
          <div class="nav-item has-dropdown">
            <span>Information</span>
            <div class="nav-dropdown">
              <router-link :to="{name: 'about'}" @click.native="menuClose">About Me</router-link>
              <router-link :to="{name: 'process'}" @click.native="menuClose">The Process</router-link>
              <router-link :to="{name: 'testimonials'}" @click.native="menuClose">Testimonials</router-link>
            </div>
          </div>
          <div class="nav-item">
            <router-link :to="{name: 'contact'}" @click.native="menuClose">Contact</router-link>
          </div>
        </div>
        <div class="nav-line"></div>
      </mq-layout>

      <mq-layout :mq="['mobile', 'tablet']" class="nav-bar mobile">
        <div class="nav-item site-title">
          <router-link to="/" @click.native="menuClose">
            <span>Benjamin Horvat</span>
            <span>Photography</span>
          </router-link>
        </div>
        <div class="nav-menu">
          <div v-for="sort in sorts" :key="sort.uid" class="nav-item">
            <router-link
              :to="{name: 'category', params: { category: sort.uid } }"
              @click.native="menuClose"
            >{{ sort.title }}</router-link>
          </div>
          <div class="nav-item">
            <router-link :to="{name: 'about'}" @click.native="menuClose">About Me</router-link>
          </div>
          <div class="nav-item">
            <router-link :to="{name: 'process'}" @click.native="menuClose">The Process</router-link>
          </div>
          <div class="nav-item">
            <router-link :to="{name: 'testimonials'}" @click.native="menuClose">Testimonials</router-link>
          </div>
          <div class="nav-item">
            <router-link :to="{name: 'contact'}" @click.native="menuClose">Contact</router-link>
          </div>
        </div>
      </mq-layout>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import IconBase from '../components/icons/IconBase'
import IconBack from '../components/icons/IconBack'

export default {
  name: 'gallery-header',

  components: { IconBase, IconBack },

  data() {
    return {
      menuActive: false
    }
  },

  computed: {
    ...mapState({
      meta: state => state.gallery.meta,
      sorts: state => state.gallery.sorts
    }),
    menuClass() {
      return {
        'menu-active': this.menuActive
      }
    }
  },

  methods: {
    navBack() {
      this.$router.go(-1)
      this.$emit('back')
      this.menuClose()
    },
    menuClose() {
      this.menuActive = false
    },
    menuToggle() {
      this.menuActive = !this.menuActive
    }
  }
}
</script>
