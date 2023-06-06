import './style.css';
// import 'bootstrap';

class TaskList {
  constructor() {
    this.collection = JSON.parse(localStorage.getItem('Task')) || [];
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
const checkBox = document.querySelector('task-checkbox');
console.log(checkBox.checked);

const addTask = (e) => {
  const task = new Task(input,)
  const taskListParent = document.querySelector('.task-lists');
  const taskHtml = `<div class="d-flex align-items-center py-3 px-3 border-bottom border-1 border-secondary-subtle">
  <input type="checkbox" name="" id="task" class="task-checkbox">
  <label for="" class="px-3">${input.value}</label>
  <i class="fa-solid fa-ellipsis-vertical ms-auto"></i>
</div>`;
  if (e.key === 'Enter') {
    taskListParent.innerHTML += taskHtml;
    saveDataToLocalStorage(taskList.collection);
  }};
input.addEventListener('keypress',addTask);

const saveDataToLocalStorage = (data) => {
  localStorage.setItem('Tasks', JSON.stringify(data));
};