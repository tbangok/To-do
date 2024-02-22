export function menuToggle() {
  const menuToggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const inMenus = document.querySelectorAll('.in-menu');
  const texts = document.querySelectorAll('.text');
  let isOpen = true;
  function toggle() {
    if (isOpen) {
      menu.style.width = '100px';
      inMenus.forEach(me => me.style.width = '20px');
      isOpen = !isOpen;
      texts.forEach(text => text.classList.add('hidden'));
      menuToggleBtn.textContent = '>';

    } else {
      menu.style.width = '400px';
      inMenus.forEach(me => me.style.width = '340px');
      texts.forEach(text => text.classList.remove('hidden'));
      menuToggleBtn.textContent = '<';
      isOpen = !isOpen;
    }
  }
  menuToggleBtn.addEventListener('click', toggle)
}

export function addTask() {
  // varible

  const addTask = document.querySelector('.submit-button');
  const inputName = document.querySelector('.input-name');
  const inputDes = document.querySelector('.input-des');
  const inputTag = document.querySelector('.input-tag');
  const taskZone = document.querySelector('.task-zone');
  const input = document.querySelectorAll('input[type="text"]');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  //click
  addTask.addEventListener('click', (e) => {
    if (inputName.value == '') {
      // return
    } else {
      const task = document.createElement('div');
      task.classList.add('task');
      taskZone.appendChild(task);

      const taskText = document.createElement('div');
      taskText.classList.add('task-text');
      task.appendChild(taskText);

      const taskName = document.createElement('div');
      taskName.classList.add('task-name');
      taskText.appendChild(taskName);
      taskName.textContent = `${inputName.value}`;

      const taskDes = document.createElement('div');
      taskDes.classList.add('task-des');
      taskText.appendChild(taskDes);
      taskDes.textContent = `${inputDes.value}`;

      const taskTag = document.createElement('div');
      taskTag.classList.add('task-tag');
      taskText.appendChild(taskTag);
      let tags = [];
      const values = inputTag.value.split(',');
      values.forEach(value => {
        const trimmedValue = value.trim();
        if (trimmedValue !== '') {
          const tag = document.createElement('button');
          tag.classList.add('tag');
          tag.textContent = trimmedValue;
          tags.push(tag.textContent)
          taskTag.appendChild(tag);;
        }
      })

      const todoTask = todoFactory(taskName.textContent, taskDes.textContent, tags);
      tasks.push(todoTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      // console.log(taskName.textContent, taskDes.textContent, tags)

      //button
      const check = document.createElement('button');
      check.classList.add('check');
      task.appendChild(check);

      const del = document.createElement('button');
      del.classList.add('del');
      task.appendChild(del);

      //del
      del.addEventListener('click', () => {
        taskZone.removeChild(task);
      });

      //check
      check.addEventListener('click', () => {
        taskName.classList.toggle('done');
        taskDes.classList.toggle('done');
      });
      input.forEach(input => input.value = '');
      e.preventDefault();
    }
  });

  function todoFactory(name, description, tags) {

    return {
      name: name,
      description: description,
      tags: tags,
      create: new Date(),
      status: false
    }
  }

  function populate(plates = [], plateList) {
    plateList.innerHTML = plates.map((plate, i) => {
      // console.log(plate.tags.map((tag) => {
      //   return `<button class="tag">${tag}</button>`
      // }))
      return `
      <div class="task" data-index=${i}>
      <div class="task-text">
      
    <div class="task-name">${plate.name}</div>
    <div class="task-des" >${plate.description}</div>
    <div class="task-tag"> ${plate.tags.map((tag) => {
        return `<button class="tag">${tag}</button>`
      }).join('')}  
    </div>
    </div>
    <button class="check"></button>
  <button class="del"></button>
  </div>
   `
    }).join('');
  }

  function deleteTask() {
    const el = this.parentElement; //.task
    const index = el.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
  }

  function toggleDone() {
    // console.log(this.parentElement)
    const el = this.parentElement; //.task
    const index = el.dataset.index;
    // console.log(index)

    //set status trong localStorage
    tasks[index].status = !tasks[index].status;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //toggle class done de gach ngang khi task done
    // console.log(this.parentElement.children[0].children[0]) - chon div taskName
    const taskText = this.parentElement.children[0];
    const taskName = taskText.children[0];
    const taskDes = taskText.children[1];
    // console.log(taskDes,taskName)
    taskName.classList.toggle('done');
    taskDes.classList.toggle('done');
  }

  populate(tasks, taskZone);

  const checkBtn = document.querySelectorAll('.check');
  checkBtn.forEach(check => check.addEventListener('click', toggleDone))

  const delBtn = document.querySelectorAll('.del');
  delBtn.forEach(del => del.addEventListener('click', deleteTask))

}

export function hideDone() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) ;
  console.log(taskList);
  
}
