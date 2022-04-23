let promptHistory = [1];
let answerIds = {{ site.data.troubleshooting-prompts | where: "type", "answer" | map: "id" | jsonify }};
let autoSolvedIds = [];
let autoUnsolvedIds = [13];

function goToPrompt(currentId, nextId) {
  const currentPrompt = document.getElementById("prompt" + currentId);
  const nextPrompt = document.getElementById("prompt" + nextId);
  const backButton = document.getElementById("promptBack");
  const promptExtra = document.getElementById("promptExtra");
  const promptFeedback = document.getElementById("promptFeedback");
  const feedbackRadios = document.getElementById("feedbackRadios");
  // show the back button unless it's the starting prompt
  if (nextId == 1) {
    backButton.classList.add("d-none");
  } else {
    backButton.classList.remove("d-none");
  }
  // hide the current prompt, reset feedback, and show the next one
  currentPrompt.classList.add("d-none");
  resetFeedback();
  nextPrompt.classList.remove("d-none");
  // only show the feedback and discord invite on answer prompts
  if (answerIds.includes(nextId)) {
    promptExtra.classList.remove("d-none");
    // hide/show the feedback radios for these
    if (autoUnsolvedIds.includes(nextId)) {
      // feedbackRadios.classList.add("d-none");
      setFeedbackAndHide("no");
    } else if (autoSolvedIds.includes(nextId)) {
      // feedbackRadios.classList.add("d-none");
      setFeedbackAndHide("yes");
    }
  } else {
    promptExtra.classList.add("d-none");
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


function setFeedbackAndHide(value) {
  document.getElementById("feedbackRadios").classList.add("d-none");
  if (value == "yes") {
    document.feedbackRadios.feedbackRadio.value = "yes";
  }
  if (value == "no") {
    document.feedbackRadios.feedbackRadio.value = "no";
  }
}


function resetFeedback() {
  setFeedbackAndHide("yes");
  document.getElementById("feedbackButton").disabled = false;
  document.getElementById("feedbackComment").value = "";
  document.getElementById("promptFeedback").classList.remove("d-none");
  document.getElementById("feedbackRadios").classList.remove("d-none");
  document.getElementById("promptFeedbackSubmitted").classList.add("d-none");
}


function submitFeedback() {
  document.getElementById("feedbackButton").disabled = true;
  let url = "https://docs.google.com/forms/d/e/1FAIpQLSe_aBVJCnwKum3lHKrs6G_UgyTu2qy1j-64yvp0X27jmBIyWA/formResponse";
  let dataToPost = new FormData();
  let isSolved = document.querySelector('input[name="feedbackRadio"]:checked').value;
  let promptId = promptHistory[promptHistory.length - 1];
  let history = promptHistory.join(", ");
  let comment = document.getElementById("feedbackComment").value;

  dataToPost.append("entry.545240132", isSolved);
  dataToPost.append("entry.702699373", promptId);
  dataToPost.append("entry.1611392308", history);
  dataToPost.append("entry.1264050795", comment);

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
    console.log("feedback submitted");
    document.getElementById("promptFeedback").classList.add("d-none");
    document.getElementById("promptFeedbackSubmitted").classList.remove("d-none");
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