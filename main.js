let ideas = []

let inputTitle = document.querySelector('.form__input--title')
let inputDescription = document.querySelector('.form__input--description')
let submitBtn = document.querySelector('.form__btn--submit')
let ideaContainer = document.querySelector('.container__section')
let deleteBtn = document.querySelector('.idea__button--delete')

submitBtn.addEventListener('click', checkInputs)
ideaContainer.addEventListener('click', checkEvent)

function checkEvent() {
  event.target.classList.contains('idea__button--delete') ? deleteIdeaDOM(event) : null
}

function checkInputs() {
  if (inputTitle.value && inputDescription) {
    makeNewIdea()
  }
}

function makeNewIdea() {
  let idea = {
    title: inputTitle.value,
    description: inputDescription.value,
    id: Date.now()
  }
  new Idea(idea)
  ideas.push(idea)
  renderIdeas();
}

function deleteIdeaDOM(event) {
  console.log(event)
  event.target.parentNode.remove();
  deleteIdea(event.target.id)
}

function deleteIdea(eventID) {
  let foundIndex = ideas.findIndex(idea => idea.id === eventID)
  ideas.splice(foundIndex, 1)
  renderIdeas();
}

function renderIdeas() {
  ideas.map(idea => {
    ideaContainer.insertAdjacentHTML('afterbegin',
      `<div class="idea__div" id="${idea.id}">
        <h3>${idea.title}</h3>
        <p>${idea.description}</p>
        <button type="button" class="idea__button--delete" id=${idea.id}>Delete</button>
      </div>`
    )
  })
}