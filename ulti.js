// export function storeTask() {
//   const addItems = document.querySelector('.submit-button')
//   const items = JSON.parse(localStorage.getItem('items')) || [];
//   function addTask(e) {
//     e.preventDefault();
  
//     const taskName = document.querySelector('.task-name').value;
//     const taskDes = document.querySelector('.task-des');
//     const taskTag = document.querySelector('.tag');
//     const task = todoFactory(taskName, taskDes, taskTag);
//     tasks.push(task);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     console.log(taskName, taskDes, taskTag)
//   }
//   addItems.addEventListener('submit',addTask)
// }


function todoFactory(name, description, tags) {

  return {
    name: name,
    description: description,
    tags: tags,
    create: new Date(),
    status: false
  }
}