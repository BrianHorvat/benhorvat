<template>
  <section class="contact right">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1>Contact</h1>
          <p>
            Interested in working together? You may contact me directly at <a :href="email">{{ meta.social.email }}</a>, or by using the form below.
          </p>
          <form class="contact-form" method="POST" :action="'https://formspree.io/' + meta.social.email">
            <div class="field">
              <span class="field-label">First Name</span>
              <div class="field-item">
                <input name="first_name" type="text" placeholder="Jane" required />
              </div>
            </div>
            <div class="field">
                <span class="field-label">Last Name</span>
                <div class="field-item">
                  <input name="last_name" type="text" placeholder="Doe" required/>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Phone Number</span>
              <div class="field-item">
                <input name="phone" type="tel" placeholder="(123) 456-7890" required />
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Email</span>
              <div class="field-item">
                <input name="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Type of Photography</span>
              <div class="field-item">
                <input name="type" type="text" placeholder="Portraits, Senior Portraits, Branding..." required />
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Date of Photography</span>
              <p class="field-desc">To help make scheduling your session as easy as possible, please give a range of possible dates.</p>
              <div class="field-item">
                <input name="date" type="text" placeholder="January 1st, 2020 - January 10th, 2020" required />
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Location of Photography</span>
              <p class="field-desc">If you would like an on location session, please give a full address and any relevant details in the comments section.</p>
              <div class="field-item">
                <input type="radio" name="location" checked/>
              </div>
            </div>

            <div class="field full-width">
              <span class="field-label">Additional Comments</span>
              <p class="field-desc">Please include any special requests and notes pertinent to your session. </p>
              <div class="field-item">
                <textarea name="comments" placeholder="Number of people to be photographed, location details, etc." required></textarea>
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
            <li class="social-icon" id="email">
              <a :href="email">
                <svg aria-labelledby="gmail-icon" role="img" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"><title id="gmail-icon">{{ meta.social.email }} | Email</title>
                  <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"></path>
                </svg>
                <span>{{ meta.social.email }}</span>
              </a>
            </li>
            <li class="social-icon">
              <a :href="'tel:' + this.meta.social.phone">
                <svg aria-labelledby="phone-icon" role="img" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"><title id="phone-icon">{{ phone }} | Phone</title>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                </svg>
                <span>{{ phone }}</span>
              </a>
            </li>
            <li class="social-icon">
              <a :href="instagram">
                <svg aria-labelledby="instagram-icon" role="img" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"><title id="instagram-icon">{{ meta.social.instagram}} | Instagram</title>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                </svg>
                <span>{{ meta.social.instagram }}</span>
              </a>
            </li>
            <li class="social-icon">
              <a :href="facebook">
                <svg aria-labelledby="facebook-icon" role="img" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"><title id="facebook-icon">{{ meta.social.facebook }} | Facebook</title>
                  <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path>
                </svg>
                <span>{{ meta.social.facebook }}</span>
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

  export default {
    name: 'gallery-contact',

    computed: {
      ...mapState([
        'meta'
      ]),
      instagram () {
        return 'https://instagram.com/' + this.meta.social.instagram
      },
      facebook () {
        return 'https://facebook.com/' + this.meta.social.facebook
      },
      email () {
        return 'mailto:' + this.meta.social.email
      },
      phone () {
        const s2 = this.meta.social.phone.replace(/\D/g, '')
        const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/)
        return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3]
      }
    },

    metaInfo: {
      title: 'Contact'
    }
  }
</script>
