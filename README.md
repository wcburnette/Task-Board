User Story
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly

Acceptance Criteria
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist

Technologies Used
HTML
CSS
JavaScript
Bootstrap
jQuery
jQuery UI
Day.js

How to Use
Click the "Add Task" button to open the modal.
Fill out the task title, due date, and task description in the form.
Click the "Add Task" button in the modal to add the task to the board.
Drag tasks between columns to change their progress status.
Click the "Delete" button on a task card to remove it from the board.
When task font is (Red) tasks are overdue, when task font is (Yellow) tasks are almost due.

Site Link
https://wcburnette.github.io/Task-Board/

Screen Record
https://1drv.ms/v/s!Ajvx8AL_kpmUl3Fc6nrX_BddxV6i?e=WXII5A
