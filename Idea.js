class Idea {
  constructor({ title, description, id }) {
    this.title = title;
    this.description = description;
    this.id = id;
  }

  setLocalStorage() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }
}
