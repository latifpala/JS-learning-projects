document.addEventListener('DOMContentLoaded', () => {

  const addTaskBtn = document.getElementById('add-task-btn');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  
  const clearAllBtn = document.getElementById('delete-all-tasks');

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  addTaskBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if(text === "") return;

    const task = {
      id : Date.now(),
      text : text,
      is_completed : false

    }
    tasks.push(task);
    saveTasks();
    renderTask(task);
    todoInput.value = "";
  });

  clearAllBtn.addEventListener('click', () => {
    localStorage.removeItem("tasks");
    window.location.href = '';
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTask(task){
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
    `;
    li.addEventListener('click', (e) => {
      if(e.target.tagName === "BUTTON") return;
      task.is_completed = !task.is_completed
      li.classList.toggle('completed');
      saveTasks();
    });

    li.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });
    todoList.appendChild(li);
  }
});
