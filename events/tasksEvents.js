import { todoFactory, renderTask,saveToLocalStorage } from "../ulti.js";

export function addTaskToTaskListOnClick( ) {
let taskList = globalThis.taskList;
  const addTaskBtn = document.querySelector('.submit-button');
  const inputName = document.querySelector('.input-name');
  const inputDes = document.querySelector('.input-des');
  const inputTag = document.querySelector('.input-tag');

  // guard de bo qua null
  if (addTaskBtn === null) {
    throw new Error('Khong co button');
  }
  if (inputName === null) {
    throw new Error('Khong co inputName');
  }
  if (inputDes === null) {
    throw new Error('Khong co inputDes');
  }
  if (inputTag === null) {
    throw new Error('Khong co inputTag');
  }

  addTaskBtn.addEventListener('click', (e) => {
    if (inputName.value == '') {
      return
    } else {
      const taskName = `${inputName.value}`;

      const taskDes = `${inputDes.value}`;

      let tags = [];
      const values = inputTag.value.split(',');
      values.forEach(value => {
        const trimmedValue = value.trim();
        if (trimmedValue !== '') {
          const tag = trimmedValue;
          tags.push(tag)
        }
      })

      const newTodo = todoFactory(taskName, taskDes, tags);
      taskList.push(newTodo);
      saveToLocalStorage();
 
      renderTask( );
      e.preventDefault();
      inputDes.value = '';
      inputName.value = '';
      inputTag.value = '';
    }

  })
}


