---
layout: default
---

<section class="toppage-hero">
    <img src="{{ 'toppage.jpg' | img_url }}" alt="トップページの写真">
    <h1>Blog</h1>
</section>

<section>
    {% for post in site.posts limit: site.home_posts_limit %}
    <article class="mb-4">
        <h3 class="h4"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p>{{ post.date | date: "%Y/%m/%d"}}</p>
        <p>{{ post.excerpt }}</p>
    </article>
    {% endfor %}
</section>