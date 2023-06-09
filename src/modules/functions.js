import Task from './task.js';

let collection = JSON.parse(localStorage.getItem('Tasks')) || [];
const input = document.getElementById('input');
const taskListParent = document.querySelector('.task-lists');

const saveDataToLocalStorage = (data) => {
  localStorage.setItem('Tasks', JSON.stringify(data));
};
// Rest the index
const updateIndex = (data) => {
  data.forEach((element, index) => {
    element.Index = index + 1;
  });
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

    taskListParent.appendChild(div);
    div.append(inputCheck, inputLabel, icon);

    // text edit and change to delete icon

    const changeTrashIcon = (e) => {
      const parent = e.target.parentElement;
      parent.lastChild.className = parent.lastChild.className.replace('fa-solid fa-ellipsis-vertical', 'fa-regular fa-trash-can');
      // parent.style.backgroundColor = 'red';
      parent.classList.add('bg-warning');
    };
    const changeEllipsisIcon = (e) => {
      const parent = e.target.parentElement;
      parent.lastChild.className = parent.lastChild.className.replace('fa-regular fa-trash-can', 'fa-solid fa-ellipsis-vertical');
      parent.style.backgroundColor = 'unset';
      parent.classList.remove('bg-warning');
    };
    inputLabel.addEventListener('focus', changeTrashIcon);
    inputLabel.addEventListener('blur', changeEllipsisIcon);
    inputLabel.addEventListener('input', (e) => {
      const parent = e.target.parentElement;
      const index = Array.prototype.indexOf.call(taskListParent.children, parent);
      const updatedValue = inputLabel.value;
      for (let j = 0; j < collection.length; j += 1) {
        if (collection[j].Index - 1 === index) {
          collection[j].Name = updatedValue;
          saveDataToLocalStorage(collection);
        }
      }
    });

    // delete task
    const deleteTask = (e) => {
      if (e.target.classList.contains('fa-trash-can')) {
        const parent = e.target.parentElement;
        const index = Array.from(taskListParent.children).indexOf(parent) + 1;
        collection = collection.filter((element) => element.Index !== index);
        parent.remove();
        updateIndex(collection);
        saveDataToLocalStorage(collection);
      }
    };
    icon.addEventListener('mousedown', deleteTask);

    // check box function
    const checkComplete = (e) => {
      const parent = e.target.parentElement;
      const index = Array.prototype.indexOf.call(taskListParent.children, parent);
      for (let i = 0; i < collection.length; i += 1) {
        if (collection[i].Index - 1 === index) {
          collection[i].Completed = !collection[i].Completed;
        }
      }
      const label = parent.querySelector('.label');
      const checkBox = parent.querySelector('.task-checkbox');
      if (checkBox.checked) {
        label.style.textDecoration = 'line-through';
      } else {
        label.style.textDecoration = 'none';
      }
      saveDataToLocalStorage(collection);
    };
    inputCheck.addEventListener('change', checkComplete);
  });
};

// add task
let i = 1;
const addTask = (e) => {
  const localData = JSON.parse(localStorage.getItem('Tasks'));
  if (localData.length !== 0) {
    i = localData.length;
    i += 1;
  }

  if (e.key === 'Enter' && input.value !== '') {
    const task = new Task(input.value, i);
    i += 1;
    collection.push(task);
    saveDataToLocalStorage(collection);
    renderTasks();
    input.value = '';
  }
};
input.addEventListener('keypress', addTask);

export { renderTasks as default };
saveDataToLocalStorage(collection);

// clear all function
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