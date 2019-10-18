let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

let inputTitle = document.querySelector(".form__input--title");
let inputDescription = document.querySelector(".form__input--description");
let submitBtn = document.querySelector(".form__btn--submit");
let ideaContainer = document.querySelector(".container__section");
let deleteBtn = document.querySelector(".idea__button--delete");

submitBtn.addEventListener("click", makeNewIdea);
ideaContainer.addEventListener("click", checkEvent);

persistedIdeas();
displayIdeas();

function checkEvent() {
  event.target.classList.contains("idea__button--delete")
    ? deleteIdeaDOM(event)
    : null;
}

function makeNewIdea() {
  if (inputTitle.value && inputDescription) {
    let idea = new Idea({
      id: Date.now(),
      title: inputTitle.value,
      description: inputDescription.value
    });
    ideas.push(idea);
    idea.setLocalStorage(ideas);
    renderIdea(idea);
    clearInputs();
  }
}

function clearInputs() {
  inputTitle.value = "";
  inputDescription.value = "";
}

function deleteIdeaDOM(event) {
  event.target.parentNode.remove();
  let found = findIdea(event.target.id);
  ideas[found].deleteFromStorage(found, ideas);
}

function findIdea(eventID) {
  return ideas.findIndex(idea => idea.id == eventID);
}

function persistedIdeas() {
  return (ideas = ideas.map(({ id, title, description }) => {
    return new Idea({ id, title, description });
  }));
}

function displayIdeas() {
  return ideas.forEach(idea => renderIdea(idea));
}

function renderIdea(idea) {
  return ideaContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="idea__div" id="${idea.id}">
        <h3 class="idea__div--h3">${idea.title}</h3>
        <p class="idea__div--p">${idea.description}</p>
        <button type="button" class="idea__button--delete" id=${idea.id}>Delete</button>
      </div>`
  );
}
