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
        {%- assign prompts = site.data.troubleshooting-prompts -%}
        {%- for prompt in prompts -%}
          {%- if prompt.id -%}
            {%- assign visibility = "d-none" -%}
            {%- if prompt.id == 1 -%}
              {%- assign visibility = "" -%}
            {%- endif -%}
            <div id="prompt{{prompt.id}}" class="card w-100 rounded-0 border-white {{visibility}}">
              <div class="card-body m-3">
                <h5 class="card-title">{{prompt.title}}</h5>
                {%- assign body_margin = "mb-4" -%}
                {%- if prompt.type == "answer" -%}
                  {%- assign body_margin = "" -%}
                {%- endif -%}
                {%- if prompt.body -%}
                  <p class="card-text {{body_margin}}">{{prompt.body}}</p>
                {%- endif -%}
                {%- if prompt.type == "question" -%}
                  {%- for each_option in prompt.options -%}
                    {%- if each_option.option and each_option.go_to_id -%}
                      <a data-go-to-prompt="each_option.go_to_id" 
                          class="btn btn-secondary text-start d-block mt-3"
                          onclick="goToPrompt('{{prompt.id}}','{{each_option.go_to_id}}')">
                        <span class="btn-radio me-2">{{site.data.icons.circle}}</span>{{each_option.option}}
                      </a>
                    {%- endif -%}
                  {%- endfor -%}
                {%- endif -%}
              </div>
            </div>
          {%- endif -%}
        {%- endfor -%}
        <a id="promptBack" class="btn btn-primary mt-4 d-none" onclick="goToLastPrompt()">
          <span class="me-2">{{site.data.icons.back_arrow}}</span>Back
        </a>
      </div>
    </div>
  </div>
</section>


<!-- Discord Invite -->
<section class="">
  <div class="container py-5">
    <div class="row justify-content-center" style="margin-top: -3rem;">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card w-100 rounded-0 border-white">
          <div class="card-body m-3">
            <div class="alert alert-rp d-flex align-items-center mb-0" role="alert">
              <span class="me-3">{{site.data.icons.discord | replace: "1rem", "1.5rem"}}</span>
              <div>
                Still stuck? Get help in the <a href="https://discord.gg/rocketpool" target="_blank">Rocket Pool Discord</a>!
              </div>
            </div>
            <!-- <div class="text-center">
              <a class="btn btn-secondary mt-3" href="https://discord.gg/rocketpool" target="_blank">Join Discord</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

