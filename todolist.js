const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("change", filterTodo);

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    showAlert(alertWarning);
    todoInput.value = "";
    return;
  }

  showAlert(alertSuccess);
  saveLocalTodos(todoInput.value);

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target.closest("button");
  if (!item) return;

  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", () => todo.remove());
  }

  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.querySelectorAll(".todo");
  todos.forEach(item => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        item.style.display = item.classList.contains("completed") ? "flex" : "none";
        break;
      case "uncompleted":
        item.style.display = !item.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todo.querySelector(".todo-item").innerText;
  todos = todos.filter(t => t !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(element) {
  element.style.display = "block";
  setTimeout(() => element.style.display = "none", 1500);
}
