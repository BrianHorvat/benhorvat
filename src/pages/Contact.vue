<template>
	<section id="contact" class="page">
		<div class="container">
			<div class="contact-grid is-two-thirds">
				<div>
					<h1>Contact</h1>
					<div class="contact-blurb" v-html="contact.blurb"></div>
					<form
						class="form form-grid-2"
						method="POST"
						:action="'https://formspree.io/brianghorvat@gmail.com'"
					>
						<div class="field">
							<span class="field-label">First Name</span>
							<div class="field-item">
								<input
									name="First Name"
									type="text"
									placeholder="Jane"
									required
								/>
							</div>
						</div>
						<div class="field">
							<span class="field-label">Last Name</span>
							<div class="field-item">
								<input
									name="Last Name"
									type="text"
									placeholder="Doe"
									required
								/>
							</div>
						</div>

						<div class="field full-width">
							<span class="field-label">Phone Number</span>
							<div class="field-item">
								<input
									name="Phone"
									type="tel"
									placeholder="(123) 456-7890"
									required
								/>
							</div>
						</div>

						<div class="field full-width">
							<span class="field-label">Email</span>
							<div class="field-item">
								<input
									name="Email"
									type="email"
									placeholder="your@email.com"
									required
								/>
							</div>
						</div>

						<div class="field full-width">
							<span class="field-label">Type of Photography</span>
							<p class="field-desc">
								If the type of photography you're looking for
								isn't listed below, please request it in
								Additional Comments.
							</p>
							<div class="field-item">
								<styled-radio
									v-for="type in contact.types"
									:key="type"
									v-model="session.type"
									name="Type of Photography"
									:value="type"
									>{{ type }}</styled-radio
								>
								<styled-radio
									v-model="session.type"
									name="Type of Photography"
									value="Other"
									>Other</styled-radio
								>
							</div>
						</div>

						<div class="field full-width">
							<span class="field-label">Date of Photography</span>
							<p class="field-desc">
								To help make scheduling your session as easy as
								possible, please give a range of possible dates.
							</p>
							<div
								v-for="(range, index) in ranges"
								:key="range.id"
								class="contact-date-row"
							>
								<div class="field-item">
									<input
										type="date"
										:min="
											new Date()
												.toISOString()
												.split('T')[0]
										"
										:value="
											range.start &&
												range.start
													.toISOString()
													.split('T')[0]
										"
										required
										@input="
											range.start =
												$event.target.valueAsDate
										"
									/>
								</div>
								<div class="field-item">
									<input
										type="date"
										:min="
											new Date()
												.toISOString()
												.split('T')[0]
										"
										:value="
											range.end &&
												range.end
													.toISOString()
													.split('T')[0]
										"
										required
										@input="
											range.end =
												$event.target.valueAsDate
										"
									/>
								</div>
								<input
									v-if="range.start && range.end"
									type="text"
									:name="`Date Range ${index}`"
									:value="
										range.start.toDateString() +
											' to ' +
											range.end.toDateString()
									"
								/>
								<button
									v-if="ranges.length > 1"
									type="button"
									@click="ranges.splice(index, 1)"
								>
									<icon-base icon-name="Remove Date">
										<icon-trash />
									</icon-base>
								</button>
							</div>
							<button type="button" @click="addNewRange()">
								<icon-base icon-name="Add Date">
									<icon-plus />
								</icon-base>
								<span>Add Another Date</span>
							</button>
						</div>

						<div class="field full-width">
							<span class="field-label"
								>Location of Photography</span
							>
							<p class="field-desc">
								If you would like an on location session, please
								provide any relevant details under Additional
								Comments.
							</p>
							<div class="field-item">
								<styled-checkbox
									v-model="session.location"
									name="Location"
									value="In Studio"
									>In Studio</styled-checkbox
								>
								<styled-checkbox
									v-model="session.location"
									name="Location"
									value="On Location"
									>On Location</styled-checkbox
								>
							</div>
						</div>

						<div class="field full-width">
							<span class="field-label-optional-badge"
								>Optional</span
							>
							<span class="field-label">Additional Comments</span>
							<p class="field-desc">
								Please include any special requests and notes
								pertinent to your session.
							</p>
							<div class="field-item">
								<textarea
									name="Comments"
									placeholder="Number of people to be photographed, location details, etc."
								></textarea>
							</div>
						</div>

						<div class="field full-width">
							<span class="field-label-optional-badge"
								>Optional</span
							>
							<span class="field-label">Referrer</span>
							<p class="field-desc">
								If you remember how you heard of me, please let
								me know!
							</p>
							<div class="field-item">
								<styled-radio
									v-model="referrer"
									name="Referrer"
									value="Google"
									>Google</styled-radio
								>
								<styled-radio
									v-model="referrer"
									name="Referrer"
									value="WeddingWire"
									>WeddingWire</styled-radio
								>
								<styled-radio
									v-model="referrer"
									name="Referrer"
									value="Advertisement"
									>Advertisement</styled-radio
								>
								<styled-radio
									v-model="referrer"
									name="Referrer"
									value="Friend or family"
									>Friends or family</styled-radio
								>
								<styled-radio
									v-model="referrer"
									name="Referrer"
									value="Other"
									>Other:</styled-radio
								>
								<input name="Referrer Other" type="text" />
							</div>
						</div>

						<div class="field full-width">
							<button type="submit">Send</button>
						</div>
					</form>
				</div>
				<div>
					<h1>Social</h1>
					<ul class="social-media">
						<li class="social-icon">
							<a
								:href="
									this.$store.getters['gallery/instagramLink']
								"
							>
								<icon-base icon-name="Instagram">
									<icon-instagram />
								</icon-base>
								<span>{{ meta.social.instagram }}</span>
							</a>
						</li>
						<li class="social-icon">
							<a
								:href="
									this.$store.getters['gallery/facebookLink']
								"
							>
								<icon-base icon-name="Facebook">
									<icon-facebook />
								</icon-base>
								<span>{{ meta.social.facebook }}</span>
							</a>
						</li>
						<li class="social-icon">
							<a :href="this.$store.getters['gallery/emailLink']">
								<icon-base icon-name="Email">
									<icon-email />
								</icon-base>
								<span>{{ meta.social.email }}</span>
							</a>
						</li>
						<li class="social-icon">
							<a :href="this.$store.getters['gallery/phoneLink']">
								<icon-base icon-name="Phone">
									<icon-phone />
								</icon-base>
								<span>{{
									this.$store.getters["gallery/prettyPhone"]
								}}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import IconBase from "../components/icons/IconBase";
import IconFacebook from "../components/icons/IconFacebook";
import IconEmail from "../components/icons/IconEmail";
import IconInstagram from "../components/icons/IconInstagram";
import IconPhone from "../components/icons/IconPhone";
import IconPlus from "../components/icons/IconPlus";
import IconTrash from "../components/icons/IconTrash";
import StyledRadio from "../components/StyledRadio";
import StyledCheckbox from "../components/StyledCheckbox";

export default {
	components: {
		IconBase,
		IconFacebook,
		IconEmail,
		IconInstagram,
		IconPhone,
		IconPlus,
		IconTrash,
		StyledRadio,
		StyledCheckbox
	},

	data() {
		return {
			session: {
				type: "",
				location: []
			},
			ranges: [
				{
					id: 0,
					start: null,
					end: null
				}
			],
			referrer: ""
		};
	},

	computed: {
		...mapState({
			meta: state => state.gallery.meta,
			contact: state => state.contact
		})
	},

	created() {
		this.$store.dispatch("contact/getContact");
	},

	methods: {
		addNewRange() {
			this.ranges.push({
				id: this.ranges.length,
				start: null,
				end: null
			});
		}
	},

	metaInfo: {
		title: "Contact"
	}
};
</script>
