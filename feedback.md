---
layout: default
---


<!-- Header -->
<header class="bg-rp-orange">
  <div class="container pt-5 pb-5 mt-2 mb-5 text-center text-white">
    <h1 class="display-5 fw-bold mt-5">Feedback Decoder</h1>
    <div class="col-lg-7 mx-auto">
      <p class="lead mb-4">Paste in the prompt history to decode.</p>
    </div>
  </div>
</header>

<style>

</style>

<!-- Directory -->
<section class="">
  <div class="container py-5">
    <div class="row justify-content-center" style="margin-top: -7rem;">
      <div class="col-12">
        <div class="card rounded-0 border-white mx-auto" style="max-width: 40rem;">
          <div class="card-body markdown m-3">
            <div class="mb-3">
              <label for="promptHistoryInput" class="form-label">Prompt history</label>
              <input type="text" class="form-control" id="promptHistoryInput" placeholder="2, 5, 13" oninput="decode()">
            </div>
            <div class="mb-3">
              <p>Output:</p>
              <div id="promptHistoryOutput">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{%- assign prompts = "{" -%}
{%- for prompt in site.data.troubleshooting-prompts -%}
  {%- capture prompt_item -%}
    {{prompt.id}}: "{{prompt.title}}"
  {%- endcapture -%}
  {% if forloop.last %}
    {%- assign prompts = prompts | append: prompt_item -%}
  {% else %}
    {%- assign prompts = prompts | append: prompt_item | append: "," -%}
  {% endif -%}
{%- endfor -%}
{%- assign prompts = prompts | append: "}" -%}


<script>
  let prompts = {{prompts}};
  function decode() {
    let input = document.getElementById("promptHistoryInput").value;
    let promptHistory = input.replace(" ","").split(",");
    let output = "";
    for (let i in promptHistory) {
      let promptId = promptHistory[i];
      let promptTitle = prompts[promptId];
      let indent = "&nbsp;";
      let decoded = `<p class="mb-0">${indent.repeat(i*3)}<a href="/?id=${promptId}">${promptTitle}</a></p>`
      output += decoded;
    }
    document.getElementById("promptHistoryOutput").innerHTML = output;
  }
</script>