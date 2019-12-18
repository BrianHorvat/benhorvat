function linkResolver(doc) {
	if (doc.type === "gallery") return "/gallery/" + doc.uid;
}

export { linkResolver };
