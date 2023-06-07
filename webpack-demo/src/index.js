import './style.css';
import Task, { collection } from './modules/task.js';

const input = document.getElementById('input');
let i = 0;
const taskListParent = document.querySelector('.task-lists');

const saveDataToLocalStorage = (data) => {
  localStorage.setItem('Tasks', JSON.stringify(data));
};

const addTask = (e) => {
  const taskHtml = `<div class="d-flex align-items-center py-3 px-3 border-bottom border-1 border-secondary-subtle">
  <input type="checkbox" id="task${i}" class="task-checkbox">
  <label class="px-3" contenteditable="true">${input.value}</label>
  <i class="fa-solid fa-ellipsis-vertical ms-auto"></i>
  </div>`;
  if (e.key === 'Enter') {
    taskListParent.innerHTML += taskHtml;
    i += 1;
    const task = new Task(input.value, i);
    collection.push(task);
    saveDataToLocalStorage(collection);
  }
};

input.addEventListener('keypress', addTask);

const renderTasks = () => {
  taskListParent.innerHTML = '';
  collection.forEach((element) => {
    taskListParent.innerHTML += `<div class="d-flex align-items-center py-3 px-3 border-bottom border-1 border-secondary-subtle">
    <input type="checkbox" id="task" class="task-checkbox">
    <label class="px-3" id="label${element.Index}" contenteditable="true">${element.Name}</label>
    <i class="fa-solid fa-ellipsis-vertical ms-auto"></i></div>`;
  });
};
renderTasks();

const label = document.querySelectorAll('label');
const editText = (e) => {
  label.forEach((element) => {
    if (e.target.id === element.id) {
      const parent = e.target.parentElement;
      parent.lastChild.className = parent.lastChild.className.replace('fa-solid fa-ellipsis-vertical', 'fa-regular fa-trash-can');
    }
  });
};

label.forEach((element) => {
  element.addEventListener('click', editText);
});

const parentContainer = document.querySelector('.task-lists');
const deleteBtn = document.querySelectorAll('i');
const deleteTask = (e) => {
  const classList = Array.from(e.target.classList);
  if (classList.includes('fa-trash-can')) {
    const parent = e.target.parentElement;
    parent.remove();

    saveDataToLocalStorage();
  }
  // console.log(e.target.classList);
};

deleteBtn.forEach((element) => {
  element.addEventListener('click', deleteTask);
  // console.log(element);
});
// console.log(label);