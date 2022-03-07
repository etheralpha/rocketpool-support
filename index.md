---
layout: default
---


<!-- Header -->
<header class="bg-rp-orange">
  <div class="container pt-3 pb-5 mt-2 mb-5 text-center text-white">
    <h1 class="display-5 fw-bold mt-5">Rocket Pool Support</h1>
    <div class="col-lg-7 mx-auto">
      <p class="lead mb-4 mmx-2">Troubleshooting and self-help resources.</p>
    </div>
  </div>
</header>


<!-- Troubleshooting Prompts -->
<section class="">
  <div class="container py-5">
    <div class="row justify-content-center" style="margin-top: -7rem;">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card w-100 rounded-0 border-white">
          <div class="card-body m-3">
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
                <div id="prompt{{prompt.id}}" class="{{visibility}}">
                  <h5 class="card-title">{{prompt.title}}</h5>
                  {%- if prompt.body -%}
                    <p class="card-text mb-4">{{prompt.body}}</p>
                  {%- endif -%}
                  {%- comment -%}
                    <!-- If the prompt is a question then show the list of options. -->
                  {%- endcomment -%}
                  {%- if prompt.type == "question" -%}
                    {%- for each_option in prompt.options -%}
                      {%- if each_option.option and each_option.go_to_id -%}
                        <a data-go-to-prompt="each_option.go_to_id" 
                            class="btn btn-secondary text-start d-block mt-3"
                            onclick="goToPrompt({{prompt.id}},{{each_option.go_to_id}})">
                          <span class="btn-radio me-2">{{site.data.icons.circle}}</span>{{each_option.option}}
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
        <a id="promptBack" class="btn btn-primary mt-4 d-none" onclick="goToLastPrompt()">
          <span class="me-2">{{site.data.icons.back_arrow}}</span>Back
        </a>
      </div>
    </div>
  </div>
</section>

