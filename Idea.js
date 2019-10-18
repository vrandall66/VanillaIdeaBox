class Idea {
  constructor({ id, title, description }) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  setLocalStorage() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }

  deleteFromStorage(ideaIndex) {
    ideas.splice(ideaIndex, 1);
    this.setLocalStorage();
  }
}
