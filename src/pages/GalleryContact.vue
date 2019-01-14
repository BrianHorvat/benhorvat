<template>
  <section class="contact">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1>Contact</h1>
          <div v-html="contact.blurb"></div>
          <form
            class="contact-form"
            method="POST"
            :action="'https://formspree.io/' + meta.social.email"
          >
            <div class="field">
              <span class="field-label">First Name</span>
              <div class="field-item">
                <input name="first_name" type="text" placeholder="Jane" required>
              </div>
            </div>
            <div class="field">
              <span class="field-label">Last Name</span>
              <div class="field-item">
                <input name="last_name" type="text" placeholder="Doe" required>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Phone Number</span>
              <div class="field-item">
                <input name="phone" type="tel" placeholder="(123) 456-7890" required>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Email</span>
              <div class="field-item">
                <input name="email" type="email" placeholder="your@email.com" required>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Type of Photography</span>
              <p
                class="field-desc"
              >If the type of photography you're looking for isn't listed below, please request it in Additional Comments.</p>
              <div class="field-item">
                <styled-radio
                  v-for="type in contact.types"
                  :key="type"
                  name="type"
                  :value="type"
                  v-model="session.type"
                >{{ type }}</styled-radio>
                <styled-radio name="type" value="Other" v-model="session.type">Other</styled-radio>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Date of Photography</span>
              <p
                class="field-desc"
              >To help make scheduling your session as easy as possible, please give a range of possible dates.</p>
              <div class="field-item">
                <input name="date" type="date" :min="Date.now()" required>
              </div>
              <div class="field-item">
                <input name="date" type="date" :min="Date.now()" required>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Location of Photography</span>
              <p
                class="field-desc"
              >If you would like an on location session, please provide any relevant details in Additional Comments.</p>
              <div class="field-item">
                <styled-radio name="type" value="Studio" v-model="session.location">In Studio</styled-radio>
                <styled-radio name="type" value="On-Location" v-model="session.location">On Location</styled-radio>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Additional Comments</span>
              <p
                class="field-desc"
              >Please include any special requests and notes pertinent to your session.</p>
              <div class="field-item">
                <textarea
                  name="comments"
                  placeholder="Number of people to be photographed, location details, etc."
                  required
                ></textarea>
              </div>
            </div>

            <div class="field full-width">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
        <div class="column is-2">
          <h1>Social</h1>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import IconBase from '../components/icons/IconBase'
import IconFacebook from '../components/icons/IconFacebook'
import IconEmail from '../components/icons/IconEmail'
import IconInstagram from '../components/icons/IconInstagram'
import IconPhone from '../components/icons/IconPhone'
import StyledRadio from '../components/StyledRadio'

export default {
  components: {
    IconBase, IconFacebook, IconEmail, IconInstagram, IconPhone, StyledRadio
  },

  name: 'gallery-contact',

  data() {
    return {
      session: {
        type: '',
        location: ''
      }
    }
  },

  computed: {
    ...mapState({
      meta: state => state.gallery.meta,
      contact: state => state.contact.contact
    }),
  },

  created() {
    this.$store.dispatch("contact/getContact")
  },

  metaInfo: {
    title: 'Contact'
  }
}
</script>
