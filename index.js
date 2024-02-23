import { renderTask, hideDoneTask } from "./ulti.js";
import { addTaskToTaskListOnClick } from "./events/tasksEvents.js";

function app() {

  console.log('hello');

  globalThis.taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  renderTask( globalThis.taskList);

  addTaskToTaskListOnClick();

  hideDoneTask();

  console.log(globalThis.taskList);

}

app();