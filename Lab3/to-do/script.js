document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
  
      const li = document.createElement('li');
      li.className = 'task-item';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          li.classList.add('done');
        } else {
          li.classList.remove('done');
        }
      });
  
      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = taskText;
  
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
      });
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
  
      taskList.appendChild(li);
  
      taskInput.value = "";
      taskInput.focus();
    }
  
    addTaskBtn.addEventListener('click', addTask);
  
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
});
  