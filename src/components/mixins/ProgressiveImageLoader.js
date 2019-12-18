export default {
	props: {
		src: {
			type: String,
			required: true
		}
	},
	data: function() {
		return {
			loaded: false,
			image: null
		};
	},
	watch: {
		src() {
			this.loadImage();
		}
	},
	mounted() {
		this.loadImage();
	},
	methods: {
		loadImage() {
			const image = new Image();
			this.image = null;

			image.onload = () => {
				this.image = this.src;
				this.loaded = true;
				this.$emit("onLoad", image.src);
			};

			image.src = this.src;
		}
	}
};
