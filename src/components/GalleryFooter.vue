<template>
  <footer class="footer">
    <ul class="social-media">
      <li class="social-icon">
        <a :href="this.$store.getters['gallery/instagramLink']">
          <icon-base icon-name="Instagram">
            <icon-instagram/>
          </icon-base>
          <span class="is-hidden-mobile">{{ meta.social.instagram }}</span>
        </a>
      </li>
      <li class="social-icon">
        <a :href="this.$store.getters['gallery/facebookLink']">
          <icon-base icon-name="Facebook">
            <icon-facebook/>
          </icon-base>
          <span class="is-hidden-mobile">{{ meta.social.facebook }}</span>
        </a>
      </li>
      <li class="social-icon">
        <a :href="this.$store.getters['gallery/emailLink']">
          <icon-base icon-name="Email">
            <icon-email/>
          </icon-base>
          <span class="is-hidden-mobile">{{ meta.social.email }}</span>
        </a>
      </li>
      <li class="social-icon">
        <a :href="this.$store.getters['gallery/phoneLink']">
          <icon-base icon-name="Phone">
            <icon-phone/>
          </icon-base>
          <span class="is-hidden-mobile">{{ this.$store.getters['gallery/prettyPhone'] }}</span>
        </a>
      </li>
    </ul>
    <span class="copyright">&copy; 2017-{{ currentYear }}, {{ meta.title }}</span>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import IconBase from './icons/IconBase'
import IconFacebook from './icons/IconFacebook'
import IconEmail from './icons/IconEmail'
import IconInstagram from './icons/IconInstagram'
import IconPhone from './icons/IconPhone'

export default {
  components: {
    IconBase, IconFacebook, IconEmail, IconInstagram, IconPhone
  },

  name: 'gallery-footer',

  computed: {
    ...mapState({
      meta: state => state.gallery.meta
    }),
    currentYear() {
      return new Date().getFullYear()
    },
  }
}
</script>
