---
layout: default
---


<!-- Header -->
<header class="bg-rp-orange">
  <div class="container pt-5 pb-5 mt-2 mb-5 text-center text-white">
    <h1 class="display-5 fw-bold mt-5">Rocket Pool Support</h1>
    <div class="col-lg-7 mx-auto">
      <p class="lead mb-4">Troubleshooting and self-help resources.</p>
    </div>
  </div>
</header>


<!-- Troubleshooting Prompts -->
<section class="">
  <div class="container py-5">
    <div class="row justify-content-center" style="margin-top: -7rem;">
      <div class="col-12">
        <div class="card rounded-0 border-white mx-auto" style="max-width: 40rem;">
          <div class="card-body markdown m-3">
            {%- comment -%}
              <!-- Assign prompts to an array of troubleshooting prompts and create a card for each. -->
            {%- endcomment -%}
            {%- assign prompts = site.data.troubleshooting-prompts -%}
            {%- for prompt in prompts -%}
              {%- comment -%}
                <!-- Only show prompts that have an id specified. -->
              {%- endcomment -%}
              {%- if prompt.id -%}
                {%- comment -%}
                  <!-- Only show the starting prompt (id = 1). Visibility of prompts after this are 
                    controlled by the goToPrompt() function in _includes/js/base.js, which is 
                    triggered by selecting an option. -->
                {%- endcomment -%}
                {%- assign visibility = "d-none" -%}
                {%- if prompt.id == 1 -%}
                  {%- assign visibility = "" -%}
                {%- endif -%}
                {%- comment -%}
                  <!-- If a filename is specified then load that page content, else if there's body 
                    data specified and it's a question then use that, otherwise load content from a 
                    file named after the id.  -->
                {%- endcomment -%}
                <div id="prompt{{prompt.id}}" class="prompt {{visibility}}">
                  {% assign filename_test = prompt.body | split: " " | first %}
                  {%- comment -%}
                    <!-- Copy link icon button. Will show the content page specified in the body 
                      property or default to the content page named after the prompt id, 
                      e.g /t/{{id}}.md file.  -->
                  {%- endcomment -%}
                  {%- if prompt.type == "answer" -%}
                    {%- if prompt.body and filename_test contains ".md" -%}
                      <a id="link{{prompt.id}}" class="prompt-link" 
                        onclick="copyText('{{site.url}}/t/{{prompt.body}}', this.id)"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Copied!" data-bs-trigger="click">
                        {{site.data.icons.link}}
                      </a>
                    {% else %}
                      <a id="link{{prompt.id}}" class="prompt-link" 
                        onclick="copyText('{{site.url}}/t/{{prompt.id}}', this.id)"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Copied!" data-bs-trigger="click">
                        {{site.data.icons.link}}
                      </a>
                    {%- endif -%}
                  {%- endif -%}
                  <h5 class="card-title">{{prompt.title | markdownify}}</h5>
                  {%- if prompt.body and filename_test contains ".md" -%}
                    {% assign page_path = "t/" | append: prompt.body %}
                    {%- if prompt.type == "question" -%}
                      {% assign page_path = page_path | replace: "t/", "q/" %}
                    {% endif %}
                    {% assign prompt_page = site.pages | where: "path", page_path | first %}
                    {%- comment -%}
                      <!-- Check if the content file exists. 
                        If it doesn't and it's an answer then throw an error.  -->
                    {%- endcomment -%}
                    {%- if prompt_page.content -%}
                      <p class="card-text mb-4">{{prompt_page.content | markdownify}}</p>
                    {%- elsif prompt.type == "answer" -%}
                      <script>alert("ERROR: Prompt {{prompt.id}}'s specified content file {{page_path}} does not exist.")</script>
                    {% endif %}
                  {%- elsif prompt.body and prompt.type == "question" -%}
                    <p class="card-text mb-4">{{prompt.body | markdownify}}</p>
                  {% else %}
                    {% assign page_path = "t/" | append: prompt.id | append: ".md" %}
                    {%- if prompt.type == "question" -%}
                      {% assign page_path = page_path | replace: "t/", "q/" %}
                    {% endif %}
                    {% assign prompt_page = site.pages | where: "path", page_path | first %}
                    {%- comment -%}
                      <!-- Check if the content file exists. 
                        If it doesn't and it's an answer then throw an error.  -->
                    {%- endcomment -%}
                    {%- if prompt_page.content -%}
                      <p class="card-text mb-4">{{prompt_page.content | markdownify}}</p>
                    {%- elsif prompt.type == "answer" -%}
                      <script>alert("ERROR: Prompt {{prompt.id}}'s has no content file specified and the default file {{page_path}} does not exist.")</script>
                    {% endif %}
                  {%- endif -%}
                  {%- comment -%}
                    <!-- If the prompt is a question then show the list of options. -->
                  {%- endcomment -%}
                  {%- if prompt.type == "question" -%}
                    {%- for each_option in prompt.options -%}
                      {%- if each_option.option and each_option.go_to_id -%}
                        <a class="prompt-option btn btn-secondary text-start d-block mt-3"
                            onclick="goToPrompt({{prompt.id}},{{each_option.go_to_id}})">
                          <span class="btn-radio me-2">{{site.data.icons.circle}}</span>{{each_option.option | markdownify}}
                        </a>
                      {%- endif -%}
                    {%- endfor -%}
                  {%- endif -%}
                </div>
              {%- endif -%}
            {%- endfor -%}
            {%- comment -%}
              <!-- This Discord invite will show if the prompt is of the answer type. The show/hide 
                functionality is controlled by the goToPrompt() function in _includes/js/base.js, 
                which is triggered by selecting an option. -->
            {%- endcomment -%}
            <div id="promptDiscordInvite" class="d-none alert alert-rp d-flex align-items-center mb-0 mt-3" role="alert">
              <span class="me-3">{{site.data.icons.discord | replace: "1rem", "1.5rem"}}</span>
              <div>
                Still stuck? Get help in the <a href="https://discord.gg/rocketpool" target="_blank">Rocket Pool Discord</a>!
              </div>
            </div>
          </div>
        </div>
        {%- comment -%}
          <!-- A back arrow to go to the previous prompt. This functionality is controlled by the 
            goToLastPrompt() function in _includes/js/base.js, which is triggered by selecting 
            the Back button. -->
        {%- endcomment -%}
        <div id="promptBack" class="mt-4 mx-auto d-none" style="max-width: 40rem;">
          <a class="btn btn-primary" onclick="goToLastPrompt()">
            <span class="me-2">{{site.data.icons.back_arrow}}</span>Back
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

