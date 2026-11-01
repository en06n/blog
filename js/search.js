(() => {
    const form = document.getElementById("search-form");
    const input = document.getElementById("post-search");
    const results = document.getElementById("search-results");
    const tagGroups = document.getElementById("tag-groups");

    if (!form || !input || !results || !tagGroups) return;

    let posts = [];
    let indexLoaded = false;
    let indexFailed = false;

    function renderResults() {
        const query = input.value.trim().toLocaleLowerCase();
        results.replaceChildren();
        tagGroups.hidden = Boolean(query);

        if (!query) return;

        if (!indexLoaded) {
            results.textContent = indexFailed
                ? "検索データを読み込めませんでした。"
                : "検索データを読み込み中です…";
            return;
        }

        const terms = query.split(/\s+/).filter(Boolean);
        const matches = posts.filter((post) => {
            const text = `${post.title || ""} ${post.body || ""}`.toLocaleLowerCase();
            return terms.every((term) => text.includes(term));
        });

        if (matches.length === 0) {
            results.textContent = "該当する記事はありません。";
            return;
        }

        const groupedPosts = new Map();

        for (const post of matches) {
            const tags = Array.isArray(post.tags) && post.tags.length > 0
                ? post.tags
                : ["タグなし"];

            for (const tag of tags) {
                if (!groupedPosts.has(tag)) groupedPosts.set(tag, []);
                groupedPosts.get(tag).push(post);
            }
        }

        for (const [tag, taggedPosts] of groupedPosts) {
            const section = document.createElement("section");
            section.className = "tag-group";

            const heading = document.createElement("h2");
            heading.textContent = tag;
            section.append(heading);

            const list = document.createElement("ul");

            for (const post of taggedPosts) {
                const item = document.createElement("li");
                const link = document.createElement("a");
                link.href = post.url;
                link.textContent = post.title;
                item.append(link);
                list.append(item);
            }

            section.append(list);
            results.append(section);
        }
    }

    input.addEventListener("input", renderResults);

    fetch(form.dataset.indexUrl)
        .then((response) => {
            if (!response.ok) throw new Error("Search index request failed");
            return response.json();
        })
        .then((data) => {
            posts = Array.isArray(data) ? data : [];
            indexLoaded = true;
            renderResults();
        })
        .catch(() => {
            indexFailed = true;
            renderResults();
        });
})();