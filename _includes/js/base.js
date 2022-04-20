let promptHistory = [1];
let answerIds = {{ site.data.troubleshooting-prompts | where: "type", "answer" | map: "id" | jsonify }};

function goToPrompt(currentId, nextId) {
  const currentPrompt = document.getElementById("prompt" + currentId);
  const nextPrompt = document.getElementById("prompt" + nextId);
  const backButton = document.getElementById("promptBack");
  const promptExtra = document.getElementById("promptExtra");
  // show the back button unless it's the starting prompt
  if (nextId == 1) {
    backButton.classList.add("d-none");
  } else {
    backButton.classList.remove("d-none");
  }
  // hide the current prompt and show the next one
  currentPrompt.classList.add("d-none");
  nextPrompt.classList.remove("d-none");
  // only show the feedback and discord invite on answer prompts
  if (answerIds.includes(nextId)) {
    promptExtra.classList.remove("d-none");
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


function submitFeedback() {
  let isSolved = document.querySelector('input[name="feedbackSolved"]:checked').value;
  let promptId = promptHistory[promptHistory.length - 1];
  let comment = document.getElementById("feedbackComment").value;
  sendFeedback(isSolved, promptId, comment);

  document.getElementById("promptFeedback").classList.add("d-none");
  document.getElementById("promptFeedbackSubmitted").classList.remove("d-none");
}

function sendFeedback(isSolved, promptId, comment) {
  let solved = `isSolved=${ encodeURIComponent(isSolved) }`;
  let id = `&promptId=${ encodeURIComponent(promptId) }`;
  let history = `&promptHistory=${ encodeURIComponent(promptHistory.join(", ")) }`;
  let msg = `&comment=${ encodeURIComponent(comment) }`;
  let parameters = solved + id + history + msg;
  let url = "/.netlify/functions/feedback/?" + parameters;
  fetch(url);
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