(function () {
	if (!document.body.classList.contains("home")) return;

	var articles = document.querySelectorAll("main > article");
	var links = document.querySelectorAll(".index ol a");

	function idFromHash() {
		if (!location.hash) return "overview";
		var id = location.hash.slice(1);
		return document.getElementById(id) ? id : null;
	}

	function show(id, shouldScroll) {
		if (!id) return;
		articles.forEach(function (article) {
			article.classList.toggle("is-active", article.id === id);
		});
		links.forEach(function (link) {
			if (link.hash === "#" + id) {
				link.setAttribute("aria-current", "page");
			} else {
				link.removeAttribute("aria-current");
			}
		});
		if (shouldScroll && window.matchMedia("(max-width: 800px)").matches) {
			var active = document.getElementById(id);
			if (active) {
				active.scrollIntoView({ block: "start" });
			}
		}
	}

	window.addEventListener("hashchange", function () {
		var id = idFromHash();
		if (!id) return;
		show(id, true);
	});

	show(idFromHash() || "overview", false);
})();
