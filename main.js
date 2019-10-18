let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

let inputTitle = document.querySelector(".form__input--title");
let inputDescription = document.querySelector(".form__input--description");
let submitBtn = document.querySelector(".form__btn--submit");
let ideaContainer = document.querySelector(".container__section");
let deleteBtn = document.querySelector(".idea__button--delete");

submitBtn.addEventListener("click", checkInputs);
ideaContainer.addEventListener("click", checkEvent);

persistedIdeas();
displayIdeas();

function checkEvent() {
  event.target.classList.contains("idea__button--delete")
    ? deleteIdeaDOM(event)
    : null;
}

function checkInputs() {
  if (inputTitle.value && inputDescription) {
    makeNewIdea();
  }
}

function makeNewIdea() {
  let idea = new Idea({
    id: Date.now(),
    title: inputTitle.value,
    description: inputDescription.value
  });
  ideas.push(idea);
  idea.setLocalStorage(ideas);
  renderIdea(idea);
}

function deleteIdeaDOM(event) {
  event.target.parentNode.remove();
  deleteIdea(event.target.id);
}

function deleteIdea(eventID) {
  let foundIdeaIndex = ideas.findIndex(idea => idea.id !== eventID);
  return ideas[foundIdeaIndex].deleteFromStorage(foundIdeaIndex);
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
        <h3>${idea.title}</h3>
        <p>${idea.description}</p>
        <button type="button" class="idea__button--delete" id=${idea.id}>Delete</button>
      </div>`
  );
}
