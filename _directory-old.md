---
layout: default
---


<!-- Header -->
<header class="bg-rp-orange">
  <div class="container pt-5 pb-5 mt-2 mb-5 text-center text-white">
    <h1 class="display-5 fw-bold mt-5">Support Directory</h1>
    <div class="col-lg-7 mx-auto">
      <p class="lead mb-4">Troubleshooting and self-help resources.</p>
    </div>
  </div>
</header>


<!-- Directory -->
<section class="">
  <div class="container py-5">
    <div class="row justify-content-center" style="margin-top: -7rem;">
      <div class="col-12">
        <div class="card rounded-0 border-white mx-auto" style="max-width: 40rem;">
          <div class="card-body markdown m-3">
            {%- assign categories = site.directory_categories | sort_natural -%}
            {%- for category in categories -%}
              <h3 class="category text-capitalize mt-4">{{category}}</h3>
              {%- for page in site.pages -%}
                {%- if page.dir contains "/t/" and page.category == category -%}
                  <ul>
                    <li><a href="{{page.url}}" class="link-secondary">{{page.header}}</a></li>
                  </ul>
                {%- endif -%}
              {%- endfor -%}
            {%- endfor -%}
            <h3 class="category text-capitalize mt-4">Uncategorized</h3>
            {%- assign omit_pages = "t/13.md, t/14.md" | split: ", " -%}
            {%- for page in site.pages -%}
              {%- if page.dir contains "/t/" -%}
                {%- if page.category == null -%}
                  {%- unless omit_pages contains page.path -%}
                    <ul>
                      <li><a href="{{page.url}}" class="link-secondary">{{page.header}}</a></li>
                    </ul>
                  {%- endunless -%}
                {%- endif -%}
              {%- endif -%} 
            {%- endfor -%}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

