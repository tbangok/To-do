export function renderTask(list = []) {
  const taskZone = document.querySelector('.task-zone');
  taskZone.replaceChildren(''); //clear child de khong bi append vao chil co san

  const notiTask = document.createElement('div');
  if (globalThis.taskList.length === 0 && taskZone != null) {
    notiTask.textContent = 'No task found';
    taskZone.textContent = notiTask.textContent;

  } else {

    const taskListElement = list.map(createTaskElement)
    taskListElement.forEach(task => taskZone.appendChild(task))
  }
  // console.log('render', globalThis.taskList, 'list', list)
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


function createButtonDone(id) {
  const doneButton = document.createElement('button');
  doneButton.classList.add('check');
  doneButton.addEventListener('click', function () {
    globalThis.taskList.forEach(task => {
      if (task.id === id) {
        task.status = !task.status;
        renderTask(globalThis.taskList);
        saveToLocalStorage()
      }
    })
  })
  return doneButton
}

function createButtonDelete(id) {

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('del');

  deleteButton.addEventListener('click', function () {
    globalThis.taskList = globalThis.taskList.filter(task => task.id != id)
    renderTask(globalThis.taskList);
    saveToLocalStorage();
    console.log('delete', globalThis.taskList)
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


//filter



export function filterFactory() {

  const filterBtn = document.querySelector('.filter');

  const hideDoneButton = document.querySelector('.hide-done');

  hideDoneButton.addEventListener('click', () => {
    if (hideDoneButton.checked) {
      globalThis.filterObj.hideDone = true
    } else globalThis.filterObj.hideDone = false
  })

  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => tag.addEventListener('click', () => {
    globalThis.filterObj.sortByDate = null;
    globalThis.filterObj.sortByName = null;
    globalThis.filterObj.tag = `${tag.textContent}`;
    console.log('tagg', globalThis.filterObj)

  }))

  const sortNameAscending = document.querySelector('.name-ascending');
  const sortNameDescending = document.querySelector('.name-descending');

  sortNameAscending.addEventListener('click', () => {
    globalThis.filterObj.sortByName = 'ascending';
    globalThis.filterObj.sortByDate = null;
    globalThis.filterObj.tag = null;
    console.log(globalThis.filterObj)
  });

  sortNameDescending.addEventListener('click', () => {
    globalThis.filterObj.sortByName = 'descending';
    globalThis.filterObj.sortByDate = null;
    globalThis.filterObj.tag = null;
    console.log(globalThis.filterObj)

  });

  const sortDateAscending = document.querySelector('.date-ascending');
  const sortDateDescending = document.querySelector('.date-descending');

  sortDateAscending.addEventListener('click', () => {
    globalThis.filterObj.sortByDate = 'ascending';
    globalThis.filterObj.sortByName = null;
    globalThis.filterObj.tag = null;
    console.log(globalThis.filterObj)

  });

  sortDateDescending.addEventListener('click', () => {
    globalThis.filterObj.sortByDate = 'descending';
    globalThis.filterObj.sortByName = null;
    globalThis.filterObj.tag = null;
    console.log(globalThis.filterObj)

  });



  filterBtn.addEventListener('click', filter)
  tags.forEach(tag => tag.addEventListener('click', filter))
}
 
export function filter() {
  let taskListTempt = globalThis.taskList;
  //done

  if (globalThis.filterObj.hideDone) {
    taskListTempt = taskListTempt.filter(task => task.status!=true);
    renderTask(taskListTempt);
    console.log(taskListTempt)
  } else renderTask(taskListTempt);

  //tag 
  let taskListTemptTag = taskListTempt;
  if (globalThis.filterObj.tag) {
    taskListTemptTag = taskListTempt.filter(task => task.tags.includes(globalThis.filterObj.tag));
    console.log('click', taskListTempt)
    renderTask(taskListTemptTag);
  } else renderTask(taskListTempt);


  //sort name

  let taskListTemptSort = taskListTempt;

  if (globalThis.filterObj.sortByName === 'ascending') {
    taskListTemptSort = taskListTemptSort.sort((a, b) => {

      if (a.name < b.name) {
        return -1;
      }
      else return 1;

    })
    renderTask(taskListTemptSort);

  } else if (globalThis.filterObj.sortByName === 'descending') {
    taskListTemptSort = taskListTemptSort.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      else return -1;

    })
    renderTask(taskListTemptSort);

  }

  //sort date
  if (globalThis.filterObj.sortByDate === 'ascending') {
    taskListTemptSort = taskListTemptSort.sort((a, b) => {
      if (a.create < b.create) {
        return -1;
      }
      else return 1;

    })
    renderTask(taskListTemptSort);

  } else if (globalThis.filterObj.sortByDate === 'descending') {
    taskListTemptSort = taskListTemptSort.sort((a, b) => {
      if (a.create < b.create) {
        return 1;
      }
      else return -1;

    })
    renderTask(taskListTemptSort);

  }

  filterFactory();
  // renderTask(taskListTemptSort);

}
