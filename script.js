// Run all code after the page has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to store tasks
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Function to save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {

        // If taskText is not passed, get it from input
        if (typeof taskText === "undefined") {
            taskText = taskInput.value.trim();
        }

        // Check if taskText is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // ✅ Create a new li and set its textContent
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // ✅ Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn"; // ✅ NO classList.add

        // ✅ Assign onclick event for removal
        removeButton.onclick = function () {
            taskList.removeChild(listItem);

            // Remove from array and update Local Storage
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // ✅ Append remove button to li, then li to taskList
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // ✅ Save to Local Storage if required
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // ✅ Clear input field
        taskInput.value = "";
    }

    // ✅ Load tasks from Local Storage on page load
    function loadTasks() {
        tasks.forEach(function (taskText) {
            addTask(taskText, false);
        });
    }

    // ✅ Add event listener to Add Task button
    addButton.addEventListener('click', addTask);

    // ✅ Add event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ✅ Invoke load function on DOMContentLoaded
    loadTasks();

});
