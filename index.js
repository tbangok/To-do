import { renderTask } from "./ulti.js";
import { addTaskToTaskListOnClick } from "./events/tasksEvents.js";

function app() {

  console.log('hello');

  globalThis.taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  renderTask();

  addTaskToTaskListOnClick();

  console.log(globalThis.taskList);

}

app();