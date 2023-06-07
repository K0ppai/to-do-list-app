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
  <label class="px-3">${input.value}</label>
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
    <input type="checkbox" name="" id="task" class="task-checkbox">
    <label for="" class="px-3">${element.Name}</label>
    <i class="fa-solid fa-ellipsis-vertical ms-auto"></i>
    </div>`;
  });
};
renderTasks();