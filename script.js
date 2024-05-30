// Retrieve tasks and nextId from localStorage
function readProjectsFromLocalStorage() {
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    if (!taskList) {
        taskList = [];
    }
    return taskList;
}

function readNextIdFromLocalStorage() {
    let nextId = JSON.parse(localStorage.getItem("nextId"));
    if (!nextId) {
        nextId = [];
    }
    return nextId;
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let tasks = readProjectsFromLocalStorage();
    let maxId = 0;
    tasks.forEach(task => {
        if (task.id > maxId) {
            maxId = task.id;
        }
    });
    const newId = maxId + 1; 
    return newId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card');
    const cardBody = $('<div>').addClass('card-body');
    const cardHeader = $('<h5>').addClass('card-title').text(task.name);
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    
    cardBody.append(cardHeader, cardDescription, cardDueDate);
    taskCard.append(cardBody);
    
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const projects = readProjectsFromLocalStorage();
    $('#todo-cards', '#in-progress-cards', '#done-cards').empty();
    projects.forEach(project => {
        const projectCard = $('<div>').addClass('card').attr('data-project-id', project.id);
        const cardBody = $('<div>').addClass('card-body');
        const cardHeader = $('<h5>').addClass('card-title').text(project.name);
        project.tasks.forEach(task => {
            const taskCard = createTaskCard(task);
            taskCard.draggable({ revert: true });
            cardBody.append(taskCard);
        });
        projectCard.append(cardBody);
        $('#todo-cards', '#in-progress-cards', '#done-cards').append(projectCard);
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const projectId = $(this).attr('data-project-id');
    const projects = readProjectsFromLocalStorage();  
    projects.forEach((project) => {
        if (project.id === projectId) {
            const newTask = {
                id: generateTaskId(),
                name: 'New Task Name',
                description: 'New Task Description',
                dueDate: newDate(),
                status: 'Not Started'
            };
            project.tasks.push(newTask);
        }
    });
    renderTaskList();
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();
    const projectId = $(this).attr('data-project-id');
    const projects = readProjectsFromLocalStorage();
    projects.forEach((project) => {
        if (project.id === projectId) {
          projects.splice(project.indexOf(project), 1);
        }
      });
      saveProjectsToStorage(projects);
      printProjectData();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable[0].dataset.projectId;
    const newStatus = event.target.id;
    for (let project of projects) {
        if (project.id === taskID) {
            project.status = newStatus;
        }
    } localStorage.setItem('projects', JSON.stringify(projects));
        printProjectData();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $('#project-form').on('submit', handleAddTask);
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    $('#draggable').draggable();
    $('#droppable').droppable({
        drop: function(event, ui) {
            $(this)
                .addClass('ui-state-highlight')
                .find('p')
                .html('Dropped!');
        }
    });

    $('#project-dueDate-input').datepicker();
});
