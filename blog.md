---
layout: standalone
title: Blog
permalink: /posts/
---

{% for post in site.posts limit: site.feeds.limit %}
<article>
<h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>/h3>
<h5><small>{{ post.date | date: "%Y/%m/%d" }}</small></h5>
<p>{{ post.excerpt }}</p>
</article>
{% endfor %}
