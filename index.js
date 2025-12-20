const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : items;
}
function handleDelete(clone) {
  clone.remove();
  const items = getTasksFromDOM();
  saveTasks(items);
}

function handleDuplicate(item) {
  const newItem = createItem(item);
  listElement.prepend(newItem);
  const items = getTasksFromDOM();
  saveTasks(items);
}

function handleEdit(textElement) {
  textElement.setAttribute("contenteditable", "true");
  textElement.focus();
}

function handleBlur(textElement) {
  textElement.setAttribute("contenteditable", "false");
  const items = getTasksFromDOM();
  saveTasks(items);
}
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  textElement.textContent = item;
  deleteButton.addEventListener("click", () => handleDelete(clone));
  duplicateButton.addEventListener("click", () => handleDuplicate(item));
  editButton.addEventListener("click", () => handleEdit(textElement));
  textElement.addEventListener("blur", () => handleBlur(textElement));
  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((element) => tasks.push(element.textContent));
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const loadedItems = loadTasks();
loadedItems.forEach((item) => listElement.append(createItem(item)));

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  listElement.prepend(createItem(inputElement.value));
  items = getTasksFromDOM();
  saveTasks(items);
  inputElement.value = "";
});
