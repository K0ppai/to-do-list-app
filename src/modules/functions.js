import Task from './task.js';

let collection = JSON.parse(localStorage.getItem('Tasks')) || [];
const input = document.getElementById('input');
const taskListParent = document.querySelector('.task-lists');

const saveDataToLocalStorage = (data) => {
  localStorage.setItem('Tasks', JSON.stringify(data));
};

const updateIndex = (data) => {
  data.forEach((element, index) => {
    element.Index = index + 1;
  });
};

const changeTrashIcon = (event) => {
  const parent = event.target.parentElement;
  parent.lastChild.className = parent.lastChild.className.replace('fa-solid fa-ellipsis-vertical', 'fa-regular fa-trash-can');
  parent.classList.add('bg-warning');
};

const changeEllipsisIcon = (event) => {
  const parent = event.target.parentElement;
  parent.lastChild.className = parent.lastChild.className.replace('fa-regular fa-trash-can', 'fa-solid fa-ellipsis-vertical');
  parent.style.backgroundColor = 'unset';
  parent.classList.remove('bg-warning');
};

const changeInput = (event) => {
  const parent = event.target.parentElement;
  const index = Array.prototype.indexOf.call(taskListParent.children, parent);
  const label = parent.querySelector('.label');
  const updatedValue = label.value;
  for (let j = 0; j < collection.length; j += 1) {
    if (collection[j].Index - 1 === index) {
      collection[j].Name = updatedValue;
      saveDataToLocalStorage(collection);
    }
  }
};

const deleteTask = (event) => {
  if (event.target.classList.contains('fa-trash-can')) {
    const parent = event.target.parentElement;
    const index = Array.from(taskListParent.children).indexOf(parent) + 1;
    collection = collection.filter((element) => element.Index !== index);
    parent.remove();
    updateIndex(collection);
    saveDataToLocalStorage(collection);
  }
};

const toggleCheck = (event) => {
  const parent = event.target.parentElement;
  const index = Array.prototype.indexOf.call(taskListParent.children, parent);
  collection.forEach((element) => {
    if (index === element.Index - 1) {
      element.Completed = !element.Completed;
    }
  });
  const label = parent.querySelector('.label');
  const checkBox = parent.querySelector('.task-checkbox');
  if (checkBox.checked) {
    label.style.textDecoration = 'line-through';
  } else {
    label.style.textDecoration = 'none';
  }
  saveDataToLocalStorage(collection);
};

// generate dynamically
const renderTasks = () => {
  taskListParent.innerHTML = '';
  collection.forEach((element, index) => {
    const div = document.createElement('div');
    const inputCheck = document.createElement('input');
    const inputLabel = document.createElement('input');
    const icon = document.createElement('i');
    div.className = 'd-flex align-items-center py-3 ps-4 pe-3 border-bottom border-1 border-secondary-subtle';
    inputCheck.className = 'task-checkbox';
    inputCheck.type = 'checkbox';
    inputCheck.id = `task${index}`;
    inputLabel.className = 'label ms-3 px-2 py-1 rounded-2';
    inputLabel.id = `label${index}`;
    inputLabel.type = 'text';
    inputLabel.value = element.Name;
    inputLabel.name = 'description';
    icon.className = 'fa-solid fa-ellipsis-vertical ms-auto';
    if (element.Completed === true) {
      inputLabel.style.textDecoration = 'line-through';
      inputCheck.checked = true;
    }

    taskListParent.appendChild(div);
    div.append(inputCheck, inputLabel, icon);

    inputLabel.addEventListener('focus', changeTrashIcon);
    inputLabel.addEventListener('blur', changeEllipsisIcon);
    inputLabel.addEventListener('input', changeInput);
    inputCheck.addEventListener('change', toggleCheck);
    icon.addEventListener('mousedown', deleteTask);
  });
};

let i = 1;
const addTask = (event) => {
  const localData = JSON.parse(localStorage.getItem('Tasks'));
  if (localData.length !== 0) {
    i = localData.length;
    i += 1;
  }

  if (event.key === 'Enter' && input.value !== '') {
    const task = new Task(input.value, i);
    i += 1;
    collection.push(task);
    saveDataToLocalStorage(collection);
    renderTasks();
    input.value = '';
  }
};
input.addEventListener('keypress', addTask);

const clearBtn = document.querySelector('.clear');
const clearAllCompleted = () => {
  collection.forEach(() => {
    collection = collection.filter((complete) => complete.Completed === false);
    updateIndex(collection);
    saveDataToLocalStorage(collection);
    renderTasks();
  });
};
clearBtn.addEventListener('click', clearAllCompleted);

const resetBtn = document.querySelector('.fa-arrows-rotate');
const reset = () => {
  collection = [];
  saveDataToLocalStorage(collection);
  renderTasks();
};
resetBtn.addEventListener('click', reset);

export { renderTasks as default };
saveDataToLocalStorage(collection);
