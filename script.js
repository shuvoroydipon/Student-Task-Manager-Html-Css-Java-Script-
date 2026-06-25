let tasks = [];
let currentFilter = "all";

function addTask() {
    const title = document.getElementById("taskName").value;
    const subject = document.getElementById("subject").value;
    const priority = document.getElementById("priority").value;

    if (title === "" || subject === "") {
        alert("Please fill all fields");
        return;
    }

    tasks.push({
        title,
        subject,
        priority,
        completed: false
    });

    document.getElementById("taskName").value = "";
    document.getElementById("subject").value = "";

    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <strong>${task.title}</strong><br>
            Subject: ${task.subject}<br>
            Priority: ${task.priority}<br>
            Status: ${task.completed ? "Completed" : "Pending"}<br><br>

            <div class="actions">
                <button onclick="completeTask(${index})">
                    Complete
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateCounter();
}

function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("pending").textContent = pending;
}

function updateDateTime() {
    const now = new Date();

    document.getElementById("datetime").innerHTML =
        `Today: ${now.toLocaleDateString()} <br>
         ${now.toLocaleTimeString()}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});