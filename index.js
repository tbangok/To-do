import { renderTask, filter, filterFactory } from "./ulti.js";
import { addTaskToTaskListOnClick } from "./events/tasksEvents.js";
import { menuToggle } from "./events/menuEvents.js";

function app() {

  console.log('hello');

  menuToggle();

  globalThis.taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  renderTask(globalThis.taskList);

  addTaskToTaskListOnClick();

  globalThis.filterObj = {
    hideDone: false,
    sortByName: null,
    sortByDate: null,
    tag: null
  }
  filterFactory()

  // console.log(globalThis.taskList);

}

app();