import { renderTask, hideDoneTask, sortByName } from "./ulti.js";
import { addTaskToTaskListOnClick } from "./events/tasksEvents.js";
import { menuToggle } from "./events/menuEvents.js";

function app() {

  console.log('hello');

  menuToggle();

  globalThis.taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  renderTask( globalThis.taskList);

  addTaskToTaskListOnClick();

  hideDoneTask();
  sortByName();

  console.log(globalThis.taskList);

}

app();