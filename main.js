let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

let inputTitle = document.querySelector(".form__input--title");
let inputDescription = document.querySelector(".form__input--description");
let submitBtn = document.querySelector(".form__btn--submit");
let ideaContainer = document.querySelector(".container__section");
let deleteBtn = document.querySelector(".idea__button--delete");

submitBtn.addEventListener("click", checkInputs);
ideaContainer.addEventListener("click", checkEvent);

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
    title: inputTitle.value,
    description: inputDescription.value,
    id: Date.now()
  });
  console.log(idea);
  ideas.push(idea);
  idea.setLocalStorage(idea);
  renderIdea(idea);
}

function deleteIdeaDOM(event) {
  console.log(event);
  event.target.parentNode.remove();
  deleteIdea(event.target.id);
}

function deleteIdea(eventID) {
  let foundIndex = ideas.findIndex(idea => idea.id === eventID);
  ideas.splice(foundIndex, 1);
}

function persistedIdeas() {
  ideas.map(index => {
    let id = ideas[index].id;
    let title = ideas[index].title;
    let description = ideas[index].description;
    reassignClass(id, title, description);
  });
}

function reassignClass(id, title, description) {
  let idea = new Idea({
    id: id,
    title: title,
    description: description
  });
  ideas.splice(i, 1, idea);
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
