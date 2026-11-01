---
layout: standalone
title: Search
permalink: /search/
---

<div id="search-form" data-index-url="{{ '/search-data.json' | relative_url }}">
<label for="post-search">Search posts</label>
<input type="search" id="post-search" placeholder="Search by title or body" autocomplete="off" />
</div>

<div id="search-results" aria-live="polite"></div>

<div id="tag-groups">
    {% assign sorted_tags = site.tags | sort %}
    {% for tag in sorted_tags %}
    <section class="tag-group">
        <h3>{{ tag[0] }}</h3>
        <ul>
            {% assign tagged_posts = tag[1] | sort: "date" | reverse %}
            {% for post in tagged_posts %}
            <li>
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </li>
            {% endfor %}
        </ul>
    </section>
    {% endfor %}
</div>

<script src="{{ '/js/search.js' | relative_url }}" defer></script>