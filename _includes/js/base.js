let promptHistory = [1];

function goToPrompt(currentId, nextId) {
  const currentPrompt = document.getElementById("prompt" + currentId);
  const nextPrompt = document.getElementById("prompt" + nextId);
  const backButton = document.getElementById("promptBack");
  // show the back button unless it's the starting prompt
  if (nextId == 1) {
    backButton.classList.add("d-none");
  } else {
    backButton.classList.remove("d-none");
  }
  // hide the current prompt and show the next one
  currentPrompt.classList.add("d-none");
  nextPrompt.classList.remove("d-none");
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
