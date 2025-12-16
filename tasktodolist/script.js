const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        isCompleted: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">No tasks yet. Add one above!</div>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        
        if (task.isCompleted) {
            li.classList.add("completed");
        }

        const taskTextSpan = document.createElement("span");
        taskTextSpan.className = "task-text";
        taskTextSpan.textContent = task.text;

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "task-buttons";

        const toggleBtn = document.createElement("button");
        toggleBtn.className = task.isCompleted ? "btn btn-undo" : "btn btn-done";
        toggleBtn.textContent = task.isCompleted ? "Undo" : "Done";
        toggleBtn.onclick = () => toggleTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        buttonsDiv.appendChild(toggleBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(taskTextSpan);
        li.appendChild(buttonsDiv);
        taskList.appendChild(li);
    });
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.isCompleted = !task.isCompleted;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

renderTasks();
