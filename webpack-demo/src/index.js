import './style.css';

class TaskList {
  constructor() {
    this.collection = JSON.parse(localStorage.getItem('Tasks')) || [];
  }
}

class Task {
  constructor(name,check,index) {
    this.Name = name;
    this.Checked = check;
    this.Index = index;
  }
}

const taskList = new TaskList();
const input = document.getElementById('input');
const checkBox = document.getElementById('task1').checked;
let index = 0;
const taskListParent = document.querySelector('.task-lists');

const addTask = (e) => {
  const taskHtml = `<div class="d-flex align-items-center py-3 px-3 border-bottom border-1 border-secondary-subtle">
  <input type="checkbox" name="" id="task" class="task-checkbox">
  <label for="" class="px-3">${input.value}</label>
  <i class="fa-solid fa-ellipsis-vertical ms-auto"></i>
  </div>`;
  const task = new Task(input.value,checkBox,index)
  if (e.key === 'Enter') {
    taskListParent.innerHTML += taskHtml;
    index++;
    taskList.collection.push(task);
    saveDataToLocalStorage(taskList.collection);
}};

input.addEventListener('keypress',addTask);

const saveDataToLocalStorage = (data) => {
  localStorage.setItem('Tasks', JSON.stringify(data));
};
console.log(taskList.collection);

const renderTasks = () => {
  taskListParent.innerHTML = ``;
  taskList.collection.forEach(element => {
    taskListParent.innerHTML += `<div class="d-flex align-items-center py-3 px-3 border-bottom border-1 border-secondary-subtle">
    <input type="checkbox" name="" id="task" class="task-checkbox">
    <label for="" class="px-3">${element.Name}</label>
    <i class="fa-solid fa-ellipsis-vertical ms-auto"></i>
    </div>`;
  });
}
renderTasks();