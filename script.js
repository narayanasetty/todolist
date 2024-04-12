// Define tasks array
let tasks = [{ name: "task1", completed: false }, { name: "task2", completed: false }];

// Get references to DOM elements
let add = document.getElementById("add");
let newitem = document.getElementById("newitem");
let todolist = document.getElementById("todolist");
let allButton = document.getElementById("all");
let uncompletedButton = document.getElementById("uncompleted");
let completedButton = document.getElementById("completed");
let pendingCount = document.getElementById("pending-count");

// Add event listener to the "Add" button
add.addEventListener("click", addToList);

// Add event listeners to filter buttons
allButton.addEventListener("click", () => filterTasks("all"));
uncompletedButton.addEventListener("click", () => filterTasks("uncompleted"));
completedButton.addEventListener("click", () => filterTasks("completed"));

// Initial display of the task list
displayList();

// Function to add a new task to the list
function addToList() {
  const taskName = newitem.value.trim(); // Trim to remove leading/trailing whitespace

  // Check if the task already exists
  if (taskName !== "" && !tasks.some(task => task.name === taskName)) {
    tasks.push({ name: taskName, completed: false });
    displayList();
    newitem.value = ""; // Clear input field after adding task
    updatePendingCount();
  } else {
    alert("Task already exists or input is empty.");
  }
}

// Function to display the task list
function displayList() {
  // Clear existing content
  todolist.innerHTML = "";

  // Append each unique task to the list
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      // Update task completion status when checkbox is clicked
      tasks[index].completed = checkbox.checked;
      updatePendingCount();
    });

    const taskName = document.createElement("span");
    taskName.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      // Remove task from the array and re-display the list
      tasks.splice(index, 1);
      displayList();
      updatePendingCount();
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskName);
    taskElement.appendChild(deleteButton);
    todolist.appendChild(taskElement);
  });

  updatePendingCount();
}

// Function to filter tasks based on completion status
function filterTasks(filter) {
  let filteredTasks = [];

  if (filter === "all") {
    // Display all tasks
    filteredTasks = tasks;
    allButton.style.fontWeight = "bold";
    uncompletedButton.style.fontWeight = "normal";
    completedButton.style.fontWeight = "normal";
  } else if (filter === "uncompleted") {
    // Display only uncompleted tasks
    filteredTasks = tasks.filter(task => !task.completed);
    allButton.style.fontWeight = "normal";
    uncompletedButton.style.fontWeight = "bold";
    completedButton.style.fontWeight = "normal";
  } else if (filter === "completed") {
    // Display only completed tasks
    filteredTasks = tasks.filter(task => task.completed);
    allButton.style.fontWeight = "normal";
    uncompletedButton.style.fontWeight = "normal";
    completedButton.style.fontWeight = "bold";
  }

  // Update task list display with filtered tasks
  displayFilteredTasks(filteredTasks);
}

// Function to display filtered tasks
function displayFilteredTasks(filteredTasks) {
  // Clear existing content
  todolist.innerHTML = "";

  // Append each task to the list
  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      // Update task completion status when checkbox is clicked
      tasks[index].completed = checkbox.checked;
      updatePendingCount();
    });

    const taskName = document.createElement("span");
    taskName.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      // Remove task from the array and re-display the list
      tasks.splice(index, 1);
      displayFilteredTasks(filteredTasks);
      updatePendingCount();
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskName);
    taskElement.appendChild(deleteButton);
    todolist.appendChild(taskElement);
  });

  updatePendingCount();
}

// Function to update the count of pending tasks
function updatePendingCount() {
  const pendingTasks = tasks.filter(task => !task.completed).length;
  pendingCount.textContent = `Pending tasks: ${pendingTasks}`;
}
