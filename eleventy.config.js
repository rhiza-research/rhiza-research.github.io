module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.addPassthroughCopy({ images: "images" });
	eleventyConfig.addPassthroughCopy({ "index.html": "index.html" });
	eleventyConfig.addPassthroughCopy({ "favicon.ico": "favicon.ico" });
	eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });
	eleventyConfig.addPassthroughCopy({ "src/blog-assets": "blog-assets" });

	eleventyConfig.addCollection("posts", (collectionApi) =>
		collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date)
	);

	eleventyConfig.addFilter("readableDate", (dateObj) => {
		if (!dateObj) return "";
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		}).format(dateObj);
	});

	eleventyConfig.addFilter("isoDate", (dateObj) => {
		if (!dateObj) return "";
		return dateObj.toISOString().slice(0, 10);
	});

	return {
		dir: {
			input: "src",
			includes: "_includes",
			output: "_site",
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
};
