let promptHistory = [1];
let answerIds = {{ site.data.troubleshooting-prompts | where: "type", "answer" | map: "id" | jsonify }};

function goToPrompt(currentId, nextId) {
  const currentPrompt = document.getElementById("prompt" + currentId);
  const nextPrompt = document.getElementById("prompt" + nextId);
  const backButton = document.getElementById("promptBack");
  const discordInvite = document.getElementById("promptDiscordInvite");
  // show the back button unless it's the starting prompt
  if (nextId == 1) {
    backButton.classList.add("d-none");
  } else {
    backButton.classList.remove("d-none");
  }
  // hide the current prompt and show the next one
  currentPrompt.classList.add("d-none");
  nextPrompt.classList.remove("d-none");
  // only show the discord invite on answer prompts
  if (answerIds.includes(nextId)) {
    discordInvite.classList.remove("d-none");
  } else {
    discordInvite.classList.add("d-none");
  }
  // update promptHistory unless going back
  if (promptHistory[promptHistory.length - 1] !== nextId) {
    promptHistory.push(nextId);
  }
}

function goToLastPrompt() {
  const currentId = promptHistory[promptHistory.length - 1];
  let nextId;
  // failsafe - if on first prompt then stay on first prompt
  if (currentId === 1) {
    nextId = 1;
  } else {
    nextId = promptHistory[promptHistory.length - 2];
  }
  // remove the current prompt from promptHistory
  promptHistory.pop();
  // go to the last prompt
  goToPrompt(currentId, nextId);
}

function submitFeedback(solved, promptId, msg) {
  let url = "https://docs.google.com/forms/d/e/1FAIpQLSe_aBVJCnwKum3lHKrs6G_UgyTu2qy1j-64yvp0X27jmBIyWA/formResponse";
  let dataToPost = new FormData();

  dataToPost.append("entry.545240132", solved);
  dataToPost.append("entry.702699373", promptId);
  dataToPost.append("entry.1611392308", promptHistory.join(", "));
  dataToPost.append("entry.1264050795", msg);

  fetch(url,{
    method: "POST",
    mode: "no-cors",
    header:{
      'Content-Type': 'application/json'
    },
    body: dataToPost
  })
  .then(data=>{
    console.log(data);
  })
  .catch(err=>console.error(err));
}



// Enable tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

function copyText(text, id) {
  navigator.clipboard.writeText(text).then(function() {
    let tooltipElement = document.getElementById(id);
    let tooltip = bootstrap.Tooltip.getInstance(tooltipElement);
    setTimeout(() => { tooltip.hide(); }, 1000);
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}