<script>
import PrismicDOM from "prismic-dom";

const Elements = PrismicDOM.RichText.Elements;

export default {
	props: {
		element: {
			type: Object,
			required: true
		}
	},

	computed: {
		innerBody() {
			let body = this.element.text;

			return <span>{body}</span>;
		}
	},

	render() {
		console.dir(Elements);

		switch (this.element.type) {
			case Elements.Paragraph:
				return <p>{this.element.text}</p>;
			default:
				return null;
		}
	}
};
</script>

<style></style>
