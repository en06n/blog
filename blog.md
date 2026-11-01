---
layout: standalone
title: Blog
---

{% for post in site.posts limit: site.feeds.limit %}
<article>
<h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
<h5><small>{{ post.date | date: "%Y/%m/%d" }}</small></h5>
<p>{{ post.excerpt }}</p>
</article>
{% endfor %}
