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
            {%- assign prompts = site.data.troubleshooting-prompts -%}
            {%- assign omit_prompts = "13, 14" | split: ", " -%}
            {%- for category in categories -%}
              <h3 class="category text-capitalize mt-4">{{category}}</h3>
              {%- for prompt in prompts -%}
                {%- unless omit_prompts contains prompt_id -%}
                {%- if prompt.category == category and prompt.type == "question" -%}
                  <ul>
                    <li>
                      <a href="/?id={{prompt.id}}" class="link-secondary">
                        [Troubleshoot] {{prompt.title}}
                      </a>
                    </li>
                  </ul>
                {%- endif -%}
                {%- if prompt.category == category and prompt.type == "answer" -%}
                  <ul>
                    <li>
                      <a href="/?id={{prompt.id}}" class="link-secondary">
                        [Solution] {{prompt.title}}
                      </a>
                    </li>
                  </ul>
                {%- endif -%}
              {%- endunless -%}
              {%- endfor -%}
            {%- endfor -%}
            <h3 class="category text-capitalize mt-4">Uncategorized</h3>
            {%- for prompt in prompts -%}
              {%- assign prompt_id = prompt.id | append: "" -%}
              {%- unless omit_prompts contains prompt_id -%}
                {%- if prompt.category == null and prompt.type == "question" -%}
                  <ul>
                    <li>
                      <a href="/?id={{prompt.id}}" class="link-secondary">
                        [Troubleshoot] {{prompt.title}}
                      </a>
                    </li>
                  </ul>
                {%- endif -%}
                {%- if prompt.category == null and prompt.type == "answer" -%}
                  <ul>
                    <li>
                      <a href="/?id={{prompt.id}}" class="link-secondary">
                        [Solution] {{prompt.title}}
                      </a>
                    </li>
                  </ul>
                {%- endif -%}
              {%- endunless -%}
            {%- endfor -%}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

