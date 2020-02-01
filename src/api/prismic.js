import prismic from "prismic-javascript";

export default {
	endpointUrl: "https://benhorvat.prismic.io/api/v2",

	fetch(predicate, endpoint = this.endpointUrl, apiOptions = {}) {
		return prismic
			.getApi(endpoint)
			.then(api => api.query(predicate, apiOptions));
	}
};
