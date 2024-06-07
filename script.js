dayjs().format()
console.log(dayjs().format());

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let taskCard = document.createElement('div');
    taskCard.className = 'card border-light mb-3 task-card';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header bg-white';

    let title = document.createElement('h2');
    title.className = 'card-title mb-1';
    title.textContent = task.title;
    cardHeader.appendChild(title);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger delete-task';
    deleteButton.setAttribute('data-task-id', task.id); 
    cardHeader.appendChild(deleteButton);

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body bg-light';

    let description = document.createElement('p');
    description.textContent = task.description;
    cardBody.appendChild(description);

    let dueDate = document.createElement('p');
    dueDate.textContent = 'Due Date: ' + task.dueDate;
    
    let daysDiff = dayjs(task.dueDate).diff(dayjs(), 'day');

    if (daysDiff < 0) {
        taskCard.classList.add('text-danger');
    } else if (daysDiff <= 3) {
        taskCard.classList.add('text-warning');
    }
    
    cardBody.appendChild(dueDate);
    taskCard.appendChild(cardHeader);
    taskCard.appendChild(cardBody);
    return taskCard;
}
  

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    document.getElementById('todo-cards').innerHTML = '';
    document.getElementById('in-progress-cards').innerHTML = '';
    document.getElementById('done-cards').innerHTML = '';
  
    taskList.forEach(task => {
      let taskCard = createTaskCard(task);
      let targetColumn;
      switch (task.progress) {
        case 'todo':
          targetColumn = document.getElementById('todo-cards');
          break;
        case 'in-progress':
          targetColumn = document.getElementById('in-progress-cards');
          break;
        case 'done':
          targetColumn = document.getElementById('done-cards');
          break;
        default:
          targetColumn = document.getElementById('todo-cards');
      }
      targetColumn.appendChild(taskCard);

      $(taskCard).draggable({
        revert: 'invalid',
        stack: '.card',
        cursor: 'move',
        containment: '.container'
      });
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
  
    let taskTitle = document.getElementById('taskTitle').value.trim();
    let taskDescription = document.getElementById('taskDescription').value.trim();
    let taskDueDate = dayjs(document.getElementById('taskDueDate').value).format('YYYY-MM-DD');
    if (!taskTitle || !taskDescription || !taskDueDate) {
      return;
    }
    let newTask = {
      id: generateTaskId(),
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      progress: 'todo'
    };
    taskList.push(newTask);
    saveTasksToLocalStorage();
    renderTaskList();
    $('#formModal').modal('hide');
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';
}

document.getElementById('taskForm').addEventListener('submit', handleAddTask);

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = parseInt(event.target.getAttribute('data-task-id'));
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
    }
    saveTasksToLocalStorage();
    renderTaskList();
}

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('delete-task')) {
        handleDeleteTask(event);
    }
});

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.find('.delete-task').attr('data-task-id');
    const newProgress = event.target.id;
    const taskIndex = taskList.findIndex(task => task.id == taskId);
    if (taskIndex !== -1) {
        taskList[taskIndex].progress = newProgress;
    }
    saveTasksToLocalStorage();
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    document.getElementById('addTaskBtn').addEventListener('click', handleAddTask);
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('delete-task')) {
            handleDeleteTask(event);
        }
    });

    $('.lane').droppable({
        accept: '.card',
        drop: handleDrop
    });
});
