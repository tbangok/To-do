export function renderTask() {
  let taskList = globalThis.taskList;
  const taskZone = document.querySelector('.task-zone');
  taskZone.replaceChildren(''); //clear child de khong bi append vao chil co san

  const notiTask = document.createElement('div');
  if (taskList.length === 0 && taskZone != null) {
    notiTask.textContent = 'No task found';
    taskZone.textContent = notiTask.textContent;

  } else {

    const taskListElement = taskList.map(
      createTaskElement
    )
    taskListElement.forEach(task => taskZone.appendChild(task))
  }
}


function createTaskElement(task = {
  id: '', name: '', description: '', tags: [], create: new Date(), status: false
}) {
  //tao task
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  //task text
  const taskText = document.createElement('div');
  taskText.classList.add('task-text');
  taskText.innerHTML = `<div class="task-name ${task.status ? 'done' : ''}">${task.name}</div>
     <div class="task-des ${task.status ? 'done' : ''}">${task.description}</div>
     <div class="task-tag">${createTagsElements(task.tags)} </div>`

  taskElement.appendChild(taskText);

  //check button
  const doneButton = createButtonDone(task.id);
  taskElement.appendChild(doneButton)

  //delete button
  const deleteButton = createButtonDelete(task.id);
  taskElement.appendChild(deleteButton)

  return taskElement
}


function createTagsElements(tags = []) {

  let tagString = tags.map(tagName => {
    const tag = document.createElement('button');
    tag.classList.add('tag');
    tag.textContent = tagName;
    return tag.outerHTML
  })
  tagString = tagString.join('');
  return tagString
}


export function createButtonDone(id) {
  let taskList = globalThis.taskList;
  const doneButton = document.createElement('button');
  doneButton.classList.add('check');
  doneButton.addEventListener('click', function () {
    taskList.forEach(task => {
      if (task.id === id) {
        task.status = !task.status;
        // console.log(task)
        renderTask();
        saveToLocalStorage()
      }
    })

  })
  return doneButton
}


export function createButtonDelete(id) {

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('del');
  
  deleteButton.addEventListener('click', function () {
    globalThis.taskList = globalThis.taskList.filter(task => task.id != id)
    renderTask();
    saveToLocalStorage();
  })
  return deleteButton
}


export function todoFactory(name, description, tags) {

  return {
    id: crypto.randomUUID(),
    name: name,
    description: description,
    tags: tags,
    create: new Date(),
    status: false
  }
}

export function saveToLocalStorage() {

  localStorage.setItem('tasks', JSON.stringify(globalThis.taskList));

}